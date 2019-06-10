import React, { useEffect, useState } from "react";
import axios from "axios";
import {
	Card,
	CardImg,
	CardText,
	CardBody,
	CardTitle,
	CardSubtitle
} from "reactstrap";

export default function Profile({ match }) {
	useEffect(() => {
		getUser();
	}, []);

	const [user, setUser] = useState({});
	const [description, setDescription] = useState("");

	const getUser = () => {
		axios
			.get(
				`http://localhost:8080/dashboard/api.calaphio.com/public/user/${
					match.params.user_id
				}`
			)
			.then(response => setUser(response.data));
		axios
			.get(
				`http://localhost:8080/dashboard/api.calaphio.com/public/user/desc/${
					match.params.user_id
				}`
			)
			.then(response => setDescription(response.data[0].description));
	};

	console.log(user);
	return (
		<div>
			<Card className={"w-75 ml-auto mr-auto"}>
				<CardImg
					className="p-5"
					src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973461_960_720.png"
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
