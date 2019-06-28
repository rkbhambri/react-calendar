import React, { Component } from 'react';
import classNames from 'classnames';
import Reminder from './Reminder';
import ReminderForm from './ReminderForm';
import Modal from 'react-responsive-modal';

class CalendarMonth extends Component {

	state = {
		showForm: false,
		reminder: null,
		weekIndex: null,
		dayIndex: null,
		day: null,
	};

	onOpenModal = (e, payload = {}) => {
		this.setState({
			showForm: true,
			...payload,
		});
	};

	onCloseModal = () => {
		this.setState({
			showForm: false,
			reminder: null,
			weekIndex: null,
			dayIndex: null,
			day: null,
		});
	};

	render() {
		const { month, actions } = this.props;
		const { showForm, day, weekIndex, dayIndex, reminder } = this.state;
		return (
			<div className="calendar__month">
				{
					month.map((week, weekIndex) => (
						<div className="calendar__row calendar__week" key={weekIndex}>
							{
								week.map((day, dayIndex) => (
									<React.Fragment key={dayIndex}>
										<div
											className={classNames('calendar__day', {
												calendar__day__sibling: day.siblingMonth !== 0,
												calendar__day__today: day.date.toDateString() === new Date().toDateString(),
											})}
											onClick={() => this.onOpenModal(null, { day, weekIndex, dayIndex })}>
											<span className="calendar__day__label">{day.date.getDate()}</span>
											{day.reminders.length > 0 &&
												day.reminders.map(reminder => (
													<Reminder
														key={reminder.uuid}
														reminder={reminder}
														onUpdate={() =>
															this.onOpenModal(null, { day, weekIndex, dayIndex, reminder })
														}
													/>
												))
											}
										</div>
									</React.Fragment>
								))
							}
						</div>
					))}
				<Modal open={showForm} onClose={this.onCloseModal}>
					<ReminderForm
						reminder={reminder}
						weekIndex={weekIndex}
						day={day}
						dayIndex={dayIndex}
						onCreate={actions.createReminder}
						onUpdate={actions.updateReminder}
						onDelete={actions.deleteReminder}
						onComplete={this.onCloseModal}
					/>
				</Modal>
			</div>
		);
	}
}

export default CalendarMonth;
