import React, { useEffect, useState } from 'react';
import moment from 'moment';

import HandshakeOutline from '@2fd/ant-design-icons/lib/HandshakeOutline';
import ClockTimeFiveOutline from '@2fd/ant-design-icons/lib/ClockTimeFiveOutline';
import Cancel from '@2fd/ant-design-icons/lib/Cancel';

const Appointment = (model) => {

  const [TestData, setTestData] = useState(null);
  const [LightenColor, setLightenColor] = useState(null);

useEffect(() => {
  console.log(model);
  setLightenColor(LightenColorFunction(model.data.appointmentData.backgroundcolor,40));

}, []);


const LightenColorFunction = (color, percent) => {
  var num = parseInt(color.replace("#",""),16),
  amt = Math.round(2.55 * percent),
  R = (num >> 16) + amt,
  B = (num >> 8 & 0x00FF) + amt,
  G = (num & 0x0000FF) + amt;
  return "#" + (0x1000000 + (R<255?R<1?0:R:255)*0x10000 + (B<255?B<1?0:B:255)*0x100 + (G<255?G<1?0:G:255)).toString(16).slice(1);
  };

  return (

  <div className={'appointment__view'} style={{ borderLeft: '3px solid '+ model.data.appointmentData.backgroundcolor,color:model.data.appointmentData.backgroundcolor,background:LightenColor, height:'100%',
 borderRadius: '0% 15% 15% 0%' }}>
    <div className={'gx-d-flex gx-align-items-center'}>
    <div className={'gx-mr-1'} />
      {/* <div className={'gx-mr-1'} style={{ height: 18 }}>
        {model.data.appointmentData.appointment_type == 1 ? (
          <ClockTimeFiveOutline style={{ color: '#fff', fontSize: 18 }} />
        ) : model.data.appointmentData.appointment_type == 2 ? (
          <HandshakeOutline style={{ color: '#fff', fontSize: 18 }} />
        ) : (
          <Cancel style={{ color: '#fff', fontSize: 18 }} />
        )}
      </div> */}
      <div className={'gx-text-truncate'} style={{ fontSize: 11, fontWeight: 600 }}>
        {model.data.appointmentData.title}
      </div>
    </div>
    <div className={'gx-d-flex gx-mt-1'} style={{ fontSize: 11 }}>
      <span className={'gx-ml-2'}>
        {moment(model.data.appointmentData.startDate).format('HH:mm')} -{' '}
        {moment(model.data.appointmentData.endDate).format('HH:mm')}
        {model.data.appointmentData.done_time ? (
          <span className={'gx-ml-2 appointment__state'}>completed</span>
        ) : (
          model.data.appointmentData.serve_time && <span className={'gx-ml-2 appointment__state'}>served</span>
        )}
      </span>
    </div>
  </div>
);
};

export default Appointment;
