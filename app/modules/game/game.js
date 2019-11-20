import Canvas from '../../components/canvas/canvas.js';
import Rectangle from '../../components/rectangle/rectangle.js';

class Game {

    constructor(props) {
        this.state = {
            history: [],
            permanent: [],
            temporary: []
        };
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
            clicked: this.rectangleClickedHandler,
            mouseOver: this.rectangleMouseOverHandler,
            mouseOut: this.rectangleMouseOutHandler
        });
    }

    rectangleClickedHandler = (rect) =>  {
        console.log('RECTANGLE CLICKED HANDLER');
        console.log(rect);
        this.setState(rect);
        this.setPermanentRectangle(rect);
        this.setTemporaryRectangles(rect);
    }

    setPermanentRectangle = (rect) => {
        this.state.permanent.push(rect);
        rect.setIsPermanent(true);
    }

    setTemporaryRectangles = (rect) => {
        for (let key in Game.CAT_PATTERN) {
            const patternItem = Game.CAT_PATTERN[key];
            const temporaryColumn = rect.column - patternItem.column;
            const temporaryRow = rect.row - patternItem.row;
            if (temporaryColumn >=0 && temporaryColumn < this.width && temporaryRow >= 0 && temporaryRow < this.height) {
                const tempRectangle = this.rectangles[temporaryColumn][temporaryRow];
                tempRectangle.setIsTemporary(true);
            }
            //console.log('TEMP ITEM => Column: ' + temporaryColumn + ' | Row: ' + temporaryRow);
        }
    }

    rectangleMouseOverHandler = (rect) => {
        rect.get().set('fill', Rectangle.COLORS.HOVER);
        rect.get().canvas.renderAll();
        //console.log('RECTANGLE MOUSE OVER');
    }

    rectangleMouseOutHandler = (rect) => {
        rect.get().set('fill', Rectangle.COLORS.TEMPORARY);
        rect.get().canvas.renderAll();
        //console.log('RECTANGLE MOUSE OUT');
    }

    setState = (rect) => {

    }
}

Game.CAT_PATTERN = {
    stage_1: {column: 0, row: 3},
    stage_2: {column: 2, row: 2},
    stage_3: {column: 3, row: 0},
    stage_4: {column: 2, row: -2},
    stage_5: {column: 0, row: -3},
    stage_6: {column: -2, row: -2},
    stage_7: {column: -3, row: 0},
    stage_8: {column: -2, row: 2}
}

export default Game;