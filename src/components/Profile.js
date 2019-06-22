import React, { useEffect, useState } from "react";
// we import the stuff we need from React

import axios from "axios";
// axios is the easy way we'll make http requests and get data from the back end

import { API_URL } from "../env"; //imports a string containing the url for the backend
import {
	Card,
	CardImg,
	CardText,
	CardBody,
	CardTitle,
	CardSubtitle
} from "reactstrap"; // import the bootstrap components we can use with react

export default function Profile({ match }) {
	// back where we made the routes, we wrote path="/profile/:user_id"
	// the :user_id is a parameter for this component, so we can call match.params.user_id to get whatever number we put there

	const [user, setUser] = useState({
		profile_pic:
			"https://media3.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif?cid=790b76115d0206e06a45745a41c228b5&rid=giphy.gif"
	});
	const [description, setDescription] = useState("");
	// these are some variables and their default values
	// the default profile picture is random one I found off the internet

	// useEffect will do whatever lambda funcion we give it before it starts rendering things on the browser
	useEffect(() => {
		// this function gets the user data and sets our variables to them
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
					{/** our descriptions use html tags, so we use dangerouslySetInnerHTML to save some time */}
				</CardBody>
			</Card>
		</div>
	);
}
