
/*import React, { Component } from "react";
import Main from "./Main";

import ReactDOM from "react-dom";

ReactDOM.render(
	<Main />,

	document.querySelector("#login")
);
*/
import React, {PropTypes} from 'react'
//import { withRouter } from 'react-router-dom'
//import Main from './Main'
import axios from 'axios';


class App extends React.Component {
	constructor (props) {
		console.log(props);
		super(props);
		this.checkAuth();
	}
	
	checkAuth() {
		try {
			axios.get("/checkAuth").then(response => this.props.history.push(response.data ? "/home" : "/login"));
		} catch (err){
			console.log("I don't know what the fuck you did, but you did it. gg");
		}
	}

	render () {
		return (
		  <div>
		  </div>
		);
	}
}

export default App

