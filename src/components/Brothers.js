import React, { useEffect, useState } from "react";
// we import the stuff we need from React

import axios from "axios";
// axios is the easy way we'll make http requests and get data from the back end

import { API_URL } from "../env"; // this is the url for the api as a string
import BrothersList from "./BrothersList"; // this is a custom component that we'll use to render this component

export default function Brothers() {
	// useEffect will call the lambda before it shows anything on the browser
	// this is because we gave it an empty list as the second argument
	useEffect(() => {
		getMembers();
	}, []);

	const [members, setMembers] = useState([]); // this line creates a local variable that holds the members (a list of member objects)
	// members by default is an empty list
	// we need to use setMembers to change this variable

	const getMembers = async () => {
		await axios
			.get(`${API_URL}/user/`)
			.then(response => setMembers(response.data));
	}; // this function pretty much asks api.calaphio.com/user/ for all the users, and gets the answer back as a response
	// then it takes the response, and sets the members variable to the response's data (which is the list of members)

	return (
		<div>
			<h1>Brothers</h1>
			<BrothersList members={members} />
			{/** we made BrothersList so it takes in the list of members as a variable 
			(called a prop for html components) */}
		</div>
	);
}
