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
exports.View = exports.Scrolling = exports.Resource = exports.Editing = exports.AppointmentDragging = exports.Scheduler = void 0;
var scheduler_1 = require("../devextreme/ui/scheduler");
var PropTypes = require("prop-types");
var component_1 = require("./core/component");
var nested_option_1 = require("./core/nested-option");
var Scheduler = /** @class */ (function (_super) {
    __extends(Scheduler, _super);
    function Scheduler() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._WidgetClass = scheduler_1.default;
        _this.subscribableOptions = ["currentDate", "currentView"];
        _this.independentEvents = ["onAppointmentAdded", "onAppointmentAdding", "onAppointmentClick", "onAppointmentContextMenu", "onAppointmentDblClick", "onAppointmentDeleted", "onAppointmentDeleting", "onAppointmentFormOpening", "onAppointmentRendered", "onAppointmentUpdated", "onAppointmentUpdating", "onCellClick", "onCellContextMenu", "onContentReady", "onDisposing", "onInitialized", "onOptionChanged"];
        _this._defaults = {
            defaultCurrentDate: "currentDate",
            defaultCurrentView: "currentView"
        };
        _this._expectedChildren = {
            appointmentDragging: { optionName: "appointmentDragging", isCollectionItem: false },
            editing: { optionName: "editing", isCollectionItem: false },
            resource: { optionName: "resources", isCollectionItem: true },
            scrolling: { optionName: "scrolling", isCollectionItem: false },
            view: { optionName: "views", isCollectionItem: true }
        };
        _this._templateProps = [{
                tmplOption: "appointmentCollectorTemplate",
                render: "appointmentCollectorRender",
                component: "appointmentCollectorComponent",
                keyFn: "appointmentCollectorKeyFn"
            }, {
                tmplOption: "appointmentTemplate",
                render: "appointmentRender",
                component: "appointmentComponent",
                keyFn: "appointmentKeyFn"
            }, {
                tmplOption: "appointmentTooltipTemplate",
                render: "appointmentTooltipRender",
                component: "appointmentTooltipComponent",
                keyFn: "appointmentTooltipKeyFn"
            }, {
                tmplOption: "dataCellTemplate",
                render: "dataCellRender",
                component: "dataCellComponent",
                keyFn: "dataCellKeyFn"
            }, {
                tmplOption: "dateCellTemplate",
                render: "dateCellRender",
                component: "dateCellComponent",
                keyFn: "dateCellKeyFn"
            }, {
                tmplOption: "resourceCellTemplate",
                render: "resourceCellRender",
                component: "resourceCellComponent",
                keyFn: "resourceCellKeyFn"
            }, {
                tmplOption: "timeCellTemplate",
                render: "timeCellRender",
                component: "timeCellComponent",
                keyFn: "timeCellKeyFn"
            }];
        return _this;
    }
    Object.defineProperty(Scheduler.prototype, "instance", {
        get: function () {
            return this._instance;
        },
        enumerable: false,
        configurable: true
    });
    return Scheduler;
}(component_1.Component));
exports.Scheduler = Scheduler;
Scheduler.propTypes = {
    accessKey: PropTypes.string,
    adaptivityEnabled: PropTypes.bool,
    allDayExpr: PropTypes.string,
    appointmentDragging: PropTypes.object,
    cellDuration: PropTypes.number,
    crossScrollingEnabled: PropTypes.bool,
    currentView: PropTypes.oneOf([
        "agenda",
        "day",
        "month",
        "timelineDay",
        "timelineMonth",
        "timelineWeek",
        "timelineWorkWeek",
        "week",
        "workWeek"
    ]),
    customizeDateNavigatorText: PropTypes.func,
    dataSource: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.object,
        PropTypes.string
    ]),
    dateSerializationFormat: PropTypes.string,
    descriptionExpr: PropTypes.string,
    disabled: PropTypes.bool,
    editing: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.object
    ]),
    elementAttr: PropTypes.object,
    endDateExpr: PropTypes.string,
    endDateTimeZoneExpr: PropTypes.string,
    endDayHour: PropTypes.number,
    firstDayOfWeek: PropTypes.oneOf([
        0,
        1,
        2,
        3,
        4,
        5,
        6
    ]),
    focusStateEnabled: PropTypes.bool,
    groupByDate: PropTypes.bool,
    groups: PropTypes.array,
    height: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.number,
        PropTypes.string
    ]),
    hint: PropTypes.string,
    indicatorUpdateInterval: PropTypes.number,
    maxAppointmentsPerCell: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.oneOf([
            "auto",
            "unlimited"
        ])
    ]),
    noDataText: PropTypes.string,
    onAppointmentAdded: PropTypes.func,
    onAppointmentAdding: PropTypes.func,
    onAppointmentClick: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.string
    ]),
    onAppointmentContextMenu: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.string
    ]),
    onAppointmentDblClick: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.string
    ]),
    onAppointmentDeleted: PropTypes.func,
    onAppointmentDeleting: PropTypes.func,
    onAppointmentFormOpening: PropTypes.func,
    onAppointmentRendered: PropTypes.func,
    onAppointmentUpdated: PropTypes.func,
    onAppointmentUpdating: PropTypes.func,
    onCellClick: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.string
    ]),
    onCellContextMenu: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.string
    ]),
    onContentReady: PropTypes.func,
    onDisposing: PropTypes.func,
    onInitialized: PropTypes.func,
    onOptionChanged: PropTypes.func,
    recurrenceEditMode: PropTypes.oneOf([
        "dialog",
        "occurrence",
        "series"
    ]),
    recurrenceExceptionExpr: PropTypes.string,
    recurrenceRuleExpr: PropTypes.string,
    remoteFiltering: PropTypes.bool,
    resources: PropTypes.array,
    rtlEnabled: PropTypes.bool,
    scrolling: PropTypes.object,
    selectedCellData: PropTypes.array,
    shadeUntilCurrentTime: PropTypes.bool,
    showAllDayPanel: PropTypes.bool,
    showCurrentTimeIndicator: PropTypes.bool,
    startDateExpr: PropTypes.string,
    startDateTimeZoneExpr: PropTypes.string,
    startDayHour: PropTypes.number,
    tabIndex: PropTypes.number,
    textExpr: PropTypes.string,
    timeZone: PropTypes.string,
    useDropDownViewSwitcher: PropTypes.bool,
    views: PropTypes.array,
    visible: PropTypes.bool,
    width: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.number,
        PropTypes.string
    ])
};
var AppointmentDragging = /** @class */ (function (_super) {
    __extends(AppointmentDragging, _super);
    function AppointmentDragging() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AppointmentDragging.OptionName = "appointmentDragging";
    return AppointmentDragging;
}(nested_option_1.default));
exports.AppointmentDragging = AppointmentDragging;
var Editing = /** @class */ (function (_super) {
    __extends(Editing, _super);
    function Editing() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Editing.OptionName = "editing";
    return Editing;
}(nested_option_1.default));
exports.Editing = Editing;
var Resource = /** @class */ (function (_super) {
    __extends(Resource, _super);
    function Resource() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Resource.OptionName = "resources";
    Resource.IsCollectionItem = true;
    return Resource;
}(nested_option_1.default));
exports.Resource = Resource;
var Scrolling = /** @class */ (function (_super) {
    __extends(Scrolling, _super);
    function Scrolling() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Scrolling.OptionName = "scrolling";
    return Scrolling;
}(nested_option_1.default));
exports.Scrolling = Scrolling;
var View = /** @class */ (function (_super) {
    __extends(View, _super);
    function View() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    View.OptionName = "views";
    View.IsCollectionItem = true;
    View.ExpectedChildren = {
        scrolling: { optionName: "scrolling", isCollectionItem: false }
    };
    View.TemplateProps = [{
            tmplOption: "appointmentCollectorTemplate",
            render: "appointmentCollectorRender",
            component: "appointmentCollectorComponent",
            keyFn: "appointmentCollectorKeyFn"
        }, {
            tmplOption: "appointmentTemplate",
            render: "appointmentRender",
            component: "appointmentComponent",
            keyFn: "appointmentKeyFn"
        }, {
            tmplOption: "appointmentTooltipTemplate",
            render: "appointmentTooltipRender",
            component: "appointmentTooltipComponent",
            keyFn: "appointmentTooltipKeyFn"
        }, {
            tmplOption: "dataCellTemplate",
            render: "dataCellRender",
            component: "dataCellComponent",
            keyFn: "dataCellKeyFn"
        }, {
            tmplOption: "dateCellTemplate",
            render: "dateCellRender",
            component: "dateCellComponent",
            keyFn: "dateCellKeyFn"
        }, {
            tmplOption: "dropDownAppointmentTemplate",
            render: "dropDownAppointmentRender",
            component: "dropDownAppointmentComponent",
            keyFn: "dropDownAppointmentKeyFn"
        }, {
            tmplOption: "resourceCellTemplate",
            render: "resourceCellRender",
            component: "resourceCellComponent",
            keyFn: "resourceCellKeyFn"
        }, {
            tmplOption: "timeCellTemplate",
            render: "timeCellRender",
            component: "timeCellComponent",
            keyFn: "timeCellKeyFn"
        }];
    return View;
}(nested_option_1.default));
exports.View = View;
exports.default = Scheduler;
