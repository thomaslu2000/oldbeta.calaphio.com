import React, { useEffect, useState } from "react";
import moment from "moment";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import axios from "axios";
import { API_URL } from "../env";
import BrothersList from "./BrothersList"; // this is a custom component that we'll use to render this component

export default function Cal() {
	const colorDict = {
		service: "goldenrod",
		fellowship: "green",
		pledge: "deepskyblue",
		other: "violet"
	};
	const darkColorDict = {
		service: "darkgoldenrod",
		fellowship: "darkgreen",
		pledge: "blue",
		other: "orchid"
	};
	const localizer = momentLocalizer(moment);
	const today = new Date();
	const [seen, setSeen] = useState([
		today.getFullYear() * 100 + today.getMonth()
	]);

	useEffect(() => {
		getEvents(today.getFullYear(), today.getMonth());
	}, []);

	const [events, setEvents] = useState([]);

	const styleGetter = (event, start, end, isSelected) => {
		let style = {
			backgroundColor: isSelected
				? darkColorDict[event.type]
				: colorDict[event.type],
			fontSize: 14
		};
		return {
			style
		};
	};

	const unsanitize = str => {
		return unescape(
			str
				.replace(/&amp;/g, "&")
				.replace(/&#039;/, "'")
				.replace(/&rsquo;/, "’")
		);
	};

	const onSelect = event => {
		console.log(event);
	};

	const onRangeChange = dates => {
		if (dates.start) {
			let a = dates.start;
			a.setDate(a.getDate() + 7);
			getEvents(a.getFullYear(), a.getMonth());
		} else {
			if (
				!seen.includes(
					dates[0].getFullYear() * 100 + dates[0].getMonth()
				)
			) {
				getEvents(dates[0].getFullYear(), dates[0].getMonth(), true);
			} else if (
				!seen.includes(
					dates[dates.length - 1].getFullYear() * 100 +
						dates[dates.length - 1].getMonth()
				)
			) {
				getEvents(
					dates[dates.length - 1].getFullYear(),
					dates[dates.length - 1].getMonth(),
					true
				);
			}
		}
	};

	const getEvents = async (year, month, add = false) => {
		await axios
			.get(`${API_URL}/event/month/${year}/${month + 1}`)
			.then(response => {
				let ne = [];
				for (let i = 0; i < response.data.length; i++) {
					let event = response.data[i];
					let type = Boolean(event.type_service)
						? "service"
						: Boolean(event.type_fellowship)
						? "fellowship"
						: Boolean(event.type_pledge_meeting)
						? "pledge"
						: "other";
					ne.push({
						eventId: event.event_id,
						title: unsanitize(event.title),
						start: new Date(event.start),
						end: new Date(event.end),
						type,
						"allDay?": event.time_allday
					});
				}
				if (add) {
					seen.push(year * 100 + month);
					setSeen(seen);
					setEvents(ne.concat(events));
				} else {
					setEvents(ne);
					setSeen([year * 100 + month]);
				}
			});
	};

	return (
		<div
			style={{
				height: 1000,
				marginLeft: "auto",
				marginRight: "auto",
				width: "80%"
			}}
		>
			<Calendar
				events={events}
				showMultiDayTimes
				defaultDate={today}
				views={["month", "week", "day"]}
				localizer={localizer}
				eventPropGetter={styleGetter}
				onSelectEvent={onSelect}
				onRangeChange={onRangeChange}
				popup
			/>
		</div>
	);
}
