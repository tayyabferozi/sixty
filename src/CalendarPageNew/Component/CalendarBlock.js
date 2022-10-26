import React from 'react';
import { Row, Col, Typography } from 'antd';
import Check from '@2fd/ant-design-icons/lib/Check';
import image from '../../assets/Calendar/calendar_noimage-fd7df6ac9f2e585b244d85e28bc49661.png';

const { Title } = Typography;
const CalendarBlock = (props) => {
    return (
        <div className={'gx-w-100 calendar_block gx-d-flex'}  onClick={() => { props.handleClick(props.data.id) }}>
            <div className={'gx-w-25 gx-mw-90'}>
                <div className={'block_logo'}>
                    <div className={'gx-w-100 gx-h-100 gx-rounded-sm'} style={{ backgroundColor: props.data.color }} >
                        <img className={'gx-w-100 gx-h-100'} src={image} />
                    </div>
                    <div className={`gx-w-100 gx-h-100 gx-d-flex gx-align-items-center gx-justify-content-center is_select gx-rounded-sm ${props.data.selected ? '' : 'gx-d-none'}`}>
                        <Check style={{ fontSize: 30, color: '#fff' }} />
                    </div>
                </div>
            </div>
            <div className={'gx-w-75'}>
                <Row className={'gx-flex-sm-row gx-p-3 flex-grow-1'}>
                    <Col span={24}>
                        <Title className={'gx-w-100 gx-m-0'} level={4} style={{ color: props.data.color }} >{props.data.name}</Title>
                    </Col>
                    <Col span={24}>
                        <pre className={'gx-w-100 calendar_comment'}>{props.data.description}</pre>
                        <pre >{props.data.selected}</pre>
                    </Col>
                </Row>
            </div>
        </div>
    )
};

export default CalendarBlock;
