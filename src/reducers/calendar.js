import * as types from '../constants/action-types';
import { getMonth, getMonthId, getDateByMonthOffset } from '../helpers';

const formatMonthDays = (currentDate, metadata) => ({
  date: currentDate,
  ...metadata,
  reminders: [],
});

const defaultState = {
  history: {},
  month: getMonth(null, { formatDate: formatMonthDays }),
};

const calendar = (state = defaultState, action) => {
  switch (action.type) {
    case types.CALENDAR_NAV_PREV_MONTH: {
      const prevMonthDate = getDateByMonthOffset(state.month.date, -1);
      const prevMonthId = getMonthId(prevMonthDate);
      const prevMonth = getMonth(prevMonthDate, { formatDate: formatMonthDays });

      // Save history
      const history = { ...state.history, [state.month.id]: state.month };

      // Set current month
      let month;
      if (state.history[prevMonthId]) {
        month = { ...state.history[prevMonthId] };
      } else {
        month = prevMonth;
      }

      return { ...state, month, history };
    }
    case types.CALENDAR_NAV_NEXT_MONTH: {
      const nextMonthDate = getDateByMonthOffset(state.month.date, 1);
      const nextMonthId = getMonthId(nextMonthDate);
      const nextMonth = getMonth(nextMonthDate, { formatDate: formatMonthDays });

      // Save history
      const history = { ...state.history, [state.month.id]: state.month };

      // Set current month
      let month;
      if (state.history[nextMonthId]) {
        month = { ...state.history[nextMonthId] };
      } else {
        month = nextMonth;
      }

      return { ...state, month, history };
    }
    case types.CALENDAR_CREATE_REMINDER: {
      const { payload } = action;

      const updatedMonth = { ...state.month };

      updatedMonth.weeks[payload.weekIndex][payload.dayIndex].reminders.push(payload.reminder);
      updatedMonth.weeks[payload.weekIndex][payload.dayIndex].reminders.sort(
        (a, b) => new Date(a.startTime) - new Date(b.startTime)
      );

      return { ...state, month: updatedMonth };
    }
    case types.CALENDAR_UPDATE_REMINDER: {
      const { payload } = action;

      const updatedMonth = { ...state.month };

      updatedMonth.weeks[payload.weekIndex][payload.dayIndex].reminders
        .map(reminder => (reminder.uuid === payload.reminder.uuid ? payload.reminder : reminder))
        .sort((a, b) => new Date(a.startTime) - new Date(b.startTime));

      return { ...state, month: updatedMonth };
    }
    case types.CALENDAR_DELETE_REMINDER: {
      const { payload } = action;

      const updatedMonth = { ...state.month };

      updatedMonth.weeks[payload.weekIndex][payload.dayIndex].reminders = updatedMonth.weeks[
        payload.weekIndex
      ][payload.dayIndex].reminders.filter(reminder => reminder.uuid !== payload.reminder.uuid);

      return { ...state, month: updatedMonth };
    }
    default:
      return state;
  }
};

export default calendar;
