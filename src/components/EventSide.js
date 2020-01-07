import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../env";
import {
	Badge,
	Card,
	CardBody,
	CardTitle,
	CardSubtitle,
	CardText,
	Table,
	ListGroup,
	ListGroupItem
} from "reactstrap";
import { unsanitize } from "../functions";
import moment from "moment";
import { Link } from "react-router-dom";
import { useGlobal } from "reactn";

export default function EventSide(props) {
	const [data, setData] = useState(false);
	const [attending, setAttending] = useState([]);
	const [comments, setComments] = useState([]);
	const [global] = useGlobal();

	const getData = async () => {
		await axios
			.get(`${API_URL}/event/attend/${props.id}/`)
			.then(response => {
				setAttending(response.data || []);
			});
		await axios
			.get(`${API_URL}/event/comment/${props.id}/`)
			.then(response => {
				setComments(response.data || []);
			});
		await axios.get(`${API_URL}/event/${props.id}/`).then(response => {
			setData(response.data[0]);
		});
	};

	useEffect(() => {
		console.log(global);
		if (props.id) getData();
	}, [props.id]);

	if (data) {
		let startDate = moment(data.start);
		let endDate = moment(data.end);
		return (
			<Card>
				<CardBody>
					<CardTitle className="h1 mb-2 pt-2 font-weight-bold">
						{unsanitize(data.title)}
					</CardTitle>
					<CardSubtitle className="text-secondary mb-3 font-weight-light">
						Location: {data.location} <br /> Date:{" "}
						{startDate.format("LL")}
						<br /> Time: {startDate.format("LT")} to{" "}
						{endDate.format("LT")} <br />
						Category:{" "}
						{Boolean(data.type_service)
							? "Service"
							: Boolean(data.type_fellowship)
							? "Fellowship"
							: Boolean(data.type_pledge_meeting)
							? "Pledge"
							: "Other"}
					</CardSubtitle>
					<CardText
						className="text-secondary mb-4 text-left"
						style={{ fontSize: "0.8rem" }}
						dangerouslySetInnerHTML={{
							__html: data.description
						}}
					></CardText>
					<AttendTable attending={attending} />
					<hr />
					<CommentPanel comments={comments} />
				</CardBody>
			</Card>
		);
	} else {
		return (
			<Card>
				<CardBody>
					<CardTitle className="h1 mb-2 pt-2 font-weight-bold">
						Select An Event
					</CardTitle>
				</CardBody>
			</Card>
		);
	}
}

function AttendTable(props) {
	return (
		<Table striped>
			<thead>
				<tr>
					<th className="w-25"># ({props.attending.length})</th>
					<th> Name</th>
					<th className="w-25"> Time</th>
				</tr>
			</thead>
			<tbody>
				{props.attending.map((attend, i) => {
					return (
						<tr key={"attend" + i}>
							<th scope="row" className="small">
								{i + 1}
							</th>
							<td>
								<Link to={`/profile/${attend.user_id}`}>
									{attend.firstname + " " + attend.lastname}
								</Link>
							</td>
							<td className="small">
								{moment(attend.time).fromNow()}
							</td>
						</tr>
					);
				})}
			</tbody>
		</Table>
	);
}

function CommentPanel(props) {
	return (
		<ListGroup className="small text-left" flush>
			{props.comments.map((comment, i) => {
				return (
					<ListGroupItem key={"comment" + i}>
						<Link
							to={`/profile/${comment.user_id}`}
							className={"text-dark font-weight-bold"}
						>
							{comment.firstname} {comment.lastname}
						</Link>
						<Badge color="secondary" className="float-right">
							{moment(comment.time).fromNow()}
						</Badge>
						<br /> <p className="text-right">{comment.body}</p>
					</ListGroupItem>
				);
			})}
		</ListGroup>
	);
}
