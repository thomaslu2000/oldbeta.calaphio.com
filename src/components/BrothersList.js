import React from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import { Link } from "react-router-dom";

export default function BrothersList(props) {
	// it takes in props as an argument
	const members = props.members; // props holds the things we gave BrothersList in the Brothers component
	return (
		<div>
			<ListGroup>
				{members.map(member => {
					// members.map is does a for loop through everything in members
					// every item (which is an object holding data) is set to member then returns the jsx below
					return (
						<ListGroupItem
							key={member.user_id}
							className={"w-50 ml-auto mr-auto text-dark"}
							tag={Link}
							to={`/profile/${member.user_id}`}
						>
							{/** 'tag' and 'to' in ListGroupItem is how we turn it into a link */}
							{member.firstname} {member.lastname}
							{/** the curly braces lets us go back out to javascript and use the variables in the member object */}
						</ListGroupItem>
					);
				})}
			</ListGroup>
		</div>
	);
}
