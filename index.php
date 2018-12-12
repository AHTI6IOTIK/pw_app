<?php
require_once 'autoload.php';
require_once 'debug.php';
try {

	\api\Api::init();
} catch (PDOException $e) {

	echo "DB is not available";
	var_dump($e->getTrace());
} catch (Exception $e) {

	echo $e->getMessage();
}
