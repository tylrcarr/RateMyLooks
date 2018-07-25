import React, { Component } from "react";

let items = {
	faceItems: [],
	bodyItems: []
}

let initStyles = { 
	"face-img" : {
		maxWidth: "100%",
		maxHeight: "100%",
		height: "auto",
		width: "auto"
	},
	"body-img" : {
		maxWidth: "100%",
		maxHeight: "100%",
		height: "auto",
		width: "auto"
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
		height: "100%",
		width: "100%"
	},
	"img-container" : {
		height: "50%",
		display: "flex",
		justifyContent: "space-evenly",
		width: "100%"
	}
}

class UserCarousel extends Component {

	constructor (props) {
		super(props);
		this.state = { activeImage: null, bodyCount: null, faceCount: null, styles: initStyles}; 
		this.closeImage = this.closeImage.bind(this);
		this.openImage.bind(this);
	}
	componentDidMount() {
		this.props.onRef(this)
	}

	componentWillUnmount() {
		this.props.onRef(undefined)
	}

	addImage (isBody, img) {
		items[isBody ? 'bodyItems' : 'faceItems'].push({src: img});
		//console.log(newState);
		this.setState(this.state);
		//this.setState(newState);
	}

	openImage (e) {
		/*
		this.refs.openImage.src = e.target.src;
		this.refs.openImage.style = "height: auto; width: auto; max-height: 100%; max-width: 100%;";
		*/
		this.refs.openDiv.style = `display: block; position: fixed; top: 0; right: 0; width: 100%; height: 100%; z-index: 9999; text-align: center; background-color:black; background-image: url(${e.target.src}); background-size: contain; background-position: center; background-repeat: no-repeat;`
	}

	closeImage () {
		this.refs.openImage.src = ""; 
		this.refs.openImage.style = "";
		this.refs.openDiv.style = "display: none;"
	}

	render() {
		//const { activeImage } = this.state.activeImage;
		const faceSlides = items.faceItems.map((item) => {
			return (
				<div className="img-container" style={{textAlign: "center"}} key={item.src}>
					<img className="face-img" isopened="false" style={this.state.styles["face-img"]} src={item.src} key={item.src} onClick={e => this.openImage(e)} />
				</div>
			);
		});
		const bodySlides = items.bodyItems.map((item) => {
			return (
				<div className="img-container" key={item.src}>
					<img className="body-img" style={this.state.styles["body-img"]} src={item.src} key={item.src} onClick={e => this.openImage(e)} />
				</div>
			);
		});

		return (
			<div className="image-holder" style={this.state.styles["image-collection"]}>
				<div className="open-div" style={{display: "none"}} ref="openDiv" onClick={this.closeImage}>
					<img ref="openImage"  onClick={this.closeImage}/>
				</div>
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
