"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = WidthProvider;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactDom = _interopRequireDefault(require("react-dom"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/*
 * A simple HOC that provides facility for listening to container resizes.
 */
function WidthProvider
  /*:: <
    Props,
    ComposedProps: { ...Props, ...WPProps }
  >*/
  (ComposedComponent
    /*: ReactComponentType<Props>*/
  )
/*: ReactComponentType<ComposedProps>*/ {
  var _class, _temp;

  return _temp = _class =
    /*#__PURE__*/
    function (_React$Component) {
      _inherits(WidthProvider, _React$Component);

      function WidthProvider() {
        var _getPrototypeOf2;

        var _this;

        _classCallCheck(this, WidthProvider);

        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(WidthProvider)).call.apply(_getPrototypeOf2, [this].concat(args)));

        _defineProperty(_assertThisInitialized(_this), "state", {
          width: 1280
        });

        _defineProperty(_assertThisInitialized(_this), "mounted", false);

        _defineProperty(_assertThisInitialized(_this), "onWindowResize", function () {
          if (!_this.mounted) return; // eslint-disable-next-line react/no-find-dom-node
          var node = _reactDom.default.findDOMNode(_assertThisInitialized(_this)); // Flow casts this to Text | Element

          console.log('ok', node.offsetWidth);

          if (node instanceof HTMLElement) _this.setState({
            width: node.offsetWidth
          });
        });

        return _this;
      }

      _createClass(WidthProvider, [{
        key: "componentDidMount",
        value: function componentDidMount() {
          this.mounted = true;

          /* _reactDom.default.findDOMNode(_assertThisInitialized(_this)).addEventListener('resize', function () {
            console.log('resized');
          }) */
          /* this.addEventListener('resize', function (e) {
            console.log("resize", e);
          }) */

          /* _defineProperty(_assertThisInitialized(_this), "resize", function () {
            console.log('object');
          }); */

          window.addEventListener("resize", this.onWindowResize); // Call to properly set the breakpoint and resize the elements.
          // Note that if you're doing a full-width element, this can get a little wonky if a scrollbar
          // appears because of the grid. In that case, fire your own resize event, or set `overflow: scroll` on your body.

          this.onWindowResize();
        }
      }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
          this.mounted = false;
          window.removeEventListener("resize", this.onWindowResize);
        }
      }, {
        key: "render",
        value: function render() {
          var _this$props = this.props,
            measureBeforeMount = _this$props.measureBeforeMount,
            rest = _objectWithoutProperties(_this$props, ["measureBeforeMount"]);

          if (measureBeforeMount && !this.mounted) {
            return _react.default.createElement("div", {
              className: this.props.className,
              style: this.props.style
            });
          }

          return _react.default.createElement(ComposedComponent, _extends({}, rest, this.state));
        }
      }]);

      return WidthProvider;
    }(_react.default.Component), _defineProperty(_class, "defaultProps", {
      measureBeforeMount: false
    }), _defineProperty(_class, "propTypes", {
      // If true, will not render children until mounted. Useful for getting the exact width before
      // rendering, to prevent any unsightly resizing.
      measureBeforeMount: _propTypes.default.bool
    }), _temp;
}