import React, { Component } from "react";

import {
	  Carousel,
	  CarouselItem,
	  CarouselControl,
	  CarouselIndicators,
	  CarouselCaption
} from 'reactstrap';
Carousel.interval = false;

let items = [
]
 
class UserCarousel extends Component {

	constructor (props) {
		super(props);
		this.state = { activeIndex: 0}; 
		this.next = this.next.bind(this);
		this.previous = this.previous.bind(this);
		this.goToIndex = this.goToIndex.bind(this);
		this.onExiting = this.onExiting.bind(this);
		this.onExited = this.onExited.bind(this);
	}
	componentDidMount() {
		this.props.onRef(this)
	}
	componentWillUnmount() {
		this.props.onRef(undefined)
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

	addItem (item) {
		items.push(item);
	}

	updateAttr (e, type){
		let newState = {};
		newState[type] = e.target.value;
		this.setState(newState);
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
			<Carousel interval={false} activeIndex={activeIndex} next={this.next} previous={this.previous} >
				<CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
				{slides}
				<CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
				<CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
			</Carousel>

		);
	}
}
 
export default UserCarousel;
