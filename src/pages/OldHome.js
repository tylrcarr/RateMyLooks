import React, { Component } from "react";

import axios from "axios";

import {
	  Carousel,
	  CarouselItem,
	  CarouselControl,
	  CarouselIndicators,
	  CarouselCaption
} from 'reactstrap';
Carousel.interval = false;

import css from  "./css/Home.css";
let items = [
]
 
class Home extends Component {

	constructor (props) {
		super(props);
		this.getNext();
		this.state = { activeIndex: 0, bodyRating: 5, faceRating: 5, ratee: null}; 
		this.next = this.next.bind(this);
		this.sendRating = this.sendRating.bind(this);
		this.previous = this.previous.bind(this);
		this.goToIndex = this.goToIndex.bind(this);
		this.onExiting = this.onExiting.bind(this);
		this.onExited = this.onExited.bind(this);
	}


	onExiting() {
		this.animating = true;
	}

	onExited() {
		this.animating = false;
	}

	next() {
		if (this.animating) return;
		const nextIndex = this.state.activeIndex === items.length - 1 ? 0 : this.state.activeIndex + 1;
		this.setState({ activeIndex: nextIndex });
	}

	previous() {
		if (this.animating) return;
		const nextIndex = this.state.activeIndex === 0 ? items.length - 1 : this.state.activeIndex - 1;
		this.setState({ activeIndex: nextIndex });
	}

	goToIndex(newIndex) {
		if (this.animating) return;
		this.setState({ activeIndex: newIndex });
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
			const res = {
				data: "od8v6gr7ljdqj4wfma"
			}
			axios.get(`/users/${res.data}/photos`).then(images => {
				for (let i = 0; i < images.data.length; i++) {
					items.push({src: `/images/${images.data[i]}`});
				}
				this.setState({ratee: res.data});
			}).catch(err => console.log(err));
		//}).catch(err => console.log(err));

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
		const { activeIndex } = this.state;
		const slides = items.map((item) => {
			return (
				<CarouselItem onExiting={this.onExiting} onExited={this.onExited} key={item.src} >
					<img className='profile-img' src={item.src}  />
				</CarouselItem>
			);
		});

		return (
			<div className="container">
				<div id="carousel">
					<Carousel interval={false} activeIndex={activeIndex} next={this.next} previous={this.previous} >
						<CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
						{slides}
						<CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
						<CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
					</Carousel>
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
