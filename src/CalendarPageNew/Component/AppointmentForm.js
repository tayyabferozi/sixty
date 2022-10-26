/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { Form, Input, DatePicker, TimePicker, Button, Modal } from 'antd';
import 'react-phone-input-2/lib/style.css';

import Close from '@2fd/ant-design-icons/lib/Close';
import CalendarMonth from '@2fd/ant-design-icons/lib/CalendarMonth';
import Pencil from '@2fd/ant-design-icons/lib/Pencil';
import moment from 'moment';

const { TextArea } = Input;

const AppointmentForm = (props) => {
  const [form] = Form.useForm();

  const { visible, newForm, formdata, closeModal } = props;

  useEffect(() => {
    if (visible) {
      form.resetFields();
      form.setFieldsValue(formdata);
    } else {
      form.resetFields();
    }
  }, [visible]);

  const handleClick = async () => {
    form
      .validateFields()
      .then((values) => {
        let submitData = {};
        Object.getOwnPropertyNames(values).map((key) => {
          submitData[key] = values[key];
        });
        props.handleSubmit(submitData);
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  };

  return (
    <Modal
      className={'gx-modal'}
      visible={visible}
      title={newForm ? 'Create an event' : 'Edit an event'}
      closeIcon={<Close style={{ fontSize: 22 }} />}
      onCancel={closeModal}
      forceRender
      footer={[
        <div >
        <Button 
            // key="submit"
            type={'default'} 
            className={'view_button'} 
            onClick={handleClick} 
            style={{ backgroundColor: '#4865F5',color:'#fff'}}>
          {newForm ? 'Add' : 'Save'}
        </Button>
        </div>,
      ]}
      width={600}
    >
      <Form form={form} layout={'vertical'}>
        <div className={'gx-d-flex gx-justify-content-between'}>
          <Form.Item
             className={'gx-w-100'}
            name="title"
            // label="Title"
            rules={[
              {
                required: true,
                message: 'Required',
              },
            ]}
          >
            <Input placeholder="Title" prefix={<Pencil style={{ color: '#a2aabd', fontSize: 18 }} />} />
          </Form.Item>
        </div>
        <div className={'gx-d-flex gx-justify-content-between'}>
          <Form.Item
            className={'gx-w-25'}
            name="startDate"
            label="Start Date"
            style={{ paddingRight: 5 }}
          >
            <DatePicker
              suffixIcon={<CalendarMonth style={{ color: '#a2aabd', fontSize: 18 }} />}
              format={'YYYY-MM-DD'}
            />
          </Form.Item>
          <Form.Item
            className={'gx-w-25'}
            name="startTime"
            label="Start Time"
            style={{ paddingLeft: 5, width: 35 }}
          >
            <TimePicker placeholder={'Start Time'} format={'HH:mm'} minuteStep={5} />
          </Form.Item>
          <Form.Item
            className={'gx-flex-1'}
            name="endTime"
            label="End Time"
            style={{ paddingLeft: 5, width: 35 }}
          >
            <TimePicker placeholder={'End Time'} format={'HH:mm'} minuteStep={5} />
          </Form.Item>
          <Form.Item
            className={'gx-w-25'}
            name="endDate"
            label="End Date"
            style={{ paddingRight: 5 }}
          >
            <DatePicker
              suffixIcon={<CalendarMonth style={{ color: '#a2aabd', fontSize: 18 }} />}
              format={'YYYY-MM-DD'}
            />
          </Form.Item>
        </div>
        <div className={'gx-d-flex gx-justify-content-between'}>
          <Form.Item className={'gx-flex-1'} name="note" label="Note">
            <TextArea placeholder="Note" rows={4} />
          </Form.Item>
        </div>
        <Form.Item name="id" hidden={true}>
          <Input />
        </Form.Item>
        <Form.Item name="calendar_id" hidden={true}>
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AppointmentForm;
