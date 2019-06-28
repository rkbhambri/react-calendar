import React from 'react';

import { addMinutes, getDateHourMinutes } from '../helpers/hours';

const Reminder = (props) => {
  const endTime = addMinutes(props.reminder.startTime, props.reminder.duration);

  return (
    <div className="reminder" style={{ background: props.reminder.color }} onClick={() => props.onUpdate()}>
      <span className="reminder__time">
        {getDateHourMinutes(props.reminder.startTime)} - {getDateHourMinutes(endTime)}
      </span>
      <span>{props.reminder.description}</span>
    </div>
  );
};

export default Reminder;
