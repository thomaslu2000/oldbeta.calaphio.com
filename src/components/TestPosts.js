import React, { useEffect, useState } from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import axios from "axios";
import { API_URL } from "../env";
import { useGlobal } from "reactn";

export default function TestPosts() {
	const [global, setGlobal] = useGlobal();

	const [id, setId] = useState(0);
	const [text, setText] = useState("");
	const [userId, setUserId] = useState(0);
	const [items, setItems] = useState([]);
	const [itemChanged, setItemChanged] = useState(true);

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

	useEffect(() => {
		console.log("afa");
		axios.get(`${API_URL}/test/`).then(response => setItems(response.data));
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
