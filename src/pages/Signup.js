import React, { Component } from "react";

import axios from "axios";
 
class Signup extends Component {

	constructor (props) {
		super(props);
		this.state = {
			email: '',
			pass: ''
		};
		this.attemptLogin = this.attemptLogin.bind(this);
	}


	render () {
		return (
			<div>
				<input value={this.state.email} onChange={evt => this.updateEmail(evt)} placeholder="email" name="email"/>
				<input value={this.state.pass} onChange={evt => this.updatePass(evt)} placeholder="pass" name="pass"/>
				<input type="submit" value="Submit" onClick={this.attemptLogin}/>
			</div>
		);
	}
}
 
export default Login;
