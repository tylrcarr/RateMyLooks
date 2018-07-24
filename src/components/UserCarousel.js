import React, { Component } from "react";

let items = {
	faceItems: [],
	bodyItems: []
}

let initStyles = { 
	"face-img" : {
		height: "auto",
		width: "auto"
	},
	"body-img" : {
		height: "auto",
		width: "auto"
	},
	//"opened-img" : "width: 100%; height: auto; max-height: 50vh; transition: width 600ms ease-out, height 600ms ease-out;",
	"opened-img" : {
		width: "100%", 
		height: "auto", 
		maxHeight: "50vh", 
		transition: "width 600ms ease-out, height 600ms ease-out"
	},
	"face-default": {
		height: "auto",
		width: "auto"
	},
	"body-default": {
		height: "auto",
		width: "auto"
	},
	"image-collection" : {
		height: "50vh",
		width: "100%"
	},
	"img-container" : {
		height: "50%",
		width: "100%"
		
	}
}

class UserCarousel extends Component {

	constructor (props) {
		super(props);
		this.state = { activeImage: null, bodyCount: null, faceCount: null, styles: initStyles}; 
		this.toggleImage.bind(this);
	}
	componentDidMount() {
		this.props.onRef(this)
	}

	componentWillUnmount() {
		this.props.onRef(undefined)
	}

	addImage (isBody, img) {
		let newState = this.state;
		const attrName = `${isBody ? 'body' : 'face'}Count`;
		newState[attrName] = (this.state[attrName] !== null ? this.state[attrName] + 1 : 1);

		// a bunch of magic to circumvent a memory pointer and make the specific "width" not readonly
		let temp = {
			height: newState.styles[`${isBody ? 'body' : 'face'}-default`].height
		}
		temp.width = `${100/newState[attrName]}%`;
		
		newState.styles[`${isBody ? 'body' : 'face'}-default`] = temp;
		newState.styles[`${isBody ? 'body' : 'face'}-img`] = newState.styles[`${isBody ? 'body' : 'face'}-default`];
		items[isBody ? 'bodyItems' : 'faceItems'].push({src: img});
		console.log(newState);
		this.setState(newState);
	}

	toggleImage (e) {
		//e.target
		let isOpened = (e.target.getAttribute("isopened") !== "false");
		if (isOpened) {
			this.setState(this.state);
		} else {
			e.target.setAttribute("isopened", "true");
			e.target.style = this.state.styles["opened-img"];
		}
	}

	render() {
		//const { activeImage } = this.state.activeImage;
		const faceSlides = items.faceItems.map((item) => {
			return (
				<img className="face-img" isopened="false" style={this.state.styles["face-img"]} src={item.src} key={item.src} onClick={e => this.toggleImage(e, this)} />
			);
		});
		const bodySlides = items.bodyItems.map((item) => {
			return (
				<img className="body-img" isopened="false" style={this.state.styles["body-img"]} src={item.src} key={item.src} onClick={e => this.toggleImage(e, this)} />
			);
		});

		return (
			<div className="image-holder" style={this.state.styles["image-collection"]}>
				<div className="face-div" style={this.state.styles["img-container"]}>
					{faceSlides}
				</div>
				<div className="body-div" style={this.state.styles["img-container"]}>
					{bodySlides}
				</div>
			</div>

		);
	}
}
 
export default UserCarousel;
