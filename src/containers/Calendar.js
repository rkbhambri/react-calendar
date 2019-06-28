import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as CalendarActions from '../actions';
import CalendarMonth from '../components/CalendarMonth';

class Calendar extends Component {
	state = {
		month: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
	}
	render() {
		console.log('===this.props.month', this.props.month);
		const monthYearArray = this.props.month.id.split('-');
		const month = this.state.month[Number(monthYearArray[1] - 1)];
		const year = monthYearArray[0];
		return (
			<React.Fragment>
				<h1 style={{ textAlign: 'center' }}>Chumbak Assignment</h1>
				<div className="calendar">
					<div className="calendar__nav">
						<div
							onClick={() => this.props.actions.prevMonth()}
							style={{ marginLeft: '10px' }}>Prev</div>
						<div
							onClick={() => this.props.actions.nextMonth()}
							style={{ textAlign: 'right', marginRight: '10px' }}>Next &nbsp;</div>
					</div>
					<div className="date" style={{ textAlign: 'center' }}>
						<h3>{month}&nbsp;{year}</h3>
					</div>
					<div className="calendar__row calendar__header">
						<div>Sun</div>
						<div>Mon</div>
						<div>Tue</div>
						<div>Wed</div>
						<div>Thu</div>
						<div>Fri</div>
						<div>Sat</div>
					</div>
					<CalendarMonth month={this.props.month.weeks} actions={this.props.actions} />
				</div>
			</React.Fragment>
		);
	};
};

const mapStateToProps = state => ({
	month: state.calendar.month,
});

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(CalendarActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
