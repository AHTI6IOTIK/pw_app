import React, {Component} from 'react';
import UserItem from './usersList/UserItem';

import styles from './usersList/style.css';

import UserModel from "../models/UserModel";

import {getQueryString} from "../lib/helpers";
const axios = require('axios');

export default class UsersList extends Component{

	state = {
		usersList: [],
		sortBy: 'default'
	};

	componentWillMount() {

		this.setState({usersList: [...this.props.getParentField('usersList')]})
	}

	componentWillUnmount() {

		this.props.setParentState({usersList: this.state.usersList})
	}

	btnHandler = async (itemID, curStatus) => {

		let User = this.getUserModel();
		curStatus = parseInt(curStatus) === 1 ? 0 : 1;

		let querySting = getQueryString('user_block', 'user'),
			queryParam = `&cur_user_role=${User.getRoleID()}&user_block_id=${itemID}&new_status=${curStatus}`;

		let data = await axios.get(querySting+queryParam)
					.then(res => res.data.content_data)
					.catch(err => err);

		if (data.success) {

			let newUsersList = this.state.usersList.map(item => {

				if (item.id === itemID) {

					item.blocked = curStatus;
				}

				return item;
			});

			this.setState({usersList: newUsersList}, this.sort);
		}
	};

	getUserModel() {

		return new UserModel(this.props.getParentField('userFields'));
	}

	onResetSort(by) {

		this.setState({sortBy: by}, this.sort);
	}

	sort() {

		let sortableList = this.state.usersList.sort((a, b) => {

			if (a[this.state.sortBy] > b[this.state.sortBy]) {

				return -1;
			}

			if (a[this.state.sortBy] < b[this.state.sortBy]) {

				return 1;
			}

			return 0;
		});

		this.setState({usersList: sortableList});
	}

	render() {

		const User = this.getUserModel();

		return <div className={'usersList'}>

			<div className={'usersList--sortBlock'}>
				<button onClick={() => this.onResetSort('name')}>sort by name</button>
				<button onClick={() => this.onResetSort('blocked')}>sort by status</button>
			</div>
			{
				this.state.usersList.map((item) => {

					let status = 'UNBLOCK',
						btnObj = {
						title: 'BLOCK',
						handler: this.btnHandler
					};

					if (parseInt(item.blocked) === 1) {

						btnObj.title = 'UNBLOCK';
						status = 'BLOCK';
					}

					if (item.id === User.getUserID()) {

						return false;
					}

					return <UserItem key={item.id} status={status} item={item} btn={btnObj} />
				})
			}
		</div>;
	}
}