/**
 * DevExtreme (ui/data_grid/ui.data_grid.rows.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.RowsView = void 0;
var _uiData_grid = _interopRequireDefault(require("./ui.data_grid.core"));
var _uiGrid_core = _interopRequireDefault(require("../grid_core/ui.grid_core.rows"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var RowsView = _uiGrid_core.default.views.rowsView;
exports.RowsView = RowsView;
_uiData_grid.default.registerModule("rows", _uiGrid_core.default);
