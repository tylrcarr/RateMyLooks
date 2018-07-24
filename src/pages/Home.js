import React, { Component } from "react";

import axios from "axios";

import UserCarousel from "../components/UserCarousel.js";

import css from  "./css/Home.css";
let items = [
]
 
class Home extends Component {

	constructor (props) {
		super(props);
		this.state = { bodyRating: 5, faceRating: 5, ratee: null}; 
		this.getNext();
		this.goToSettings = this.goToSettings.bind(this);
	}


	updateAttr (e, type){
		let newState = {};
		newState[type] = e.target.value;
		this.setState(newState);
	} 
	getNext() {
		/*
		axios.get("/users/next").then(res => {
		*/
			console.log(this.carousel);
			console.log("Here");
			const res = {
				data: "od8v6gr7ljdqj4wfma"
			}
			axios.get(`/users/${res.data}/photos`).then(images => {
				for (let i = 0; i < images.data.length; i++) {
					this.carousel.addImage(false, `/images/${images.data[i]}`);
				}
				this.setState({ratee: res.data});
			}).catch(err => console.log(err));
		//}).catch(err => console.log(err));

	}

	goToSettings() {
		this.props.history.push("/settings");
	}

	sendRating() {
		axios.post("/ratings", {
			ratee: this.state.ratee, 
			bodyRating: this.state.bodyRating, 
			faceRating: this.state.faceRating
		}).then(res =>{
			console.log(res);
		});
	}

	render() {

		return (
			<div className="container">
				<input type="button" onClick={this.goToSettings} value="settings" />
				<div id="carousel">
					<UserCarousel onRef={ref => (this.carousel = ref)} />
				</div>
				<div className="slideContainer">
					<input type="range" min="0" max="10" value={this.state.bodyRating} onChange={e => this.updateAttr(e, 'bodyRating')} className="slider" />
					<div className="sliderText">Body</div>

				</div>
				<div className="slideContainer">
					<input type="range" min="0" max="10" value={this.state.faceRating} onChange={e => this.updateAttr(e, 'faceRating')} className="slider" />
					<div className="sliderText">Face</div>
				</div>
				<div className='submit-btn' onClick={this.sendRating}>SUBMIT</div>
			</div>

		);
	}
}
 
export default Home;
