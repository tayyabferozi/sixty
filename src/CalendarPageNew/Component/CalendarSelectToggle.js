import React from 'react';
import CheckAll from '@2fd/ant-design-icons/lib/CheckAll';

const CalendarSelectToggle = (props) => {
    return (
        <div className={'gx-w-100 calendar_small_block'} onClick={props.clickCheckAll}>
            <CheckAll style={{ fontSize: 30, color: 'rgba(33, 33, 33, 0.6)' }} />
        </div>
    )
};

export default CalendarSelectToggle;
