export default class UserModel {

	_fields = {
		user_id: null,
		pay_acc_id: null,
		name: null,
		email: null,
		balance: null,
		last_three_operations: [],
		blocked: null,
		role_id: null,
		role_name: null
	};

	constructor (data) {

		if (data) {

			if (data._fields) {

				data = {...data._fields};
			}

			this.setUserID(data.user_id);
			this.setPayAccID(data.pay_acc_id);
			this.setName(data.name);
			this.setEmail(data.email);
			this.setBalance(data.balance);
			this.setLastOperations(data.last_three_operations);
			this.setBlocked(data.blocked);
			this.setRoleID(data.role_id);
			this.setRoleName(data.role_name);
		}
	}

	toJSON() {

		return {
			userID: this.getUserID(),
			payAccID: this.getPayAccID(),
			name: this.getName(),
			email: this.getEmail(),
			balance: this.getBalance(),
			lastThreeOperations: this.getLastOperations(),
			blocked: this.getBlocked(),
			role_id: this.getRoleID(),
			role: this.getRoleName()
		}
	}

	setUserID(userID) {

		this._fields.user_id = userID;
	}

	setPayAccID(payAccID) {

		this._fields.pay_acc_id = payAccID;
	}

	setName(name) {

		this._fields.name = name;
	}

	setEmail(email) {

		this._fields.email = email;
	}

	setBalance(balance) {

		this._fields.balance = balance;
	}

	setLastOperations(lastThreeOperations) {

		this._fields.last_three_operations = lastThreeOperations || [];
	}

	setBlocked(blocked) {

		this._fields.blocked = parseInt(blocked);
	}

	setRoleName(name) {

		this._fields.role_name = name;
	}

	setRoleID(roleID) {

		this._fields.role_id = parseInt(roleID);
	}

	getUserID() {

		return this._fields.user_id;
	}

	getPayAccID() {

		return this._fields.pay_acc_id;
	}

	getName() {

		return this._fields.name;
	}

	getEmail() {

		return this._fields.email;
	}

	getBalance() {

		return this._fields.balance;
	}

	getLastOperations() {

		return this._fields.last_three_operations;
	}

	isBlocked() {

		return this._fields.blocked === 1;
	}

	getBlocked() {

		return this._fields.blocked;
	}

	getRoleName() {

		return this._fields.role_name;
	}

	getRoleID() {

		return this._fields.role_id;
	}

	isAdmin() {

		return this.getRoleID() === 3;
	}

}