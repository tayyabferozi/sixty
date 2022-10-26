import React from 'react';
import { Space, Button } from 'antd';
import moment from 'moment';

import Delete from '@2fd/ant-design-icons/lib/Delete';
import LeadPencil from '@2fd/ant-design-icons/lib/LeadPencil';
import ClockTimeFiveOutline from '@2fd/ant-design-icons/lib/ClockTimeFiveOutline';
import SubtitlesOutline from '@2fd/ant-design-icons/lib/SubtitlesOutline';

const AppointmentTooltipContainer = (props) => {
  const { data, onAppointmentEditBtnClick, onAppointmentDeleteBtnClick } = props;

  const handleEditClick = () => {
    onAppointmentEditBtnClick();
  };

  const handleDeleteClick = async () => {
    onAppointmentDeleteBtnClick(data.appointmentData.id);
  };
  return (
    <div className={'appointment__tooltip'}>
      <div className={'appointment__tooltip-header'}>
        <div className={'gx-d-flex appointment-title'}>
          <span className={'gx-text-truncate'}>{data.appointmentData.title}</span>
        </div>
      </div>
      <div className={'appointment__tooltip-body'}>

        <div className={'gx-d-flex gx-align-items-center gx-text-grey'}>
          <div className={'gx-mr-2'} style={{ height: 20 }}>
            <ClockTimeFiveOutline style={{ fontSize: 20 }} />
          </div>
          <div className={'gx-ml-1'}>
            {moment(data.appointmentData.startDate).format('HH:mm')} -{' '}
            {moment(data.appointmentData.endDate).format('HH:mm')}
          </div>
        </div>
        <div className={'gx-d-flex gx-align-items-center gx-text-grey gx-mt-2'}>
          <div className={'gx-mr-2'} style={{ height: 20 }}>
            <SubtitlesOutline style={{ fontSize: 20 }} />
          </div>
          <div className={'gx-ml-1 gx-text-truncate'} style={{ fontSize: 12 }}>
            {data.appointmentData.note}
          </div>
        </div>

        <Space style={{ float: 'right', background: '#fafafa' }}>

          <Button
            type={'default'}
            className={'view_button'}
            onClick={() => {
              handleDeleteClick();
            }}
            style={{ backgroundColor: '#fff', color: '#000', borderTop: '1px solid rgba(221, 221, 221, 0.6)' }}>
            Cancel
          </Button>

          <Button
            type={'default'}
            className={'view_button'}
            onClick={handleEditClick}
            style={{ backgroundColor: '#4865F5', color: '#fff' }}>
            Modify
          </Button>
        </Space>
      </div>
    </div>
  );
};

export default AppointmentTooltipContainer;
