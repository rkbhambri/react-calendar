import React, { Component } from 'react';

import { Reminder } from '../lib/Reminder';
import { getDateHourMinutes, formatDateFromTime } from '../helpers/hours';

class ReminderForm extends Component {

	state = {
		description: (this.props.reminder && this.props.reminder.description) || '',
		color: (this.props.reminder && this.props.reminder.color) || '#86EEA8',
		startTime: (this.props.reminder && this.props.reminder.startTime) || getDateHourMinutes(new Date()),
		duration: (this.props.reminder && this.props.reminder.endTime) || 30,
	};

	handleSubmit = e => {
		e.preventDefault();
		const { weekIndex, dayIndex, reminder } = this.props;

		if (reminder) {
			const updatedReminder = Object.assign(reminder, {
				...this.state,
				startTime: formatDateFromTime(this.props.day.date, this.state.startTime),
			});
			this.props.onUpdate({
				weekIndex,
				dayIndex,
				reminder: updatedReminder,
			});
		} else {
			this.props.onCreate({
				weekIndex,
				dayIndex,
				reminder: new Reminder({
					...this.state,
					startTime: formatDateFromTime(this.props.day.date, this.state.startTime),
				}),
			});
		}
		this.props.onComplete();
	};

	handleDescriptionChange = e => {
		this.setState({ description: e.target.value });
	};

	handleColorChange = event => {
		let color = { hex: event.target.value }
		this.setState({ color: color });
	};

	handleStartTimeChange = e => {
		this.setState({
			startTime: e.target.value,
		});
	};

	handleDurationChange = e => {
		this.setState({
			duration: e.target.value,
		});
	};

	render() {
		return (
			<form className="reminder__form" onSubmit={this.handleSubmit}>
				<input
					type="text"
					maxLength={30}
					autoFocus={true}
					placeholder="New reminder description"
					value={this.state.description}
					required={true}
					onChange={this.handleDescriptionChange}
					style={{ width: '200px', height: '30px', borderRadius: '3px' }}
				/><br /><br />
				<div className="color">
					<label>Color:</label>
					<input type="color" onChange={this.handleColorChange} />
				</div><br /><br />
				<div className="start-time">
					<label>Start Time:</label>
					<input
						type="time"
						step={5}
						value={this.state.startTime}
						onChange={this.handleStartTimeChange}
					/>
				</div><br /><br />
				<label>Duration:</label>
				<input
					type="number"
					step={5}
					value={this.state.duration}
					onChange={this.handleDurationChange}
				/>
				&nbsp;mins
        		<br /><br />
				<button
					type="submit"
					style={{ padding: '10px' }}>
					{this.props.reminder ? 'Update' : 'Create'}
				</button>
				{
					this.props.reminder && (
						<button
							onClick={e => {
								e.preventDefault();
								if (window.confirm('You want to delete this reminder?')) {
									this.props.onDelete({
										weekIndex: this.props.weekIndex,
										dayIndex: this.props.dayIndex,
										reminder: this.props.reminder,
									});
									this.props.onComplete();
								}
							}}
							className="reminder__form__delete"
							style={{ padding: '10px' }}>
							Delete
          				</button>
					)}
			</form>
		);
	}
}

export default ReminderForm;

