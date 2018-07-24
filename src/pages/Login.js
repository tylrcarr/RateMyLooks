import React, { Component } from "react";

import axios from "axios";

import css from  "./css/Login.css";
 
class Login extends Component {

	constructor (props) {
		super(props);
		this.state = {
			email: '',
			pass: ''
		};
		this.attemptLogin = this.attemptLogin.bind(this);
	}

	attemptLogin () {
		axios.post("/login", this.state).then(res => {
			this.props.history.push("/");
		}).catch(err => {console.log("UwU your request failed twy again :/")});

	}

	updatePass(evt) {
		this.setState({
			pass: evt.target.value
		});
	}

	updateEmail(evt) {
		this.setState({
			email: evt.target.value
		});
	}

	render () {

		return (
			<div>
			  <div className="wrapper">
			    <div className="form-signin">       
			      <h2 className="form-signin-heading">Please login</h2>
			      <input type="text" className="form-control" name="email" placeholder="Email Address" value={this.state.email} onChange={evt => this.updateEmail(evt)} required="" autoFocus="" />
			      <input type="password" className="form-control" name="pass" placeholder="Password" value={this.state.pass} onChange={evt => this.updatePass(evt)} required=""/>      
			      <button className="btn btn-lg btn-primary btn-block" type="submit" onClick={this.attemptLogin}>Login</button>   
			    </div>
			  </div>
			</div>
		);
	}
}
 
export default Login;
