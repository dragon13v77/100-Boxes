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
        this.mouseOver = props.mouseOver;
        this.mouseOut = props.mouseOut;
        this.isPermanent = false;
        this.isTemporary = false;
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
        this.rect.off('mouseover', () => this.mouseOver(this));
    }

    attachMouseOutListener() {
        this.rect.on('mouseout', () => this.mouseOut(this));
    }

    deatachMouseOutListener() {
        this.rect.off('mouseout', () => this.mouseOut(this));
    }

    setIsPermanent(isPermanent) {
        this.isPermanent = isPermanent;
        this.rect.set('fill', Rectangle.COLORS.PERMANENT);
        this.deattachSelectedListener();
    }

    setIsTemporary(isTemporary) {
        this.isTemporary = isTemporary;
        this.rect.set('fill', Rectangle.COLORS.TEMPORARY);
        if (isTemporary) {
            this.attachMouseOverListener();
            this.attachMouseOutListener();

        }
        else {
            this.deattachMouseOverListener();
            this.deatachMouseOutListener();
        }

    }
}

Rectangle.COLORS = {
    PERMANENT: 'rgb(144, 140, 255)',
    TEMPORARY: 'rgb(195, 186, 255)',
    HOVER: 'rgb(195, 186, 0)'
}

export default Rectangle;