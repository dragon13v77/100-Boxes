/**
 * Rectangle component
 */
class Rectangle {

    constructor (props) {
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
            id: this.column + '_' + this.row,
            left: left,
            top: top,
            fill: Rectangle.COLORS.REGULAR,
            width: this.dimension,
            height: this.dimension,
            stroke: Rectangle.COLORS.BORDER,
            strokeWidth: props.strokeWidth || 1,
            lockMovementX: true,
            lockMovementY: true,
            selection : false,
            hasBorders: false,
            hasControls: false
        });
    }

    get() {
        return this.rect;
    }

    attachSelectedListener() {
        this.rect.on('selected', () => this.clicked(this));
    }

    deattachSelectedListener() {
        this.rect.off('selected', () => this.clicked(this));
    }

    attachMouseOverListener() {
        this.rect.on('mouseover', () => this.mouseOver(this));
    }

    deatachMouseOverListener() {
        // not working need to check why
        //this.rect.off('mouseover', () => this.mouseOver(this));
        this.rect.__eventListeners['mouseover'] = [];
    }

    attachMouseOutListener() {
        this.rect.on('mouseout', () => this.mouseOut(this));
    }

    deatachMouseOutListener() {
        // not working need to check why
        //this.rect.off('mouseout', () => this.mouseOut(this));
        this.rect.__eventListeners['mouseout'] = [];
    }

    setIsPermanent(isPermanent) {
        this.isPermanent = isPermanent;
        this.rect.set('fill', Rectangle.COLORS.PERMANENT);
        this.deattachSelectedListener();
    }

    setIsTemporary(isTemporary) {
        this.isTemporary = isTemporary;
        this.rect.set('fill', isTemporary ? Rectangle.COLORS.TEMPORARY : Rectangle.COLORS.REGULAR);

        if (isTemporary) {
            this.attachMouseOverListener();
            this.attachMouseOutListener();
        }
        else {
            this.deatachMouseOverListener();
            this.deatachMouseOutListener();
        }
    }
}

Rectangle.COLORS = {
    BORDER: 'gray',
    REGULAR: 'white',
    PERMANENT: 'rgb(144, 140, 255)',
    TEMPORARY: 'rgb(195, 186, 255)',
    HOVER: 'rgb(195, 186, 0)'
}

export default Rectangle;