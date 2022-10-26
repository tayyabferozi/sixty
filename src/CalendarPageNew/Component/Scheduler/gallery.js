/*!
 * devextreme-react
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 *
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file in the root of the project for details.
 *
 * https://github.com/DevExpress/devextreme-react
 */

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Item = exports.Gallery = void 0;
var gallery_1 = require("devextreme/ui/gallery");
var PropTypes = require("prop-types");
var component_1 = require("./core/component");
var nested_option_1 = require("./core/nested-option");
var Gallery = /** @class */ (function (_super) {
    __extends(Gallery, _super);
    function Gallery() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._WidgetClass = gallery_1.default;
        _this.subscribableOptions = ["items", "selectedIndex", "selectedItem"];
        _this.independentEvents = ["onContentReady", "onDisposing", "onInitialized", "onItemClick", "onItemContextMenu", "onItemHold", "onItemRendered", "onOptionChanged", "onSelectionChanged"];
        _this._defaults = {
            defaultItems: "items",
            defaultSelectedIndex: "selectedIndex",
            defaultSelectedItem: "selectedItem"
        };
        _this._expectedChildren = {
            item: { optionName: "items", isCollectionItem: true }
        };
        _this._templateProps = [{
                tmplOption: "itemTemplate",
                render: "itemRender",
                component: "itemComponent",
                keyFn: "itemKeyFn"
            }];
        return _this;
    }
    Object.defineProperty(Gallery.prototype, "instance", {
        get: function () {
            return this._instance;
        },
        enumerable: false,
        configurable: true
    });
    return Gallery;
}(component_1.Component));
exports.Gallery = Gallery;
Gallery.propTypes = {
    accessKey: PropTypes.string,
    animationDuration: PropTypes.number,
    animationEnabled: PropTypes.bool,
    dataSource: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.object,
        PropTypes.string
    ]),
    disabled: PropTypes.bool,
    elementAttr: PropTypes.object,
    focusStateEnabled: PropTypes.bool,
    height: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.number,
        PropTypes.string
    ]),
    hint: PropTypes.string,
    hoverStateEnabled: PropTypes.bool,
    indicatorEnabled: PropTypes.bool,
    initialItemWidth: PropTypes.number,
    itemHoldTimeout: PropTypes.number,
    items: PropTypes.array,
    loop: PropTypes.bool,
    noDataText: PropTypes.string,
    onContentReady: PropTypes.func,
    onDisposing: PropTypes.func,
    onInitialized: PropTypes.func,
    onItemClick: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.string
    ]),
    onItemContextMenu: PropTypes.func,
    onItemHold: PropTypes.func,
    onItemRendered: PropTypes.func,
    onOptionChanged: PropTypes.func,
    onSelectionChanged: PropTypes.func,
    rtlEnabled: PropTypes.bool,
    selectedIndex: PropTypes.number,
    selectedItem: PropTypes.object,
    showIndicator: PropTypes.bool,
    showNavButtons: PropTypes.bool,
    slideshowDelay: PropTypes.number,
    stretchImages: PropTypes.bool,
    swipeEnabled: PropTypes.bool,
    tabIndex: PropTypes.number,
    visible: PropTypes.bool,
    width: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.number,
        PropTypes.string
    ]),
    wrapAround: PropTypes.bool
};
var Item = /** @class */ (function (_super) {
    __extends(Item, _super);
    function Item() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Item.OptionName = "items";
    Item.IsCollectionItem = true;
    Item.TemplateProps = [{
            tmplOption: "template",
            render: "render",
            component: "component",
            keyFn: "keyFn"
        }];
    return Item;
}(nested_option_1.default));
exports.Item = Item;
exports.default = Gallery;
