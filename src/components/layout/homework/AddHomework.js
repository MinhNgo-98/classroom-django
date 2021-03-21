import React, { Component } from 'react';
import axios from 'axios';
import { Button, Collapse } from 'react-bootstrap';
import plus from '../../../images/plus.png';

export class AddHomework extends Component {
	constructor(props) {
		super(props);
		this.state = {
			title: '',
			description: '',
			due_date: '2021-01-01T00:00',
			open: false
		};
		this.handleChange = this.handleChange.bind(this);
		this.postHomework = this.postHomework.bind(this);
		this.resetForm = this.resetForm.bind(this);
	}
	resetForm() {
		this.setState({
			title: '',
			description: '',
			due_date: '2021-01-01T00:00'
		});
	}
	postHomework(event) {
		event.preventDefault();
		axios
			.post(
				'https://classroom-django.herokuapp.com/api/homework/',
				{
					title: this.state.title,
					description: this.state.description,
					due_date: this.state.due_date
				},
				{
					headers: {
						Authorization: `token ${this.props.token}`
					}
				}
			)
			.then(() => {
				console.log('Homework added...');
				this.resetForm();
				this.props.rerenderList();
				document.querySelector('#add-homework').classList.remove('show');
			})
			.catch((err) => console.log(err));
	}
	handleChange(event) {
		if (event.target.id === 'homework-title') {
			this.setState({ title: event.target.value });
		} else if (event.target.id === 'homework-description') {
			this.setState({ description: event.target.value });
		} else if (event.target.id === 'homework-due-date') {
			this.setState({ due_date: event.target.value });
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
					aria-controls="add-homework"
				>
					<img width="15px" height="15px" src={plus} alt="Add Task" />
				</Button>
				<Collapse in={this.state.open}>
					<form className="collapse mb-4" id="add-homework" onSubmit={(event) => this.postHomework(event)}>
						<div className="mb-2">
							<label for="homework-title" className="form-label">
								Title
							</label>
							<input
								style={{ fontSize: 12 }}
								value={this.state.title}
								onChange={this.handleChange}
								type="text"
								className="form-control p-1"
								id="homework-title"
								placeholder=""
							/>
						</div>
						<div className="mb-2">
							<label for="homework-description" className="form-label">
								Despription
							</label>
							<input
								style={{ fontSize: 12 }}
								value={this.state.description}
								onChange={this.handleChange}
								className="form-control p-1"
								id="homework-description"
								type="text"
							/>
						</div>
						<div className="mb-2">
							<label for="homework-due-date" className="form-label">
								Due Date
							</label>
							<input
								value={this.state.due_date}
								onChange={this.handleChange}
								className="form-control p-1"
								id="homework-due-date"
								type="datetime-local"
								style={{ fontSize: 12 }}
							/>
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

export default AddHomework;
