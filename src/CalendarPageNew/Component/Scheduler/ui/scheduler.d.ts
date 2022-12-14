/**
* DevExtreme (ui/scheduler.d.ts)
* Version: 20.2.6
* Build date: Tue Mar 16 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import '../jquery_augmentation';
import './scheduler/utils';

import {
    dxElement
} from '../core/element';

import {
    template
} from '../core/templates/template';

import DataSource, {
    DataSourceOptions
} from '../data/data_source';

import {
    event
} from '../events/index';

import {
    CollectionWidgetItem
} from './collection/ui.collection_widget.base';

import dxDraggable from './draggable';

import dxForm from './form';
import dxPopup from './popup';

import dxSortable from './sortable';

import Widget, {
    WidgetOptions
} from './widget/ui.widget';

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxSchedulerOptions extends WidgetOptions<dxScheduler> {
    /**
     * Specifies whether the UI component adapts to small screens.
     */
    adaptivityEnabled?: boolean;
    /**
     * Specifies the name of the data source item field whose value defines whether or not the corresponding appointment is an all-day appointment.
     */
    allDayExpr?: string;
    /**
     * Specifies a custom template for cell overflow indicators.
     */
    appointmentCollectorTemplate?: template | ((data: { appointmentCount?: number, isCompact?: boolean }, collectorElement: dxElement) => string | Element | JQuery);
    /**
     * Configures appointment reordering using drag and drop gestures.
     */
    appointmentDragging?: { autoScroll?: boolean, data?: any, group?: string, onAdd?: ((e: { component: dxScheduler, event?: event, itemData?: any, itemElement?: dxElement, fromComponent?: dxSortable | dxDraggable, toComponent?: dxSortable | dxDraggable, fromData?: any, toData?: any }) => any), onDragEnd?: ((e: { component: dxScheduler, event?: event, cancel?: boolean, itemData?: any, itemElement?: dxElement, fromComponent?: dxSortable | dxDraggable, toComponent?: dxSortable | dxDraggable, fromData?: any, toData?: any }) => any), onDragMove?: ((e: { component: dxScheduler, event?: event, cancel?: boolean, itemData?: any, itemElement?: dxElement, fromComponent?: dxSortable | dxDraggable, toComponent?: dxSortable | dxDraggable, fromData?: any, toData?: any }) => any), onDragStart?: ((e: { component: dxScheduler, event?: event, cancel?: boolean, itemData?: any, itemElement?: dxElement, fromData?: any }) => any), onRemove?: ((e: { component: dxScheduler, event?: event, itemData?: any, itemElement?: dxElement, fromComponent?: dxSortable | dxDraggable, toComponent?: dxSortable | dxDraggable, fromData?: any }) => any), scrollSensitivity?: number, scrollSpeed?: number };
    /**
     * Specifies a custom template for appointments.
     */
    appointmentTemplate?: template | ((model: { appointmentData?: any, targetedAppointmentData?: any }, itemIndex: number, contentElement: dxElement) => string | Element | JQuery);
    /**
     * Specifies a custom template for tooltips displayed when users click an appointment or cell overflow indicator.
     */
    appointmentTooltipTemplate?: template | ((model: { appointmentData?: any, targetedAppointmentData?: any }, itemIndex: number, contentElement: dxElement) => string | Element | JQuery);
    /**
     * Specifies cell duration in minutes. This property's value should divide the interval between startDayHour and endDayHour into even parts.
     */
    cellDuration?: number;
    /**
     * Specifies whether or not an end-user can scroll the view in both directions at the same time.
     */
    crossScrollingEnabled?: boolean;
    /**
     * Specifies the current date.
     */
    currentDate?: Date | number | string;
    /**
     * Specifies the currently displayed view. Accepts the view's name or type.
     */
    currentView?: 'agenda' | 'day' | 'month' | 'timelineDay' | 'timelineMonth' | 'timelineWeek' | 'timelineWorkWeek' | 'week' | 'workWeek';

    // /*
    // * Update calendars dates
    // */
    // calendarDate?: Date ;

    /**
     * Customizes the date navigator's text.
     */
    customizeDateNavigatorText?: ((info: { startDate?: Date, endDate?: Date, text?: string }) => string);
    /**
     * Specifies a custom template for table cells.
     */
    dataCellTemplate?: template | ((itemData: any, itemIndex: number, itemElement: dxElement) => string | Element | JQuery);
    /**
     * Binds the UI component to data.
     */
    dataSource?: string | Array<dxSchedulerAppointment> | DataSource | DataSourceOptions;
    /**
     * Specifies a custom template for day scale items.
     */
    dateCellTemplate?: template | ((itemData: any, itemIndex: number, itemElement: dxElement) => string | Element | JQuery);
    /**
     * Specifies the date-time values' serialization format. Use it only if you do not specify the dataSource at design time.
     */
    dateSerializationFormat?: string;
    /**
     * Specifies the name of the data source item field whose value holds the description of the corresponding appointment.
     */
    descriptionExpr?: string;
    /**
     * Specifies a custom template for tooltips displayed when users click a cell overflow indicator.
     * @deprecated Use the appointmentTooltipTemplate option instead.
     */
    dropDownAppointmentTemplate?: template | ((itemData: any, itemIndex: number, contentElement: dxElement) => string | Element | JQuery);
    /**
     * Specifies which editing operations a user can perform on appointments.
     */
    editing?: boolean | { allowAdding?: boolean, allowDeleting?: boolean, allowDragging?: boolean, allowResizing?: boolean, allowUpdating?: boolean, allowEditingTimeZones?: boolean };
    /**
     * Specifies the name of the data source item field that defines the ending of an appointment.
     */
    endDateExpr?: string;
    /**
     * Specifies the name of the data source item field that defines the timezone of the appointment end date.
     */
    endDateTimeZoneExpr?: string;
    /**
     * Specifies the last hour on the time scale. Accepts integer values from 0 to 24.
     */
    endDayHour?: number;
    /**
     * Specifies the first day of a week. Does not apply to the agenda view.
     */
    firstDayOfWeek?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
    /**
     * Specifies whether the UI component can be focused using keyboard navigation.
     */
    focusStateEnabled?: boolean;
    /**
     * If true, appointments are grouped by date first and then by resource; opposite if false. Applies only if appointments are grouped and groupOrientation is 'horizontal'.
     */
    groupByDate?: boolean;
    /**
     * Specifies the resource kinds by which the scheduler's appointments are grouped in a timetable.
     */
    groups?: Array<string>;
    /**
     * Specifies the time interval between when the date-time indicator changes its position, in milliseconds.
     */
    indicatorUpdateInterval?: number;
    /**
     * The latest date the UI component allows you to select.
     */
    max?: Date | number | string;
    /**
     * Specifies the limit of full-sized appointments displayed per cell. Applies to all views except 'agenda'.
     */
    maxAppointmentsPerCell?: number | 'auto' | 'unlimited';
    /**
     * The earliest date the UI component allows you to select.
     */
    min?: Date | number | string;
    /**
     * The text or HTML markup displayed by the UI component if the item collection is empty. Available for the Agenda view only.
     */
    noDataText?: string;
    /**
     * A function that is executed after an appointment is added to the data source.
     */
    onAppointmentAdded?: ((e: { component: dxScheduler, element: dxElement, model?: any, appointmentData: any, error?: Error }) => any);
    /**
     * A function that is executed before an appointment is added to the data source.
     */
    onAppointmentAdding?: ((e: { component: dxScheduler, element: dxElement, model?: any, appointmentData: any, cancel: boolean | Promise<boolean> | JQueryPromise<boolean> }) => any);
    /**
     * A function that is executed when an appointment is clicked or tapped.
     */
    onAppointmentClick?: ((e: { component: dxScheduler, element: dxElement, model?: any, appointmentData: any, targetedAppointmentData?: any, appointmentElement: dxElement, event?: event, cancel: boolean }) => any) | string;
    /**
     * A function that is executed when a user attempts to open the browser's context menu for an appointment. Allows you to replace this context menu with a custom context menu.
     */
    onAppointmentContextMenu?: ((e: { component: dxScheduler, element: dxElement, model?: any, appointmentData: any, targetedAppointmentData?: any, appointmentElement: dxElement, event?: event }) => any) | string;
    /**
     * A function that is executed when an appointment is double-clicked or double-tapped.
     */
    onAppointmentDblClick?: ((e: { component: dxScheduler, element: dxElement, model?: any, appointmentData: any, targetedAppointmentData?: any, appointmentElement: dxElement, event?: event, cancel: boolean }) => any) | string;
    /**
     * A function that is executed after an appointment is deleted from the data source.
     */
    onAppointmentDeleted?: ((e: { component: dxScheduler, element: dxElement, model: any, appointmentData: any, error?: Error }) => any);
    /**
     * A function that is executed before an appointment is deleted from the data source.
     */
    onAppointmentDeleting?: ((e: { component: dxScheduler, element: dxElement, model?: any, appointmentData: any, cancel: boolean | Promise<boolean> | JQueryPromise<boolean> }) => any);
    /**
     * A function that is executed before an appointment details form is opened. Use this function to customize the form.
     */
    onAppointmentFormOpening?: ((e: { component: dxScheduler, element: dxElement, model?: any, appointmentData?: any, form: dxForm, popup: dxPopup, cancel: boolean }) => any);
    /**
     * A function that is executed when an appointment is rendered.
     */
    onAppointmentRendered?: ((e: { component: dxScheduler, element: dxElement, model: any, appointmentData: any, targetedAppointmentData?: any, appointmentElement?: dxElement }) => any);
    /**
     * A function that is executed after an appointment is updated in the data source.
     */
    onAppointmentUpdated?: ((e: { component: dxScheduler, element: dxElement, model?: any, appointmentData: any, error?: Error }) => any);
    /**
     * A function that is executed before an appointment is updated in the data source.
     */
    onAppointmentUpdating?: ((e: { component: dxScheduler, element: dxElement, model?: any, oldData?: any, newData?: any, cancel?: boolean | Promise<boolean> | JQueryPromise<boolean> }) => any);
    /**
     * A function that is executed when a view cell is clicked.
     */
    onCellClick?: ((e: { component: dxScheduler, element: dxElement, model?: any, cellData: any, cellElement: dxElement, event?: event, cancel: boolean }) => any) | string;
    /**
     * A function that is executed when a user attempts to open the browser's context menu for a cell. Allows you to replace this context menu with a custom context menu.
     */
    onCellContextMenu?: ((e: { component: dxScheduler, element: dxElement, model?: any, cellData: any, cellElement: dxElement, event?: event }) => any) | string;
    /**
     * Specifies the edit mode for recurring appointments.
     */
    recurrenceEditMode?: 'dialog' | 'occurrence' | 'series';
    /**
     * Specifies the name of the data source item field that defines exceptions for the current recurring appointment.
     */
    recurrenceExceptionExpr?: string;
    /**
     * Specifies the name of the data source item field that defines a recurrence rule for generating recurring appointments.
     */
    recurrenceRuleExpr?: string;
    /**
     * Specifies whether filtering is performed on the server or client side.
     */
    remoteFiltering?: boolean;
    /**
     * Specifies a custom template for resource headers.
     */
    resourceCellTemplate?: template | ((itemData: any, itemIndex: number, itemElement: dxElement) => string | Element | JQuery);
    /**
     * Specifies an array of resources available in the scheduler.
     */
    resources?: Array<{ allowMultiple?: boolean, colorExpr?: string, dataSource?: string | Array<any> | DataSource | DataSourceOptions, displayExpr?: string | ((resource: any) => string), fieldExpr?: string, label?: string, useColorAsDefault?: boolean, valueExpr?: string | Function }>;
    /**
     * Configures scrolling.
     */
    scrolling?: dxSchedulerScrolling;
    /**
     * Currently selected cells' data.
     */
    selectedCellData?: Array<any>;
    /**
     * Specifies whether to apply shading to cover the timetable up to the current time.
     */
    shadeUntilCurrentTime?: boolean;
    /**
     * Specifies the 'All-day' panel's visibility. Setting this property to false hides the panel along with the all-day appointments.
     */
    showAllDayPanel?: boolean;
    /**
     * Specifies the current date-time indicator's visibility.
     */
    showCurrentTimeIndicator?: boolean;
    /**
     * Specifies the name of the data source item field that defines the start of an appointment.
     */
    startDateExpr?: string;
    /**
     * Specifies the name of the data source item field that defines the timezone of the appointment start date.
     */
    startDateTimeZoneExpr?: string;
    /**
     * Specifies the first hour on the time scale. Accepts integer values from 0 to 24.
     */
    startDayHour?: number;
    /**
     * Specifies the name of the data source item field that holds the subject of an appointment.
     */
    textExpr?: string;
    /**
     * Specifies a custom template for time scale items.
     */
    timeCellTemplate?: template | ((itemData: any, itemIndex: number, itemElement: dxElement) => string | Element | JQuery);
    /**
     * Specifies the time zone for the Scheduler's grid. Accepts values from the IANA time zone database.
     */
    timeZone?: string;
    /**
     * Specifies whether a user can switch views using tabs or a drop-down menu.
     */
    useDropDownViewSwitcher?: boolean;


    /**
     * Specifies and configures the views to be available in the view switcher.
     */
    views?: Array<'day' | 'week' | 'workWeek' | 'month' | 'timelineDay' | 'timelineWeek' | 'timelineWorkWeek' | 'timelineMonth' | 'agenda' | { agendaDuration?: number, appointmentCollectorTemplate?: template | ((data: { appointmentCount?: number, isCompact?: boolean }, collectorElement: dxElement) => string | Element | JQuery), appointmentTemplate?: template | ((model: { appointmentData?: any, targetedAppointmentData?: any }, itemIndex: number, contentElement: dxElement) => string | Element | JQuery), appointmentTooltipTemplate?: template | ((model: { appointmentData?: any, targetedAppointmentData?: any }, itemIndex: number, contentElement: dxElement) => string | Element | JQuery), cellDuration?: number, dataCellTemplate?: template | ((itemData: any, itemIndex: number, itemElement: dxElement) => string | Element | JQuery), dateCellTemplate?: template | ((itemData: any, itemIndex: number, itemElement: dxElement) => string | Element | JQuery), dropDownAppointmentTemplate?: template | ((itemData: any, itemIndex: number, contentElement: dxElement) => string | Element | JQuery), endDayHour?: number, firstDayOfWeek?: 0 | 1 | 2 | 3 | 4 | 5 | 6, groupByDate?: boolean, groupOrientation?: 'horizontal' | 'vertical', groups?: Array<string>, intervalCount?: number, maxAppointmentsPerCell?: number | 'auto' | 'unlimited', name?: string, resourceCellTemplate?: template | ((itemData: any, itemIndex: number, itemElement: dxElement) => string | Element | JQuery), startDate?: Date | number | string, startDayHour?: number, timeCellTemplate?: template | ((itemData: any, itemIndex: number, itemElement: dxElement) => string | Element | JQuery), type?: 'agenda' | 'day' | 'month' | 'timelineDay' | 'timelineMonth' | 'timelineWeek' | 'timelineWorkWeek' | 'week' | 'workWeek', scrolling?: dxSchedulerScrolling }>;
}
/**
 * The Scheduler is a UI component that represents scheduled data and allows a user to manage and edit it.
 */
