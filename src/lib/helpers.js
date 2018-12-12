import HOST from './constants';

export const isJSON = (val) => {

	try {

		JSON.parse(val);
	} catch (e) {

		return false;
	}

	return true;
};

export const getJSON = (val) => {

	return isJSON(val) && JSON.parse(val);
};

export const errMessage = (type) => {

	switch (type) {

		case 'HOST':
			return 'empty HOST';

		case 'TABLE':
			return 'empty TABLE';
		case 'controller':
			return 'empty controller';
		case 'requestData':
			return 'empty requestData';

		default:
			return 'empty type error message';
	}
};

export const getStringObject = (object) => {

	return JSON.stringify(object)
};

export const getQueryString = (action, controller, requestData = '') => {

	if (!HOST) return errMessage('HOST');
	if (!controller) return errMessage('controller');

	let result = `${HOST}/`;

	if (action) {

		result += '?action=' + action;
	}

	if (action) {

		result += '&c=' + controller;
	}

	return result;
};