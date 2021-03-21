import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';

export class HomeworkInfo extends Component {
	constructor(props) {
		super(props);
		this.state = {
			homework: this.props.homework,
			completed: this.props.homework.completed,
			due_date: this.props.homework.due_date
		};
		this.handleChange = this.handleChange.bind(this);
	}
	handleChange() {
		axios
			.put(
				`api/homework/${this.state.homework.id}/`,
				{
					title: this.state.homework.title,
					description: this.state.homework.description,
					due_date: this.state.homework.due_date,
					completed: !this.state.homework.completed
				},
				{
					headers: {
						Authorization: `token ${this.props.token}`
					}
				}
			)
			.then(() => {
				console.log('Homework checked/unchecked...');
				this.setState({ completed: !this.state.completed });
			})
			.catch((err) => console.log(err));
	}
	componentWillReceiveProps({ homework }) {
		this.setState({ ...this.state, homework });
	}
	render() {
		return (
			<div
				style={{ width: '85%' }}
				className="form-check mx-1 p-0 h-100 mb-0 d-flex align-items-center position-relative"
			>
				<hr
					className="w-100 position-absolute"
					style={{
						height: 1,
						backgroundColor: '#000',
						display: this.state.completed ? '' : 'none',
						opacity: 1
					}}
				/>
				<div className="d-flex justify-content-center align-items-center" style={{ width: '5%' }}>
					<input
						className="form-check-input p-0 m-0 rounded-circle bg-dark border-dark"
						type="checkbox"
						defaultChecked={this.state.homework.completed}
						onChange={this.handleChange}
					/>
				</div>
				{!this.state.homework.is_editing ? (
					<div className="d-flex" style={{ width: '95%' }} id="homework-info">
						<div className="d-flex align-items-center p-1 mb-0 fs-6 col fw-bolder">
							<p className="mb-0" style={{ fontSize: 14 }}>
								{this.state.homework.title}
							</p>
						</div>
						<div className="d-flex align-items-center p-1 mb-0 fs-6 col-6">
							<p className="mb-0" style={{ fontSize: 14 }}>
								{this.state.homework.description}
							</p>
						</div>
						<div className="d-flex align-items-center p-1 mb-0 col">
							<span style={{ fontSize: 12 }} className="d-flex">
								{moment.parseZone(this.state.homework.due_date).format('DD-MM-YY HH:mm')}
							</span>
						</div>
					</div>
				) : (
					<div className="d-flex" style={{ width: '95%' }} id="homework-info">
						<div className="d-flex align-items-center p-0 mb-0 fs-6 col-3">
							<input
								type="text"
								id={`edit-title-${this.state.homework.id}`}
								defaultValue={this.state.homework.title}
								className="form-control p-1 h-100"
								style={{ fontSize: 12 }}
							/>
						</div>
						<div className="d-flex align-items-center pr-0 pl-2 mb-0 fs-6 col-6">
							<input
								type="text"
								id={`edit-description-${this.state.homework.id}`}
								defaultValue={this.state.homework.description}
								className="form-control p-1 h-100"
								style={{ fontSize: 12 }}
							/>
						</div>
						<div className="d-flex align-items-center pr-0 pl-2 mb-0 fs-6 col-3">
							<input
								type="datetime-local"
								id={`edit-due-date-${this.state.homework.id}`}
								defaultValue={this.state.due_date.slice(0, -1)}
								className="form-control p-1 h-100"
								style={{ fontSize: 12 }}
							/>
						</div>
					</div>
				)}
			</div>
		);
	}
}

export default HomeworkInfo;
