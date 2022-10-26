import React, { useEffect, useState } from 'react';
import { CirclePicker } from 'react-color';
import { Form, Row, Col, Input, Button, message, Modal } from 'antd';
import moment from 'moment';
const AddCalendarModal = (props) => {
    const [form] = Form.useForm();
    const [title, setTitle] = useState('Add Calendar');
    const [color, setColor] = useState('#4865F5');
    useEffect(() => {
        if (props.visible){
            if(props.formdata){
                setColor(props.formdata.color);
                form.setFieldsValue(props.formdata);
                setTitle('Edit Calendar');
            }
            else {
                form.resetFields();
                setColor('');
            }
        } 
    }, [props.visible])

    const handleChangeComplete = (param) => {
        setColor(param.hex);
    };
    const handleSubmit = async () => {
        await form.validateFields().then((data) => {
            var submitData = {};
            Object.getOwnPropertyNames(data).forEach(key => {
                if (key == 'color') {
                    submitData[key] = data[key]['hex'];
                } else {
                    submitData[key] = data[key];
                }
            })
            if(props.formdata){
                props.handleEditSubmit(submitData);
            } else {
                props.handleSubmit(submitData);
            }
            if (moment(submitData.startHour).isAfter(submitData.endHour)) {
                message.warning('Start time must earlier than end time!');
            } else {
                form.resetFields();
                message.success('Sucessfully added!');
            }
        });
    }
    return (
        <Modal
            title={title}
            visible={props.visible}
            onCancel={props.handleClose}
            footer={null}
        >
            <Form form={form} className={'gx-w-100'} layout={'vertical'}>
                <Row className={'gx-d-flex gx-w-100'}>
                    <Col span={24}>
                        <Form.Item label={'Calendar Name'} name={'title'}
                            rules={[
                                {
                                    required: true,
                                    message: 'Calendar name is required!',
                                },
                            ]}>
                            <Input className={'gx-w-100'} placeholder={'Input calendar name'} />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item label={'Description'} name={'description'} >
                            <Input className={'gx-w-100'} placeholder={'Input description'} />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item name="color" label="Color" className={'gx-d-flex gx-justify-content-center'}>
                            <CirclePicker color={color} onChangeComplete={handleChangeComplete} />
                        </Form.Item>
                    </Col>
                    <Form.Item hidden={true} name={'id'}>
                        <Input />
                    </Form.Item>
                    <Col span={24}>
                        <Form.Item>
                            <Button type={'primary'} className={'gx-w-100'} onClick={handleSubmit}>{title}</Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Modal>
    )
};

export default AddCalendarModal;
