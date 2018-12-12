<?php
namespace api\lib;

class Config {

	private static $configCache = [];

	public static function get($parameter, $hostStage) {

		if ($value = self::getCurrentConfiguration()[$hostStage][$parameter]) {

			return $value;
		}

		throw new \Exception('Parameter ' . $parameter . ' does not exists');
	}

	private static function getCurrentConfiguration() {

		if (empty(self::$configCache)) {

			$configDir = $_SERVER['DOCUMENT_ROOT'] . '/api/config/';
			$configProd = $configDir . 'config.prod.php';
			$configDev = $configDir . 'config.dev.php';
			$configDefault = $configDir . 'config.default.php';

			if (is_file($configProd)) {

				$config['prod'] = require_once $configProd;
			} else if (is_file($configDev)) {

				$config['dev'] = require_once $configDev;
			} else if (is_file($configDefault)) {

				$config['default'] = require_once $configDefault;
			} else {

				throw new \Exception('Unable to find configuration file');
			}

			if (!isset($config) || !is_array($config)) {

				throw new \Exception('Unable to load configuration');
			}
			self::$configCache = $config;
		}

		return self::$configCache;
	}
}

?>