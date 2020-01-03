import React, { useState } from "react";
import { Link } from "react-router-dom"; // since we're using react router,
// we need to use Link to go between pages in our site instead of the A tags html usually uses

import {
	Collapse,
	Navbar,
	Nav,
	NavbarBrand,
	NavbarToggler,
	NavLink,
	NavItem
} from "reactstrap";
// To use bootstrap components in react, we need to import components from reactstrap

export default function Header() {
	const [isOpen, setOpen] = useState(false);
	// this creates a local variable called isOpen and gives us a method called setOpen that lets us set it
	// by default, isOpen is set to whatever we put in the useState's arguments (so it's false to begin with)

	const toggleDrop = () => {
		// this defines a functions that pretty much just changes whether the menu is open or not
		setOpen(!isOpen);
	};

	return (
		// this is where we make the actual navigation bar
		// it looks big, but you can pretty much just go to reactstrap's website and copy how they did it
		// we also imported normal bootstrap, so we can use its class names too
		<header>
			<Navbar
				fixed="top"
				color="light"
				light
				expand="md"
				className="bg-white position-relative"
				style={{ height: 80 }}
			>
				<NavbarBrand tag={Link} to="/">
					Calaphio
				</NavbarBrand>

				<NavbarToggler onClick={toggleDrop} />
				<Collapse isOpen={isOpen} navbar>
					<Nav className="ml-auto" navbar>
						<NavItem className="d-flex align-items-center">
							<NavLink
								className="font-weight-bold"
								tag={Link}
								to="/"
							>
								Home
							</NavLink>
						</NavItem>

						<NavItem className="d-flex align-items-center">
							<NavLink
								className="font-weight-bold"
								tag={Link}
								to="/brothers"
							>
								Brothers
							</NavLink>
						</NavItem>

						<NavItem className="d-flex align-items-center">
							<NavLink
								className="font-weight-bold"
								tag={Link}
								to="/calendar"
							>
								Calendar
							</NavLink>
						</NavItem>
					</Nav>
				</Collapse>
			</Navbar>
		</header>
	);
}
