import React, { Component } from "react";

import axios from "axios";
 
class Home extends Component {

	constructor (props) {
		super(props);
		this.getNext();

	}

	getNext() {
		axios.get("/users/next").then(res => { console.log(res.data); }).catch(err => console.log(err));

	}



	render() {
		return (
			<div>

			</div>
		);
	}
}
 
export default Home;
