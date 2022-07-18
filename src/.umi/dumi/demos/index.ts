// @ts-nocheck
import React from 'react';
import { dynamic } from 'dumi';

export default {
  'Foo-demo': {
    component: function DumiDemo() {
  var _interopRequireDefault = require("/Users/sunjingjing44/Desktop/project/Esther-ui-component/node_modules/@babel/runtime/helpers/interopRequireDefault.js")["default"];

  var _react = _interopRequireDefault(require("react"));

  var _EstherUiComponent = require("Esther-ui-component");

  var _default = function _default() {
    return /*#__PURE__*/_react["default"].createElement(_EstherUiComponent.Foo, {
      title: "First Demo"
    });
  };

  return _react["default"].createElement(_default);
},
    previewerProps: {"sources":{"_":{"tsx":"import React from 'react';\nimport { Foo } from 'Esther-ui-component';\n\nexport default () => <Foo title=\"First Demo\" />;"}},"dependencies":{"react":{"version":"17.0.2"},"Esther-ui-component":{"version":"1.0.0"}},"componentName":"Foo","identifier":"Foo-demo"},
  },
};
