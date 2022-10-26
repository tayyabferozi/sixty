import React from 'react';
import { Col, Typography } from 'antd';
import Plus from '@2fd/ant-design-icons/lib/Plus';

const { Title } = Typography;
const AddCalendarButton = (props) => {
    return (
        <div className={'gx-w-100 calendar_block gx-d-flex add_button_sector'} onClick={props.openAddCalendarForm}>
            <div className={'gx-w-25 gx-mw-90'}>
                <div className={'add_button'}>
                    <Plus style={{ fontSize: 40, color: 'grey' }} />
                </div>
            </div>
            <Col span={18} className={'gx-d-flex gx-align-items-center'}>
                <Title className={'gx-w-100 gx-m-0'} level={4}>Add Calendar</Title>
            </Col>
        </div>
    )
};

export default AddCalendarButton;
