import React, {Component} from 'react'
import {Redirect} from "react-router-dom";

import style from './registerPage/style.css';
import {getQueryString} from "../lib/helpers";

const axios = require('axios');

export default class RegisterPage extends Component{

	state = {
		name: '',
		email: '',
		password: '',
		errors: false,
		isLoading: false,
		isAuthorize: false
	};

	componentWillMount() {

		this.setState({isAuthorize: this.getParentField('isAuthorize')})
	}

	validateFields = () => {

		let error = '';

		if (this.state.name.length === 0) {

			error += 'Empty name.';
		}

		if (this.state.email.length === 0) {

			error += ' Empty email.';
		}

		if (this.state.password.length === 0) {

			error += ' Empty password.';
		}

		return error;
	};

	onChangeName = (evt) => {

		this.setState({name: evt.target.value});
	};

	onChangeEmail = (evt) => {

		this.setState({email: evt.target.value});
	};

	onChangePass = (evt) => {

		this.setState({password: evt.target.value});
	};

	onRegister = async () => {

		this.setState({errors: false});
		let errors = '';

		if (errors = this.validateFields()) {

			this.setState({errors});
			return false;
		}

		let queryStr = getQueryString('register', 'user'),
			queryParams = `&user_data[name]=${this.state.name}
								&user_data[email]=${this.state.email}
								&user_data[password]=${this.state.password}`,
			afterSet = {isLoading: false};

		this.setState({isLoading: true});

		let data = await axios.get(queryStr + queryParams)
			.then(res => res.data.content_data)
			.catch(err => err);

		if (data.error) {

			afterSet.errors = data.error;
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

			this.props.setParentState({isAuthorize, userFields, usersList});
		}
	};

	getParentField = (field) => {

		if (typeof this.props.getParentField === 'function') {

			return this.props.getParentField(field);
		}

		return false;
	};

	render() {

		if (this.state.isAuthorize) {

			return <Redirect to={'/cabinet'}/>
		}

		return <div className={'registerBlock'}>

			{this.state.errors && <p>{this.state.errors}</p>}
			{this.state.isLoading && <p>loading</p>}
			<input placeholder={'name'} type="text" name={'name'} onChange={this.onChangeName}/>
			<input placeholder={'email'} type="text" name={'email'} onChange={this.onChangeEmail}/>
			<input placeholder={'password'} type="password" name={'password'} onChange={this.onChangePass}/>

			<button onClick={this.onRegister}>Registration</button>
		</div>
	}
}