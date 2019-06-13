import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../env";
import {
	Card,
	CardImg,
	CardText,
	CardBody,
	CardTitle,
	CardSubtitle
} from "reactstrap";

export default function Profile({ match }) {
	const [user, setUser] = useState({
		profile_pic:
			"https://media3.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif?cid=790b76115d0206e06a45745a41c228b5&rid=giphy.gif"
	});
	const [description, setDescription] = useState("");

	useEffect(() => {
		const getUser = async () => {
			await axios
				.get(`${API_URL}/user/${match.params.user_id}/`)
				.then(response => setUser(response.data[0]));
			await axios
				.get(`${API_URL}/user/desc/${match.params.user_id}/`)
				.then(response => setDescription(response.data[0].description));
		};

		getUser();
	}, []);

	return (
		<div>
			<Card className={"w-75 ml-auto mx-auto"}>
				<CardImg
					className="p-5 w-50 mx-auto"
					src={user.profile_pic}
					alt="Card"
				/>
				<CardBody style={{ fontSize: "20px" }}>
					<CardTitle>
						<h2>
							{user.firstname} {user.lastname}
						</h2>
					</CardTitle>
					<CardSubtitle>
						Pledge Class: {user.pledgeclass}
					</CardSubtitle>
					<CardSubtitle>Dynasty: {user.dynasty}</CardSubtitle>
					<CardSubtitle>Major: {user.major}</CardSubtitle>
				</CardBody>
				<CardBody>
					<CardText
						dangerouslySetInnerHTML={{
							__html: description
						}}
					/>
				</CardBody>
			</Card>
		</div>
	);
}
