import React, {Component} from 'react';

import {getQueryString} from "../../lib/helpers";

const axios = require('axios');

export default class TransferForm extends Component{

	state = {
		transferTo: null,
		targetUserID: null,
		transferSum: null,
		usersList: [...this.props.usersList],
		filteredUsers: [],
		errors: null,
		isLoading: null
	};

	onSetUser = (evt) => {

		if (this.state.errors) {

			this.validateFields();
		}

		let filteredUsers = this.state.usersList.filter(item => {

			if (~item.name.toLowerCase().indexOf(evt.target.value)) {
				return item;
			}
		});

		this.setState({transferTo: evt.target.value, filteredUsers});
	};

	onSetSum = (evt) => {

		if (this.state.errors) {

			this.validateFields();
		}

		this.setState({transferSum: evt.target.value});
	};

	onMouseOut = (evt) => {

		evt.target.style.backgroundColor = 'initial';
	};

	onMouseOver = (evt) => {

		evt.target.style.backgroundColor = 'red';
	};

	onEnterUser = (evt) => {


		this.setState({
			transferTo: evt.target.innerText,
			targetUserID: evt.target.id,
			filteredUsers: []
		})
	};

	validateFields = () => {

		this.setState({errors: null});

		let errors = '';

		if (!this.state.transferTo) {

			errors += 'Field Transfer to user, is required.';
		}


		if (!parseInt(this.state.transferSum)) {

			errors += ' Field Transfer sum, is required.';
		}

		if (errors) {

			this.setState({errors});
			return false
		}

		return true;
	};

	onSendTransfer = async () => {

		if (this.validateFields()) {

			let res = false;
			this.setState({isLoading: true});

			if (typeof this.props.submitTrc === 'function') {

				res = await this.props.submitTrc(this.state.targetUserID, this.state.transferSum);
			}

			if (res) {

				this.setState({isLoading: false});
			}
		}
	};

	render() {

		let filteredCount = this.state.filteredUsers.length,
			searchClasses = 'targetPlace ';

		searchClasses += filteredCount > 0 ? 'open' : 'close';

		return <div className={'transferForm'}>
			{
				this.state.errors && <div className="errors">{this.state.errors}</div>
			}
			{
				this.state.isLoading && <p>loading</p>
			}
			<input
				value={this.state.transferTo || ''}
				placeholder={'Transfer to user'}
				type="text"
				name={'transferTo'}
				onChange={this.onSetUser}
			/>
			<input
				placeholder={'Sum transfer'}
				type="text"
				name={'transferSum'}
				onChange={this.onSetSum}
				value={this.state.transferSum || ''}
			/>
			<div className={searchClasses}>
				{
					this.state.filteredUsers.map((item, key) => {
						return <p
							onClick={this.onEnterUser}
							onMouseOut={this.onMouseOut}
							onMouseOver={this.onMouseOver}
							key={item.id}
							id={item.id}
						>
							{item.name}
						</p>
					})
				}
			</div>
			<button onClick={this.onSendTransfer}>submit</button>
		</div>
	}
}