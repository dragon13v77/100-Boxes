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
 * Canvas component
 */
var Canvas =
/*#__PURE__*/
function () {
  function Canvas(props) {
    _classCallCheck(this, Canvas);

    this.canvas = null;
    this.init(props);
    this.create(props);
    this.attachListeners();
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
      this.canvas = new fabric.Canvas(props.id);

      if (props.dimension) {
        this.canvas.setHeight(props.dimension + 1);
        this.canvas.setWidth(props.dimension + 1);
      }
    }
  }, {
    key: "attachListeners",
    value: function attachListeners() {}
  }, {
    key: "add",
    value: function add(obj) {
      this.canvas.add(obj);
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
      var left = this.column % this.dimension * this.dimension;
      var top = this.row * this.dimension;
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
      //this.rect.off('selected', () => this.clicked(this));
      this.rect.__eventListeners['selected'] = [];
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
      //this.rect.off('mouseover', () => this.mouseOver(this));
      this.rect.__eventListeners['mouseover'] = [];
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
      //this.rect.off('mouseout', () => this.mouseOut(this));
      this.rect.__eventListeners['mouseout'] = [];
    }
  }, {
    key: "setIsPermanent",
    value: function setIsPermanent(isPermanent) {
      this.isPermanent = isPermanent;
      this.deattachSelectedListener();
      this.fillRectangle(Rectangle.COLORS.PERMANENT);
      this.deleteImage();
      this.setImage();
    }
  }, {
    key: "setIsTemporary",
    value: function setIsTemporary(isTemporary) {
      this.isTemporary = isTemporary;
      this.fillRectangle(isTemporary ? Rectangle.COLORS.TEMPORARY : Rectangle.COLORS.REGULAR);

      if (isTemporary) {
        this.attachMouseOverListener();
        this.attachMouseOutListener();
        this.rect.hoverCursor = "pointer";
      } else {
        this.rect.hoverCursor = "default";
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
  }, {
    key: "setImage",
    value: function setImage() {
      var width = this.dimension / Rectangle.IMAGE_SCALE_FACTOR;
      var left = this.column * this.dimension + (this.dimension - width) / 2;
      var top = this.row * this.dimension + (this.dimension - width) / 2;

      (function (context) {
        fabric.loadSVGFromURL(Rectangle.IMAGE_PATH, function (objects, options) {
          var obj = fabric.util.groupSVGElements(objects, options);
          obj.left = left;
          obj.top = top;
          obj.scaleToWidth(width);
          obj.scaleToHeight(width);
          obj.lockMovementX = true;
          obj.lockMovementY = true;
          obj.selection = false;
          obj.hasBorders = false;
          obj.hasControls = false;
          obj.hoverCursor = 'default';
          context.get().canvas.add(obj);
          context.get().canvas.setActiveObject(obj, function () {});
        });
      })(this);
    }
  }, {
    key: "deleteImage",
    value: function deleteImage() {
      var _this4 = this;

      this.get().canvas._objects.forEach(function (element, index) {
        if (element.type == "path") {
          _this4.get().canvas.remove(element);

          _this4.get().canvas.renderAll();
        }
      });
    }
  }]);

  return Rectangle;
}();

Rectangle.IMAGE_PATH = '../app/assets/svg/paw.svg';
Rectangle.IMAGE_SCALE_FACTOR = 2.5;
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
      console.log("RECTANGLE CLICK HANDLER ".concat(rect.rect.id));

      if (rect.isTemporary) {
        _this.resetTemporaryRectangles();

        _this.setPermanentRectangle(rect);

        _this.setTemporaryRectangles(rect);
      }
    });

    _defineProperty(this, "setPermanentRectangle", function (rect) {
      _this.state.permanent.push(rect);

      rect.setIsPermanent(true);
    });

    _defineProperty(this, "setTemporaryRectangles", function (rect) {
      for (var key in Game.CAT_PATTERN) {
        var patternItem = Game.CAT_PATTERN[key];
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
    this.rectDimension = props.rectDimension || null;
    this.rectStrokeWidth = props.rectStrokeWidth || null;
    this.width = props && props.width && props.width || 10;
    this.height = props && props.height && props.height || 10; // init canvas

    this.initCanvas(props);
    this.initRectangles();
    this.createRectangles(props);
  }

  _createClass(Game, [{
    key: "initCanvas",
    value: function initCanvas(props) {
      this.layout = new Canvas({
        id: props.id,
        dimension: props.rectDimension * this.width + this.rectStrokeWidth
      });
    }
  }, {
    key: "initRectangles",
    value: function initRectangles() {
      this.rectangles = new Array(this.width);

      for (var i = 0; i < this.width; i++) {
        this.rectangles[i] = new Array(this.height);
      }
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

      if (this.state.permanent === this.width * this.height) {
        alert('Mjau mrnjau :)');
      }
    }
  }]);

  return Game;
}();

Game.CAT_PATTERN = {
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
};

new Game({
  id: 'fat_cat',
  rectDimension: 50,
  rectStrokeWidth: 1,
  width: 10,
  height: 10
});
//# sourceMappingURL=fat_cat.js.map
