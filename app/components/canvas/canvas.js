import Image from '../image/image.js';
import { APP_INJECTION_ID, CANVAS_CLASS_NAME, CANVAS_ELEMENT_TAG } from '../../constants/constants.js';

/**
 * Canvas component
 */
class Canvas {
	constructor(props) {
		this.id = props.id;
		this.className = CANVAS_CLASS_NAME;
		this.canvas = null;
		this.init(props);
		this.create(props);
		this.createImage(props);
	}

	init(props) {
		const canvas = document.createElement(CANVAS_ELEMENT_TAG);
		canvas.id = props.id;
		document.getElementById(APP_INJECTION_ID).appendChild(canvas);
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
