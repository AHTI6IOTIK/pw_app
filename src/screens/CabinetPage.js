import React, {Component} from 'react';
import {Redirect} from "react-router-dom";

import UserModer from '../models/UserModel';
import TransferForm from "./cabinetPage/TransferForm";

import {getQueryString} from "../lib/helpers";

const axios = require('axios');
import style from './cabinetPage/style.css';

const ListTransaction = ({transactionList}) => (
	<ul>
		{transactionList.map((item, key) => {
			return <li key={key}>{item}</li>
		})}
	</ul>
);

export default class CabinetPage extends Component {

	state = {
		isAuthorize: false,
		userFields: null,
		usersList: null
	};

	componentWillMount() {

		this.getFields();
	}

	getFields = () => {

		this.setState({
			isAuthorize: this.props.getParentField('isAuthorize'),
			userFields: new UserModer(this.props.getParentField('userFields')),
			usersList: this.props.getParentField('usersList')
		});
	};

	onSubmitTransfer = async (toID, sum) => {
		let queryStr = getQueryString('remittance', 'user'),
			queryParam = `&remittance_data[to]=${toID}
							&remittance_data[from]=${this.state.userFields.getUserID()}
							&remittance_data[sum]=${sum}`;

		let data = await axios.get(queryStr + queryParam)
			.then(res => res.data.content_data)
			.catch(err => err);

		if (data.success && typeof this.props.setParentState === 'function') {

			let userFields = data.user_fields;
			this.props.setParentState({userFields});
			this.getFields();

			return true;
		}

		return false;
	};

	render() {

		if (!this.state.isAuthorize) {

			return <Redirect to={'/auth'}/>
		}

		return <div>
			<ul>
				<li>Hello: {this.state.userFields.getName()}</li>
				<li>You balance: {this.state.userFields.getBalance()}</li>
				<li>You site role: {this.state.userFields.getRoleName()}</li>
				{
					this.state.userFields.getLastOperations().length > 0 &&
					<li>You last transfers:
						<ListTransaction
							transactionList={this.state.userFields.getLastOperations()}
						/>
					</li>
				}
			</ul>
			<TransferForm usersList={this.state.usersList} submitTrc={this.onSubmitTransfer}/>
		</div>
	}
}