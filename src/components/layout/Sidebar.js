import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class Sidebar extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<nav id="sidebar" className="d-none d-md-block bg-light sidebar mr-3">
				<div className="sidebar-sticky w-100 h-100 py-5 px-4">
					<ul style={{ width: 120 }} className="p-0 mx-auto my-0">
						<li className="nav-item d-flex mb-5 mx-auto">
							<Link to="/" className="text-dark fs-6 d-flex nav-link p-0 active align-items-center">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="20"
									height="20"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
									className="mr-2 feather feather-home"
								>
									<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
									<polyline points="9 22 9 12 15 12 15 22" />
								</svg>
								<p className="mb-0 fs-6">Overview</p>
							</Link>
						</li>
						<li className="nav-item d-flex mb-5 mx-auto">
							<Link to="/members" className="text-dark fs-6 d-flex nav-link p-0 align-items-center">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="20"
									height="20"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
									className="mr-2 feather feather-users"
								>
									<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
									<circle cx="9" cy="7" r="4" />
									<path d="M23 21v-2a4 4 0 0 0-3-3.87" />
									<path d="M16 3.13a4 4 0 0 1 0 7.75" />
								</svg>
								<p className="mb-0 fs-6">Members</p>
							</Link>
						</li>
					</ul>
				</div>
			</nav>
		);
	}
}

export default Sidebar;
