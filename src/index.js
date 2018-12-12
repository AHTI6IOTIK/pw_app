import React, {Component, Fragment} from 'react';
import ReactDom from 'react-dom';
import {BrowserRouter, NavLink as NavLinkBase, Route, Switch, Redirect} from "react-router-dom";

//screens
import Page404 from './screens/Page404';
import AuthPage from './screens/AuthPage';
import RegisterPage from './screens/RegisterPage';
import CabinetPage from './screens/CabinetPage';
import UsersList from './screens/UsersList';

//models
import UserModel from "./models/UserModel";

const navLinkStyle = {
	padding: 4,
	transition: '0.4s',
	textDecoration: 'none'
};

const navLinkStyleActive = {
	color: 'coral'
};

const NavLink = (props) => (
	<NavLinkBase
		{...props}
		style={navLinkStyle}
		activeStyle={navLinkStyleActive}
	/>
);

class Index extends Component {

	state = {
		usersList: null,
		userFields: null,
		isAuthorize: false,
		isLoading: false
	};

	componentWillMount() {

		if (localStorage['app']) {

			this.setState({...JSON.parse(localStorage['app'])});
		}
	}

	componentDidUpdate() {

		localStorage['app'] = JSON.stringify(this.state);
	}

	getInitialState = () => ({
		usersList: null,
		userFields: null,
		isAuthorize: false,
		isLoading: false
	});

	onLogout = () => {

		this.setState(this.getInitialState());
	};

	onCallbackSet = (data) => {

		this.setState({...data});
	};

	onCallbackGet = (field) => {

		return this.state[field];
	};

	render() {

		let link = this.state.isAuthorize ? {title: "Cabinet", href: "/cabinet"} : {title: "Authorize", href: "/auth"};
		const User = new UserModel(this.state.userFields);

		return (
			<BrowserRouter>
				<Fragment>
					{this.state.isLoading && <p>loading</p>}
					<nav>
						<NavLink to='/' exact>Home</NavLink>
						<NavLink to={link.href}>{link.title}</NavLink>
						{
							this.state.isAuthorize && User.isAdmin() &&
							<NavLink to={'/userList'}>Users settings</NavLink>
						}
						{
							this.state.isAuthorize && <NavLink to={'/logout'} onClick={this.onLogout}>Logout</NavLink>
						}
					</nav>

					<Switch>

						<Route path='/' exact render={() => <div>index</div>} />
						<Route path='/auth' render={() => <AuthPage setParentState={this.onCallbackSet} />} />
						<Route path='/register' render={() => <RegisterPage
							getParentField={this.onCallbackGet}
							setParentState={this.onCallbackSet}/>}
						/>
						<Route path='/cabinet' render={() => <CabinetPage
							getParentField={this.onCallbackGet}
							setParentState={this.onCallbackSet}/>}
						/>
						<Route path='/userList' render={() => <UsersList
							getParentField={this.onCallbackGet}
							setParentState={this.onCallbackSet}/>}
						/>

						<Redirect from={'/logout'} to={'/'} />
						<Route component={Page404} />
					</Switch>
				</Fragment>
			</BrowserRouter>
		)
	}
}

ReactDom.render(<Index />, document.getElementById('root'));
