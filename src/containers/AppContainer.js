import React, {Component} from 'react';
import {getQueryString} from "../lib/helpers";

export default class AppContainer extends Component {

	state = {
		isAuthorize: false,
		isLoading: false,
		userData: null,
		usersList: null
	}

	componentWillMount() {

		this.setState({isLoading: true});

		let queryString = getQueryString('get_users_list', 'user');



	}

	render() {
		console.log(this.props);
		return this.props.children;
	}
}