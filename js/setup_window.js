'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(['react', 'redux', 'react_redux', './actions/setup_actions'], function (React, Redux, ReactRedux, actions) {
  var bindActionCreators = Redux.bindActionCreators;
  var connect = ReactRedux.connect;
  var showWindow = actions.showWindow,
      enterName = actions.enterName,
      raiseStat = actions.raiseStat,
      reduceStat = actions.reduceStat,
      showSubmit = actions.showSubmit,
      hideSubmit = actions.hideSubmit;

  var SetupWindow = function (_React$Component) {
    _inherits(SetupWindow, _React$Component);

    function SetupWindow() {
      _classCallCheck(this, SetupWindow);

      return _possibleConstructorReturn(this, (SetupWindow.__proto__ || Object.getPrototypeOf(SetupWindow)).apply(this, arguments));
    }

    _createClass(SetupWindow, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        var _this2 = this;

        setTimeout(function () {
          // Set and change class to run animation
          _this2.props.dispatch(showWindow());
          // Add and remove 'hidden' to avoid overflow blinking
          _this2.formEl.classList.remove('hidden');
        }, 0);
      }
    }, {
      key: 'componentDidUpdate',
      value: function componentDidUpdate() {
        // Check if name and stat input finished
        if (this.props.statsRemain === 0 && this.props.name) {
          this.props.dispatch(showSubmit());
        } else {
          this.props.dispatch(hideSubmit());
        }
      }
    }, {
      key: 'handleSubmit',
      value: function handleSubmit(event) {
        event.preventDefault();
        var character = { 'name': this.props.name, 'stats': this.props.stats };
        this.props.doNext(character);
      }
    }, {
      key: 'render',
      value: function render() {
        var _this3 = this;

        var dispatch = this.props.dispatch;

        var changeName = bindActionCreators(enterName, dispatch);
        var plus = bindActionCreators(raiseStat, dispatch);
        var minus = bindActionCreators(reduceStat, dispatch);

        var fieldSet = this.props.statNames.map(function (stat, i) {
          return React.createElement(StatField, { key: i, title: stat, plus: plus, minus: minus, value: _this3.props.stats[i] });
        });

        return React.createElement(
          'div',
          { className: this.props.className },
          React.createElement(
            'p',
            null,
            'SETUP YOUR CHARACTER'
          ),
          React.createElement(
            'form',
            { ref: function ref(element) {
                return _this3.formEl = element;
              }, className: 'hidden' },
            React.createElement(NameField, { changeName: changeName, value: this.props.name }),
            fieldSet,
            React.createElement(
              'p',
              { className: 'remain-stats' },
              'STATS REMAIN: ',
              this.props.statsRemain
            )
          ),
          React.createElement(CreateCharButton, { onClick: this.handleSubmit.bind(this), show: this.props.showSubmit })
        );
      }
    }]);

    return SetupWindow;
  }(React.Component);

  var NameField = function (_React$Component2) {
    _inherits(NameField, _React$Component2);

    function NameField(props) {
      _classCallCheck(this, NameField);

      var _this4 = _possibleConstructorReturn(this, (NameField.__proto__ || Object.getPrototypeOf(NameField)).call(this));

      _this4.props = props;
      _this4.state = {
        showTip: false
      };
      return _this4;
    }

    _createClass(NameField, [{
      key: 'updateName',
      value: function updateName(event) {
        var cName = event.target.value;
        // Only numbers, spaces, underscores and english letters are eligible
        if (/^[\w ]{0,20}$/.test(cName)) {
          this.props.changeName(cName);
          this.setState({ showTip: false });
        } else {
          this.setState({ showTip: true });
        }
      }
    }, {
      key: 'render',
      value: function render() {
        return React.createElement(
          'div',
          { className: 'name-input-block' },
          React.createElement('input', { className: 'name-field', type: 'text', placeholder: 'Name', onChange: this.updateName.bind(this), value: this.props.value }),
          this.state.showTip ? React.createElement(
            'p',
            { className: 'tip' },
            '* english letters and numbers only'
          ) : null
        );
      }
    }]);

    return NameField;
  }(React.Component);

  var StatField = function StatField(props) {
    var title = props.title,
        plus = props.plus,
        minus = props.minus,
        value = props.value;

    return React.createElement(
      'div',
      { className: 'stat-field', onMouseDown: function onMouseDown(event) {
          return event.preventDefault();
        } },
      React.createElement(
        'span',
        null,
        title,
        ':'
      ),
      React.createElement(
        'span',
        null,
        React.createElement(
          'i',
          { className: 'minus', onClick: function onClick() {
              minus(title);
            } },
          '-'
        ),
        React.createElement('input', { type: 'text', value: value, disabled: true }),
        React.createElement(
          'i',
          { className: 'plus', onClick: function onClick() {
              plus(title);
            } },
          '+'
        )
      )
    );
  };

  var CreateCharButton = function CreateCharButton(_ref) {
    var onClick = _ref.onClick,
        show = _ref.show;

    if (show) {
      return React.createElement(
        'button',
        { className: 'create-char-button', onClick: onClick },
        'Create character'
      );
    }
    return React.createElement(
      'button',
      { className: 'create-char-button hidden', disabled: true, onClick: onClick },
      'Create character'
    );
  };

  var mapStateToProps = function mapStateToProps(state) {
    return {
      statsRemain: state.statsRemain,
      name: state.name,
      stats: state.stats,
      statNames: state.statNames,
      className: state.className,
      showSubmit: state.showSubmit
    };
  };

  SetupWindow = connect(mapStateToProps)(SetupWindow);

  var setupWindow = {
    SetupWindow: SetupWindow,
    NameField: NameField,
    StatField: StatField,
    CreateCharButton: CreateCharButton
  };

  return setupWindow;
});