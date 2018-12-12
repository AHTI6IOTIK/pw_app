<?php

function __autoload($className) {

	$fileName = $_SERVER['DOCUMENT_ROOT'].'/'.str_replace('\\', '/', $className) . '.php';

	if (!require_once $fileName) {

		throw new \Exception('Unable to find ' . $fileName);
	}
}




