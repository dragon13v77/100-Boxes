function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(source, true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(source).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

/**
 * Image component
 */
var Image =
/*#__PURE__*/
function () {
  function Image(props) {
    _classCallCheck(this, Image);

    this.containerWidth = props.rectDimension || 0;
    this.width = this.containerWidth / Image.SCALE_FACTOR;
    this.left = props.left || 0;
    this.top = props.top || 0;
    this.imageObject = new fabric.Path(Image.PATH);
    this.imageObject.set({
      left: this.left,
      top: this.top
    });
    this.imageObject.scaleToWidth(this.width);
    this.imageObject.scaleToHeight(this.width);
    this.imageObject.selection = false;
    this.imageObject.hasBorders = false;
    this.imageObject.hasControls = false;
    this.imageObject.hoverCursor = 'default';
    this.toggleImageVisibillity(false);
    this.attachListeners();
  }

  _createClass(Image, [{
    key: "toggleImageVisibillity",
    value: function toggleImageVisibillity(isVisible) {
      this.imageObject.opacity = isVisible ? 1 : 0;
    }
  }, {
    key: "setImagePosition",
    value: function setImagePosition(props) {
      var left = props.column * this.containerWidth + (this.containerWidth - this.width) / 2;
      var top = props.row * this.containerWidth + (this.containerWidth - this.width) / 2;
      this.toggleImageVisibillity(true);
      this.imageObject.set({
        left: left,
        top: top
      });
    }
  }, {
    key: "attachListeners",
    value: function attachListeners() {}
  }]);

  return Image;
}();

Image.SCALE_FACTOR = 2.5;
Image.PATH = "M256 224c-79.41 0-192 122.76-192 200.25 0 34.9 26.81 55.75 71.74 55.75 48.84 0 81.09-25.08 120.26-25.08 39.51 0 71.85 25.08 120.26 25.08 44.93 0 71.74-20.85 71.74-55.75C448 346.76 335.41 224 256 224zm-147.28-12.61c-10.4-34.65-42.44-57.09-71.56-50.13-29.12 6.96-44.29 40.69-33.89 75.34 10.4 34.65 42.44 57.09 71.56 50.13 29.12-6.96 44.29-40.69 33.89-75.34zm84.72-20.78c30.94-8.14 46.42-49.94 34.58-93.36s-46.52-72.01-77.46-63.87-46.42 49.94-34.58 93.36c11.84 43.42 46.53 72.02 77.46 63.87zm281.39-29.34c-29.12-6.96-61.15 15.48-71.56 50.13-10.4 34.65 4.77 68.38 33.89 75.34 29.12 6.96 61.15-15.48 71.56-50.13 10.4-34.65-4.77-68.38-33.89-75.34zm-156.27 29.34c30.94 8.14 65.62-20.45 77.46-63.87 11.84-43.42-3.64-85.21-34.58-93.36s-65.62 20.45-77.46 63.87c-11.84 43.42 3.64 85.22 34.58 93.36z";

/**
 * Canvas component
 */

var Canvas =
/*#__PURE__*/
function () {
  function Canvas(props) {
    _classCallCheck(this, Canvas);

    this.id = props.id;
    this.className = 'my_canvas';
    this.canvas = null;
    this.init(props);
    this.create(props);
    this.createImage(props);
  }

  _createClass(Canvas, [{
    key: "init",
    value: function init(props) {
      var canvas = document.createElement('canvas');
      canvas.id = props.id;
      document.getElementById('app').appendChild(canvas);
    }
  }, {
    key: "create",
    value: function create(props) {
      this.canvas = new fabric.Canvas(props.id, {
        containerClass: this.className
      });
      this.canvas.setHeight(props.height + 1);
      this.canvas.setWidth(props.width + 1);
    }
  }, {
    key: "destroy",
    value: function destroy() {
      var el = document.getElementsByClassName(this.className);

      if (el) {
        el[0].remove();
      }

      if (this.canvas) {
        this.canvas.dispose();
      }
    }
  }, {
    key: "add",
    value: function add(obj) {
      this.canvas.add(obj);
    }
  }, {
    key: "insertAt",
    value: function insertAt(obj, index) {
      this.canvas.insertAt(obj, index, false);
    }
  }, {
    key: "createImage",
    value: function createImage(props) {
      this.image = new Image(props);
      this.canvas.insertAt(this.image.imageObject, 0);
    }
  }]);

  return Canvas;
}();

/**
 * Rectangle component
 */
var Rectangle =
/*#__PURE__*/
function () {
  function Rectangle(props) {
    _classCallCheck(this, Rectangle);

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

  _createClass(Rectangle, [{
    key: "create",
    value: function create(props) {
      var left = this.column * this.dimension;
      var top = this.row * this.dimension;
      this.rect = new fabric.Rect({
        id: "".concat(this.column, "_").concat(this.row),
        left: left,
        top: top,
        fill: Rectangle.COLORS.REGULAR,
        width: this.dimension,
        height: this.dimension,
        stroke: Rectangle.COLORS.BORDER,
        strokeWidth: props.strokeWidth || 1,
        lockMovementX: true,
        lockMovementY: true,
        selection: false,
        hasBorders: false,
        hasControls: false,
        hoverCursor: 'default'
      });
    }
  }, {
    key: "get",
    value: function get() {
      return this.rect;
    }
  }, {
    key: "attachSelectedListener",
    value: function attachSelectedListener() {
      var _this = this;

      this.rect.on('selected', function () {
        return _this.clicked(_this);
      });
    }
  }, {
    key: "deattachSelectedListener",
    value: function deattachSelectedListener() {
      // this.rect.off('selected', () => this.clicked(this));
      this.rect.__eventListeners.selected = [];
    }
  }, {
    key: "attachMouseOverListener",
    value: function attachMouseOverListener() {
      var _this2 = this;

      this.rect.on('mouseover', function () {
        return _this2.mouseOver(_this2);
      });
    }
  }, {
    key: "deatachMouseOverListener",
    value: function deatachMouseOverListener() {
      // todo: not working need to check why
      // this.rect.off('mouseover', () => this.mouseOver(this));
      this.rect.__eventListeners.mouseover = [];
    }
  }, {
    key: "attachMouseOutListener",
    value: function attachMouseOutListener() {
      var _this3 = this;

      this.rect.on('mouseout', function () {
        return _this3.mouseOut(_this3);
      });
    }
  }, {
    key: "deatachMouseOutListener",
    value: function deatachMouseOutListener() {
      // todo: not working need to check why
      // this.rect.off('mouseout', () => this.mouseOut(this));
      this.rect.__eventListeners.mouseout = [];
    }
  }, {
    key: "setIsPermanent",
    value: function setIsPermanent(isPermanent) {
      this.isPermanent = isPermanent;
      this.deattachSelectedListener();
      this.fillRectangle(Rectangle.COLORS.PERMANENT);
    }
  }, {
    key: "setIsTemporary",
    value: function setIsTemporary(isTemporary) {
      this.isTemporary = isTemporary;
      this.fillRectangle(isTemporary ? Rectangle.COLORS.TEMPORARY : Rectangle.COLORS.REGULAR);

      if (isTemporary) {
        this.attachMouseOverListener();
        this.attachMouseOutListener();
        this.rect.hoverCursor = 'pointer';
      } else {
        this.rect.hoverCursor = 'default';
        this.deatachMouseOverListener();
        this.deatachMouseOutListener();
      }
    }
  }, {
    key: "fillRectangle",
    value: function fillRectangle() {
      var color = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Rectangle.COLORS.DEFAULT;
      this.rect.set('fill', color);
    }
  }]);

  return Rectangle;
}();

Rectangle.COLORS = {
  BORDER: 'gray',
  REGULAR: 'white',
  PERMANENT: 'rgb(144, 140, 255)',
  TEMPORARY: 'rgb(195, 186, 255)',
  HOVER: 'rgb(195, 186, 0)'
};

var Game =
/*#__PURE__*/
function () {
  function Game(props) {
    var _this = this;

    _classCallCheck(this, Game);

    _defineProperty(this, "rectangleClickedHandler", function (rect) {
      if (rect.isTemporary) {
        _this.resetTemporaryRectangles();

        _this.setPermanentRectangle(rect);

        _this.setTemporaryRectangles(rect);
      }

      rect.rect.canvas.setActiveObject(rect.rect.canvas._objects[0]);
    });

    _defineProperty(this, "setPermanentRectangle", function (rect) {
      _this.state.permanent.push(rect);

      rect.setIsPermanent(true);

      _this.layout.image.setImagePosition({
        column: rect.column,
        row: rect.row
      });
    });

    _defineProperty(this, "setTemporaryRectangles", function (rect) {
      var patternKeys = Object.keys(_this.pattern);

      for (var key in patternKeys) {
        var patternItem = _this.pattern[patternKeys[key]];
        var temporaryColumn = rect.column - patternItem.column;
        var temporaryRow = rect.row - patternItem.row;

        if (temporaryColumn >= 0 && temporaryColumn < _this.width && temporaryRow >= 0 && temporaryRow < _this.height) {
          var tempRectangle = _this.rectangles[temporaryColumn][temporaryRow]; // do not make temporary of permanent rectangle

          if (!tempRectangle.isPermanent) {
            tempRectangle.setIsTemporary(true);

            _this.state.temporary.push(tempRectangle);
          }
        } // console.log('TEMP ITEM => Column: ' + temporaryColumn + ' | Row: ' + temporaryRow);

      }

      _this.checkScore();
    });

    _defineProperty(this, "resetTemporaryRectangles", function () {
      _this.state.temporary = [];

      _this.rectangles.map(function (column) {
        column.map(function (rectangle) {
          if (!rectangle.isPermanent) {
            rectangle.setIsTemporary(false);
          }
        });
      });
    });

    _defineProperty(this, "rectangleMouseOverHandler", function (rect) {
      rect.get().set('fill', Rectangle.COLORS.HOVER);
      rect.get().canvas.renderAll(); // console.log('RECTANGLE MOUSE OVER');
    });

    _defineProperty(this, "rectangleMouseOutHandler", function (rect) {
      rect.get().set('fill', Rectangle.COLORS.TEMPORARY);
      rect.get().canvas.renderAll(); // console.log('RECTANGLE MOUSE OUT');
    });

    this.state = {
      history: [],
      permanent: [],
      temporary: []
    };
    this.rectangles = null;
    this.pattern = props.pattern && Game.CAT_PATTERN[props.pattern] || Game.CAT_PATTERN.PATTERN_2;
    this.rectDimension = props.rectDimension || null;
    this.rectStrokeWidth = props.rectStrokeWidth || null;
    this.width = props && props.width && props.width || 10;
    this.height = props && props.height && props.height || 10; // init canvas

    this.initCanvas(props);
    this.initRectangles();
    this.createRectangles(props);
    this.setScore(0);
  }

  _createClass(Game, [{
    key: "exit",
    value: function exit() {
      if (this.layout) {
        this.layout.destroy();
      }
    }
  }, {
    key: "initCanvas",
    value: function initCanvas(props) {
      this.layout = new Canvas({
        id: props.id,
        rectDimension: props.rectDimension,
        width: props.rectDimension * this.width + this.rectStrokeWidth,
        height: props.rectDimension * this.height + this.rectStrokeWidth
      });
    }
  }, {
    key: "initRectangles",
    value: function initRectangles() {
      this.rectangles = new Array(this.width);

      for (var i = 0; i < this.width; i++) {
        this.rectangles[i] = new Array(this.height);
      }

      console.log(this.rectangles);
    }
  }, {
    key: "createRectangles",
    value: function createRectangles(props) {
      for (var i = 0; i < this.width; i++) {
        for (var j = 0; j < this.height; j++) {
          var rect = this.getRectangle(_objectSpread2({}, props, {
            column: i,
            row: j
          }));
          this.rectangles[i][j] = rect;
          this.layout.add(rect.get()); // console.log(this.rectangles[i][j]);
        }
      }
    }
  }, {
    key: "getRectangle",
    value: function getRectangle(props) {
      return new Rectangle({
        column: props.column,
        row: props.row,
        dimension: this.rectDimension,
        strokeWidth: this.rectStrokeWidth,
        clicked: this.rectangleClickedHandler,
        mouseOver: this.rectangleMouseOverHandler,
        mouseOut: this.rectangleMouseOutHandler
      });
    }
  }, {
    key: "checkScore",
    value: function checkScore() {
      if (this.state.temporary.length === 0) {
        alert('Mjau mrnjau :(');
      }

      if (this.state.permanent.length === this.width * this.height) {
        alert('Mjau mrnjau :)');
      }

      this.setScore(this.state.permanent.length);
    }
  }, {
    key: "setScore",
    value: function setScore(score) {
      document.getElementById('score').innerHTML = " SCORE: ".concat(score, " / ").concat(this.width * this.height);
    }
  }]);

  return Game;
}();

Game.CAT_PATTERN = {
  PATTERN_1: {
    stage_1: {
      column: 0,
      row: 2
    },
    stage_2: {
      column: 1,
      row: 1
    },
    stage_3: {
      column: 2,
      row: 0
    },
    stage_4: {
      column: 1,
      row: -1
    },
    stage_5: {
      column: 0,
      row: -2
    },
    stage_6: {
      column: -1,
      row: -1
    },
    stage_7: {
      column: -2,
      row: 0
    },
    stage_8: {
      column: -1,
      row: 1
    }
  },
  PATTERN_2: {
    stage_1: {
      column: 0,
      row: 3
    },
    stage_2: {
      column: 2,
      row: 2
    },
    stage_3: {
      column: 3,
      row: 0
    },
    stage_4: {
      column: 2,
      row: -2
    },
    stage_5: {
      column: 0,
      row: -3
    },
    stage_6: {
      column: -2,
      row: -2
    },
    stage_7: {
      column: -3,
      row: 0
    },
    stage_8: {
      column: -2,
      row: 2
    }
  },
  PATTERN_3: {
    stage_1: {
      column: 0,
      row: 4
    },
    stage_2: {
      column: 3,
      row: 3
    },
    stage_3: {
      column: 4,
      row: 0
    },
    stage_4: {
      column: 3,
      row: -3
    },
    stage_5: {
      column: 0,
      row: -4
    },
    stage_6: {
      column: -3,
      row: -3
    },
    stage_7: {
      column: -4,
      row: 0
    },
    stage_8: {
      column: -3,
      row: 3
    }
  }
};

var app = function () {
  var maxWidth = 50;
  var maxHeight = 50;
  var maxDimension = 100;
  var width = 10;
  var height = 10;
  var rectDimension = 50;
  var pattern = null;
  var game = null;
  return {
    init: function init() {
      document.addEventListener('DOMContentLoaded', function () {
        document.getElementById('input_columns').setAttribute('max', maxWidth);
        document.getElementById('input_rows').setAttribute('max', maxHeight);
        document.getElementById('input_cell_width').setAttribute('max', maxDimension);
      });
      document.getElementById('input_columns').addEventListener('change', function () {
        width = parseInt(this.value, 10);
        width = width < 10 ? 10 : width;
        width = width > maxWidth ? maxWidth : width;
      });
      document.getElementById('input_rows').addEventListener('change', function () {
        height = parseInt(this.value, 10);
        height = height < 10 ? 10 : height;
        height = height > maxHeight ? maxHeight : height;
      });
      document.getElementById('input_cell_width').addEventListener('change', function () {
        rectDimension = parseInt(this.value, 10);
        rectDimension = rectDimension < 20 ? 20 : rectDimension;
        rectDimension = rectDimension > maxDimension ? maxDimension : rectDimension;
      });
      document.getElementById('input_pattern').addEventListener('change', function () {
        pattern = this.value;
      });
      var that = this;
      document.getElementById('play_game').addEventListener('click', function () {
        that.play({
          width: width,
          height: height,
          rectDimension: rectDimension,
          pattern: pattern
        });
      });
      return this;
    },
    play: function play(props) {
      if (game) {
        game.exit();
      }

      game = new Game({
        id: 'fat_cat',
        rectStrokeWidth: 1,
        rectDimension: props && props.rectDimension || rectDimension,
        width: props && props.width || width,
        height: props && props.height || height,
        pattern: props && props.pattern
      });
    }
  };
}();

app.init().play();
//# sourceMappingURL=fat_cat.js.map
