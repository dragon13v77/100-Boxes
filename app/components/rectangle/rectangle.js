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
		const left = (this.column % this.dimension) * this.dimension;
		const top = this.row * this.dimension;
		this.rect = new fabric.Rect({
			id: `${this.column}_${this.row}`,
			left,
			top,
			fill: Rectangle.COLORS.REGULAR,
			width: this.dimension,
			height: this.dimension,
			stroke: Rectangle.COLORS.BORDER,
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
		this.fillRectangle(Rectangle.COLORS.PERMANENT);
		this.deleteImage();
		this.setImage();
	}

	setIsTemporary(isTemporary) {
		this.isTemporary = isTemporary;
		this.fillRectangle(isTemporary ? Rectangle.COLORS.TEMPORARY : Rectangle.COLORS.REGULAR);
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

	fillRectangle(color = Rectangle.COLORS.DEFAULT) {
		this.rect.set('fill', color);
	}

	setImage() {
		const width = this.dimension / Rectangle.IMAGE_SCALE_FACTOR;
		const left = this.column * this.dimension + ((this.dimension - width) / 2);
		const top = this.row * this.dimension + ((this.dimension - width) / 2);
		(function (context) {
			fabric.loadSVGFromURL(Rectangle.IMAGE_PATH, (objects, options) => {
				const obj = fabric.util.groupSVGElements(objects, options);
				obj.left = left;
				obj.top = top;
				obj.scaleToWidth(width);
				obj.scaleToHeight(width);
				obj.lockMovementX = true;
				obj.lockMovementY = true;
				obj.selection = false;
				obj.hasBorders = false;
				obj.hasControls = false;
				obj.hoverCursor = 'default';

				context.get().canvas.add(obj);
				context.get().canvas.setActiveObject(obj, () => {

				});
			});
		}(this));
	}

	deleteImage() {
		this.get().canvas._objects.forEach((element) => {
			if (element.type === 'path') {
				this.get().canvas.remove(element);
				this.get().canvas.renderAll();
			}
		});
	}
}

Rectangle.IMAGE_PATH = '../app/assets/svg/paw.svg';
Rectangle.IMAGE_SCALE_FACTOR = 2.5;
Rectangle.COLORS = {
	BORDER: 'gray',
	REGULAR: 'white',
	PERMANENT: 'rgb(144, 140, 255)',
	TEMPORARY: 'rgb(195, 186, 255)',
	HOVER: 'rgb(195, 186, 0)',
};

export default Rectangle;
