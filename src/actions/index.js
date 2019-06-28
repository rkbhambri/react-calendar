import * as types from '../constants/action-types';

export const prevMonth = () => ({
  type: types.CALENDAR_NAV_PREV_MONTH,
});

export const nextMonth = () => ({
  type: types.CALENDAR_NAV_NEXT_MONTH,
});

export const createReminder = opts => ({
  type: types.CALENDAR_CREATE_REMINDER,
  payload: { ...opts },
});

export const updateReminder = opts => ({
  type: types.CALENDAR_UPDATE_REMINDER,
  payload: { ...opts },
});

export const deleteReminder = opts => ({
  type: types.CALENDAR_DELETE_REMINDER,
  payload: { ...opts },
});
