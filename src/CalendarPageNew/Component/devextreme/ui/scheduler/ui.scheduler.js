/**
 * DevExtreme (ui/scheduler/ui.scheduler.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _component_registrator = _interopRequireDefault(require("../../core/component_registrator"));
var _config = _interopRequireDefault(require("../../core/config"));
var _devices = _interopRequireDefault(require("../../core/devices"));
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _bindable_template = require("../../core/templates/bindable_template");
var _empty_template = require("../../core/templates/empty_template");
var _array = require("../../core/utils/array");
var _browser = _interopRequireDefault(require("../../core/utils/browser"));
var _callbacks = _interopRequireDefault(require("../../core/utils/callbacks"));
var _common = require("../../core/utils/common");
var _data = require("../../core/utils/data");
var _position = require("../../core/utils/position");
var _date = _interopRequireDefault(require("../../core/utils/date"));
var _date_serialization = _interopRequireDefault(require("../../core/utils/date_serialization"));
var _deferred = require("../../core/utils/deferred");
var _extend = require("../../core/utils/extend");
var _iterator = require("../../core/utils/iterator");
var _support = require("../../core/utils/support");
var _type = require("../../core/utils/type");
var _window = require("../../core/utils/window");
var _data_helper = _interopRequireDefault(require("../../data_helper"));
var _visibility_change = require("../../events/visibility_change");
var _date2 = _interopRequireDefault(require("../../localization/date"));
var _message = _interopRequireDefault(require("../../localization/message"));
var _dialog = require("../dialog");
var _themes = require("../themes");
var _ui = _interopRequireDefault(require("../widget/ui.errors"));
var _ui2 = _interopRequireDefault(require("../widget/ui.widget"));
var _appointmentPopup = _interopRequireDefault(require("./appointmentPopup"));
var _compactAppointmentsHelper = require("./compactAppointmentsHelper");
var _desktopTooltipStrategy = require("./tooltip_strategies/desktopTooltipStrategy");
var _mobileTooltipStrategy = require("./tooltip_strategies/mobileTooltipStrategy");
var _ui3 = require("./ui.loading");
var _uiScheduler = _interopRequireDefault(require("./ui.scheduler.appointments"));
var _uiSchedulerAppointments = _interopRequireDefault(require("./ui.scheduler.appointments.layout_manager"));
var _uiScheduler2 = _interopRequireDefault(require("./ui.scheduler.appointment_model"));
var _uiScheduler3 = _interopRequireDefault(require("./ui.scheduler.header"));
var _uiScheduler4 = _interopRequireDefault(require("./ui.scheduler.resource_manager"));
var _uiScheduler5 = _interopRequireDefault(require("./ui.scheduler.subscribes"));
var _recurrence = require("./recurrence");
var _utils = _interopRequireDefault(require("./utils.timeZone"));
var _uiScheduler6 = _interopRequireDefault(require("./workspaces/ui.scheduler.agenda"));
var _uiScheduler7 = _interopRequireDefault(require("./workspaces/ui.scheduler.timeline_day"));
var _uiScheduler8 = _interopRequireDefault(require("./workspaces/ui.scheduler.timeline_month"));
var _uiScheduler9 = _interopRequireDefault(require("./workspaces/ui.scheduler.timeline_week"));
var _uiScheduler10 = _interopRequireDefault(require("./workspaces/ui.scheduler.timeline_work_week"));
var _uiScheduler11 = _interopRequireDefault(require("./workspaces/ui.scheduler.work_space_day"));
var _uiScheduler12 = _interopRequireDefault(require("./workspaces/ui.scheduler.work_space_month"));
var _uiScheduler13 = _interopRequireDefault(require("./workspaces/ui.scheduler.work_space_week"));
var _uiScheduler14 = _interopRequireDefault(require("./workspaces/ui.scheduler.work_space_work_week"));
var _appointmentAdapter = _interopRequireDefault(require("./appointmentAdapter"));
var _timeZoneCalculator = require("./timeZoneCalculator");
var _dataStructures = require("./dataStructures");
var _appointmentSettingsGenerator = require("./appointmentSettingsGenerator");
var _utils2 = _interopRequireDefault(require("./utils"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}

function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly) {
            symbols = symbols.filter(function(sym) {
                return Object.getOwnPropertyDescriptor(object, sym).enumerable
            })
        }
        keys.push.apply(keys, symbols)
    }
    return keys
}

function _objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
        var source = null != arguments[i] ? arguments[i] : {};
        if (i % 2) {
            ownKeys(Object(source), true).forEach(function(key) {
                _defineProperty(target, key, source[key])
            })
        } else {
            if (Object.getOwnPropertyDescriptors) {
                Object.defineProperties(target, Object.getOwnPropertyDescriptors(source))
            } else {
                ownKeys(Object(source)).forEach(function(key) {
                    Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key))
                })
            }
        }
    }
    return target
}

function _defineProperty(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        })
    } else {
        obj[key] = value
    }
    return obj
}

function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    _setPrototypeOf(subClass, superClass)
}

function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function(o, p) {
        o.__proto__ = p;
        return o
    };
    return _setPrototypeOf(o, p)
}
var MINUTES_IN_HOUR = 60;
var WIDGET_CLASS = "dx-scheduler";
var WIDGET_SMALL_CLASS = "".concat(WIDGET_CLASS, "-small");
var WIDGET_ADAPTIVE_CLASS = "".concat(WIDGET_CLASS, "-adaptive");
var WIDGET_WIN_NO_TOUCH_CLASS = "".concat(WIDGET_CLASS, "-win-no-touch");
var WIDGET_READONLY_CLASS = "".concat(WIDGET_CLASS, "-readonly");
var WIDGET_SMALL_WIDTH = 400;
var FULL_DATE_FORMAT = "yyyyMMddTHHmmss";
var UTC_FULL_DATE_FORMAT = FULL_DATE_FORMAT + "Z";
var VIEWS_CONFIG = {
    day: {
        workSpace: _uiScheduler11.default,
        renderingStrategy: "vertical"
    },
    week: {
        workSpace: _uiScheduler13.default,
        renderingStrategy: "vertical"
    },
    workWeek: {
        workSpace: _uiScheduler14.default,
        renderingStrategy: "vertical"
    },
    month: {
        workSpace: _uiScheduler12.default,
        renderingStrategy: "horizontalMonth"
    },
    timelineDay: {
        workSpace: _uiScheduler7.default,
        renderingStrategy: "horizontal"
    },
    timelineWeek: {
        workSpace: _uiScheduler9.default,
        renderingStrategy: "horizontal"
    },
    timelineWorkWeek: {
        workSpace: _uiScheduler10.default,
        renderingStrategy: "horizontal"
    },
    timelineMonth: {
        workSpace: _uiScheduler8.default,
        renderingStrategy: "horizontalMonthLine"
    },
    agenda: {
        workSpace: _uiScheduler6.default,
        renderingStrategy: "agenda"
    }
};
var StoreEventNames = {
    ADDING: "onAppointmentAdding",
    ADDED: "onAppointmentAdded",
    DELETING: "onAppointmentDeleting",
    DELETED: "onAppointmentDeleted",
    UPDATING: "onAppointmentUpdating",
    UPDATED: "onAppointmentUpdated"
};
var Scheduler = function(_Widget) {
    _inheritsLoose(Scheduler, _Widget);

    function Scheduler() {
        return _Widget.apply(this, arguments) || this
    }
    var _proto = Scheduler.prototype;
    _proto._getDefaultOptions = function() {
        var defaultOptions = (0, _extend.extend)(_Widget.prototype._getDefaultOptions.call(this), {
            views: ["day", "week"],
            currentView: "day",
            currentCalendarDate: _date.default.trimTime(new Date),
            currentDate: _date.default.trimTime(new Date),
            min: void 0,
            max: void 0,
            dateSerializationFormat: void 0,
            firstDayOfWeek: void 0,
            groups: [],
            resources: [],
            dataSource: null,
            customizeDateNavigatorText: void 0,
            appointmentTemplate: "item",
            dropDownAppointmentTemplate: "dropDownAppointment",
            appointmentCollectorTemplate: "appointmentCollector",
            dataCellTemplate: null,
            timeCellTemplate: null,
            resourceCellTemplate: null,
            dateCellTemplate: null,
            startDayHour: 0,
            endDayHour: 24,
            editing: {
                allowAdding: true,
                allowDeleting: true,
                allowDragging: true,
                allowResizing: true,
                allowUpdating: true,
                allowTimeZoneEditing: false,
                allowEditingTimeZones: false
            },
            showAllDayPanel: true,
            showCurrentTimeIndicator: true,
            shadeUntilCurrentTime: false,
            indicatorUpdateInterval: 3e5,
            indicatorTime: void 0,
            recurrenceEditMode: "dialog",
            cellDuration: 30,
            maxAppointmentsPerCell: "auto",
            selectedCellData: [],
            groupByDate: false,
            onAppointmentRendered: null,
            onAppointmentClick: null,
            onAppointmentDblClick: null,
            onAppointmentContextMenu: null,
            onCellClick: null,
            onCellContextMenu: null,
            onAppointmentAdding: null,
            onAppointmentAdded: null,
            onAppointmentUpdating: null,
            onAppointmentUpdated: null,
            onAppointmentDeleting: null,
            onAppointmentDeleted: null,
            onAppointmentFormOpening: null,
            appointmentTooltipTemplate: "appointmentTooltip",
            appointmentPopupTemplate: "appointmentPopup",
            crossScrollingEnabled: false,
            useDropDownViewSwitcher: false,
            startDateExpr: "startDate",
            endDateExpr: "endDate",
            textExpr: "text",
            descriptionExpr: "description",
            allDayExpr: "allDay",
            recurrenceRuleExpr: "recurrenceRule",
            recurrenceExceptionExpr: "recurrenceException",
            disabledExpr: "disabled",
            remoteFiltering: false,
            timeZone: "",
            startDateTimeZoneExpr: "startDateTimeZone",
            endDateTimeZoneExpr: "endDateTimeZone",
            noDataText: _message.default.format("dxCollectionWidget-noDataText"),
            adaptivityEnabled: false,
            allowMultipleCellSelection: true,
            scrolling: {
                mode: "standard"
            },
            renovateRender: false,
            _appointmentTooltipOffset: {
                x: 0,
                y: 0
            },
            _appointmentTooltipButtonsPosition: "bottom",
            _appointmentTooltipOpenButtonText: _message.default.format("dxScheduler-openAppointment"),
            _dropDownButtonIcon: "overflow",
            _appointmentCountPerCell: 2,
            _collectorOffset: 0,
            _appointmentOffset: 26
        });
        return (0, _extend.extend)(true, defaultOptions, {
            integrationOptions: {
                useDeferUpdateForTemplates: false
            }
        })
    };
    _proto._defaultOptionsRules = function() {
        return _Widget.prototype._defaultOptionsRules.call(this).concat([{
            device: function() {
                return "desktop" === _devices.default.real().deviceType && !_devices.default.isSimulator()
            },
            options: {
                focusStateEnabled: true
            }
        }, {
            device: function() {
                return !_devices.default.current().generic
            },
            options: {
                useDropDownViewSwitcher: true,
                editing: {
                    allowDragging: false,
                    allowResizing: false
                }
            }
        }, {
            device: function() {
                return (0, _themes.isMaterial)()
            },
            options: {
                useDropDownViewSwitcher: true,
                dateCellTemplate: function(data, index, element) {
                    var text = data.text;
                    text.split(" ").forEach(function(text, index) {
                        var span = (0, _renderer.default)("<span>").text(text).addClass("dx-scheduler-header-panel-cell-date");
                        (0, _renderer.default)(element).append(span);
                        if (!index) {
                            (0, _renderer.default)(element).append(" ")
                        }
                    })
                },
                _appointmentTooltipOffset: {
                    x: 0,
                    y: 11
                },
                _appointmentTooltipButtonsPosition: "top",
                _appointmentTooltipOpenButtonText: null,
                _dropDownButtonIcon: "chevrondown",
                _appointmentCountPerCell: 1,
                _collectorOffset: 20,
                _appointmentOffset: 30
            }
        }])
    };
    _proto._setDeprecatedOptions = function() {
        _Widget.prototype._setDeprecatedOptions.call(this);
        (0, _extend.extend)(this._deprecatedOptions, {
            dropDownAppointmentTemplate: {
                since: "19.2",
                message: "appointmentTooltipTemplate"
            },
            allowEditingTimeZones: {
                since: "20.1",
                alias: "allowTimeZoneEditing"
            }
        })
    };
    _proto._getAppointmentSettingsGenerator = function() {
        return new _appointmentSettingsGenerator.AppointmentSettingsGenerator(this)
    };
    _proto._postponeDataSourceLoading = function(promise) {
        this.postponedOperations.add("_reloadDataSource", this._reloadDataSource.bind(this), promise)
    };
    _proto._postponeResourceLoading = function() {
        var _this = this;
        var whenLoaded = this.postponedOperations.add("_loadResources", function() {
            return _this._loadResources()
        });
        var resolveCallbacks = new _deferred.Deferred;
        whenLoaded.done(function(resources) {
            resolveCallbacks.resolve(resources)
        });
        this._postponeDataSourceLoading(whenLoaded);
        return resolveCallbacks.promise()
    };
    _proto._optionChanged = function(args) {
       
        var _this2 = this;
        var value = args.value;
        var name = args.name;
        switch (args.name) {
            case "customizeDateNavigatorText":
                debugger;
                this._updateOption("header", name, value);
                break;
            case "firstDayOfWeek":
                this._updateOption("workSpace", name, value);
                this._updateOption("header", name, value);
                break;
            case "currentDate":
                debugger;
                value = this._dateOption(name);
                value = _date.default.trimTime(new Date(value));
                this.option("selectedCellData", []);
                this._workSpace.option(name, new Date(value));
               // this._header.option(name, new Date(value));
                //this._header.option("displayedDate", this._workSpace._getViewStartByOptions());
                this._appointments.option("items", []);
                this._filterAppointmentsByDate();
                this._postponeDataSourceLoading();
                
                 break;
            // case "currentCalendarDate":
            //     debugger;
            //    this.fire("currentDateUpdated", this._dateOption(name));
            //     break;
            case "dataSource":
                this._initDataSource();
                this._appointmentModel.setDataSource(this._dataSource);
                this._postponeResourceLoading().done(function(resources) {
                    _this2._filterAppointmentsByDate();
                    _this2._updateOption("workSpace", "showAllDayPanel", _this2.option("showAllDayPanel"))
                });
                break;
            case "min":
            case "max":
                value = this._dateOption(name);
                this._updateOption("header", name, new Date(value));
                this._updateOption("workSpace", name, new Date(value));
                break;
            case "views":
                this._processCurrentView();
                if (this._getCurrentViewOptions()) {
                    this.repaint()
                } else {
                    this._header.option(name, value)
                }
                break;
            case "useDropDownViewSwitcher":
                this._header.option(name, value);
                break;
            case "currentView":
                debugger;
                this._processCurrentView();
                this.fire("validateDayHours");
                this.getLayoutManager().initRenderingStrategy(this._getAppointmentsRenderingStrategy());
                this._validateCellDuration();
                this._appointments.option({
                    items: [],
                    allowDrag: this._allowDragging(),
                    allowResize: this._allowResizing(),
                    itemTemplate: this._getAppointmentTemplate("appointmentTemplate")
                });
                this._postponeResourceLoading().done(function(resources) {
                    _this2._refreshWorkSpace(resources);
                    //_this2._updateHeader();
                    _this2._filterAppointmentsByDate();
                    _this2._appointments.option("allowAllDayResize", "day" !== value)
                });
                break;
            case "appointmentTemplate":
                this._appointments.option("itemTemplate", value);
                break;
            case "dateCellTemplate":
            case "resourceCellTemplate":
            case "dataCellTemplate":
            case "timeCellTemplate":
                this._updateOption("workSpace", name, value);
                this.repaint();
                break;
            case "groups":
                this._postponeResourceLoading().done(function(resources) {
                    _this2._refreshWorkSpace(resources);
                    _this2._filterAppointmentsByDate()
                });
                break;
            case "resources":
                this._resourcesManager.setResources(this.option("resources"));
                this._appointmentModel.setDataAccessors(this._combineDataAccessors());
                this._postponeResourceLoading().done(function(resources) {
                    _this2._appointments.option("items", []);
                    _this2._refreshWorkSpace(resources);
                    _this2._filterAppointmentsByDate()
                });
                break;
            case "startDayHour":
            case "endDayHour":
                this.fire("validateDayHours");
                this._appointments.option("items", []);
                this._updateOption("workSpace", name, value);
                this._appointments.repaint();
                this._filterAppointmentsByDate();
                this._postponeDataSourceLoading();
                break;
            case StoreEventNames.ADDING:
            case StoreEventNames.ADDED:
            case StoreEventNames.UPDATING:
            case StoreEventNames.UPDATED:
            case StoreEventNames.DELETING:
            case StoreEventNames.DELETED:
            case "onAppointmentFormOpening":
                this._actions[name] = this._createActionByOption(name);
                break;
            case "onAppointmentRendered":
                this._appointments.option("onItemRendered", this._getAppointmentRenderedAction());
                break;
            case "onAppointmentClick":
                this._appointments.option("onItemClick", this._createActionByOption(name));
                break;
            case "onAppointmentDblClick":
                this._appointments.option(name, this._createActionByOption(name));
                break;
            case "onAppointmentContextMenu":
                this._appointments.option("onItemContextMenu", this._createActionByOption(name));
                break;
            case "noDataText":
            case "allowMultipleCellSelection":
            case "selectedCellData":
            case "accessKey":
            case "onCellClick":
                this._workSpace.option(name, value);
                break;
            case "onCellContextMenu":
                this._workSpace.option(name, value);
                break;
            case "crossScrollingEnabled":
                this._postponeResourceLoading().done(function(resources) {
                    _this2._appointments.option("items", []);
                    _this2._refreshWorkSpace(resources);
                    if (_this2._readyToRenderAppointments) {
                        _this2._appointments.option("items", _this2._getAppointmentsToRepaint())
                    }
                });
                break;
            case "cellDuration":
                this._validateCellDuration();
                this._appointments.option("items", []);
                if (this._readyToRenderAppointments) {
                    this._updateOption("workSpace", "hoursInterval", value / 60);
                    this._appointments.option("items", this._getAppointmentsToRepaint())
                }
                break;
            case "tabIndex":
            case "focusStateEnabled":
                this._updateOption("header", name, value);
                this._updateOption("workSpace", name, value);
                this._appointments.option(name, value);
                _Widget.prototype._optionChanged.call(this, args);
                break;
            case "width":
                this._updateOption("header", name, value);
                if (this.option("crossScrollingEnabled")) {
                    this._updateOption("workSpace", "width", value)
                }
                _Widget.prototype._optionChanged.call(this, args);
                this._dimensionChanged();
                break;
            case "height":
                _Widget.prototype._optionChanged.call(this, args);
                this._dimensionChanged();
                break;
            case "editing":
                this._initEditing();
                var editing = this._editing;
                this._bringEditingModeToAppointments(editing);
                this.hideAppointmentTooltip();
                this._cleanPopup();
                break;
            case "showAllDayPanel":
                this._postponeResourceLoading().done(function(resources) {
                    _this2._filterAppointmentsByDate();
                    _this2._updateOption("workSpace", "allDayExpanded", value);
                    _this2._updateOption("workSpace", name, value)
                });
                break;
            case "showCurrentTimeIndicator":
            case "indicatorTime":
            case "indicatorUpdateInterval":
            case "shadeUntilCurrentTime":
            case "groupByDate":
                this._updateOption("workSpace", name, value);
                this.repaint();
                break;
            case "appointmentDragging":
            case "appointmentTooltipTemplate":
            case "appointmentPopupTemplate":
            case "recurrenceEditMode":
            case "remoteFiltering":
            case "timeZone":
            case "dropDownAppointmentTemplate":
            case "appointmentCollectorTemplate":
            case "_appointmentTooltipOffset":
            case "_appointmentTooltipButtonsPosition":
            case "_appointmentTooltipOpenButtonText":
            case "_dropDownButtonIcon":
            case "_appointmentCountPerCell":
            case "_collectorOffset":
            case "_appointmentOffset":
                this.repaint();
                break;
            case "dateSerializationFormat":
                break;
            case "maxAppointmentsPerCell":
                break;
            case "startDateExpr":
            case "endDateExpr":
            case "startDateTimeZoneExpr":
            case "endDateTimeZoneExpr":
            case "textExpr":
            case "descriptionExpr":
            case "allDayExpr":
            case "recurrenceRuleExpr":
            case "recurrenceExceptionExpr":
            case "disabledExpr":
                this._updateExpression(name, value);
                this._appointmentModel.setDataAccessors(this._combineDataAccessors());
                this._initAppointmentTemplate();
                this.repaint();
                break;
            case "adaptivityEnabled":
                this._toggleAdaptiveClass();
                this.repaint();
                break;
            case "scrolling":
                this._updateOption("workSpace", args.fullName, value);
                break;
            case "renovateRender":
                this._updateOption("workSpace", name, value);
                break;
            default:
                _Widget.prototype._optionChanged.call(this, args)
        }
    };
    _proto._updateHeader = function() {
        var viewCountConfig = this._getViewCountConfig();
        this._header.option("intervalCount", viewCountConfig.intervalCount);
        this._header.option("displayedDate", this._workSpace._getViewStartByOptions());
        this._header.option("min", this._dateOption("min"));
        this._header.option("max", this._dateOption("max"));
        this._header.option("currentDate", this._dateOption("currentDate"));
        this._header.option("firstDayOfWeek", this._getCurrentViewOption("firstDayOfWeek"));
        this._header.option("currentView", this._currentView)
    };
    _proto._dateOption = function(optionName) {
        var optionValue = this._getCurrentViewOption(optionName);
        return _date_serialization.default.deserializeDate(optionValue)
    };
    _proto._getSerializationFormat = function(optionName) {
        var value = this._getCurrentViewOption(optionName);
        if ("number" === typeof value) {
            return "number"
        }
        if (!(0, _type.isString)(value)) {
            return
        }
        return _date_serialization.default.getDateSerializationFormat(value)
    };
    _proto._bringEditingModeToAppointments = function(editing) {
        var editingConfig = {
            allowDelete: editing.allowUpdating && editing.allowDeleting
        };
        if (!this._isAgenda()) {
            editingConfig.allowDrag = editing.allowDragging;
            editingConfig.allowResize = editing.allowResizing;
            editingConfig.allowAllDayResize = editing.allowResizing && this._supportAllDayResizing()
        }
        this._appointments.option(editingConfig);
        this.repaint()
    };
    _proto._isAgenda = function() {
        return "agenda" === this._getAppointmentsRenderingStrategy()
    };
    _proto._allowDragging = function() {
        return this._editing.allowDragging && !this._isAgenda()
    };
    _proto._allowResizing = function() {
        return this._editing.allowResizing && !this._isAgenda()
    };
    _proto._allowAllDayResizing = function() {
        return this._editing.allowResizing && this._supportAllDayResizing()
    };
    _proto._supportAllDayResizing = function() {
        return "day" !== this._getCurrentViewType() || this._currentView.intervalCount > 1
    };
    _proto._isAllDayExpanded = function(items) {
        return this.option("showAllDayPanel") && this._appointmentModel.hasAllDayAppointments(items, this._getCurrentViewOption("startDayHour"), this._getCurrentViewOption("endDayHour"))
    };
    _proto._getTimezoneOffsetByOption = function(date) {
        return _utils.default.calculateTimezoneByValue(this.option("timeZone"), date)
    };
    _proto._filterAppointmentsByDate = function() {
        var dateRange = this._workSpace.getDateRange();
        this._appointmentModel.filterByDate(dateRange[0], dateRange[1], this.option("remoteFiltering"), this.option("dateSerializationFormat"))
    };
    _proto._loadResources = function() {
        var groups = this._getCurrentViewOption("groups");
        var result = new _deferred.Deferred;
        this._resourcesManager.loadResources(groups).done(function(resources) {
            this._loadedResources = resources;
            result.resolve(resources)
        }.bind(this));
        return result.promise()
    };
    _proto._reloadDataSource = function() {
        var result = new _deferred.Deferred;
        if (this._dataSource) {
            this._dataSource.load().done(function() {
                (0, _ui3.hide)();
                this._fireContentReadyAction(result)
            }.bind(this)).fail(function() {
                (0, _ui3.hide)();
                result.reject()
            });
            this._dataSource.isLoading() && (0, _ui3.show)({
                container: this.$element(),
                position: {
                    of: this.$element()
                }
            })
        } else {
            this._fireContentReadyAction(result)
        }
        return result.promise()
    };
    _proto._fireContentReadyAction = function(result) {
        var contentReadyBase = _Widget.prototype._fireContentReadyAction.bind(this);
        var fireContentReady = function() {
            contentReadyBase();
            null === result || void 0 === result ? void 0 : result.resolve()
        };
        if (this._workSpaceRecalculation) {
            var _this$_workSpaceRecal;
            null === (_this$_workSpaceRecal = this._workSpaceRecalculation) || void 0 === _this$_workSpaceRecal ? void 0 : _this$_workSpaceRecal.done(function() {
                fireContentReady()
            })
        } else {
            fireContentReady()
        }
    };
    _proto._dimensionChanged = function() {
        var filteredItems = this.getFilteredItems();
        this._toggleSmallClass();
        if (!this._isAgenda() && filteredItems && this._isVisible()) {
            this._workSpace._cleanAllowedPositions();
            this._workSpace.option("allDayExpanded", this._isAllDayExpanded(filteredItems));
            this._workSpace._dimensionChanged();
            var appointments = this._layoutManager.createAppointmentsMap(filteredItems);
            this._appointments.option("items", appointments)
        }
        this.hideAppointmentTooltip();
        this._appointmentPopup.triggerResize();
        this._appointmentPopup.updatePopupFullScreenMode()
    };
    _proto._clean = function() {
        this._cleanPopup();
        _Widget.prototype._clean.call(this)
    };
    _proto._toggleSmallClass = function() {
        var width = (0, _position.getBoundingRect)(this.$element().get(0)).width;
        this.$element().toggleClass(WIDGET_SMALL_CLASS, width < WIDGET_SMALL_WIDTH)
    };
    _proto._toggleAdaptiveClass = function() {
        this.$element().toggleClass(WIDGET_ADAPTIVE_CLASS, this.option("adaptivityEnabled"))
    };
    _proto._visibilityChanged = function(visible) {
        visible && this._dimensionChanged()
    };
    _proto._dataSourceOptions = function() {
        return {
            paginate: false
        }
    };
    _proto._init = function() {
        var _this3 = this;
        this._initExpressions({
            startDate: this.option("startDateExpr"),
            endDate: this.option("endDateExpr"),
            startDateTimeZone: this.option("startDateTimeZoneExpr"),
            endDateTimeZone: this.option("endDateTimeZoneExpr"),
            allDay: this.option("allDayExpr"),
            text: this.option("textExpr"),
            description: this.option("descriptionExpr"),
            recurrenceRule: this.option("recurrenceRuleExpr"),
            recurrenceException: this.option("recurrenceExceptionExpr"),
            disabled: this.option("disabledExpr")
        });
        _Widget.prototype._init.call(this);
        this._initDataSource();
        this._loadedResources = [];
        this.$element().addClass(WIDGET_CLASS).toggleClass(WIDGET_WIN_NO_TOUCH_CLASS, !!(_browser.default.msie && _support.touch));
        this._initEditing();
        this._resourcesManager = new _uiScheduler4.default(this.option("resources"));
        var combinedDataAccessors = this._combineDataAccessors();
        this._appointmentModel = new _uiScheduler2.default(this._dataSource, combinedDataAccessors, this.getAppointmentDurationInMinutes());
        this._initActions();
        this._compactAppointmentsHelper = new _compactAppointmentsHelper.CompactAppointmentsHelper(this);
        this._asyncTemplatesTimers = [];
        this._dataSourceLoadedCallback = (0, _callbacks.default)();
        this._subscribes = _uiScheduler5.default;
        this.timeZoneCalculator = new _timeZoneCalculator.TimeZoneCalculator({
            getClientOffset: function(date) {
                return _utils.default.getClientTimezoneOffset(date)
            },
            getCommonOffset: function(date, timeZone) {
                return _utils.default.calculateTimezoneByValue(timeZone || _this3.option("timeZone"), date)
            },
            getAppointmentOffset: function(date, appointmentTimezone) {
                return _utils.default.calculateTimezoneByValue(appointmentTimezone, date)
            }
        })
    };
    _proto._initTemplates = function() {
        this._initAppointmentTemplate();
        this._templateManager.addDefaultTemplates({
            appointmentTooltip: new _empty_template.EmptyTemplate,
            dropDownAppointment: new _empty_template.EmptyTemplate
        });
        _Widget.prototype._initTemplates.call(this)
    };
    _proto._initAppointmentTemplate = function() {
        var _this4 = this;
        var expr = this._dataAccessors.expr;
        var createGetter = function(property) {
            return (0, _data.compileGetter)("appointmentData.".concat(property))
        };
        this._templateManager.addDefaultTemplates(_defineProperty({}, "item", new _bindable_template.BindableTemplate(function($container, data, model) {
            _this4.getAppointmentsInstance()._renderAppointmentTemplate($container, data, model)
        }, ["html", "text", "startDate", "endDate", "allDay", "description", "recurrenceRule", "recurrenceException", "startDateTimeZone", "endDateTimeZone"], this.option("integrationOptions.watchMethod"), {
            text: createGetter(expr.textExpr),
            startDate: createGetter(expr.startDateExpr),
            endDate: createGetter(expr.endDateExpr),
            startDateTimeZone: createGetter(expr.startDateTimeZoneExpr),
            endDateTimeZone: createGetter(expr.endDateTimeZoneExpr),
            allDay: createGetter(expr.allDayExpr),
            recurrenceRule: createGetter(expr.recurrenceRuleExpr)
        })))
    };
    _proto._combineDataAccessors = function() {
        var resourcesDataAccessors = this._resourcesManager._dataAccessors;
        var result = (0, _extend.extend)(true, {}, this._dataAccessors);
        (0, _iterator.each)(resourcesDataAccessors, function(type, accessor) {
            result[type].resources = accessor
        }.bind(this));
        return result
    };
    _proto._renderContent = function() {
        this._renderContentImpl()
    };
    _proto._dataSourceChangedHandler = function(result) {
        if (this._readyToRenderAppointments) {
            this._workSpaceRecalculation.done(function() {
                this._renderAppointments();
                if (this._isAgenda()) {
                    this._workSpace._renderView();
                    this._dataSourceLoadedCallback.fireWith(this, [this.getFilteredItems()])
                }
            }.bind(this))
        }
    };
    _proto.isVirtualScrolling = function() {
        var _this$getWorkSpace;
        return null === (_this$getWorkSpace = this.getWorkSpace()) || void 0 === _this$getWorkSpace ? void 0 : _this$getWorkSpace.isVirtualScrolling()
    };
    _proto._filterAppointments = function() {
        var prerenderFilterName = this.isVirtualScrolling() ? "prerenderFilterVirtual" : "prerenderFilter";
        return this.fire(prerenderFilterName)
    };
    _proto._renderAppointments = function() {
        this._filteredItems = this._filterAppointments();
        this._workSpace.option("allDayExpanded", this._isAllDayExpanded(this._filteredItems));
        if (this._isAgenda()) {
            this.getRenderingStrategyInstance().calculateRows(this._filteredItems, 7, this.option("currentDate"), true)
        }
        if (this._filteredItems.length && this._isVisible()) {
            this._appointments.option("items", this._getAppointmentsToRepaint());
            this._appointmentModel.cleanModelState()
        } else {
            this._appointments.option("items", [])
        }
    };
    _proto._getAppointmentsToRepaint = function() {
        var appointments = this._layoutManager.createAppointmentsMap(this._filteredItems);
        return this._layoutManager.getRepaintedAppointments(appointments, this.getAppointmentsInstance().option("items"))
    };
    _proto._initExpressions = function(fields) {
        var isDateField = function(field) {
            return "startDate" === field || "endDate" === field
        };
        if (!this._dataAccessors) {
            this._dataAccessors = {
                getter: {},
                setter: {},
                expr: {}
            }
        }(0, _iterator.each)(fields, function(name, expr) {
            if (expr) {
                var getter = (0, _data.compileGetter)(expr);
                var setter = (0, _data.compileSetter)(expr);
                var dateGetter;
                var dateSetter;
                if (isDateField(name)) {
                    var that = this;
                    dateGetter = function() {
                        var value = getter.apply(this, arguments);
                        if ((0, _config.default)().forceIsoDateParsing) {
                            if (!that.option("dateSerializationFormat")) {
                                var format = _date_serialization.default.getDateSerializationFormat(value);
                                if (format) {
                                    that.option("dateSerializationFormat", format)
                                }
                            }
                            value = _date_serialization.default.deserializeDate(value)
                        }
                        return value
                    };
                    dateSetter = function(object, value) {
                        if ((0, _config.default)().forceIsoDateParsing || that.option("dateSerializationFormat")) {
                            value = _date_serialization.default.serializeDate(value, that.option("dateSerializationFormat"))
                        }
                        setter.call(this, object, value)
                    }
                }
                this._dataAccessors.getter[name] = dateGetter || getter;
                this._dataAccessors.setter[name] = dateSetter || setter;
                this._dataAccessors.expr[name + "Expr"] = expr
            } else {
                delete this._dataAccessors.getter[name];
                delete this._dataAccessors.setter[name];
                delete this._dataAccessors.expr[name + "Expr"]
            }
        }.bind(this))
    };
    _proto._updateExpression = function(name, value) {
        var exprObj = {};
        exprObj[name.replace("Expr", "")] = value;
        this._initExpressions(exprObj)
    };
    _proto._initEditing = function() {
        var editing = this.option("editing");
        this._editing = {
            allowAdding: !!editing,
            allowUpdating: !!editing,
            allowDeleting: !!editing,
            allowResizing: !!editing,
            allowDragging: !!editing
        };
        if ((0, _type.isObject)(editing)) {
            this._editing = (0, _extend.extend)(this._editing, editing)
        }
        this._editing.allowDragging = this._editing.allowDragging && this._editing.allowUpdating;
        this._editing.allowResizing = this._editing.allowResizing && this._editing.allowUpdating;
        this.$element().toggleClass(WIDGET_READONLY_CLASS, this._isReadOnly())
    };
    _proto._isReadOnly = function() {
        var result = true;
        var editing = this._editing;
        for (var prop in editing) {
            if (Object.prototype.hasOwnProperty.call(editing, prop)) {
                result = result && !editing[prop]
            }
        }
        return result
    };
    _proto._dispose = function() {
        this._appointmentTooltip && this._appointmentTooltip.dispose();
        this.hideAppointmentPopup();
        this.hideAppointmentTooltip();
        this._asyncTemplatesTimers.forEach(clearTimeout);
        this._asyncTemplatesTimers = [];
        _Widget.prototype._dispose.call(this)
    };
    _proto._initActions = function() {
        this._actions = {
            onAppointmentAdding: this._createActionByOption(StoreEventNames.ADDING),
            onAppointmentAdded: this._createActionByOption(StoreEventNames.ADDED),
            onAppointmentUpdating: this._createActionByOption(StoreEventNames.UPDATING),
            onAppointmentUpdated: this._createActionByOption(StoreEventNames.UPDATED),
            onAppointmentDeleting: this._createActionByOption(StoreEventNames.DELETING),
            onAppointmentDeleted: this._createActionByOption(StoreEventNames.DELETED),
            onAppointmentFormOpening: this._createActionByOption("onAppointmentFormOpening")
        }
    };
    _proto._getAppointmentRenderedAction = function() {
        return this._createActionByOption("onAppointmentRendered", {
            excludeValidators: ["disabled", "readOnly"]
        })
    };
    _proto._renderFocusTarget = function() {
        return (0, _common.noop)()
    };
    _proto._initMarkup = function() {
        _Widget.prototype._initMarkup.call(this);
        this.fire("validateDayHours");
        this._validateCellDuration();
        this._processCurrentView();
       // this._renderHeader();
        this._layoutManager = new _uiSchedulerAppointments.default(this, this._getAppointmentsRenderingStrategy());
        this._appointments = this._createComponent("<div>", _uiScheduler.default, this._appointmentsConfig());
        this._appointments.option("itemTemplate", this._getAppointmentTemplate("appointmentTemplate"));
        this._appointmentTooltip = new(this.option("adaptivityEnabled") ? _mobileTooltipStrategy.MobileTooltipStrategy : _desktopTooltipStrategy.DesktopTooltipStrategy)(this._getAppointmentTooltipOptions());
        this._appointmentPopup = new _appointmentPopup.default(this);
        if (this._isLoaded() || this._isDataSourceLoading()) {
            this._initMarkupCore(this._loadedResources);
            this._dataSourceChangedHandler(this._dataSource.items());
            this._fireContentReadyAction()
        } else {
            this._loadResources().done(function(resources) {
                this._initMarkupCore(resources);
                this._reloadDataSource()
            }.bind(this))
        }
    };
    _proto._getAppointmentTooltipOptions = function() {
        var _this5 = this;
        var that = this;
        return {
            createComponent: that._createComponent.bind(that),
            container: that.$element(),
            getScrollableContainer: that.getWorkSpaceScrollableContainer.bind(that),
            addDefaultTemplates: that._templateManager.addDefaultTemplates.bind(that._templateManager),
            getAppointmentTemplate: that._getAppointmentTemplate.bind(that),
            showAppointmentPopup: that.showAppointmentPopup.bind(that),
            checkAndDeleteAppointment: that.checkAndDeleteAppointment.bind(that),
            isAppointmentInAllDayPanel: that.isAppointmentInAllDayPanel.bind(that),
            createFormattedDateText: function(appointment, targetedAppointment, format) {
                return _this5.fire("getTextAndFormatDate", appointment, targetedAppointment, format)
            },
            getAppointmentDisabled: function(appointment) {
                return _this5.createAppointmentAdapter(appointment).disabled
            }
        }
    };
    _proto.checkAndDeleteAppointment = function(appointment, targetedAppointment) {
        var _this6 = this;
        var targetedAdapter = this.createAppointmentAdapter(targetedAppointment);
        this._checkRecurringAppointment(appointment, targetedAppointment, targetedAdapter.startDate, function() {
            _this6.deleteAppointment(appointment)
        }, true)
    };
    _proto._getExtraAppointmentTooltipOptions = function() {
        return {
            rtlEnabled: this.option("rtlEnabled"),
            focusStateEnabled: this.option("focusStateEnabled"),
            editing: this.option("editing"),
            offset: this.option("_appointmentTooltipOffset")
        }
    };
    _proto.isAppointmentInAllDayPanel = function(appointmentData) {
        var workSpace = this._workSpace;
        var itTakesAllDay = this.appointmentTakesAllDay(appointmentData);
        return itTakesAllDay && workSpace.supportAllDayRow() && workSpace.option("showAllDayPanel")
    };
    _proto._initMarkupCore = function(resources) {
        var _this7 = this;
        this._readyToRenderAppointments = (0, _window.hasWindow)();
        this._workSpace && this._cleanWorkspace();
        this._renderWorkSpace(resources);
        this._appointments.option({
            fixedContainer: this._workSpace.getFixedContainer(),
            allDayContainer: this._workSpace.getAllDayContainer()
        });
        this._waitAsyncTemplate(function() {
            var _this7$_workSpaceReca;
            return null === (_this7$_workSpaceReca = _this7._workSpaceRecalculation) || void 0 === _this7$_workSpaceReca ? void 0 : _this7$_workSpaceReca.resolve()
        });
        this._filterAppointmentsByDate()
    };
    _proto._isLoaded = function() {
        return this._isResourcesLoaded() && this._isDataSourceLoaded()
    };
    _proto._isResourcesLoaded = function() {
        return (0, _type.isDefined)(this._loadedResources)
    };
    _proto._isDataSourceLoaded = function() {
        return this._dataSource && this._dataSource.isLoaded()
    };
    _proto._render = function() {
        this._toggleSmallClass();
        this._toggleAdaptiveClass();
        _Widget.prototype._render.call(this)
    };
    _proto._renderHeader = function() {
         var $header = (0, _renderer.default)("<div>").appendTo(this.$element());
        this._header = this._createComponent($header, _uiScheduler3.default, this._headerConfig())
    };
    _proto._headerConfig = function() {
        var _this8 = this;
        var currentViewOptions = this._getCurrentViewOptions();
        var countConfig = this._getViewCountConfig();
        var result = (0, _extend.extend)({
            isAdaptive: this.option("adaptivityEnabled"),
            firstDayOfWeek: this.option("firstDayOfWeek"),
            currentView: this._currentView,
            tabIndex: this.option("tabIndex"),
            focusStateEnabled: this.option("focusStateEnabled"),
            width: this.option("width"),
            rtlEnabled: this.option("rtlEnabled"),
            useDropDownViewSwitcher: this.option("useDropDownViewSwitcher"),
            _dropDownButtonIcon: this.option("_dropDownButtonIcon"),
            customizeDateNavigatorText: this.option("customizeDateNavigatorText")
        }, currentViewOptions);
        result.observer = this;
        result.intervalCount = countConfig.intervalCount;
        result.views = this.option("views");
        result.min = new Date(this._dateOption("min"));
        result.max = new Date(this._dateOption("max"));
        result.currentDate = _date.default.trimTime(new Date(this._dateOption("currentDate")));
        result.todayDate = function() {
            var result = _this8.timeZoneCalculator.createDate(new Date, {
                path: "toGrid"
            });
            return result
        };
        return result
    };
    _proto._appointmentsConfig = function() {
        var that = this;
        var config = {
            observer: this,
            onItemRendered: this._getAppointmentRenderedAction(),
            onItemClick: this._createActionByOption("onAppointmentClick"),
            onItemContextMenu: this._createActionByOption("onAppointmentContextMenu"),
            onAppointmentDblClick: this._createActionByOption("onAppointmentDblClick"),
            tabIndex: this.option("tabIndex"),
            focusStateEnabled: this.option("focusStateEnabled"),
            allowDrag: this._allowDragging(),
            allowDelete: this._editing.allowUpdating && this._editing.allowDeleting,
            allowResize: this._allowResizing(),
            allowAllDayResize: this._allowAllDayResizing(),
            rtlEnabled: this.option("rtlEnabled"),
            currentView: this.option("currentView"),
            onContentReady: function() {
                that._workSpace && that._workSpace.option("allDayExpanded", that._isAllDayExpanded(that.getFilteredItems()))
            }
        };
        return config
    };
    _proto.getCollectorOffset = function() {
        if (this._workSpace.needApplyCollectorOffset() && !this.option("adaptivityEnabled")) {
            return this.option("_collectorOffset")
        } else {
            return 0
        }
    };
    _proto.getAppointmentDurationInMinutes = function() {
        return this._getCurrentViewOption("cellDuration")
    };
    _proto._processCurrentView = function() {
        var views = this.option("views");
        var currentView = this.option("currentView");
        var that = this;
        this._currentView = currentView;
        (0, _iterator.each)(views, function(_, view) {
            var isViewIsObject = (0, _type.isObject)(view);
            var viewName = isViewIsObject ? view.name : view;
            var viewType = view.type;
            if (currentView === viewName || currentView === viewType) {
                that._currentView = view;
                return false
            }
        })
    };
    _proto._validateCellDuration = function() {
        var endDayHour = this._getCurrentViewOption("endDayHour");
        var startDayHour = this._getCurrentViewOption("startDayHour");
        var cellDuration = this._getCurrentViewOption("cellDuration");
        if ((endDayHour - startDayHour) * MINUTES_IN_HOUR % cellDuration !== 0) {
            _ui.default.log("W1015")
        }
    };
    _proto._getCurrentViewType = function() {
        return this._currentView.type || this._currentView
    };
    _proto._getAppointmentsRenderingStrategy = function() {
        return VIEWS_CONFIG[this._getCurrentViewType()].renderingStrategy
    };
    _proto._renderWorkSpace = function(groups) {
        debugger;
        this._readyToRenderAppointments && this._toggleSmallClass();
        var $workSpace = (0, _renderer.default)("<div>").appendTo(this.$element());
        var countConfig = this._getViewCountConfig();
        var workSpaceComponent = VIEWS_CONFIG[this._getCurrentViewType()].workSpace;
        var workSpaceConfig = this._workSpaceConfig(groups, countConfig);
        this._workSpace = this._createComponent($workSpace, workSpaceComponent, workSpaceConfig);
        this._allowDragging() && this._workSpace.initDragBehavior(this, this._all);
        this._workSpace._attachTablesEvents();
        this._workSpace.getWorkArea().append(this._appointments.$element());
        this._recalculateWorkspace();
        countConfig.startDate && this._header && this._header.option("currentDate", this._workSpace._getHeaderDate());
        this._appointments.option("_collectorOffset", this.getCollectorOffset())
    };
    _proto._getViewCountConfig = function() {
        var currentView = this.option("currentView");
        var view = this._getViewByName(currentView);
        var viewCount = view && view.intervalCount || 1;
        var startDate = view && view.startDate || null;
        return {
            intervalCount: viewCount,
            startDate: startDate
        }
    };
    _proto._getViewByName = function(name) {
        var views = this.option("views");
        for (var i = 0; i < views.length; i++) {
            if (views[i].name === name || views[i].type === name || views[i] === name) {
                return views[i]
            }
        }
    };
    _proto._recalculateWorkspace = function() {
        var _this9 = this;
        this._workSpaceRecalculation = new _deferred.Deferred;
        this._waitAsyncTemplate(function() {
            (0, _visibility_change.triggerResizeEvent)(_this9._workSpace.$element());
            _this9._workSpace._refreshDateTimeIndication()
        })
    };
    _proto._workSpaceConfig = function(groups, countConfig) {
        var _currentViewOptions$s, _this10 = this;
        var currentViewOptions = this._getCurrentViewOptions();
        var scrolling = this.option("scrolling");
        var result = (0, _extend.extend)({
            noDataText: this.option("noDataText"),
            firstDayOfWeek: this.option("firstDayOfWeek"),
            startDayHour: this.option("startDayHour"),
            endDayHour: this.option("endDayHour"),
            tabIndex: this.option("tabIndex"),
            accessKey: this.option("accessKey"),
            focusStateEnabled: this.option("focusStateEnabled"),
            cellDuration: this.option("cellDuration"),
            showAllDayPanel: this.option("showAllDayPanel"),
            showCurrentTimeIndicator: this.option("showCurrentTimeIndicator"),
            indicatorTime: this.option("indicatorTime"),
            indicatorUpdateInterval: this.option("indicatorUpdateInterval"),
            shadeUntilCurrentTime: this.option("shadeUntilCurrentTime"),
            allDayExpanded: this._appointments.option("items"),
            crossScrollingEnabled: this.option("crossScrollingEnabled"),
            dataCellTemplate: this.option("dataCellTemplate"),
            timeCellTemplate: this.option("timeCellTemplate"),
            resourceCellTemplate: this.option("resourceCellTemplate"),
            dateCellTemplate: this.option("dateCellTemplate"),
            allowMultipleCellSelection: this.option("allowMultipleCellSelection"),
            selectedCellData: this.option("selectedCellData"),
            onSelectionChanged: function(args) {
                _this10.option("selectedCellData", args.selectedCellData)
            },
            groupByDate: this._getCurrentViewOption("groupByDate"),
            scrolling: scrolling,
            renovateRender: this.option("renovateRender") || "virtual" === scrolling.mode || "virtual" === (null === (_currentViewOptions$s = currentViewOptions.scrolling) || void 0 === _currentViewOptions$s ? void 0 : _currentViewOptions$s.mode)
        }, currentViewOptions);
        result.observer = this;
        result.intervalCount = countConfig.intervalCount;
        result.startDate = countConfig.startDate;
        result.groups = groups;
        result.onCellClick = this._createActionByOption("onCellClick");
        result.onCellContextMenu = this._createActionByOption("onCellContextMenu");
        result.min = new Date(this._dateOption("min"));
        result.max = new Date(this._dateOption("max"));
        result.currentDate = _date.default.trimTime(new Date(this._dateOption("currentDate")));
        result.hoursInterval = result.cellDuration / 60;
        result.allDayExpanded = this._isAllDayExpanded(this.getFilteredItems());
        result.dataCellTemplate = result.dataCellTemplate ? this._getTemplate(result.dataCellTemplate) : null;
        result.timeCellTemplate = result.timeCellTemplate ? this._getTemplate(result.timeCellTemplate) : null;
        result.resourceCellTemplate = result.resourceCellTemplate ? this._getTemplate(result.resourceCellTemplate) : null;
        result.dateCellTemplate = result.dateCellTemplate ? this._getTemplate(result.dateCellTemplate) : null;
        return result
    };
    _proto._waitAsyncTemplate = function(callback) {
        if (this._options.silent("templatesRenderAsynchronously")) {
            var timer = setTimeout(function() {
                callback();
                clearTimeout(timer)
            });
            this._asyncTemplatesTimers.push(timer)
        } else {
            callback()
        }
    };
    _proto._getCurrentViewOptions = function() {
        return this._currentView
    };
    _proto._getCurrentViewOption = function(optionName) {
        var currentViewOptions = this._getCurrentViewOptions();
        if (currentViewOptions && void 0 !== currentViewOptions[optionName]) {
            return currentViewOptions[optionName]
        }
        return this.option(optionName)
    };
    _proto._getAppointmentTemplate = function(optionName) {
        var currentViewOptions = this._getCurrentViewOptions();
        if (currentViewOptions && currentViewOptions[optionName]) {
            return this._getTemplate(currentViewOptions[optionName])
        }
        return this._getTemplateByOption(optionName)
    };
    _proto._updateOption = function(viewName, optionName, value) {
        var currentViewOptions = this._getCurrentViewOptions();
        if (!currentViewOptions || !(0, _type.isDefined)(currentViewOptions[optionName])) {
            this["_" + viewName].option(optionName, value)
        }
    };
    _proto._refreshWorkSpace = function(groups) {
        var _this11 = this;
        this._cleanWorkspace();
        delete this._workSpace;
        this._renderWorkSpace(groups);
        if (this._readyToRenderAppointments) {
            this._appointments.option({
                fixedContainer: this._workSpace.getFixedContainer(),
                allDayContainer: this._workSpace.getAllDayContainer()
            });
            this._waitAsyncTemplate(function() {
                return _this11._workSpaceRecalculation.resolve()
            })
        }
    };
    _proto._cleanWorkspace = function() {
        this._appointments.$element().detach();
        this._workSpace._dispose();
        this._workSpace.$element().remove();
        this.option("selectedCellData", [])
    };
    _proto.getWorkSpaceScrollable = function() {
        return this._workSpace.getScrollable()
    };
    _proto.getWorkSpaceScrollableScrollTop = function(allDay) {
        return this._workSpace.getGroupedScrollableScrollTop(allDay)
    };
    _proto.getWorkSpaceScrollableScrollLeft = function() {
        return this._workSpace.getScrollableScrollLeft()
    };
    _proto.getWorkSpaceScrollableContainer = function() {
        return this._workSpace.getScrollableContainer()
    };
    _proto.getWorkSpaceAllDayHeight = function() {
        return this._workSpace.getAllDayHeight()
    };
    _proto.getWorkSpaceAllDayOffset = function() {
        return this._workSpace.getAllDayOffset()
    };
    _proto.getWorkSpaceHeaderPanelHeight = function() {
        return this._workSpace.getHeaderPanelHeight()
    };
    _proto.getWorkSpaceDateTableOffset = function() {
        return !this.option("crossScrollingEnabled") || this.option("rtlEnabled") ? this._workSpace.getWorkSpaceLeftOffset() : 0
    };
    _proto.getWorkSpace = function() {
        return this._workSpace
    };
    _proto.getAppointmentModel = function() {
        return this._appointmentModel
    };
    _proto.getHeader = function() {
        return this._header
    };
    _proto.getMaxAppointmentsPerCell = function() {
        return this._getCurrentViewOption("maxAppointmentsPerCell")
    };
    _proto._cleanPopup = function() {
        this._appointmentPopup && this._appointmentPopup.dispose()
    };
    _proto._checkRecurringAppointment = function(targetAppointment, singleAppointment, exceptionDate, callback, isDeleted, isPopupEditing, dragEvent) {
        var _this12 = this;
        delete this._updatedRecAppointment;
        var recurrenceRule = this.fire("getField", "recurrenceRule", targetAppointment);
        if (!(0, _recurrence.getRecurrenceProcessor)().evalRecurrenceRule(recurrenceRule).isValid || !this._editing.allowUpdating) {
            callback();
            return
        }
        var editMode = this.option("recurrenceEditMode");
        switch (editMode) {
            case "series":
                callback();
                break;
            case "occurrence":
                this._excludeAppointmentFromSeries(targetAppointment, singleAppointment, exceptionDate, isDeleted, isPopupEditing, dragEvent);
                break;
            default:
                if (dragEvent) {
                    dragEvent.cancel = new _deferred.Deferred
                }
                this._showRecurrenceChangeConfirm(isDeleted).done(function(result) {
                    result && callback();
                    !result && _this12._excludeAppointmentFromSeries(targetAppointment, singleAppointment, exceptionDate, isDeleted, isPopupEditing, dragEvent)
                }).fail(function() {
                    return _this12._appointments.moveAppointmentBack(dragEvent)
                })
        }
    };
    _proto._excludeAppointmentFromSeries = function(rawAppointment, newRawAppointment, exceptionDate, isDeleted, isPopupEditing, dragEvent) {
        var _this13 = this;
        var appointment = this.createAppointmentAdapter(_objectSpread({}, rawAppointment));
        var newAppointment = this.createAppointmentAdapter(newRawAppointment);
        newAppointment.recurrenceRule = "";
        newAppointment.recurrenceException = "";
        var canCreateNewAppointment = !isDeleted && !isPopupEditing;
        if (canCreateNewAppointment) {
            var keyPropertyName = this._appointmentModel.keyName;
            delete newRawAppointment[keyPropertyName];
            this.addAppointment(newRawAppointment)
        }
        appointment.recurrenceException = this._createRecurrenceException(appointment, exceptionDate);
        if (isPopupEditing) {
            this._updatedRecAppointment = appointment.source();
            this._appointmentPopup.show(newRawAppointment, true);
            this._editAppointmentData = rawAppointment
        } else {
            this._updateAppointment(rawAppointment, appointment.source(), function() {
                _this13._appointments.moveAppointmentBack(dragEvent)
            }, dragEvent)
        }
    };
    _proto._createRecurrenceException = function(appointment, exceptionDate) {
        var result = [];
        if (appointment.recurrenceException) {
            result.push(appointment.recurrenceException)
        }
        result.push(this._getSerializedDate(exceptionDate, appointment.startDate, appointment.allDay));
        return result.join()
    };
    _proto._getSerializedDate = function(date, startDate, isAllDay) {
        isAllDay && date.setHours(startDate.getHours(), startDate.getMinutes(), startDate.getSeconds(), startDate.getMilliseconds());
        return _date_serialization.default.serializeDate(date, UTC_FULL_DATE_FORMAT)
    };
    _proto._showRecurrenceChangeConfirm = function(isDeleted) {
        var message = _message.default.format(isDeleted ? "dxScheduler-confirmRecurrenceDeleteMessage" : "dxScheduler-confirmRecurrenceEditMessage");
        var seriesText = _message.default.format(isDeleted ? "dxScheduler-confirmRecurrenceDeleteSeries" : "dxScheduler-confirmRecurrenceEditSeries");
        var occurrenceText = _message.default.format(isDeleted ? "dxScheduler-confirmRecurrenceDeleteOccurrence" : "dxScheduler-confirmRecurrenceEditOccurrence");
        return (0, _dialog.custom)({
            messageHtml: message,
            showCloseButton: true,
            showTitle: true,
            buttons: [{
                text: seriesText,
                onClick: function() {
                    return true
                }
            }, {
                text: occurrenceText,
                onClick: function() {
                    return false
                }
            }]
        }).show()
    };
    _proto._getUpdatedData = function(rawAppointment) {
        var _this14 = this;
        var getConvertedFromGrid = function(date) {
            return date ? _this14.timeZoneCalculator.createDate(date, {
                path: "fromGrid"
            }) : void 0
        };
        var isValidDate = function(date) {
            return !isNaN(new Date(date).getTime())
        };
        var targetCell = this.getTargetCellData();
        var appointment = this.createAppointmentAdapter(rawAppointment);
        var cellStartDate = getConvertedFromGrid(targetCell.startDate);
        var cellEndDate = getConvertedFromGrid(targetCell.endDate);
        var appointmentStartDate = new Date(appointment.startDate);
        var appointmentEndDate = new Date(appointment.endDate);
        var resultedStartDate = cellStartDate || appointmentStartDate;
        if (!isValidDate(appointmentStartDate)) {
            appointmentStartDate = resultedStartDate
        }
        if (!isValidDate(appointmentEndDate)) {
            appointmentEndDate = cellEndDate
        }
        var duration = appointmentEndDate.getTime() - appointmentStartDate.getTime();
        var isKeepAppointmentHours = this._workSpace.keepOriginalHours() && isValidDate(appointment.startDate) && isValidDate(cellStartDate);
        if (isKeepAppointmentHours) {
            var trimTime = _date.default.trimTime;
            var startDate = this.timeZoneCalculator.createDate(appointment.startDate, {
                path: "toGrid"
            });
            var timeInMs = startDate.getTime() - trimTime(startDate).getTime();
            resultedStartDate = new Date(trimTime(targetCell.startDate).getTime() + timeInMs);
            resultedStartDate = this.timeZoneCalculator.createDate(resultedStartDate, {
                path: "fromGrid"
            })
        }
        var result = this.createAppointmentAdapter({});
        if (void 0 !== targetCell.allDay) {
            result.allDay = targetCell.allDay
        }
        result.startDate = resultedStartDate;
        var resultedEndDate = new Date(resultedStartDate.getTime() + duration);
        if (this.appointmentTakesAllDay(rawAppointment) && !result.allDay && this._workSpace.supportAllDayRow()) {
            resultedEndDate = this._workSpace.calculateEndDate(resultedStartDate)
        }
        if (appointment.allDay && !this._workSpace.supportAllDayRow() && !this._workSpace.keepOriginalHours()) {
            var dateCopy = new Date(resultedStartDate);
            dateCopy.setHours(0);
            resultedEndDate = new Date(dateCopy.getTime() + duration);
            if (0 !== resultedEndDate.getHours()) {
                resultedEndDate.setHours(this._getCurrentViewOption("endDayHour"))
            }
        }
        var timeZoneOffset = _utils.default.getTimezoneOffsetChangeInMs(appointmentStartDate, appointmentEndDate, resultedStartDate, resultedEndDate);
        result.endDate = new Date(resultedEndDate.getTime() - timeZoneOffset);
        var rawResult = result.source();
        this._resourcesManager.setResourcesToItem(rawResult, targetCell.groups);
        return rawResult
    };
    _proto.getTargetedAppointment = function(appointment, element) {
        var settings = _utils2.default.dataAccessors.getAppointmentSettings(element);
        var info = _utils2.default.dataAccessors.getAppointmentInfo(element);
        var appointmentIndex = (0, _renderer.default)(element).data(this._appointments._itemIndexKey());
        var adapter = this.createAppointmentAdapter(appointment);
        var targetedAdapter = adapter.clone();
        if (this._isAgenda() && adapter.isRecurrent) {
            var getStartDate = this.getRenderingStrategyInstance().getAppointmentDataCalculator();
            var newStartDate = getStartDate((0, _renderer.default)(element), adapter.startDate).startDate;
            targetedAdapter.startDate = newStartDate;
            targetedAdapter.endDate = new Date(newStartDate.getTime() + adapter.duration)
        } else {
            if (settings) {
                targetedAdapter.startDate = info ? info.sourceAppointment.startDate : adapter.startDate;
                targetedAdapter.endDate = info ? info.sourceAppointment.endDate : adapter.endDate
            }
        }
        var rawTargetedAppointment = targetedAdapter.source();
        if (element) {
            this.setTargetedAppointmentResources(rawTargetedAppointment, element, appointmentIndex)
        }
        return rawTargetedAppointment
    };
    _proto.subscribe = function(subject, action) {
        this._subscribes[subject] = _uiScheduler5.default[subject] = action
    };
    _proto.fire = function(subject) {
        var callback = this._subscribes[subject];
        var args = Array.prototype.slice.call(arguments);
        if (!(0, _type.isFunction)(callback)) {
            throw _ui.default.Error("E1031", subject)
        }
        return callback.apply(this, args.slice(1))
    };
    _proto.getTargetCellData = function() {
        return this._workSpace.getDataByDroppableCell()
    };
    _proto._updateAppointment = function(target, rawAppointment, onUpdatePrevented, dragEvent) {
        var updatingOptions = {
            newData: rawAppointment,
            oldData: (0, _extend.extend)({}, target),
            cancel: false
        };
        var performFailAction = function(err) {
            if (onUpdatePrevented) {
                onUpdatePrevented.call(this)
            }
            if (err && "Error" === err.name) {
                throw err
            }
        }.bind(this);
        this._actions[StoreEventNames.UPDATING](updatingOptions);
        if (dragEvent && !(0, _type.isDeferred)(dragEvent.cancel)) {
            dragEvent.cancel = new _deferred.Deferred
        }
        return this._processActionResult(updatingOptions, function(canceled) {
            var _this15 = this;
            var deferred = new _deferred.Deferred;
            if (!canceled) {
                this._expandAllDayPanel(rawAppointment);
                try {
                    deferred = this._appointmentModel.update(target, rawAppointment).done(function() {
                        dragEvent && dragEvent.cancel.resolve(false)
                    }).always(function(storeAppointment) {
                        return _this15._onDataPromiseCompleted(StoreEventNames.UPDATED, storeAppointment)
                    }).fail(function() {
                        return performFailAction()
                    })
                } catch (err) {
                    performFailAction(err);
                    deferred.resolve()
                }
            } else {
                performFailAction();
                deferred.resolve()
            }
            return deferred.promise()
        })
    };
    _proto._processActionResult = function(actionOptions, callback) {
        var _this16 = this;
        var deferred = new _deferred.Deferred;
        var resolveCallback = function(callbackResult) {
            (0, _deferred.when)((0, _deferred.fromPromise)(callbackResult)).always(deferred.resolve)
        };
        if ((0, _type.isPromise)(actionOptions.cancel)) {
            (0, _deferred.when)((0, _deferred.fromPromise)(actionOptions.cancel)).always(function(cancel) {
                if (!(0, _type.isDefined)(cancel)) {
                    cancel = "rejected" === actionOptions.cancel.state()
                }
                resolveCallback(callback.call(_this16, cancel))
            })
        } else {
            resolveCallback(callback.call(this, actionOptions.cancel))
        }
        return deferred.promise()
    };
    _proto._expandAllDayPanel = function(appointment) {
        if (!this._isAllDayExpanded(this.getFilteredItems()) && this.appointmentTakesAllDay(appointment)) {
            this._workSpace.option("allDayExpanded", true)
        }
    };
    _proto._onDataPromiseCompleted = function(handlerName, storeAppointment, appointment) {
        var args = {
            appointmentData: appointment || storeAppointment
        };
        if (storeAppointment instanceof Error) {
            args.error = storeAppointment
        } else {
            this._appointmentPopup.isVisible() && this._appointmentPopup.hide()
        }
        this._actions[handlerName](args);
        this._fireContentReadyAction()
    };
    _proto.getAppointmentPopup = function() {
        return this._appointmentPopup.getPopup()
    };
    _proto.getUpdatedAppointment = function() {
        return this._appointmentModel.getUpdatedAppointment()
    };
    _proto.getUpdatedAppointmentKeys = function() {
        return this._appointmentModel.getUpdatedAppointmentKeys()
    };
    _proto.getAppointmentsInstance = function() {
        return this._appointments
    };
    _proto.getResourceManager = function() {
        return this._resourcesManager
    };
    _proto.getLayoutManager = function() {
        return this._layoutManager
    };
    _proto.getRenderingStrategyInstance = function() {
        return this._layoutManager.getRenderingStrategyInstance()
    };
    _proto.getFilteredItems = function() {
        return this._filteredItems
    };
    _proto.getActions = function() {
        return this._actions
    };
    _proto.appointmentTakesAllDay = function(appointment) {
        return this._appointmentModel.appointmentTakesAllDay(appointment, this._getCurrentViewOption("startDayHour"), this._getCurrentViewOption("endDayHour"))
    };
    _proto._getRecurrenceException = function(rawAppointment) {
        var appointment = this.createAppointmentAdapter(rawAppointment);
        var recurrenceException = appointment.recurrenceException;
        if (recurrenceException) {
            var exceptions = recurrenceException.split(",");
            for (var i = 0; i < exceptions.length; i++) {
                exceptions[i] = this._convertRecurrenceException(exceptions[i], appointment.startDate)
            }
            return exceptions.join()
        }
        return recurrenceException
    };
    _proto._convertRecurrenceException = function(exceptionString, startDate) {
        var _this17 = this;
        exceptionString = exceptionString.replace(/\s/g, "");
        var getConvertedToTimeZone = function(date) {
            return _this17.timeZoneCalculator.createDate(date, {
                path: "toGrid"
            })
        };
        var exceptionDate = _date_serialization.default.deserializeDate(exceptionString);
        var convertedStartDate = getConvertedToTimeZone(startDate);
        var convertedExceptionDate = getConvertedToTimeZone(exceptionDate);
        convertedExceptionDate = _utils.default.correctRecurrenceExceptionByTimezone(convertedExceptionDate, convertedStartDate, this.option("timeZone"));
        exceptionString = _date_serialization.default.serializeDate(convertedExceptionDate, FULL_DATE_FORMAT);
        return exceptionString
    };
    _proto.dayHasAppointment = function(day, rawAppointment, trimTime) {
        var _this18 = this;
        var getConvertedToTimeZone = function(date) {
            return _this18.timeZoneCalculator.createDate(date, {
                path: "toGrid"
            })
        };
        var appointment = this.createAppointmentAdapter(rawAppointment);
        var startDate = new Date(appointment.startDate);
        var endDate = new Date(appointment.endDate);
        startDate = getConvertedToTimeZone(startDate);
        endDate = getConvertedToTimeZone(endDate);
        if (day.getTime() === endDate.getTime()) {
            return startDate.getTime() === endDate.getTime()
        }
        if (trimTime) {
            day = _date.default.trimTime(day);
            startDate = _date.default.trimTime(startDate);
            endDate = _date.default.trimTime(endDate)
        }
        var dayTimeStamp = day.getTime();
        var startDateTimeStamp = startDate.getTime();
        var endDateTimeStamp = endDate.getTime();
        return (0, _array.inArray)(dayTimeStamp, [startDateTimeStamp, endDateTimeStamp]) > -1 || startDateTimeStamp < dayTimeStamp && endDateTimeStamp > dayTimeStamp
    };
    _proto.setTargetedAppointmentResources = function(rawAppointment, element, appointmentIndex) {
        var groups = this._getCurrentViewOption("groups");
        if (null !== groups && void 0 !== groups && groups.length) {
            var resourcesSetter = this._resourcesManager._dataAccessors.setter;
            var workSpace = this._workSpace;
            var getGroups;
            var setResourceCallback;
            if (this._isAgenda()) {
                getGroups = function() {
                    var apptSettings = this.getLayoutManager()._positionMap[appointmentIndex];
                    return workSpace._getCellGroups(apptSettings[0].groupIndex)
                };
                setResourceCallback = function(_, group) {
                    resourcesSetter[group.name](rawAppointment, group.id)
                }
            } else {
                getGroups = function() {
                    var setting = _utils2.default.dataAccessors.getAppointmentSettings(element) || {};
                    return workSpace.getCellDataByCoordinates({
                        left: setting.left,
                        top: setting.top
                    }).groups
                };
                setResourceCallback = function(field, value) {
                    resourcesSetter[field](rawAppointment, value)
                }
            }(0, _iterator.each)(getGroups.call(this), setResourceCallback)
        }
    };
    _proto.getStartViewDate = function() {
        return this._workSpace.getStartViewDate()
    };
    _proto.getEndViewDate = function() {
        return this._workSpace.getEndViewDate()
    };
    _proto.showAppointmentPopup = function(rawAppointment, createNewAppointment, rawTargetedAppointment) {
        var _this19 = this;
        var appointment = this.createAppointmentAdapter(rawTargetedAppointment || rawAppointment);
        var newTargetedAppointment = (0, _extend.extend)({}, rawAppointment, rawTargetedAppointment);
        this._checkRecurringAppointment(rawAppointment, newTargetedAppointment, appointment.startDate, function() {
            if (createNewAppointment || (0, _type.isEmptyObject)(rawAppointment)) {
                delete _this19._editAppointmentData;
                _this19._editing.allowAdding && _this19._appointmentPopup.show(rawAppointment, true)
            } else {
                _this19._editAppointmentData = rawAppointment;
                _this19._appointmentPopup.show(rawAppointment, _this19._editing.allowUpdating)
            }
        }, false, true)
    };
    _proto.hideAppointmentPopup = function(saveChanges) {
        if (this._appointmentPopup && this._appointmentPopup.isVisible()) {
            saveChanges && this._appointmentPopup.saveChanges();
            this._appointmentPopup.hide()
        }
    };
    _proto.showAppointmentTooltip = function(appointment, target, targetedAppointment) {
        if (appointment) {
            var info = new _dataStructures.AppointmentTooltipInfo(appointment, targetedAppointment, this._appointments._tryGetAppointmentColor(target));
            this.showAppointmentTooltipCore(target, [info])
        }
    };
    _proto.showAppointmentTooltipCore = function(target, data, options) {
        if (this._appointmentTooltip.isAlreadyShown(target)) {
            this.hideAppointmentTooltip()
        } else {
            this._appointmentTooltip.show(target, data, (0, _extend.extend)(this._getExtraAppointmentTooltipOptions(), options))
        }
    };
    _proto.hideAppointmentTooltip = function() {
        this._appointmentTooltip && this._appointmentTooltip.hide()
    };
    _proto.scrollToTime = function(hours, minutes, date) {
        this._workSpace.scrollToTime(hours, minutes, date)
    };
    _proto.scrollTo = function(date, groups, allDay) {
        this._workSpace.scrollTo(date, groups, allDay)
    };
    _proto.addAppointment = function(rawAppointment) {
        var _this20 = this;
        var appointment = this.createAppointmentAdapter(rawAppointment);
        appointment.text = appointment.text || "";
        var serializedAppointment = appointment.source(true);
        var addingOptions = {
            appointmentData: serializedAppointment,
            cancel: false
        };
        this._actions[StoreEventNames.ADDING](addingOptions);
        return this._processActionResult(addingOptions, function(canceled) {
            if (canceled) {
                return (new _deferred.Deferred).resolve()
            }
            _this20._expandAllDayPanel(serializedAppointment);
            return _this20._appointmentModel.add(serializedAppointment).always(function(storeAppointment) {
                return _this20._onDataPromiseCompleted(StoreEventNames.ADDED, storeAppointment)
            })
        })
    };
    _proto.updateAppointment = function(target, appointment) {
        return this._updateAppointment(target, appointment)
    };
    _proto.deleteAppointment = function(rawAppointment) {
        var deletingOptions = {
            appointmentData: rawAppointment,
            cancel: false
        };
        this._actions[StoreEventNames.DELETING](deletingOptions);
        this._processActionResult(deletingOptions, function(canceled) {
            var _this21 = this;
            if (!canceled) {
                this._appointmentModel.remove(rawAppointment).always(function(storeAppointment) {
                    return _this21._onDataPromiseCompleted(StoreEventNames.DELETED, storeAppointment, rawAppointment)
                })
            }
        })
    };
    _proto.focus = function() {
        if (this._editAppointmentData) {
            this._appointments.focus()
        } else {
            this._workSpace.focus()
        }
    };
    _proto.getFirstDayOfWeek = function() {
        return (0, _type.isDefined)(this.option("firstDayOfWeek")) ? this.option("firstDayOfWeek") : _date2.default.firstDayOfWeekIndex()
    };
    _proto.createAppointmentAdapter = function(rawAppointment) {
        var _this22 = this;
        var options = {
            getField: function(rawAppointment, property) {
                return _this22.fire("getField", property, rawAppointment)
            },
            setField: function(rawAppointment, property, value) {
                return _this22.fire("setField", property, rawAppointment, value)
            },
            getTimeZoneCalculator: function() {
                return _this22.timeZoneCalculator
            }
        };
        return new _appointmentAdapter.default(rawAppointment, options)
    };
    return Scheduler
}(_ui2.default);
Scheduler.include(_data_helper.default);
(0, _component_registrator.default)("dxScheduler", Scheduler);
var _default = Scheduler;
exports.default = _default;
module.exports = exports.default;
