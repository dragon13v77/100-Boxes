/**
 * Canvas component
 */
class Canvas {
    constructor(props) {
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
        this.canvas = new fabric.Canvas(props.id);
        if (props.dimension) {
            this.canvas.setHeight(props.dimension + 1);
            this.canvas.setWidth(props.dimension + 1);
        }
    }

    attachListeners() {}

    add(obj) {
        this.canvas.add(obj);
    }
}

export default Canvas;