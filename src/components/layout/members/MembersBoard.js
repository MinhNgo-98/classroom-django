import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { Collapse } from 'react-bootstrap';
import male from '../../../images/male_student.png';
import female from '../../../images/female_student.png';
import other from '../../../images/other_student.png';

export class MembersBoard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			student: [],
			loaded: false,
			open: false
		};
		this.editStudent = this.editStudent.bind(this);
		this.submitEdit = this.submitEdit.bind(this);
		this.deleteStudent = this.deleteStudent.bind(this);
		this.fetchData = this.fetchData.bind(this);
		this.getImage = this.getImage.bind(this);
	}
	componentDidMount() {
		if (this.props.token) this.fetchData();
	}
	fetchData() {
		console.log(this.props.token);
		axios
			.get('api/student', {
				headers: {
					Authorization: `token ${this.props.token}`
				}
			})
			.then((result) => {
				this.setState(() => {
					return {
						student: result.data,
						loaded: true
					};
				});
			})
			.catch((err) => console.log('Fetching failed: ' + err));
	}
	getImage(gender) {
		if (gender === 'm') return male;
		if (gender === 'f') return female;
		if (gender === 'o') return other;
	}
	editStudent(student) {
		axios
			.put(`api/student/${student.id}/`, {
				title: student.title,
				description: student.description,
				due_date: student.due_date,
				is_editing: !student.is_editing
			})
			.then(() => {
				console.log('Editing...');
				this.fetchData();
			})
			.catch((err) => console.log(err));
	}
	submitEdit(student) {
		let title = document.querySelector(`#edit-title-${student.id}`).value;
		let description = document.querySelector(`#edit-description-${student.id}`).value;
		let due_date = document.querySelector(`#edit-due-date-${student.id}`).value;

		axios
			.put(`api/student/${student.id}/`, {
				title: title,
				description: description,
				due_date: due_date,
				is_editing: !student.is_editing
			})
			.then(() => {
				console.log('student edited...');
				this.fetchData();
			})
			.catch((err) => console.log(err));
	}
	deleteStudent(id) {
		axios
			.delete(`api/student/${id}`)
			.then(() => {
				console.log('Student deleted...');
				this.fetchData();
			})
			.catch((err) => console.log(err));
	}
	render() {
		const { open } = this.state;
		return (
			<div style={{ borderRadius: '25px' }} className="members-board col h-100 p-3 border shadow overflow-auto">
				<div className="d-flex align-items-center justify-content-between">
					<h4 className="fs-5">Students</h4>
					<Link to="/members">
						<button type="button" to="/members" className="btn btn-light ml-2 p-0 mb-1">
							View more
						</button>
					</Link>
				</div>
				{this.state.loaded ? (
					<div className=" pt-2">
						<div className="row">
							{this.state.student.map((student) => {
								return (
									<div className="col-6 col-lg-1 mb-4">
										<div className="row">
											<div
												className="col-md-12 px-5 px-lg-3"
												onClick={() => this.setState({ open: !open })}
												aria-expanded={open}
												aria-controls={'student-info' + student.id}
												style={{ cursor: 'pointer' }}
											>
												<img
													src={this.getImage(student.gender)}
													alt="Student Image"
													className="img-fluid rounded-circle"
												/>
											</div>
											<div className="col-md-12 text-center">
												<div className="pt-2">
													<p className="mb-0 fw-bolder">
														{student.first_name} {student.last_name}
													</p>
												</div>
											</div>
											<Collapse in={this.state.open}>
												<div id={'student-info' + student.id} className="w-100 text-center">
													<p className="mb-0"> {moment.parseZone(student.dob).format('DD-MM-YY')} </p>
													<p className="mb-0">{student.note}</p>
												</div>
											</Collapse>
										</div>
									</div>
								);
							})}
						</div>
					</div>
				) : (
					<div className="d-flex justify-content-center" />
				)}
			</div>
		);
	}
}

export default MembersBoard;
