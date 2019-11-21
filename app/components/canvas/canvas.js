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
		this.attachListeners();
	}

	init(props) {
		const canvas = document.createElement('canvas');
		canvas.id = props.id;
		document.getElementById('app').appendChild(canvas);
	}

	create(props) {
		this.canvas = new fabric.Canvas(props.id, {
			containerClass: this.className
		});
		if (props.dimension) {
			this.canvas.setHeight(props.dimension + 1);
			this.canvas.setWidth(props.dimension + 1);
		}
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
}

export default Canvas;
