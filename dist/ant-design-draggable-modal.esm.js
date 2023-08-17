import { createContext, createElement, useState, useCallback, useEffect, useRef, memo, useMemo, useContext, useReducer } from 'react';
import { useUID } from 'react-uid';
import { Modal } from 'antd';

var DraggableModalContext = /*#__PURE__*/createContext(null);

if (process.env.NODE_ENV !== 'production') {
  DraggableModalContext.displayName = 'DraggableModalContext';
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

var ResizeHandle = function ResizeHandle(props) {
  return createElement("div", Object.assign({
    className: "ant-design-draggable-modal-resize-handle"
  }, props), createElement("div", {
    className: "ant-design-draggable-modal-resize-handle-inner"
  }));
};

var useDrag = function useDrag(x, y, onDrag) {
  var _useState = useState(false),
      dragging = _useState[0],
      setDragging = _useState[1];

  var _useState2 = useState({
    initX: 0,
    initY: 0,
    mouseDownX: 0,
    mouseDownY: 0
  }),
      initialDragState = _useState2[0],
      setInitialDragState = _useState2[1];

  var onMouseDown = useCallback(function (e) {
    e.preventDefault();
    setInitialDragState({
      initX: x,
      initY: y,
      mouseDownX: e.clientX,
      mouseDownY: e.clientY
    });
    setDragging(true);
  }, [x, y, setDragging, setInitialDragState]);
  useEffect(function () {
    var onMouseMove = function onMouseMove(e) {
      if (dragging) {
        var initX = initialDragState.initX,
            mouseDownX = initialDragState.mouseDownX,
            initY = initialDragState.initY,
            mouseDownY = initialDragState.mouseDownY;
        var dx = e.clientX - mouseDownX;
        var dy = e.clientY - mouseDownY;

        var _x = initX + dx;

        var _y = initY + dy;

        onDrag({
          x: _x,
          y: _y
        });
      }
    };

    window.addEventListener('mousemove', onMouseMove, {
      passive: true
    });
    return function () {
      return window.removeEventListener('mousemove', onMouseMove);
    };
  }, [initialDragState, dragging, onDrag]);
  useEffect(function () {
    var onMouseUp = function onMouseUp() {
      setDragging(false);
    };

    window.addEventListener('mouseup', onMouseUp);
    return function () {
      return window.removeEventListener('mouseup', onMouseUp);
    };
  }, [setDragging]);
  return onMouseDown;
};

var usePrevious = function usePrevious(value) {
  var ref = useRef(value);
  useEffect(function () {
    ref.current = value;
  }, [value]);
  return ref.current;
};

var useResize = function useResize(x, y, width, height, onResize) {
  var _useState = useState(false),
      dragging = _useState[0],
      setDragging = _useState[1];

  var _useState2 = useState({
    initX: 0,
    initY: 0,
    initWidth: 0,
    initHeight: 0,
    mouseDownX: 0,
    mouseDownY: 0
  }),
      initialDragState = _useState2[0],
      setInitialDragState = _useState2[1];

  var onMouseDown = useCallback(function (e) {
    e.preventDefault();
    setInitialDragState({
      initX: x,
      initY: y,
      initWidth: width,
      initHeight: height,
      mouseDownX: e.clientX,
      mouseDownY: e.clientY
    });
    setDragging(true);
  }, [width, height, setDragging, setInitialDragState, x, y]);
  useEffect(function () {
    var onMouseMove = function onMouseMove(e) {
      if (dragging) {
        var initX = initialDragState.initX,
            initY = initialDragState.initY,
            initWidth = initialDragState.initWidth,
            mouseDownX = initialDragState.mouseDownX,
            initHeight = initialDragState.initHeight,
            mouseDownY = initialDragState.mouseDownY;
        var dx = e.clientX - mouseDownX;
        var dy = e.clientY - mouseDownY;

        var _width = initWidth + dx;

        var _height = initHeight + dy;

        return onResize({
          x: initX,
          y: initY,
          width: _width,
          height: _height
        });
      }
    };

    window.addEventListener('mousemove', onMouseMove, {
      passive: true
    });
    return function () {
      return window.removeEventListener('mousemove', onMouseMove);
    };
  }, [initialDragState, dragging, onResize]);
  useEffect(function () {
    var onMouseUp = function onMouseUp() {
      setDragging(false);
    };

    window.addEventListener('mouseup', onMouseUp);
    return function () {
      return window.removeEventListener('mouseup', onMouseUp);
    };
  }, [setDragging]);
  return onMouseDown;
};

var modalStyle = {
  margin: 0,
  paddingBottom: 0,
  pointerEvents: 'auto'
};

function DraggableModalInnerNonMemo(_ref) {
  var id = _ref.id,
      modalState = _ref.modalState,
      dispatch = _ref.dispatch,
      open = _ref.open,
      children = _ref.children,
      title = _ref.title,
      initialWidth = _ref.initialWidth,
      initialHeight = _ref.initialHeight,
      otherProps = _objectWithoutPropertiesLoose(_ref, ["id", "modalState", "dispatch", "open", "children", "title", "initialWidth", "initialHeight"]);

  // Call on mount and unmount.
  useEffect(function () {
    dispatch({
      type: 'mount',
      id: id,
      intialState: {
        initialWidth: initialWidth,
        initialHeight: initialHeight
      }
    });
    return function () {
      return dispatch({
        type: 'unmount',
        id: id
      });
    };
  }, [dispatch, id, initialWidth, initialHeight]); // Bring this to the front if it's been opened with props.

  var openPrevious = usePrevious(open);
  useEffect(function () {
    if (open !== openPrevious) {
      if (open) {
        dispatch({
          type: 'show',
          id: id
        });
      } else {
        dispatch({
          type: 'hide',
          id: id
        });
      }
    }
  }, [open, openPrevious, id, dispatch]);
  var zIndex = modalState.zIndex,
      x = modalState.x,
      y = modalState.y,
      width = modalState.width,
      height = modalState.height;
  var style = useMemo(function () {
    return _extends({}, modalStyle, {
      top: y,
      left: x,
      height: height
    });
  }, [y, x, height]);
  var onFocus = useCallback(function () {
    return dispatch({
      type: 'focus',
      id: id
    });
  }, [id, dispatch]); // @ts-ignore

  var onDragWithID = useCallback(function (args) {
    return dispatch(_extends({
      type: 'drag',
      id: id
    }, args));
  }, [dispatch, id]); // @ts-ignore

  var onResizeWithID = useCallback(function (args) {
    return dispatch(_extends({
      type: 'resize',
      id: id
    }, args));
  }, [dispatch, id]);
  var onMouseDrag = useDrag(x, y, onDragWithID);
  var onMouseResize = useResize(x, y, width, height, onResizeWithID);
  var titleElement = useMemo(function () {
    return createElement("div", {
      className: "ant-design-draggable-modal-title",
      onMouseDown: onMouseDrag,
      onClick: onFocus
    }, title);
  }, [onMouseDrag, onFocus, title]);
  return createElement(Modal, Object.assign({
    wrapClassName: "ant-design-draggable-modal",
    style: style,
    width: width,
    destroyOnClose: true,
    mask: false,
    maskClosable: false,
    zIndex: zIndex,
    title: titleElement,
    open: open
  }, otherProps), children, createElement(ResizeHandle, {
    onMouseDown: onMouseResize
  }));
}

var DraggableModalInner = /*#__PURE__*/memo(DraggableModalInnerNonMemo);

if (process.env.NODE_ENV !== 'production') {
  DraggableModalInner.displayName = 'DraggableModalInner';
}

var getWindowSize = function getWindowSize() {
  return {
    width: window.innerWidth || 0,
    height: window.innerHeight || 0
  };
};

var clamp = function clamp(min, max, value) {
  return Math.max(min, Math.min(max, value));
};

var mapObject = function mapObject(o, f) {
  return Object.assign.apply(Object, [{}].concat(Object.keys(o).map(function (k) {
    var _ref;

    return _ref = {}, _ref[k] = f(o[k]), _ref;
  })));
};

var initialModalsState = {
  maxZIndex: 0,
  windowSize: /*#__PURE__*/getWindowSize(),
  modals: {}
};
var initialModalState = {
  x: 0,
  y: 0,
  width: 800,
  height: 800,
  zIndex: 0,
  open: false
};

var getInitialModalState = function getInitialModalState(_ref2) {
  var _ref2$initialWidth = _ref2.initialWidth,
      initialWidth = _ref2$initialWidth === void 0 ? initialModalState.width : _ref2$initialWidth,
      _ref2$initialHeight = _ref2.initialHeight,
      initialHeight = _ref2$initialHeight === void 0 ? initialModalState.height : _ref2$initialHeight;
  return _extends({}, initialModalState, {
    width: initialWidth,
    height: initialHeight
  });
};

var getModalState = function getModalState(_ref3) {
  var state = _ref3.state,
      id = _ref3.id,
      initialWidth = _ref3.initialWidth,
      initialHeight = _ref3.initialHeight;
  return state.modals[id] || getInitialModalState({
    initialWidth: initialWidth,
    initialHeight: initialHeight
  });
};

var getNextZIndex = function getNextZIndex(state, id) {
  return getModalState({
    state: state,
    id: id
  }).zIndex === state.maxZIndex ? state.maxZIndex : state.maxZIndex + 1;
};

var clampDrag = function clampDrag(windowWidth, windowHeight, x, y, width, height) {
  var maxX = windowWidth - width;
  var maxY = windowHeight - height;
  var clampedX = clamp(0, maxX, x);
  var clampedY = clamp(0, maxY, y);
  return {
    x: clampedX,
    y: clampedY
  };
};

var clampResize = function clampResize(windowWidth, windowHeight, x, y, width, height) {
  var maxWidth = windowWidth - x;
  var maxHeight = windowHeight - y;
  var clampedWidth = clamp(200, maxWidth, width);
  var clampedHeight = clamp(200, maxHeight, height);
  return {
    width: clampedWidth,
    height: clampedHeight
  };
};

var draggableModalReducer = function draggableModalReducer(state, action) {
  var _extends2, _extends3, _extends5, _extends7;

  switch (action.type) {
    case 'resize':
      var size = clampResize(state.windowSize.width, state.windowSize.height, action.x, action.y, action.width, action.height);
      return _extends({}, state, {
        maxZIndex: getNextZIndex(state, action.id),
        modals: _extends({}, state.modals, (_extends2 = {}, _extends2[action.id] = _extends({}, state.modals[action.id], size, {
          zIndex: getNextZIndex(state, action.id)
        }), _extends2))
      });

    case 'drag':
      return _extends({}, state, {
        maxZIndex: getNextZIndex(state, action.id),
        modals: _extends({}, state.modals, (_extends3 = {}, _extends3[action.id] = _extends({}, state.modals[action.id], clampDrag(state.windowSize.width, state.windowSize.height, action.x, action.y, state.modals[action.id].width, state.modals[action.id].height), {
          zIndex: getNextZIndex(state, action.id)
        }), _extends3))
      });

    case 'show':
      {
        var _extends4;

        var _modalState = state.modals[action.id];
        var centerX = state.windowSize.width / 2 - _modalState.width / 2;
        var centerY = state.windowSize.height / 2 - _modalState.height / 2;
        var position = clampDrag(state.windowSize.width, state.windowSize.height, centerX, centerY, _modalState.width, _modalState.height);

        var _size = clampResize(state.windowSize.width, state.windowSize.height, position.x, position.y, _modalState.width, _modalState.height);

        return _extends({}, state, {
          maxZIndex: state.maxZIndex + 1,
          modals: _extends({}, state.modals, (_extends4 = {}, _extends4[action.id] = _extends({}, _modalState, position, _size, {
            zIndex: state.maxZIndex + 1,
            open: true
          }), _extends4))
        });
      }

    case 'focus':
      var modalState = state.modals[action.id];
      return _extends({}, state, {
        maxZIndex: state.maxZIndex + 1,
        modals: _extends({}, state.modals, (_extends5 = {}, _extends5[action.id] = _extends({}, modalState, {
          zIndex: state.maxZIndex + 1
        }), _extends5))
      });

    case 'hide':
      {
        var _extends6;

        var _modalState2 = state.modals[action.id];
        return _extends({}, state, {
          modals: _extends({}, state.modals, (_extends6 = {}, _extends6[action.id] = _extends({}, _modalState2, {
            open: false
          }), _extends6))
        });
      }

    case 'mount':
      var initialState = getInitialModalState(action.intialState);
      return _extends({}, state, {
        maxZIndex: state.maxZIndex + 1,
        modals: _extends({}, state.modals, (_extends7 = {}, _extends7[action.id] = _extends({}, initialState, {
          x: state.windowSize.width / 2 - initialState.width / 2,
          y: state.windowSize.height / 2 - initialState.height / 2,
          zIndex: state.maxZIndex + 1
        }), _extends7))
      });

    case 'unmount':
      var modalsClone = _extends({}, state.modals);

      delete modalsClone[action.id];
      return _extends({}, state, {
        modals: modalsClone
      });

    case 'windowResize':
      return _extends({}, state, {
        windowSize: action.size,
        modals: mapObject(state.modals, function (modalState) {
          if (!modalState.open) {
            return modalState;
          }

          var position = clampDrag(state.windowSize.width, state.windowSize.height, modalState.x, modalState.y, modalState.width, modalState.height);
          var size = clampResize(state.windowSize.width, state.windowSize.height, position.x, position.y, modalState.width, modalState.height);
          return _extends({}, modalState, position, size);
        })
      });

    default:
      throw new Error();
  }
};

var DraggableModal = function DraggableModal(props) {
  // Get the unique ID of this modal.
  var id = useUID(); // Get modal provider.

  var modalProvider = useContext(DraggableModalContext);

  if (!modalProvider) {
    throw new Error('No Provider');
  }

  var dispatch = modalProvider.dispatch,
      state = modalProvider.state;
  var modalState = getModalState({
    state: state,
    id: id,
    initialHeight: props.initialHeight,
    initialWidth: props.initialWidth
  }); // We do this so that we don't re-render all modals for every state change.
  // DraggableModalInner uses React.memo, so it only re-renders if
  // if props change (e.g. modalState).

  return createElement(DraggableModalInner, Object.assign({
    id: id,
    dispatch: dispatch,
    modalState: modalState
  }, props));
};

var DraggableModalProvider = function DraggableModalProvider(_ref) {
  var children = _ref.children;

  var _useReducer = useReducer(draggableModalReducer, initialModalsState),
      state = _useReducer[0],
      dispatch = _useReducer[1];

  useEffect(function () {
    if (typeof window !== 'object') {
      return;
    }

    var onResize = function onResize() {
      return dispatch({
        type: 'windowResize',
        size: getWindowSize()
      });
    };

    window.addEventListener('resize', onResize);
    onResize();
    return function () {
      return window.removeEventListener('resize', onResize);
    };
  }, [dispatch]);
  return createElement(DraggableModalContext.Provider, {
    value: {
      state: state,
      dispatch: dispatch
    }
  }, children);
};

export { DraggableModal, DraggableModalContext, DraggableModalProvider };
//# sourceMappingURL=ant-design-draggable-modal.esm.js.map
