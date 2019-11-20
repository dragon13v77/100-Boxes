import Canvas from '../../components/canvas/canvas.js';
import Rectangle from '../../components/rectangle/rectangle.js';

class Game {

    constructor(props) {
        this.rectangles = null;
        this.rectDimension = props.rectDimension || null;
        this.rectStrokeWidth = props.rectStrokeWidth || null;
        this.width = props && props.width && props.width || 10;
        this.height = props && props.height && props.height || 10;

        // init canvas
        this.initCanvas(props);
        this.initRectangles();
        this.createRectangles();
    }

    initCanvas(props) {
        this.layout = new Canvas({
            id: props.id,
            dimension: props.rectDimension * this.width + this.rectStrokeWidth
        });
    }

    initRectangles() {
        this.rectangles = new Array(this.width);
        for (let i = 0; i < this.width; i++) {
            this.rectangles[i] = new Array(this.height);
        }
    }

    createRectangles() {
        for(let i = 0; i < this.width; i++) {
            for(let j = 0; j < this.height; j++) {
                const rect = this.getRectangle(i, j);
                this.rectangles[i][j] = rect;

                this.layout.add(rect.get());
                //console.log(this.rectangles[i][j]);
            }
        }
    }

    getRectangle(column, row) {
        return new Rectangle({
            column: column,
            row: row,
            dimension: this.rectDimension,
            strokeWidth: this.rectStrokeWidth,
            clicked: this.rectangleClicked
        });
    }

    rectangleClicked(rect) {
        console.log('RECTANGLE CLICKED CALLBACK');
        console.log(rect);
    }
}

export default Game;