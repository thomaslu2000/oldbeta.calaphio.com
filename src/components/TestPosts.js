import React, { useEffect, useState } from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
// importing stuff we'll need from react and reactstrap

import axios from "axios";
// axios is the easy way we'll make http requests and get data from the back end

import { API_URL } from "../env"; // imports a string that holds the url for our REST api
import { useGlobal } from "reactn";

export default function TestPosts() {
	const [global, setGlobal] = useGlobal(); // this gives us an object that holds our global variables

	const [id, setId] = useState(0); // this block of code initializes a few local variables that only this component can use
	const [text, setText] = useState(""); // for example, 'text' by default would be ""
	const [userId, setUserId] = useState(0); // and you would need to do setText("abc") to set 'text' to "abc"
	const [items, setItems] = useState([]);
	const [itemChanged, setItemChanged] = useState(true);

	// this is a function that tests out put, post, and delete requests
	// the async and await stuff is because all the api stuff might take some time, so its done kind of in the background
	const postOrPut = async () => {
		if (id === 0) {
			//post
			await axios.post(`${API_URL}/test/`, {
				user_id: userId,
				text
			});
		} else if (text === "delete" && id > 0) {
			await axios.delete(`${API_URL}/test/${id}/`);
		} else {
			//put
			await axios.put(`${API_URL}/test/${id}/`, {
				user_id: userId,
				text
			});
		}
		setItemChanged(!itemChanged);
	};

	// the useEffect method takes in a lambda and a list of those local variables we made before
	// if one of the variables is changed, react will do the lambda
	useEffect(() => {
		console.log("afa");
		axios.get(`${API_URL}/test/`).then(response => setItems(response.data)); // this line gets the data, then calls setItems to put the data in the items variable
	}, [itemChanged]);

	return (
		<div>
			<p>
				myId: {global.userId}, id: {id}, text: {text}, userId: {userId}
			</p>
			<br />
			id:{" "}
			<input
				id="id"
				type="numeric"
				name="id"
				onChange={e => {
					setId(e.target.value);
				}}
			/>
			<br />
			text:{" "}
			<input
				id="text"
				type="text"
				name="text"
				onChange={e => {
					setText(e.target.value);
				}}
			/>
			<br />
			user id:{" "}
			<input
				id="userId"
				type="numeric"
				name="userId"
				onChange={e => {
					setUserId(e.target.value);
				}}
			/>
			<br />
			my id:{" "}
			<input
				id="myId"
				type="numeric"
				name="myId"
				onChange={e => {
					setGlobal({ userId: e.target.value });
				}}
			/>
			<input type="submit" name="submit" onClick={postOrPut} />
			<hr />
			<ListGroup className="w-50 ml-auto mr-auto">
				{items.map(item => {
					return (
						<ListGroupItem key={item.id}>
							id: {item.id}, uid: {item.user_id}, text:{" "}
							{item.text}
						</ListGroupItem>
					);
				})}
			</ListGroup>
		</div>
	);
}
