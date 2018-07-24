import React from 'react'

import Dropzone from "react-dropzone";

import AvatarEditor from 'react-avatar-editor'



class ImageEditor extends React.Component {
	constructor (props) {
		super (props);
		this.state = {image: "", form: ""};
		this.checkForImage = this.checkForImage.bind(this);
		this.getImage = this.getImage.bind(this);
	}

	componentDidMount() {
		this.props.onRef(this)
	}

	componentWillUnmount() {
		this.props.onRef(undefined)
	}

	handleDrop (dropped) {
		const form = new FormData();
		form.append("file", dropped[0]);
		this.setState({image: dropped, form: form});
	}

	getImage () {
		var img = new Image();
		img.src = this.editor.getImage().toDataURL("image/png");
		return img;
	}

	checkForImage () {
		if (this.state.image !== "") {
			return (<AvatarEditor ref={ref => (this.editor = ref)} width={240} height={320} image={this.state.image[0].preview} />);
		} else {
			return;
		}
	}

	render() {
		return (<div>
				<Dropzone onDrop={dropped => this.handleDrop(dropped)} style={{ width: '240px', height: '320px' }} >
					{this.checkForImage}
				</Dropzone>
			</div>
		)
	}
}

export default ImageEditor;
