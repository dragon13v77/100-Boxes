import {PAW_PATH} from "../../constants/constants.js";

/**
 * Image component
 */
class Image {
	constructor (props) {
		this.containerWidth = props.rectDimension || 0;
		this.width = this.containerWidth / Image.SCALE_FACTOR;
		this.left = props.left || 0;
		this.top = props.top || 0;
		this.imageObject = new fabric.Path(PAW_PATH);
		this.imageObject.set({
			left: this.left,
			top: this.top
		});
		this.imageObject.scaleToWidth(this.width);
		this.imageObject.scaleToHeight(this.width);
		this.imageObject.selection = false;
		this.imageObject.hasBorders = false;
		this.imageObject.hasControls = false;
		this.imageObject.hoverCursor = 'default';
		this.toggleImageVisibillity(false);
		this.attachListeners();
	}

	toggleImageVisibillity(isVisible) {
		this.imageObject.opacity = isVisible ? 1 : 0;
	}

	setImagePosition(props) {
		const left = props.column * this.containerWidth + ((this.containerWidth - this.width) / 2);
		const top = props.row * this.containerWidth + ((this.containerWidth - this.width) / 2);

		this.toggleImageVisibillity(true);
		this.imageObject.set({
			left: left,
			top: top
		});
	}

	attachListeners() {}
}

Image.SCALE_FACTOR = 2.5;

export default Image;