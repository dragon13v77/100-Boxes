import {COLORS} from "../../constants/constants.js";
/**
 * Rectangle component
 */
class Rectangle {
	constructor(props) {
		// todo: some of this props need to be private
		// switch to revealing module pattern and make it local
		this.rect = null;
		this.dimension = props.dimension || 50;
		this.column = props.column;
		this.row = props.row;
		this.clicked = props.clicked;
		this.mouseOver = props.mouseOver;
		this.mouseOut = props.mouseOut;
		this.isPermanent = false;
		this.isTemporary = true;
		this.create(props);
		this.attachSelectedListener();
	}

	create(props) {
		const left = this.column * this.dimension;
		const top = this.row * this.dimension;
		this.rect = new fabric.Rect({
			id: `${this.column}_${this.row}`,
			left,
			top,
			fill: COLORS.REGULAR,
			width: this.dimension,
			height: this.dimension,
			stroke: COLORS.BORDER,
			strokeWidth: props.strokeWidth || 1,
			lockMovementX: true,
			lockMovementY: true,
			selection: false,
			hasBorders: false,
			hasControls: false,
			hoverCursor: 'default',
		});
	}

	get() {
		return this.rect;
	}

	attachSelectedListener() {
		this.rect.on('selected', () => this.clicked(this));
	}

	deattachSelectedListener() {
		// this.rect.off('selected', () => this.clicked(this));
		this.rect.__eventListeners.selected = [];
	}

	attachMouseOverListener() {
		this.rect.on('mouseover', () => this.mouseOver(this));
	}

	deatachMouseOverListener() {
		// todo: not working need to check why
		// this.rect.off('mouseover', () => this.mouseOver(this));
		this.rect.__eventListeners.mouseover = [];
	}

	attachMouseOutListener() {
		this.rect.on('mouseout', () => this.mouseOut(this));
	}

	deatachMouseOutListener() {
		// todo: not working need to check why
		// this.rect.off('mouseout', () => this.mouseOut(this));
		this.rect.__eventListeners.mouseout = [];
	}

	setIsPermanent(isPermanent) {
		this.isPermanent = isPermanent;
		this.deattachSelectedListener();
		this.fillRectangle(COLORS.PERMANENT);
	}

	setIsTemporary(isTemporary) {
		this.isTemporary = isTemporary;
		this.fillRectangle(isTemporary ? COLORS.TEMPORARY : COLORS.REGULAR);
		if (isTemporary) {
			this.attachMouseOverListener();
			this.attachMouseOutListener();
			this.rect.hoverCursor = 'pointer';
		} else {
			this.rect.hoverCursor = 'default';
			this.deatachMouseOverListener();
			this.deatachMouseOutListener();
		}
	}

	fillRectangle(color = COLORS.DEFAULT) {
		this.rect.set('fill', color);
	}
}

export default Rectangle;
