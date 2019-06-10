import React from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import { Link } from "react-router-dom";

export default function BrothersList(props) {
	const members = props.members;
	return (
		<div>
			<ListGroup>
				{members.map(member => {
					return (
						<ListGroupItem
							key={member.user_id}
							className={"w-50 ml-auto mr-auto text-dark"}
							tag={Link}
							to={`/profile/${member.user_id}`}
						>
							{member.firstname} {member.lastname}
						</ListGroupItem>
					);
				})}
			</ListGroup>
		</div>
	);
}
