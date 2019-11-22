import Image from '../image/image.js';

/**
 * Canvas component
 */
class Canvas {
	constructor(props) {
		this.id = props.id;
		this.className = 'my_canvas';
		this.canvas = null;
		this.init(props);
		this.create(props);
		this.createImage(props);
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

	add(obj) {
		this.canvas.add(obj);
	}

	insertAt(obj, index) {
		this.canvas.insertAt(obj, index, false);
	}

	createImage(props) {
		this.image = new Image(props);
		this.canvas.insertAt(this.image.imageObject, 0);
	}
}

export default Canvas;
