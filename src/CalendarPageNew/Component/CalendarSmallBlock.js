import React from 'react';
import Check from '@2fd/ant-design-icons/lib/Check';

const CalendarSmallBlock = (props) => {
    return (
        <div className={'gx-w-100 calendar_small_block'}>
            <div className={'block_logo'} onClick={() => { props.handleClick(props.data.id) }}>
                <div className={'gx-w-100 gx-h-100 gx-rounded-sm text'} style={{ backgroundColor: props.data.color }} >
                    <span>{props.data.name}</span>
                </div>
                <div className={`gx-w-100 gx-h-100 gx-d-flex gx-align-items-center gx-justify-content-center is_select gx-rounded-sm ${props.data.selected ? '' : 'gx-d-none'}`}>
                    <Check style={{ fontSize: 30, color: '#fff' }} />
                </div>
            </div>
        </div>
    )
};

export default CalendarSmallBlock;
