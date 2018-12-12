<?php

namespace api\models;

class UserModel extends BaseModel {

	public function __construct($tableName) {

		parent::__construct($tableName);
	}

	//проверяем есть ли email в базе
	private function isUniqueEmail($email) {

		$query = 'SELECT `email` FROM ' . $this->getTableName() . ' WHERE email = "'.$email.'"';
		$queryResult = $this->db->query($query)->Fetch()['email'];

		return !is_null($queryResult);
	}

	//хешируем пароль
	private function hashing($str) {

		return md5(strlen($str) . $str . 'api_pw');
	}

	public function userRegister($arFields) {

		$result = ['error' => 'Empty fields'];

		if (!empty($arFields)) {

			//Проверяем email на уникальность
			if ($this->isUniqueEmail($arFields['email'])) {

				return ['error' => 'Email isset'];
			}

			//запускаем транзакцию
			$arUserCreate = $this->db->sendTransaction(function ($arFields) {

				//при возврате false из функции транзакция отменяется и откатываются изменения в бд
				$arFields['password'] = $this->hashing($arFields['password']);

				//Убираем баланс из общего массива(т.к при создании пользователя он не нужен)
				$balance = $arFields['balance'];
				unset($arFields['balance']);

				$result = ['user_id' => $this->db->insert($this->getTableName(), $arFields)];

				//Если не получили ID пользователя то отменяем транзакцию откатываем изменения
				if (intval($result['user_id']) > 0) {

					//добавляем баланс в массив с результатом добавления пользователя
					$result['balance'] = $balance;
					$result['account_id'] = $this->db->insert('user_payment_account', $result);

					if (intval($result['account_id']) > 0) {

						$affectedRow = $this->db->update(
							$this->getTableName(),
							['payment_account_id' => $result['account_id']],
							['id' => $result['user_id']]
						);

						//если пользователь добавился и создался расчетный счет и пользователю обновили поле счета
						if ($result['user_id'] > 0 && $result['account_id'] > 0 && $affectedRow > 0) {

							return ['user_id' => $result['user_id']];
						}

						//если payment_account создался а данные у пользователя не обновились
						return false;
					}

					//если пользователь создался а payment_account нет
					return false;
				}

				//Если пользователь не добавился
				return false;
			}, $arFields);
		}

		if ($arUserCreate) {

			$result = [
				'success' => 'successfully registered',
				'isAuthorize' => true,
				'user_fields' => $this->getUserData($arUserCreate),
				'users_list' => $this->getUsersList()
			];
		}

		return $result;
	}

	private final function getUserData($arWhere = [], $logic = '') {

		$whr_str = '';
		$isAppend = false;
		$query = 'SELECT US.id as user_id, PYAC.id as pay_acc_id, US.name, US.email,
						   PYAC.balance, PYAC.last_three_operations, US.blocked, ROLE.role_name, ROLE.id as role_id
					FROM users as US
					JOIN user_payment_account as PYAC ON (US.id = PYAC.user_id)
					LEFT JOIN user_roles as ROLE ON (US.role_id = ROLE.id)';

		if (is_array($arWhere) && count($arWhere) > 0) {

			foreach ($arWhere as $key => $value) {

				$whr_str .= "{$key} = '$value' ";

				if (!$isAppend && strlen($logic) > 0) {

					$whr_str .= " $logic ";
					$isAppend = true;
				}
			}

			$query .= ' WHERE ' . $whr_str;
		}

		return $this->db->query($query)->Fetch();
	}

	public function getUsersList() {

		$query = 'SELECT id, name, email, blocked FROM '.$this->getTableName();
		$result = [];
		$rsBD = $this->db->query($query);

		while ($user = $rsBD->Fetch()) {

			$result[] = $user;
		}
		return $result;
	}

	public function authUser($data) {

		$result = ['auth_error' => 'Incorrect login or password'];

		//Выбираем информацию о пользователе с сответствующим логином и паролем
		$queryResult = $this->getUserData(
			[
			'email' => $data['email'],
			'password' => $this->hashing($data['password'])
			],
			'AND'
		);

		if ($queryResult !== false) {

			if (intval($queryResult['blocked']) === 1) {

				return ['auth_error' => 'Account is blocked'];
			}

			$queryResult['last_three_operations'] = unserialize($queryResult['last_three_operations']);

			$result = [
				'isAuthorize' => true,
				'user_fields' => $queryResult,
				'users_list' => $this->getUsersList()
			];
		}

		return $result;
	}

	private function getPrepareLastOperation($who, $arPropOpr, $arOpr = []) {

		var_dump($arOpr);
		$result = $arOpr;
		$opStr = 'transfer ' . $who . ': ' . $arPropOpr['name'] . ', on sum: ' . $arPropOpr['sum']. ', date: '.$arPropOpr['date'].'.';

		if (count($result) > 0) {

			array_unshift($result, $opStr);
		}

		if (count($result) > 3) {

			array_pop($result);
		}

		return serialize($result);
	}

	public function remittance($data) {

		$result = ['error' => 'Unknown error'];

		if (intval($data['to']) > 0 && intval($data['from']) > 0) {

			//запускаем транзакцию
			$result = $this->db->sendTransaction(function ($data) {

				$to = $this->getUserData(['user_id' => $data['to']]);
				$from = $this->getUserData(['user_id' => $data['from']]);

				if (count($to) === 0 || count($from) === 0) {

					return ['Incorrect' => 'users'];
				}

				if ($data['sum'] > $from['balance']) {

					return ['error' => 'Not enough money to transfer, You don\'t have an account: '.$from['balance']];
				}

				$affectedRowTo = $this->db->update(
					$this->getTableName(),
					[
						'balance' => $to['balance'] + $data['sum'],
						'last_three_operations' => $this->getPrepareLastOperation(
							'from',
							['name' => $from['name'], 'sum' => $data['sum'], 'date' => date( 'd-m-Y')],
							unserialize($to['last_three_operations'])
						),
					],
					['user_id' => $to['user_id']]
				);

				$affectedRowFrom = $this->db->update(
					$this->getTableName(),
					[
						'balance' => $from['balance'] - $data['sum'],
						'last_three_operations' => $this->getPrepareLastOperation(
							'to',
							['name' => $to['name'], 'sum' => $data['sum'], 'date' => date( 'd-m-Y')],
							unserialize($from['last_three_operations'])
						),
					],
					['user_id' => $from['user_id']]
				);

				if ($affectedRowFrom && $affectedRowTo) {

					$queryResult = $this->getUserData(['user_id' => $from['user_id']]);
					$queryResult['last_three_operations'] = unserialize($queryResult['last_three_operations']);

					return [
						'success' => 'successfully transaction',
						'user_fields' => $queryResult
					];
				}

				return ['error' => 'Unknown error'];
			}, $data);

		} else {

			$result['error'] = 'Incorrect users data';
		}

		return $result;
	}

	public function userBlock($userID, $newStatus) {

		$result = ['error' => 'Unknown error'];

		$affectedRow = $this->db->update(
			$this->getTableName(),
			[
				'blocked' => $newStatus
			],
			['id' => $userID]
		);

		if ($affectedRow > 0) {

			$result = ['success' => 'successfully update'];
		}

		return $result;
	}
}