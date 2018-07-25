import React from 'react'

import Dropzone from "react-dropzone";

import AvatarEditor from 'react-avatar-editor'

import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

class ImageEditor extends React.Component {
	constructor (props) {
		super (props);
		this.state = {image: "", form: ""};
		this.checkForImage = this.checkForImage.bind(this);
		this.getImage = this.getImage.bind(this);
		this.getForm = this.getForm.bind(this);
		this.handleDrop = this.handleDrop.bind(this);
	}

	componentDidMount() {
		this.props.onRef(this)
	}

	componentWillUnmount() {
		this.props.onRef(undefined)
	}

	getForm() {
		const form = new FormData();
			form.append("file", this.editor.getCroppedCanvas().toDataURL());
		return form;
	}

	handleDrop (dropped) {
		this.setState({image: dropped});
	}

	getImage () {
		var img = new Image();
		img.src = this.editor.getCroppedCanvas().toDataURL("image/png");
		return img;
	}
	_crop(){
		console.log("here");

	}

	checkForImage () {
		if (this.state.image !== "") {
			//return (<AvatarEditor ref={ref => (this.editor = ref)} width={240} height={320} image={this.state.image[0].preview} />);
			return (<Cropper ref={ref => (this.editor = ref)} aspectRatio={.75} style={{ height: "50vh", width: "100vw" }} src={this.state.image[0].preview} crop={this._crop.bind(this)} />);
		} else {
			return;
			//return (<Dropzone onDrop={dropped => this.handleDrop(dropped)} style={{ width: '240px', height: '320px' }} > </Dropzone>);
		}
	}

	render() {
		return (<div className="image-editor">
				<Dropzone onDrop={dropped => this.handleDrop(dropped)} style={{ width: '100vw', height: '50vh' }} > 
					{this.checkForImage}
				</Dropzone>
			</div>
		)
	}
}

export default ImageEditor;
