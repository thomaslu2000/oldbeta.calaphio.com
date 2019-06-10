import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../env";
import { useGlobal } from "reactn";

export default function TestPosts() {
	const [global, setGlobal] = useGlobal();

	const [id, setId] = useState(0);
	const [text, setText] = useState("");
	const [userId, setUserId] = useState(0);

	const postOrPut = () => {
		if (id === 0) {
			//post
			console.log("post");
			axios
				.post(`${API_URL}/test`, {
					user_id: userId,
					text
				})
				.then(res => console.log(res));
		} else {
			//put
			console.log("put");
			axios
				.put(`${API_URL}/test/${id}`, {
					user_id: userId,
					text
				})
				.then(res => console.log(res));
		}
	};

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
		</div>
	);
}
