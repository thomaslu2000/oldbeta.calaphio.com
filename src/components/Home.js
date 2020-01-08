import React, { useEffect, useState } from "react";
import moment from "moment";
import axios from "axios";
import { API_URL } from "../env";
import {
	Container,
	Card,
	CardBody,
	CardText,
	CardHeader,
	CardFooter,
	UncontrolledCollapse
} from "reactstrap";
import { unsanitize } from "../functions";

export default function Home() {
	const [semId, setSemId] = useState(false);

	const [announcements, setAnnouncements] = useState([]);

	const getAnnouncements = async () => {
		await axios
			.get(`${API_URL}/announcements/sem/${semId}`)
			.then(response => {
				setAnnouncements(response.data);
			});
	};

	useEffect(() => {
		let lastId = async () => {
			await axios.get(`${API_URL}/semesters/last`).then(response => {
				setSemId(response.data[0].id);
			});
		};
		lastId();
	}, []);

	useEffect(() => {
		if (semId) {
			getAnnouncements();
		}
	}, [semId]);

	return (
		// this is just a test page for now
		<Container>
			<h1>Announcements</h1>
			<hr />
			{announcements.map(data => {
				return (
					<Card key={"card" + data.id} className="my-5">
						<CardHeader
							tag="h3"
							id={"toggler" + data.id}
							dangerouslySetInnerHTML={{
								__html: unsanitize(data.title)
							}}
						></CardHeader>
						<UncontrolledCollapse toggler={"#toggler" + data.id}>
							<CardBody>
								<CardText
									dangerouslySetInnerHTML={{
										__html: unsanitize(data.text)
									}}
								></CardText>
							</CardBody>
							<CardFooter className="text-muted bg-lighten">{`- ${
								data.firstname
							} ${data.lastname} (${data.pledgeclass}), ${moment(
								data.publish_time
							).format("MMMM Do YYYY")}`}</CardFooter>
						</UncontrolledCollapse>
					</Card>
				);
			})}
		</Container>
	);
}
