import React, {Component} from 'react';
import {Link, Redirect} from "react-router-dom";

import {getQueryString} from '../lib/helpers';

import css from './authPage/style.css'
const axios = require('axios');

export default class AuthPage extends Component {

	state = {
		email: '',
		password: '',
		authError: false,
		isLoading: false,
		isAuthorize: false
	};

	onChangeEmail = (evt) => {

		this.setState({email: evt.target.value})
	};

	onChangePassword = (evt) => {

		this.setState({password: evt.target.value})
	};

	validateFields = () => {

		let error = '';

		if (this.state.email.length === 0) {

			error += 'Empty email.';
		}

		if (this.state.password.length === 0) {

			error += ' Empty password.';
		}

		return error;
	};

	onClickBtn = async (evt) => {

		let errors = '';

		if (errors = this.validateFields()) {

			this.setState({authError: errors});
			return false;
		}

		let queryStr = getQueryString('authorize', 'user'),
			queryParam = `&user_data[email]=${this.state.email}&user_data[password]=${this.state.password}`,
			afterSet = {isLoading: false};

		this.setState({isLoading: true, authError: false});

		let data = await axios.get(queryStr + queryParam)
			.then(res => res.data.content_data)
			.catch(err => err);

		if (data.auth_error) {

			afterSet.authError = data.auth_error;
		} else {

			afterSet.isAuthorize = data.isAuthorize;
			this.onCallback(data);
		}


		this.setState(afterSet);
	};

	onCallback = (data) => {

		let isAuthorize = data.isAuthorize,
			userFields = data.user_fields,
			usersList = data.users_list;

		if (typeof this.props.setParentState === 'function') {

			this.props.setParentState({isAuthorize, userFields, usersList})
		}
	};

	render() {

		if (this.state.isAuthorize) {

			return <Redirect to={'/cabinet'}/>
		}
		return <div className={'authBlock'}>
			{this.state.authError && <p>{this.state.authError}</p>}
			{this.state.isLoading && <p>loading</p>}
			<input type="text" name={'email'} placeholder={'email'} onChange={this.onChangeEmail} value={this.state.email}/>
			<input type="password" name={'password'} placeholder={'password'} onChange={this.onChangePassword} value={this.state.password}/>
			<button onClick={this.onClickBtn}>Authorize</button>
			<Link to={'/register'}>Registration</Link>
		</div>
	}

}
