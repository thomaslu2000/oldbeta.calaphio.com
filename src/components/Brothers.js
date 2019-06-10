import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../env";
import BrothersList from "./BrothersList";

export default function Brothers() {
	useEffect(() => {
		getMembers();
	}, []);

	const [members, setMembers] = useState([]);

	const getMembers = () => {
		axios
			.get(`${API_URL}/user`)
			.then(response => setMembers(response.data));
	};

	console.log(members);
	return (
		<div>
			<h1>Brothers</h1>
			<BrothersList members={members} />
		</div>
	);
}