export default class dxScheduler extends Widget {
    constructor(element: Element, options?: dxSchedulerOptions)
    constructor(element: JQuery, options?: dxSchedulerOptions)
    /**
     * Adds an appointment.
     */
    addAppointment(appointment: any): void;
    /**
     * Deletes an appointment from the timetable and its object from the data source.
     */
    deleteAppointment(appointment: any): void;

    getDataSource(): DataSource;
    /**
     * Gets the current view's end date.
     */
    getEndViewDate(): Date;
    /**
     * Gets the current view's start date.
     */
    getStartViewDate(): Date;
    /**
     * Hides an appointment details form.
     */
    hideAppointmentPopup(saveChanges?: boolean): void;
    /**
     * Hides an appointment's or cell overflow indicator's tooltip.
     */
    hideAppointmentTooltip(): void;
    /**
     * Scrolls the current view to a specified position. Available for all views except 'agenda'. You should specify the height property to use this method.
     */
    scrollTo(date: Date, group?: object, allDay?: boolean): void;
    /**
     * Scrolls the current view to a specific day and time.
     * @deprecated 
     */
    scrollToTime(hours: number, minutes: number, date?: Date): void;
    /**
     * Shows the appointment details form.
     */
    showAppointmentPopup(appointmentData?: any, createNewAppointment?: boolean, currentAppointmentData?: any): void;
    /**
     * Shows a tooltip for a target element.
     */
    showAppointmentTooltip(appointmentData: any, target: string | Element | JQuery, currentAppointmentData?: any): void;
    /**
     * Updates an appointment.
     */
    updateAppointment(target: any, appointment: any): void;
}

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxSchedulerAppointment extends CollectionWidgetItem {
    /**
     * Specifies whether the appointment lasts all day.
     */
    allDay?: boolean;
    /**
     * Specifies a detail description of the appointment.
     */
    description?: string;
    /**
     * Specifies whether the appointment responds to user interaction.
     */
    disabled?: boolean;
    /**
     * Specifies the ending of the appointment.
     */
    endDate?: Date | string;
    /**
     * Specifies the time zone for an appointment's endDate. Accepts values from the IANA time zone database.
     */
    endDateTimeZone?: string;
    /**
     * Specifies HTML code inserted into the appointment element.
     */
    html?: string;
    /**
     * Specifies the start date and time of one or more appointments to exclude from a series. This property requires that you also set recurrenceRule.
     */
    recurrenceException?: string;
    /**
     * Specifies a recurrence rule for generating recurring appointments in the scheduler.
     */
    recurrenceRule?: string;
    /**
     * Specifies the start of the appointment.
     */
    startDate?: Date | string;
    /**
     * Specifies the time zone for an appointment's startDate. Accepts values from the IANA time zone database.
     */
    startDateTimeZone?: string;
    /**
     * Specifies a template that should be used to render this appointment only.
     */
    template?: template;
    /**
     * Specifies the subject of the appointment.
     */
    text?: string;
    /**
     * Specifies whether or not an appointment must be displayed.
     */
    visible?: boolean;
}

declare global {
interface JQuery {
    dxScheduler(): JQuery;
    dxScheduler(options: "instance"): dxScheduler;
    dxScheduler(options: string): any;
    dxScheduler(options: string, ...params: any[]): any;
    dxScheduler(options: dxSchedulerOptions): JQuery;
}
}
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export type Options = dxSchedulerOptions;

/**
 * 
 */
export interface dxSchedulerScrolling {
  /**
   * Specifies the scrolling mode.
   */
  mode?: 'standard' | 'virtual';
}

/** @deprecated use Options instead */
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export type IOptions = dxSchedulerOptions;
