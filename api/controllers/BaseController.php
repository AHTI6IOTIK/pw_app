<?php

namespace api\controllers;

abstract class BaseController {

	protected $data;
	protected $actionName;

	//TODO can be used for logging
	protected abstract function before();

	public function request($action, $data) {

		$this->actionName = $action;
		$this->data = $data;

		$this->before();
		return $this->$action($data);   //$this->action_index $data -> $_GET
	}

	public function action_index($data) {

		return ['result' => 'index'];
	}

	//
	// Запрос произведен методом GET?
	//
	protected function isGet() {

		return json_encode(['isGet' =>  $_SERVER['REQUEST_METHOD'] == 'GET']);
	}

	//
	// Запрос произведен методом POST?
	//
	protected function isPost() {

		return json_encode(['isPost' =>  $_SERVER['REQUEST_METHOD'] == 'POST']);
	}

	// Если вызвали метод, которого нет - завершаем работу
	public function __call($name, $params) {

		return json_encode(['empty' => 'Проверьте запрос']);
	}
}