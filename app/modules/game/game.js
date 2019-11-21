import Canvas from '../../components/canvas/canvas.js';
import Rectangle from '../../components/rectangle/rectangle.js';

class Game {
	constructor(props) {
		this.state = {
			history: [],
			permanent: [],
			temporary: [],
		};
		this.rectangles = null;
		this.rectDimension = props.rectDimension || null;
		this.rectStrokeWidth = props.rectStrokeWidth || null;
		this.width = props && props.width && props.width || 10;
		this.height = props && props.height && props.height || 10;

		// init canvas
		this.initCanvas(props);
		this.initRectangles();
		this.createRectangles(props);
	}

	initCanvas(props) {
		this.layout = new Canvas({
			id: props.id,
			dimension: props.rectDimension * this.width + this.rectStrokeWidth,
		});
	}

	initRectangles() {
		this.rectangles = new Array(this.width);
		for (let i = 0; i < this.width; i++) {
			this.rectangles[i] = new Array(this.height);
		}
	}

	createRectangles(props) {
		for (let i = 0; i < this.width; i++) {
			for (let j = 0; j < this.height; j++) {
				const rect = this.getRectangle({
					...props,
					column: i,
					row: j,
				});
				this.rectangles[i][j] = rect;
				this.layout.add(rect.get());
				// console.log(this.rectangles[i][j]);
			}
		}
	}

	getRectangle(props) {
		return new Rectangle({
			column: props.column,
			row: props.row,
			dimension: this.rectDimension,
			strokeWidth: this.rectStrokeWidth,
			clicked: this.rectangleClickedHandler,
			mouseOver: this.rectangleMouseOverHandler,
			mouseOut: this.rectangleMouseOutHandler,
		});
	}

    rectangleClickedHandler = (rect) => {
    	console.log(`RECTANGLE CLICK HANDLER ${rect.rect.id}`);
    	if (rect.isTemporary) {
    		this.resetTemporaryRectangles();
    		this.setPermanentRectangle(rect);
    		this.setTemporaryRectangles(rect);
    	}
    }

    setPermanentRectangle = (rect) => {
    	this.state.permanent.push(rect);
    	rect.setIsPermanent(true);
    }

    setTemporaryRectangles = (rect) => {
    	for (const key in Game.CAT_PATTERN) {
    		const patternItem = Game.CAT_PATTERN[key];
    		const temporaryColumn = rect.column - patternItem.column;
    		const temporaryRow = rect.row - patternItem.row;
    		if (temporaryColumn >= 0 && temporaryColumn < this.width && temporaryRow >= 0 && temporaryRow < this.height) {
    			const tempRectangle = this.rectangles[temporaryColumn][temporaryRow];
    			// do not make temporary of permanent rectangle
    			if (!tempRectangle.isPermanent) {
    				tempRectangle.setIsTemporary(true);
    				this.state.temporary.push(tempRectangle);
    			}
    		}
    		// console.log('TEMP ITEM => Column: ' + temporaryColumn + ' | Row: ' + temporaryRow);
    	}
    	this.checkScore();
    }

    resetTemporaryRectangles = () => {
    	this.state.temporary = [];
    	this.rectangles.map((column) => {
    		column.map((rectangle) => {
    			if (!rectangle.isPermanent) {
    				rectangle.setIsTemporary(false);
    			}
    		});
    	});
    }

    rectangleMouseOverHandler = (rect) => {
    	rect.get().set('fill', Rectangle.COLORS.HOVER);
    	rect.get().canvas.renderAll();
    	// console.log('RECTANGLE MOUSE OVER');
    }

    rectangleMouseOutHandler = (rect) => {
    	rect.get().set('fill', Rectangle.COLORS.TEMPORARY);
    	rect.get().canvas.renderAll();
    	// console.log('RECTANGLE MOUSE OUT');
    }

    checkScore() {
    	if (this.state.temporary.length === 0) {
    		alert('Mjau mrnjau :(');
    	}
    	if (this.state.permanent === this.width * this.height) {
    		alert('Mjau mrnjau :)');
    	}
    }
}

Game.CAT_PATTERN = {
	stage_1: { column: 0, row: 3 },
	stage_2: { column: 2, row: 2 },
	stage_3: { column: 3, row: 0 },
	stage_4: { column: 2, row: -2 },
	stage_5: { column: 0, row: -3 },
	stage_6: { column: -2, row: -2 },
	stage_7: { column: -3, row: 0 },
	stage_8: { column: -2, row: 2 },
};

export default Game;
