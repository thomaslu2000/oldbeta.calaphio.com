import React, { Fragment, useState, useEffect } from "react";
import { useGlobal } from "reactn";
import axios from "axios";
import { API_URL } from "../env"; // this is the url for the api as a string
import { Link } from "react-router-dom";
import {
	Collapse,
	Navbar,
	Nav,
	NavbarBrand,
	NavbarToggler,
	NavLink,
	NavItem,
	Input,
	InputGroup,
	Button,
	Container,
	Alert
} from "reactstrap";
import { useCookies } from "react-cookie";

export default function Header() {
	const successes = {
		NONE: 0,
		SUCCESS: 1,
		FAIL: 2,
		DISABLED: 3
	};

	const [isOpen, setOpen] = useState(false);
	// this creates a local variable called isOpen and gives us a method called setOpen that lets us set it
	// by default, isOpen is set to whatever we put in the useState's arguments (so it's false to begin with)

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loginSuccess, setLoginSuccess] = useState(successes.NONE);
	const [visible, setVisible] = useState(true);
	const [cookies, setCookie, removeCookie] = useCookies(["login"]);
	const [global, setGlobal] = useGlobal();
	const [loggedIn, setLoggedIn] = useState(false);

	useEffect(() => {
		if (cookies.login) {
			setGlobal(cookies.login);
			setLoggedIn(true);
		}
	}, []);

	const logIn = async () => {
		await axios
			.post(`${API_URL}/login/`, {
				email,
				passphrase: password
			})
			.then(res => {
				if (res.data) {
					let info = res.data[0];
					if (info.disabled === 0) {
						let details = {
							userId: info.user_id,
							passphrase: info.passphrase,
							name: info.firstname
						};
						setGlobal(details);
						setCookie("login", details);
						setLoginSuccess(successes.SUCCESS);
						setLoggedIn(true);
					} else {
						setLoginSuccess(successes.DISABLED);
					}
				} else {
					setLoginSuccess(successes.FAIL);
				}
			});
	};

	const submitLogIn = e => {
		e.preventDefault();
		if (!visible) setVisible(true);
		logIn();
	};

	const submitLogOut = e => {
		setGlobal({ userId: false });
		removeCookie("login");
		setLoginSuccess(successes.NONE);
		setLoggedIn(false);
	};

	const showSuccess = succ => {
		if (succ !== successes.NONE) {
			let color = "danger";
			let text = "Failed!";
			switch (succ) {
				case successes.SUCCESS:
					color = "success";
					text = "Success";
					break;
				case successes.DISABLED:
					color = "warning";
					text = "Disabled, Please Contact Webmaster";
					break;
				default:
			}
			return (
				<Alert
					color={color}
					isOpen={visible}
					toggle={() => setVisible(false)}
				>
					Login {text}
				</Alert>
			);
		}
	};

	const toggleDrop = () => {
		setOpen(!isOpen);
	};

	return (
		<Fragment>
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
							{(loggedIn && (
								<NavItem className="d-flex align-items-center pt-2">
									<Button
										color="primary"
										className="mr-0"
										size="md"
										onClick={submitLogOut}
									>
										Log Out
									</Button>
								</NavItem>
							)) || (
								<Fragment>
									<NavItem className="d-flex align-items-center w-25">
										<Container className="ml-auto mr-0">
											<InputGroup size="sm">
												<Input
													type="email"
													name="email"
													placeholder="Email"
													value={email}
													onChange={e =>
														setEmail(e.target.value)
													}
												/>
											</InputGroup>
											<InputGroup size="sm">
												<Input
													type="password"
													name="password"
													placeholder="Password"
													value={password}
													onChange={e =>
														setPassword(
															e.target.value
														)
													}
												/>
											</InputGroup>
										</Container>
									</NavItem>
									<NavItem className="d-flex align-items-center pt-2">
										<Button
											color="primary"
											className="mr-0"
											size="md"
											onClick={submitLogIn}
										>
											Login
										</Button>
									</NavItem>
								</Fragment>
							)}
						</Nav>
					</Collapse>
				</Navbar>
			</header>
			{loggedIn && (
				<div>
					<h1>Welcome, {global.name}</h1>
				</div>
			)}
			{showSuccess(loginSuccess)}
		</Fragment>
	);
}
