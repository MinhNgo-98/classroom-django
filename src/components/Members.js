import React, { Component } from 'react';
import AddMember from './layout/members/AddMember';
import axios from 'axios';
import moment from 'moment';
import male from '../images/male_student.png';
import female from '../images/female_student.png';
import other from '../images/other_student.png';
import edit from '../images/edit.png';
import deleting from '../images/delete.png';
import tick from '../images/tick.png';

export class Members extends Component {
	constructor(props) {
		super(props);
		this.state = {
			student: [],
			loaded: false
		};
		this.fetchData = this.fetchData.bind(this);
		this.getImage = this.getImage.bind(this);
		this.removeSpinner = this.removeSpinner.bind(this);
	}
	removeSpinner() {
		document.querySelector('#spinner4').style.display = 'none';
	}
	componentDidMount() {
		this.fetchData();
		if (!this.state.loaded && !this.props.token) setTimeout(() => this.removeSpinner(), 2000);
	}
	fetchData() {
		axios
			.get('api/student/', {
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
	editNote(student) {
		let config = {
			method: 'put',
			url: `api/student/${student.id}/`,
			headers: {
				Authorization: `Token ${this.props.token}`
			},
			data: {
				first_name: student.first_name,
				last_name: student.last_name,
				dob: student.dob,
				gender: student.gender,
				note: student.note,
				is_noting: !student.is_noting
			}
		};
		axios(config)
			.then(() => {
				console.log('Editing note...');
				this.fetchData();
			})
			.catch((err) => console.log(err));
	}
	submitEdit(student) {
		let note = document.querySelector(`#student-note${student.id}`).value;
		let config = {
			method: 'put',
			url: `api/student/${student.id}/`,
			headers: {
				Authorization: `Token ${this.props.token}`
			},
			data: {
				first_name: student.first_name,
				last_name: student.last_name,
				dob: student.dob,
				gender: student.gender,
				note: note,
				is_noting: !student.is_noting
			}
		};
		axios(config)
			.then(() => {
				console.log('Editing note...');
				this.fetchData();
			})
			.catch((err) => console.log(err));
	}
	deleteStudent(id) {
		axios
			.delete(`api/student/${id}/`, {
				headers: {
					Authorization: `Token ${this.props.token}`
				}
			})
			.then(() => {
				console.log('Student deleted...');
				this.fetchData();
			})
			.catch((err) => console.log(err));
	}
	render() {
		return (
			<div className="container-fluid pt-5 overflow-auto">
				<div className="col col-lg-11 mx-lg-auto">
					<h4> Members </h4>{' '}
					{this.props.token ? <AddMember token={this.props.token} rerenderList={this.fetchData} /> : <div />}
					{this.state.loaded ? (
						<div className=" pt-2">
							<div className="row">
								{this.state.student.map((student) => {
									return (
										<div className="col-6 col-lg-3 col-xl-2 mb-5">
											<div onClick={this.toggleInfo} className="row">
												<div className="col-md-12 px-6 px-lg-5">
													<img
														src={this.getImage(student.gender)}
														alt="Student Image"
														className="img-fluid rounded-circle"
													/>
												</div>
												<div className="col-md-12 text-center">
													<div className="pt-2 d-flex flex-column align-items-center">
														<p style={{ fontSize: 12 }} className="fw-bolder mb-0">
															{student.first_name} {student.last_name}
														</p>
														<div style={{ fontSize: 12 }} id={'student-info' + student.id} className="w-100">
															<div className="d-flex flex-column justify-content-center">
																<p className="mb-0"> {moment.parseZone(student.dob).format('DD-MM-YY')} </p>
																{!student.is_noting ? (
																	<div className="d-flex flex-column align-items-center">
																		<p className="mb-0">{student.note}</p>
																	</div>
																) : (
																	<div className="d-flex flex-column align-items-center">
																		<textarea
																			id={'student-note' + student.id}
																			style={{ fontSize: 12 }}
																			defaultValue={student.note}
																			onChange={this.handleChange}
																			className="form-control py-0 px-1"
																			id={'student-note' + student.id}
																			rows="3"
																		/>
																	</div>
																)}
															</div>
														</div>
														<div className="d-flex">
															{!student.is_noting ? (
																<button
																	type="button"
																	className="d-flex justify-content-center align-items-center btn"
																	onClick={() => this.editNote(student)}
																>
																	<img width="20px" height="20px" src={edit} alt="Edit Note" className="btn-manage" />
																</button>
															) : (
																<button
																	type="button"
																	className="d-flex justify-content-center align-items-center btn"
																	onClick={() => this.submitEdit(student)}
																>
																	<img width="20px" height="20px" src={tick} alt="Submit Edit" className="btn-manage" />
																</button>
															)}
															<button
																type="button"
																className="d-flex justify-content-center align-items-center btn"
																onClick={() => this.deleteStudent(student.id)}
															>
																<img
																	width="20px"
																	height="20px"
																	src={deleting}
																	alt="Delete Student"
																	className="btn-manage"
																/>
															</button>
														</div>
													</div>
												</div>
											</div>
										</div>
									);
								})}
							</div>
						</div>
					) : (
						<div className="d-flex justify-content-center">
							<div id="spinner4" className="spinner-border" role="status">
								<span className="invisible"> Loading... </span>
							</div>
						</div>
					)}
				</div>
			</div>
		);
	}
}

export default Members;
