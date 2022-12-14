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

/// <reference types="react" />
import dxScheduler, { IOptions } from "./ui/scheduler";
import { Component as BaseComponent, IHtmlOptions } from "./core/component";
import NestedOption from "./core/nested-option";
interface ISchedulerOptions extends IOptions, IHtmlOptions {
    appointmentCollectorRender?: (...params: any) => React.ReactNode;
    appointmentCollectorComponent?: React.ComponentType<any>;
    appointmentCollectorKeyFn?: (data: any) => string;
    appointmentRender?: (...params: any) => React.ReactNode;
    appointmentComponent?: React.ComponentType<any>;
    appointmentKeyFn?: (data: any) => string;
    appointmentTooltipRender?: (...params: any) => React.ReactNode;
    appointmentTooltipComponent?: React.ComponentType<any>;
    appointmentTooltipKeyFn?: (data: any) => string;
    dataCellRender?: (...params: any) => React.ReactNode;
    dataCellComponent?: React.ComponentType<any>;
    dataCellKeyFn?: (data: any) => string;
    dateCellRender?: (...params: any) => React.ReactNode;
    dateCellComponent?: React.ComponentType<any>;
    dateCellKeyFn?: (data: any) => string;
    resourceCellRender?: (...params: any) => React.ReactNode;
    resourceCellComponent?: React.ComponentType<any>;
    resourceCellKeyFn?: (data: any) => string;
    timeCellRender?: (...params: any) => React.ReactNode;
    timeCellComponent?: React.ComponentType<any>;
    timeCellKeyFn?: (data: any) => string;
    defaultCurrentDate?: any;
    defaultCurrentView?: any;
    onCurrentDateChange?: (value: any) => void;
    onCurrentViewChange?: (value: any) => void;
}
declare class Scheduler extends BaseComponent<ISchedulerOptions> {
    get instance(): dxScheduler;
    protected _WidgetClass: typeof dxScheduler;
    protected subscribableOptions: string[];
    protected independentEvents: string[];
    protected _defaults: {
        defaultCurrentDate: string;
        defaultCurrentView: string;
    };
    protected _expectedChildren: {
        appointmentDragging: {
            optionName: string;
            isCollectionItem: boolean;
        };
        editing: {
            optionName: string;
            isCollectionItem: boolean;
        };
        resource: {
            optionName: string;
            isCollectionItem: boolean;
        };
        scrolling: {
            optionName: string;
            isCollectionItem: boolean;
        };
        view: {
            optionName: string;
            isCollectionItem: boolean;
        };
    };
    protected _templateProps: {
        tmplOption: string;
        render: string;
        component: string;
        keyFn: string;
    }[];
}
interface IAppointmentDraggingProps {
    autoScroll?: any;
    data?: any;
    group?: any;
    onAdd?: any;
    onDragEnd?: any;
    onDragMove?: any;
    onDragStart?: any;
    onRemove?: any;
    scrollSensitivity?: any;
    scrollSpeed?: any;
}
declare class AppointmentDragging extends NestedOption<IAppointmentDraggingProps> {
    static OptionName: string;
}
interface IEditingProps {
    allowAdding?: any;
    allowDeleting?: any;
    allowDragging?: any;
    allowEditingTimeZones?: any;
    allowResizing?: any;
    allowTimeZoneEditing?: any;
    allowUpdating?: any;
}
declare class Editing extends NestedOption<IEditingProps> {
    static OptionName: string;
}
interface IResourceProps {
    allowMultiple?: any;
    colorExpr?: any;
    dataSource?: any;
    displayExpr?: any;
    fieldExpr?: any;
    label?: any;
    useColorAsDefault?: any;
    valueExpr?: any;
}
declare class Resource extends NestedOption<IResourceProps> {
    static OptionName: string;
    static IsCollectionItem: boolean;
}
interface IScrollingProps {
    mode?: any;
}
declare class Scrolling extends NestedOption<IScrollingProps> {
    static OptionName: string;
}
interface IViewProps {
    agendaDuration?: any;
    appointmentCollectorTemplate?: any;
    appointmentTemplate?: any;
    appointmentTooltipTemplate?: any;
    cellDuration?: any;
    dataCellTemplate?: any;
    dateCellTemplate?: any;
    dropDownAppointmentTemplate?: any;
    endDayHour?: any;
    firstDayOfWeek?: any;
    groupByDate?: any;
    groupOrientation?: any;
    groups?: any;
    intervalCount?: any;
    maxAppointmentsPerCell?: any;
    name?: any;
    resourceCellTemplate?: any;
    scrolling?: any;
    startDate?: any;
    startDayHour?: any;
    timeCellTemplate?: any;
    type?: any;
    appointmentCollectorRender?: (...params: any) => React.ReactNode;
    appointmentCollectorComponent?: React.ComponentType<any>;
    appointmentCollectorKeyFn?: (data: any) => string;
    appointmentRender?: (...params: any) => React.ReactNode;
    appointmentComponent?: React.ComponentType<any>;
    appointmentKeyFn?: (data: any) => string;
    appointmentTooltipRender?: (...params: any) => React.ReactNode;
    appointmentTooltipComponent?: React.ComponentType<any>;
    appointmentTooltipKeyFn?: (data: any) => string;
    dataCellRender?: (...params: any) => React.ReactNode;
    dataCellComponent?: React.ComponentType<any>;
    dataCellKeyFn?: (data: any) => string;
    dateCellRender?: (...params: any) => React.ReactNode;
    dateCellComponent?: React.ComponentType<any>;
    dateCellKeyFn?: (data: any) => string;
    dropDownAppointmentRender?: (...params: any) => React.ReactNode;
    dropDownAppointmentComponent?: React.ComponentType<any>;
    dropDownAppointmentKeyFn?: (data: any) => string;
    resourceCellRender?: (...params: any) => React.ReactNode;
    resourceCellComponent?: React.ComponentType<any>;
    resourceCellKeyFn?: (data: any) => string;
    timeCellRender?: (...params: any) => React.ReactNode;
    timeCellComponent?: React.ComponentType<any>;
    timeCellKeyFn?: (data: any) => string;
}
declare class View extends NestedOption<IViewProps> {
    static OptionName: string;
    static IsCollectionItem: boolean;
    static ExpectedChildren: {
        scrolling: {
            optionName: string;
            isCollectionItem: boolean;
        };
    };
    static TemplateProps: {
        tmplOption: string;
        render: string;
        component: string;
        keyFn: string;
    }[];
}
export default Scheduler;
export { Scheduler, ISchedulerOptions, AppointmentDragging, IAppointmentDraggingProps, Editing, IEditingProps, Resource, IResourceProps, Scrolling, IScrollingProps, View, IViewProps };
