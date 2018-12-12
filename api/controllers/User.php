<?php

namespace api\controllers;

use api\models\UserModel;

class User extends BaseController {

	private $validateRegisterFields = ['name', 'email', 'password'];
	private $validateRemittanceFields = ['to', 'from', 'sum'];

	private $bonus_register = 500;

	private function getUserModer($table) {

		return new UserModel($table);
	}

	/**
	 * @param $validateFields
	 * @param $arUser
	 * @param array $exceptionFields
	 * @return array
	 */
	private function validate($validateFields, $arUser, $exceptionFields = []) {

		$arError = [];

		foreach ($validateFields as $value) {

			if (empty($arUser[$value]) && !in_array($value, $exceptionFields)) {

				$arError[] = $value;
			}
		}

		return $arError;
	}

	public function action_register($data) {

		$result = ['error' => $this->validate($this->validateRegisterFields, $data['user_data'])];

		if (empty($result['error'])) {

			$data['user_data']['balance'] = $this->bonus_register;

			$usModel = $this->getUserModer('users');
			$result = $usModel->userRegister($data['user_data']);
		}

		return $result;
	}

	public function action_authorize($data) {

		$result = ['error' => $this->validate($this->validateRegisterFields, $data['user_data'], ['name'])];

		if (empty($result['error'])) {

			$usModel = $this->getUserModer('users');
			$result = $usModel->authUser($data['user_data']);
		}

		return $result;
	}

	public function action_remittance($data) {

		$result = ['error' => $this->validate($this->validateRemittanceFields, $data['remittance_data'])];

		if (empty($result['error'])) {

			$usModel = $this->getUserModer('user_payment_account');
			$result = $usModel->remittance($data['remittance_data']);
		}

		return $result;
	}

	public function action_get_users_list() {

		$usModel = $this->getUserModer('users');

		return $usModel->getUsersList();
	}

	public function action_user_block($data) {

		if ($data['cur_user_role'] != 3) {

			return ['error' => 'Insufficient rights'];
		}

		if (empty($data['user_block_id'])) {

			return ['error' => 'Empty user id'];
		}

		$usModel = $this->getUserModer('users');

		return $usModel->userBlock($data['user_block_id'], $data['new_status']);
	}

	protected function before() {
		// TODO: Implement before() method.
	}
}