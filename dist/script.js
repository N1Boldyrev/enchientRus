"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function Audio(props) {
  return React.createElement("div", null, React.createElement("audio", {
    src: "audio/0.mp3",
    id: "0"
  }), React.createElement("audio", {
    src: "audio/1.mp3",
    id: "1"
  }), React.createElement("audio", {
    src: "audio/2.mp3",
    id: "2"
  }), React.createElement("audio", {
    src: "audio/3.mp3",
    id: "3"
  }), React.createElement("audio", {
    src: "audio/4.mp3",
    id: "4"
  }), React.createElement("audio", {
    src: "audio/5.mp3",
    id: "5"
  }), React.createElement("audio", {
    src: "audio/6.mp3",
    id: "6"
  }), React.createElement("audio", {
    src: "audio/7.mp3",
    id: "7"
  }), React.createElement("audio", {
    src: "audio/8.mp3",
    id: "8"
  }), React.createElement("audio", {
    src: "audio/9.mp3",
    id: "9"
  }));
}

function AudioDarkSide(props) {
  return React.createElement("div", null, React.createElement("audio", {
    src: "dark_side/0.mp3",
    id: "0"
  }), React.createElement("audio", {
    src: "dark_side/1.mp3",
    id: "1"
  }), React.createElement("audio", {
    src: "dark_side/2.mp3",
    id: "2"
  }), React.createElement("audio", {
    src: "dark_side/3.mp3",
    id: "3"
  }), React.createElement("audio", {
    src: "dark_side/4.mp3",
    id: "4"
  }), React.createElement("audio", {
    src: "dark_side/5.mp3",
    id: "5"
  }), React.createElement("audio", {
    src: "dark_side/6.mp3",
    id: "6"
  }), React.createElement("audio", {
    src: "dark_side/7.mp3",
    id: "7"
  }), React.createElement("audio", {
    src: "dark_side/8.mp3",
    id: "8"
  }), React.createElement("audio", {
    src: "dark_side/9.mp3",
    id: "9"
  }));
}

var CButton = function CButton(props) {
  return React.createElement("button", {
    onClick: props.onClick,
    className: props.className
  }, props.inner);
};

