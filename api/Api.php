<?php
namespace api;

use api\models\Db;
use api\lib\Config;

require_once $_SERVER['DOCUMENT_ROOT'] . '/api/constants.php';

class Api {

	public static function Init() {

		$hostStage = 'default';

		if (defined('CURRENT_HOST_STAGE')) {

			$hostStage = CURRENT_HOST_STAGE;
		}

		date_default_timezone_set('Europe/Moscow');
		Db::getInstance()->Connect(
			Config::get('db_user', $hostStage),
			Config::get('db_password', $hostStage),
			Config::get('db_base', $hostStage)
		);

		if (php_sapi_name() !== 'cli' && isset($_SERVER) && isset($_GET)) {

			self::web(isset($_SERVER['QUERY_STRING']) ? $_SERVER['QUERY_STRING'] : 'index');
		}
	}

	protected static function web($queryStr) {

		$arQuery = explode('&', $queryStr);

		if (empty($arQuery[count($arQuery) - 1])) {
			array_pop($arQuery);
		}

		foreach ($arQuery as $item) {
			list($key, $val) = explode('=', $item);

			$_GET[$key] = $val;
		}

		if (isset($_GET['c'])) {

			$controllerName = 'api\controllers\\'.ucfirst($_GET['c']);
			$methodName = isset($_GET['action']) ? 'action_'.$_GET['action'] : 'action_index';

			$controller = new $controllerName();

			$data = [
				'content_data' => $controller->request($methodName, $_GET)
			];

			header("Access-Control-Allow-Origin: *");
			header("Content:". json_encode($data));
			echo json_encode($data);
		}
	}
}