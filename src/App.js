import React from "react"; // this is where we import the react library, so we can use its nice things

import "./App.css"; // importing a css file for the html stuff below

import Header from "./components/Header"; // React lets us make some custom html components
import Home from "./components/Home"; // And we use them by importing them from the components folder
import Brothers from "./components/Brothers";
import Profile from "./components/Profile";
import TestPosts from "./components/TestPosts";

// these are some other react libraries that will help us do things
import { HashRouter as Router, Switch, Route } from "react-router-dom"; //This lets us go to different pages
import { setGlobal } from "reactn"; // this lets us share information easier across different components

function App() {
	setGlobal({
		// the setGlobal function stores info that any component can access
		userId: 1234, // it will just hold a dummy username and passphrase for now
		passphrase: "poop"
	});

	// the React functions return JSX, which is react's version of HTML and is almost the same. You can use JS by putting things in {}
	return (
		// With JSX, we can use custom components we imported at the top
		<Router>
			{/* we put everything in a Router component here so React knows that we want to go to different pages later */}
			<div className="App">
				<Header />
				{/* Here, we make our header (which we made in a different file then imported) 
								Since this is above the Switch component, it's present on every page!*/}
				<div style={{ paddingTop: "50px" }}>
					{/* you can still set style manually by setting the style to a javascript object (which is kind of like a dictionary) */}
					<Switch>
						<Route path="/" exact component={Home} />{" "}
						{/** this is where we define which url paths lead to which page
						if we go to the home page (which would just be beta.calaphio.com), it will display the Home component we imorted */}
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
