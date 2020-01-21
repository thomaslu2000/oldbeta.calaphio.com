import React, { useEffect, useState } from "react";
import axios from "axios";
import { isMobile } from "react-device-detect";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";

export default function CreateEvent(props) {
	const [title, settitle] = useState("");
	const [location, setlocation] = useState("");
	const [date, setdate] = useState(false);
	const [start, setstart] = useState(false);
	const [end, setend] = useState(false);
	const [categories, setcategories] = useState([]);
	const [description, setdescription] = useState("");

	const handleSubmit = e => {
		if (title && date && start && end && description) {
			props.submitEvent(
				title,
				location,
				date,
				start + ":00",
				end + ":00",
				categories,
				description
			);
			settitle("");
			setlocation("");
			setdate(false);
			setstart(false);
			setend(false);
			setdescription("");
		} else {
			e.preventDefault();
		}
	};

	return (
		<div>
			<Form className="pt-3">
				<FormGroup>
					<Label for="title">Event Title</Label>
					<Input
						id="title"
						value={title}
						onChange={e => settitle(e.target.value)}
					/>
				</FormGroup>
				<FormGroup>
					<Label for="location">Event Location</Label>
					<Input
						id="location"
						value={location}
						onChange={e => setlocation(e.target.value)}
					/>
				</FormGroup>
				<FormGroup>
					<Label for="date">Date</Label>
					<Input
						type="date"
						name="date"
						id="date"
						placeholder="Start Date"
						value={date}
						onChange={e => setdate(e.target.value)}
					/>
				</FormGroup>
				<FormGroup check inline>
					<Label for="startTime">Start Time</Label>
					<Input
						type="time"
						name="time"
						id="startTime"
						placeholder="Start Time"
						value={start}
						onChange={e => setstart(e.target.value)}
					/>
				</FormGroup>
				<FormGroup check inline>
					<Label for="endTime">End Time</Label>
					<Input
						type="time"
						name="time"
						id="endTime"
						placeholder="End Date"
						value={end}
						onChange={e => setend(e.target.value)}
					/>
				</FormGroup>
				<FormGroup>
					<Label for="categories">
						Select Categories{" "}
						{!isMobile && " (hold ctrl/cmd to select multiple)"}
					</Label>
					<Input
						type="select"
						name="selectMulti"
						id="categories"
						multiple
						value={categories}
						onChange={e => {
							let newList = [];
							for (let i = 0; i < e.target.options.length; i++) {
								let opt = e.target.options[i];
								if (opt.selected) {
									newList.push(opt.value);
								}
							}
							setcategories(newList);
						}}
					>
						<option>Fellowship</option>
						<option>Service to Chapter</option>
						<option>Service to Campus</option>
						<option>Service to Community</option>
						<option>Service to Country</option>
						<option>Fundraiser</option>
						<option>Pledge</option>
						<option>Interchapter</option>
					</Input>
				</FormGroup>
				<FormGroup>
					<Label for="description">Description</Label>
					<Input
						type="textarea"
						name="text"
						id="description"
						value={description}
						onChange={e => setdescription(e.target.value)}
					/>
				</FormGroup>

				<Button color="success" onClick={handleSubmit}>
					Submit
				</Button>
			</Form>
		</div>
	);
}
