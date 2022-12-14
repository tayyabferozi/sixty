/**
 * DevExtreme (ui/scheduler/ui.scheduler.header.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _type = require("../../core/utils/type");
var _common = require("../../core/utils/common");
var _extend = require("../../core/utils/extend");
var _iterator = require("../../core/utils/iterator");
var _array = require("../../core/utils/array");
var _inflector = require("../../core/utils/inflector");
var _component_registrator = _interopRequireDefault(require("../../core/component_registrator"));
var _ui = _interopRequireDefault(require("../widget/ui.widget"));
var _uiScheduler = _interopRequireDefault(require("./ui.scheduler.publisher_mixin"));
var _uiScheduler2 = _interopRequireDefault(require("./ui.scheduler.navigator"));
var _drop_down_menu = _interopRequireDefault(require("../drop_down_menu"));
var _tabs = _interopRequireDefault(require("../tabs"));
var _constants = require("../tabs/constants");
var _errors = _interopRequireDefault(require("../../core/errors"));
var _message = _interopRequireDefault(require("../../localization/message"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var COMPONENT_CLASS = "dx-scheduler-header";
var VIEW_SWITCHER_CLASS = "dx-scheduler-view-switcher";
var VIEW_SWITCHER_LABEL_CLASS = "dx-scheduler-view-switcher-label";
var STEP_MAP = {
    day: "day",
    week: "week",
    workWeek: "workWeek",
    month: "month",
    timelineDay: "day",
    timelineWeek: "week",
    timelineWorkWeek: "workWeek",
    timelineMonth: "month",
    agenda: "agenda"
};
var VIEWS = ["day", "week", "workWeek", "month", "timelineDay", "timelineWeek", "timelineWorkWeek", "timelineMonth", "agenda"];
var SchedulerHeader = _ui.default.inherit({
    _getDefaultOptions: function() {
        return (0, _extend.extend)(this.callBase(), {
            views: [],
            isAdaptive: false,
            intervalCount: 1,
            currentView: "day",
            firstDayOfWeek: void 0,
            currentDate: new Date,
            min: void 0,
            max: void 0,
            useDropDownViewSwitcher: false,
            _dropDownButtonIcon: "overlay"
        })
    },
    _setOptionsByReference: function() {
        this.callBase();
        (0, _extend.extend)(this._optionsByReference, {
            currentView: true
        })
    },
    _optionChanged: function(args) {
        var value = args.value;
        debugger;
        switch (args.name) {
            case "views":
                this._validateViews();
                this._viewSwitcher.option({
                    items: value,
                    selectedItem: this.option("currentView")
                });
                break;
            case "customizeDateNavigatorText":
                this._navigator.option(args.name, value);
                break;
            case "currentView":
                this._viewSwitcher.option("selectedItem", value);
                this._navigator.option("step", STEP_MAP[this._getCurrentViewType()]);
                this._changeViewSwitcherLabelText();
                break;
            case "currentDate":
                debugger;
                this._navigator.option("date", value);
                break;
            case "displayedDate":
                this._navigator.option("displayedDate", value);
                break;
            case "min":
            case "max":
            case "firstDayOfWeek":
            case "intervalCount":
                this._navigator.option(args.name, value);
                break;
            case "tabIndex":
            case "focusStateEnabled":
                this._viewSwitcher.option(args.name, value);
                this._navigator.option(args.name, value);
                this.callBase(args);
                break;
            case "useDropDownViewSwitcher":
                this._refreshViewSwitcher();
                break;
            default:
                this.callBase(args)
        }
    },
    _init: function() {
        this.callBase();
        this.$element().addClass(COMPONENT_CLASS)
    },
    _initMarkup: function() {
        this.callBase();
        this._renderNavigator();
        this._renderViewSwitcher()
    },
    _renderNavigator: function() {
        this._navigator = this._createComponent("<div>", _uiScheduler2.default, {
            min: this.option("min"),
            max: this.option("max"),
            intervalCount: this.option("intervalCount"),
            date: this.option("currentDate"),
            step: STEP_MAP[this._getCurrentViewType()],
            firstDayOfWeek: this.option("firstDayOfWeek"),
            tabIndex: this.option("tabIndex"),
            focusStateEnabled: this.option("focusStateEnabled"),
            observer: this.option("observer"),
            customizeDateNavigatorText: this.option("customizeDateNavigatorText"),
            todayDate: this.option("todayDate")
        });
        this._navigator.$element().appendTo(this.$element())
    },
    _renderViewSwitcher: function() {
        this._validateViews();
        var $viewSwitcher = (0, _renderer.default)("<div>").addClass(VIEW_SWITCHER_CLASS).appendTo(this.$element());
        this.option("useDropDownViewSwitcher") ? this._renderViewSwitcherDropDownMenu($viewSwitcher) : this._renderViewSwitcherTabs($viewSwitcher)
    },
    _validateViews: function() {
        var views = this.option("views");
        (0, _iterator.each)(views, function(_, view) {
            var isViewIsObject = (0, _type.isObject)(view);
            var viewType = isViewIsObject && view.type ? view.type : view;
            if ((0, _array.inArray)(viewType, VIEWS) === -1) {
                _errors.default.log("W0008", viewType)
            }
        })
    },
    _getCurrentViewType: function() {
        var currentView = this.option("currentView");
        return currentView.type || currentView
    },
    _renderViewSwitcherTabs: function($element) {
        var that = this;
        $element.addClass(_constants.TABS_EXPANDED_CLASS);
        this._viewSwitcher = this._createComponent($element, _tabs.default, {
            selectionRequired: true,
            scrollingEnabled: true,
            onSelectionChanged: this._updateCurrentView.bind(this),
            items: this.option("views"),
            itemTemplate: function(item) {
                return (0, _renderer.default)("<span>").addClass("dx-tab-text").text(that._getItemText(item))
            },
            selectedItem: this.option("currentView"),
            tabIndex: this.option("tabIndex"),
            focusStateEnabled: this.option("focusStateEnabled")
        })
    },
    _getItemText: function(item) {
        return item.name || _message.default.format("dxScheduler-switcher" + (0, _inflector.camelize)(item.type || item, true))
    },
    _refreshViewSwitcher: function() {
        this._viewSwitcher._dispose();
        this._viewSwitcher.$element().remove();
        delete this._viewSwitcher;
        this._removeViewSwitcherLabel();
        this._renderViewSwitcher()
    },
    _removeViewSwitcherLabel: function() {
        if ((0, _type.isDefined)(this._$viewSwitcherLabel)) {
            this._$viewSwitcherLabel.detach();
            this._$viewSwitcherLabel.remove();
            delete this._$viewSwitcherLabel
        }
    },
    _renderViewSwitcherDropDownMenu: function($element) {
        var that = this;
        this._$viewSwitcherLabel = (0, _renderer.default)("<div>").addClass(VIEW_SWITCHER_LABEL_CLASS).appendTo(this.$element());
        this._changeViewSwitcherLabelText();
        this._viewSwitcher = this._createComponent($element, _drop_down_menu.default, {
            onItemClick: this._updateCurrentView.bind(this),
            buttonIcon: this.option("_dropDownButtonIcon"),
            items: this.option("views"),
            selectionMode: this.option("isAdaptive") ? "single" : "none",
            selectedItemKeys: [this.option("currentView")],
            itemTemplate: function(item) {
                return (0, _renderer.default)("<span>").addClass("dx-dropdownmenu-item-text").text(that._getItemText(item))
            }
        })
    },
    _changeViewSwitcherLabelText: function() {
        if (!(0, _type.isDefined)(this._$viewSwitcherLabel)) {
            return
        }
        var currentView = this.option("currentView");
        var currentViewText = this._getItemText(currentView);
        this._$viewSwitcherLabel.text(currentViewText)
    },
    _getCurrentViewName: function(currentView) {
        return (0, _type.isObject)(currentView) ? currentView.name || currentView.type : currentView
    },
    _updateCurrentView: function(e) {
        var selectedItem = e.itemData || e.component.option("selectedItem");
        var viewName = this._getCurrentViewName(selectedItem);
        this.notifyObserver("currentViewUpdated", viewName)
    },
    _renderFocusTarget: _common.noop
}).include(_uiScheduler.default);
(0, _component_registrator.default)("dxSchedulerHeader", SchedulerHeader);
var _default = SchedulerHeader;
exports.default = _default;
module.exports = exports.default;
