import React, { Component } from "react";

import axios from "axios";

import ImageEditor from "../components/ImageEditor";

import css from "./css/Settings.css";

import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

class Settings extends Component {

	constructor (props) {
		super(props);
		//this.createImageCropper.bind(this);
		this.sendImage = this.sendImage.bind(this);
	}

	sendImage () {
		if (this.editor.state.image !== "") {
			/*
			const form = new FormData();
			form.append("file", this.editor.state.image[0].name);
			form.append("cropping", );
			*/
			axios.post("/users/photos", this.editor.getForm()).then(res => {console.log(res)}).catch(err => {console.log(err)});
		}
	}
	

	render() {

		return (
			<div>
				<ImageEditor onRef={ref => (this.editor = ref)} />
				<input type="button" value="submit" onClick={this.sendImage} />
			</div>

		);
	}
}
 
export default Settings;
