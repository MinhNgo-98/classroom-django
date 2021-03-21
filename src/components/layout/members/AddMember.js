import React, { Component } from 'react';
import axios from 'axios';
import { Button, Collapse } from 'react-bootstrap';
import plus from '../../../images/plus.png';

export class AddMember extends Component {
	constructor(props) {
		super(props);
		this.state = {
			first_name: '',
			last_name: '',
			dob: '2021-01-01',
			gender: '',
			open: false
		};
		this.handleChange = this.handleChange.bind(this);
		this.poststudent = this.postStudent.bind(this);
		this.resetForm = this.resetForm.bind(this);
	}
	resetForm() {
		console.log('hello');
		this.setState({
			first_name: '',
			last_name: '',
			dob: '2021-01-01',
			gender: ''
		});
		console.log(this.state.first_name);
	}
	postStudent(event) {
		event.preventDefault();
		axios
			.post(
				'https://classroom-django.herokuapp.com/api/student/',
				{
					first_name: this.state.first_name,
					last_name: this.state.last_name,
					dob: this.state.dob,
					gender: this.state.gender
				},
				{
					headers: {
						Authorization: `Token ${this.props.token}`
					}
				}
			)
			.then(() => {
				console.log('Student added...');
				this.resetForm();
				this.props.rerenderList();
				document.querySelector('#add-student').classList.remove('show');
			})
			.catch((err) => console.log(err));
	}
	handleChange(event) {
		if (event.target.id === 'student-first-name') {
			this.setState({ first_name: event.target.value });
		} else if (event.target.id === 'student-last-name') {
			this.setState({ last_name: event.target.value });
		} else if (event.target.id === 'student-dob') {
			this.setState({ dob: event.target.value });
		} else if (event.target.id === 'male' || 'female' || 'other') {
			if (event.target.id === 'male') this.setState({ gender: 'm' });
			if (event.target.id === 'female') this.setState({ gender: 'f' });
			if (event.target.id === 'other') this.setState({ gender: 'o' });
		}
	}
	render() {
		const { open } = this.state;
		return (
			<div style={{ fontSize: 12 }}>
				<Button
					className="btn bg-transparent border-0 text-white mb-2 d-flex justify-content-center align-items-center p-1"
					type="button"
					onClick={() => this.setState({ open: !open })}
					aria-expanded={open}
					aria-controls="add-student"
				>
					<img width="15px" height="15px" src={plus} alt="Add Task" />
				</Button>
				<Collapse in={this.state.open}>
					<form className="collapse mb-4" id="add-student" onSubmit={(event) => this.postStudent(event)}>
						<div className="mb-2">
							<label for="student-first-name" className="form-label">
								First Name
							</label>
							<input
								style={{ fontSize: 12 }}
								onChange={this.handleChange}
								type="text"
								value={this.state.first_name}
								className="form-control p-1"
								id="student-first-name"
								placeholder=""
							/>
						</div>
						<div className="mb-2">
							<label for="student-last-name" className="form-label">
								Last Name
							</label>
							<input
								style={{ fontSize: 12 }}
								onChange={this.handleChange}
								type="text"
								value={this.state.last_name}
								className="form-control p-1"
								id="student-last-name"
								placeholder=""
							/>
						</div>
						<div className="mb-2">
							<label for="student-dob" className="form-label">
								Date of Birth
							</label>
							<input
								style={{ fontSize: 12 }}
								value={this.state.dob}
								onChange={this.handleChange}
								className="form-control p-1"
								id="student-dob"
								type="date"
							/>
						</div>
						<div className="mb-2">
							<label for="student-gender" className="form-label">
								Gender
							</label>
							<div>
								<div className="form-check form-check-inline">
									<input
										className="form-check-input"
										type="radio"
										checked={this.state.gender === 'm'}
										name="inlineRadioOptions"
										onChange={this.handleChange}
										id="male"
										value="male"
									/>
									<label className="form-check-label" for="male">
										male
									</label>
								</div>
								<div className="form-check form-check-inline">
									<input
										className="form-check-input"
										type="radio"
										checked={this.state.gender === 'f'}
										name="inlineRadioOptions"
										onChange={this.handleChange}
										id="female"
										value="female"
									/>
									<label className="form-check-label" for="female">
										female
									</label>
								</div>
								<div className="form-check form-check-inline">
									<input
										className="form-check-input"
										type="radio"
										checked={this.state.gender === 'o'}
										name="inlineRadioOptions"
										onChange={this.handleChange}
										id="other"
										value="other"
									/>
									<label className="form-check-label" for="other">
										other
									</label>
								</div>
							</div>
						</div>
						<button style={{ fontSize: 12 }} type="submit" className="btn btn-dark bg-dark">
							Confirm
						</button>
					</form>
				</Collapse>
			</div>
		);
	}
}

export default AddMember;
