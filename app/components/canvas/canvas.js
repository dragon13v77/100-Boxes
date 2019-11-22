/**
 * Canvas component
 */
class Canvas {
	constructor(props) {
		this.id = props.id;
		this.className = 'my_canvas';
		this.canvas = null;
		this.image = null;
		this.init(props);
		this.create(props);
		this.createImage(props);
		this.attachListeners();
	}

	init(props) {
		const canvas = document.createElement('canvas');
		canvas.id = props.id;
		document.getElementById('app').appendChild(canvas);
	}

	create(props) {
		this.canvas = new fabric.Canvas(props.id, {
			containerClass: this.className,
		});
		this.canvas.setHeight(props.height + 1);
		this.canvas.setWidth(props.width + 1);
	}

	destroy() {
		const el = document.getElementsByClassName(this.className);
		if (el) {
			el[0].remove();
		}

		if (this.canvas) {
			this.canvas.dispose();
		}
	}

	attachListeners() {}

	add(obj) {
		this.canvas.add(obj);
	}

	createImage(props) {
		const width = props.rectDimension / Canvas.IMAGE_SCALE_FACTOR;
		const left = 100;
		const top = 100;
		this.image = new fabric.Path(Canvas.IMAGE);
		this.image.set({
			left: left,
			top: top
		});
		this.image.scaleToWidth(width);
		this.image.scaleToHeight(width);
		this.image.selection = false;
		this.image.hasBorders = false;
		this.image.hasControls = false;
		this.image.hoverCursor = 'default';
		this.canvas.add(this.image);
		this.canvas.setActiveObject(this.image, () => {});
		this.toggleImageVisibillity(false);
	}

	toggleImageVisibillity(isVisible) {
		this.image.opacity = isVisible ? 1 : 0;
	}

	setImagePosition(rect) {
		const width = rect.dimension / Canvas.IMAGE_SCALE_FACTOR;
		const left = rect.column * rect.dimension + ((rect.dimension - width) / 2);
		const top = rect.row * rect.dimension + ((rect.dimension - width) / 2);

		this.toggleImageVisibillity(true);
		this.image.set({
			left: left,
			top: top
		});
		this.canvas.setActiveObject(this.image, () => {});
	}
}

Canvas.IMAGE_SCALE_FACTOR = 2.5;
Canvas.IMAGE = "M256 224c-79.41 0-192 122.76-192 200.25 0 34.9 26.81 55.75 71.74 55.75 48.84 0 81.09-25.08 120.26-25.08 39.51 0 71.85 25.08 120.26 25.08 44.93 0 71.74-20.85 71.74-55.75C448 346.76 335.41 224 256 224zm-147.28-12.61c-10.4-34.65-42.44-57.09-71.56-50.13-29.12 6.96-44.29 40.69-33.89 75.34 10.4 34.65 42.44 57.09 71.56 50.13 29.12-6.96 44.29-40.69 33.89-75.34zm84.72-20.78c30.94-8.14 46.42-49.94 34.58-93.36s-46.52-72.01-77.46-63.87-46.42 49.94-34.58 93.36c11.84 43.42 46.53 72.02 77.46 63.87zm281.39-29.34c-29.12-6.96-61.15 15.48-71.56 50.13-10.4 34.65 4.77 68.38 33.89 75.34 29.12 6.96 61.15-15.48 71.56-50.13 10.4-34.65-4.77-68.38-33.89-75.34zm-156.27 29.34c30.94 8.14 65.62-20.45 77.46-63.87 11.84-43.42-3.64-85.21-34.58-93.36s-65.62 20.45-77.46 63.87c-11.84 43.42 3.64 85.22 34.58 93.36z";

export default Canvas;
