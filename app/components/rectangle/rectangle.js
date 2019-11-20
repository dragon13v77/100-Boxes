/**
 * Rectangle component
 */
class Rectangle {

    constructor (props) {
        this.rect = null;
        this.dimension = props.dimension || 50;
        this.column = props.column;
        this.row = props.row;
        this.clicked = props.clicked;
        this.create(props);
        this.attachListeners();
    }

    create(props) {
        const left = (this.column % this.dimension) * this.dimension;
        const top = this.row * this.dimension;
        this.rect = new fabric.Rect({
            id: this.column + '_' + this.row,
            left: left,
            top: top,
            fill: props.fill || 'white',
            width: this.dimension,
            height: this.dimension,
            stroke: 'gray',
            strokeWidth: props.strokeWidth || 1,
            lockMovementX: true,
            lockMovementY: true,
            selection : false,
            hasBorders: false,
            hasControls: false
        });
    }

    attachListeners() {
        this.rect.on('selected', () => this.clicked(this));
    }

    get() {
        return this.rect;
    }
}

export default Rectangle;