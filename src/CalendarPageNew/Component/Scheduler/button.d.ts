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
import dxButton, { IOptions } from "devextreme/ui/button";
import { Component as BaseComponent, IHtmlOptions } from "./core/component";
interface IButtonOptions extends IOptions, IHtmlOptions {
    render?: (...params: any) => React.ReactNode;
    component?: React.ComponentType<any>;
    keyFn?: (data: any) => string;
}
declare class Button extends BaseComponent<IButtonOptions> {
    get instance(): dxButton;
    protected _WidgetClass: typeof dxButton;
    protected independentEvents: string[];
    protected _templateProps: {
        tmplOption: string;
        render: string;
        component: string;
        keyFn: string;
    }[];
}
export default Button;
export { Button, IButtonOptions };
