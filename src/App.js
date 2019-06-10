import React from "react";
import "./App.css";
import Header from "./components/Header";
import Home from "./components/Home";
import Brothers from "./components/Brothers";
import Profile from "./components/Profile";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { setGlobal } from "reactn";
import TestPosts from "./components/TestPosts";

function App() {
	setGlobal({ userId: 1234 });
	return (
		<Router>
			<div className="App">
				<Header />
				<div style={{ paddingTop: "50px" }}>
					<Switch>
						<Route path="/" exact component={Home} />
						<Route path="/brothers" exact component={Brothers} />
						<Route
							path="/profile/:user_id"
							exact
							component={Profile}
						/>
						<Route path="/test" exact component={TestPosts} />
					</Switch>
				</div>
			</div>
		</Router>
	);
}

export default App;
