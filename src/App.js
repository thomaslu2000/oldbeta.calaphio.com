import React from "react"; // this is where we import the react library, so we can use its nice things

import "./components/css/style.css"; // importing a css file for the html stuff below

import Header from "./components/Header"; // React lets us make some custom html components
import Home from "./components/Home"; // And we use them by importing them from the components folder
import Brothers from "./components/Brothers";
import Profile from "./components/Profile";
import TestPosts from "./components/TestPosts";
import Cal from "./components/Calendar";
import { CookiesProvider } from "react-cookie";
// these are some other react libraries that will help us do things
import { HashRouter as Router, Switch, Route } from "react-router-dom"; //This lets us go to different pages

function App() {
	// the React functions return JSX, which is react's version of HTML and is almost the same. You can use JS by putting things in {}
	return (
		// With JSX, we can use custom components we imported at the top
		<CookiesProvider>
			<Router>
				{/* we put everything in a Router component here so React knows that we want to go to different pages later */}
				<div className="App">
					<Header />
					{/* Here, we make our header (which we made in a different file then imported) 
								Since this is above the Switch component, it's present on every page!*/}
					<div style={{ paddingTop: "20px" }}>
						{/* you can still set style manually by setting the style to a javascript object (which is kind of like a dictionary) */}
						<Switch>
							<Route path="/" exact component={Home} />{" "}
							{/** this is where we define which url paths lead to which page
						if we go to the home page (which would just be beta.calaphio.com), it will display the Home component we imorted */}
							<Route
								path="/brothers"
								exact
								component={Brothers}
							/>
							<Route path="/calendar" exact component={Cal} />
							<Route
								path="/calendar/:event_id"
								exact
								render={props => <Cal {...props} />}
							/>
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
		</CookiesProvider>
	);
}

export default App;