var Calculator =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Calculator, _React$Component);

  function Calculator(props) {
    var _this;

    _classCallCheck(this, Calculator);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Calculator).call(this, props));
    _this.defFontSize = 60;
    _this.state = {
      currentLine: "0",
      currentValue: 0,
      currentOperation: "none",
      currentValueRight: "none",
      currentFontSize: _this.defFontSize,
      fontScope: "none",
      clickCounter: 0
    };
    _this.handleChange = _this.handleChange.bind(_assertThisInitialized(_this));
    _this.calculate = _this.calculate.bind(_assertThisInitialized(_this));
    _this.audio = React.createElement(Audio, null);
    return _this;
  }

  _createClass(Calculator, [{
    key: "changeFontSize",
    value: function changeFontSize(scopeInfo) {
      var fontScope = this.state.fontScope;
      if (scopeInfo == "firstScope" && fontScope != "firstScope") this.setState({
        currentFontSize: this.defFontSize / 2,
        fontScope: "firstScope"
      });else if (scopeInfo == "secondScope" && fontScope != "secondScope") this.setState({
        currentFontSize: this.defFontSize / 3,
        fontScope: "secondScope"
      });else if (scopeInfo == "none") this.setState({
        currentFontSize: this.defFontSize,
        fontScope: "none"
      });
    }
  }, {
    key: "handleChange",
    value: function handleChange(event) {
      if (this.state.currentValueRight == "none") this.setState({
        currentLine: event.target.value,
        currentValue: Number(event.target.value)
      });else this.setState({
        currentLine: event.target.value,
        currentValueRight: Number(event.target.value)
      });
      if (event.target.value.length >= 7 && event.target.value.length < 14) this.changeFontSize("firstScope");else if (event.target.value.length >= 14) this.changeFontSize("secondScope");else this.changeFontSize("none");
    }
  }, {
    key: "onNumberButtonClick",
    value: function onNumberButtonClick(buttonValue) {
      var currentLine = this.state.currentLine;

      if (buttonValue != "clear") {
        this.setState({
          clickCounter: this.state.clickCounter + 1
        });
        console.log(this.state.clickCounter);
        if (this.state.clickCounter > 10) this.audio = React.createElement(AudioDarkSide, null);
        document.getElementById(buttonValue).play();
      }

      if (buttonValue == "clear") {
        this.setState({
          currentValue: 0,
          currentLine: "0",
          currentValueRight: "none"
        });
        this.changeFontSize("none");
      } else if (this.state.currentValueRight == "none") {
        if (this.state.currentLine == "0") this.setState({
          currentValue: Number(buttonValue),
          currentLine: buttonValue
        });else this.setState({
          currentValue: Number(currentLine + buttonValue),
          currentLine: currentLine + buttonValue
        });
      } else {
        if (this.state.currentOperation != "none" && this.state.currentValueRight == "0") this.setState({
          currentValueRight: Number(buttonValue),
          currentLine: buttonValue
        });else this.setState({
          currentValueRight: Number(currentLine + buttonValue),
          currentLine: currentLine + buttonValue
        });
      }

      if (currentLine.length >= 7 && currentLine.length < 14) this.changeFontSize("firstScope");else if (currentLine.length >= 14) this.changeFontSize("secondScope");else this.changeFontSize("none");
    }
  }, {
    key: "onOperationButtonClick",
    value: function onOperationButtonClick(buttonValue) {
      var currentValue = this.state.currentValue;
      var currentValueRight = this.state.currentValueRight;

      if (buttonValue == "+/-") {
        if (currentValueRight == "none") this.setState({
          currentValue: currentValue * -1,
          currentLine: currentValue * -1
        });else this.setState({
          currentValueRight: currentValueRight * -1,
          currentLine: currentValueRight * -1
        });
      } else this.setState({
        currentValueRight: 0,
        currentOperation: buttonValue
      });
    }
  }, {
    key: "calculate",
    value: function calculate() {
      var currentValue = this.state.currentValue;
      var currentValueRight = this.state.currentValueRight;
      var currentOperation = this.state.currentOperation;
      var final_value = 0;

      switch (currentOperation) {
        case "+":
          final_value = currentValue + currentValueRight;
          break;

        case "-":
          final_value = currentValue - currentValueRight;
          break;

        case "*":
          final_value = currentValue * currentValueRight;
          break;

        case "/":
          final_value = currentValue / currentValueRight;
          break;

        case "%":
          final_value = currentValue * (currentValueRight / 100);
          break;
      }

      this.setState({
        currentValue: final_value,
        currentLine: final_value
      });
      final_value = String(final_value);
      if (final_value.length >= 7 && final_value.length < 14) this.changeFontSize("firstScope");else if (final_value.length >= 14) this.changeFontSize("secondScope");else this.changeFontSize("none");
      console.log(String(final_value).length);
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement("div", null, this.audio, React.createElement("input", {
        type: "text",
        name: "",
        id: "",
        onChange: this.handleChange,
        value: this.state.currentLine,
        className: "output",
        style: {
          fontSize: this.state.currentFontSize
        },
        maxLength: "20"
      }), React.createElement("br", null), React.createElement(CButton, {
        onClick: this.onNumberButtonClick.bind(this, "clear"),
        inner: "C",
        className: "operationButtonTop"
      }), React.createElement(CButton, {
        onClick: this.onOperationButtonClick.bind(this, "+/-"),
        inner: "+/-",
        className: "operationButtonTop"
      }), React.createElement(CButton, {
        onClick: this.onOperationButtonClick.bind(this, "%"),
        inner: "%",
        className: "operationButtonTop"
      }), React.createElement(CButton, {
        onClick: this.onOperationButtonClick.bind(this, "/"),
        inner: "/",
        className: "operationButton"
      }), React.createElement("br", null), React.createElement(CButton, {
        onClick: this.onNumberButtonClick.bind(this, "7"),
        inner: "7",
        className: "numberButton"
      }), React.createElement(CButton, {
        onClick: this.onNumberButtonClick.bind(this, "8"),
        inner: "8",
        className: "numberButton"
      }), React.createElement(CButton, {
        onClick: this.onNumberButtonClick.bind(this, "9"),
        inner: "9",
        className: "numberButton"
      }), React.createElement(CButton, {
        onClick: this.onOperationButtonClick.bind(this, "*"),
        inner: "x",
        className: "operationButton"
      }), React.createElement("br", null), React.createElement(CButton, {
        onClick: this.onNumberButtonClick.bind(this, "4"),
        inner: "4",
        className: "numberButton"
      }), React.createElement(CButton, {
        onClick: this.onNumberButtonClick.bind(this, "5"),
        inner: "5",
        className: "numberButton"
      }), React.createElement(CButton, {
        onClick: this.onNumberButtonClick.bind(this, "6"),
        inner: "6",
        className: "numberButton"
      }), React.createElement(CButton, {
        onClick: this.onOperationButtonClick.bind(this, "-"),
        inner: "-",
        className: "operationButton"
      }), React.createElement("br", null), React.createElement(CButton, {
        onClick: this.onNumberButtonClick.bind(this, "1"),
        inner: "1",
        className: "numberButton"
      }), React.createElement(CButton, {
        onClick: this.onNumberButtonClick.bind(this, "2"),
        inner: "2",
        className: "numberButton"
      }), React.createElement(CButton, {
        onClick: this.onNumberButtonClick.bind(this, "3"),
        inner: "3",
        className: "numberButton"
      }), React.createElement(CButton, {
        onClick: this.onOperationButtonClick.bind(this, "+"),
        inner: "+",
        className: "operationButton"
      }), React.createElement("br", null), React.createElement(CButton, {
        onClick: this.onNumberButtonClick.bind(this, "0"),
        inner: "0",
        className: "numberButton zero"
      }), React.createElement(CButton, {
        onClick: this.onNumberButtonClick.bind(this, "."),
        inner: ".",
        className: "numberButton"
      }), React.createElement(CButton, {
        onClick: this.calculate,
        inner: "=",
        className: "operationButton"
      }));
    }
  }]);

  return Calculator;
}(React.Component);

ReactDOM.render(React.createElement(Calculator, null), document.getElementById("root"));