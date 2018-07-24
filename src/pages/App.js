
import React, {PropTypes} from 'react'
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

