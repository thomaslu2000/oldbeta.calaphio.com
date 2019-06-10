import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
	Collapse,
	Navbar,
	Nav,
	NavbarBrand,
	NavbarToggler,
	NavLink,
	NavItem
} from "reactstrap";

export default function Header() {
	const [isOpen, setOpen] = useState(false);

	const toggleDrop = () => {
		setOpen(!isOpen);
	};

	return (
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
					</Nav>
				</Collapse>
			</Navbar>
		</header>
	);
}
