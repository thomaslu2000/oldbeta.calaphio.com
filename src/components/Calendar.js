import React, { useEffect, useState } from "react";
import moment from "moment";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import axios from "axios";
import { API_URL } from "../env";
import {
	Container,
	Row,
	Col,
	ListGroup,
	ListGroupItem,
	Badge
} from "reactstrap";
import { unsanitize } from "../functions";
import EventSide from "./EventSide";
import { withRouter } from "react-router-dom";
import { isMobile } from "react-device-detect";

function Cal(props) {
	const colorDict = {
		Service: "goldenrod",
		Fellowship: "green",
		Pledge: "deepskyblue",
		Other: "violet"
	};
	const darkColorDict = {
		Service: "darkgoldenrod",
		Fellowship: "darkgreen",
		Pledge: "blue",
		Other: "orchid"
	};
	const localizer = momentLocalizer(moment);

	const [events, setEvents] = useState([]);
	const [eventId, setEventId] = useState(false);

	const [today, setToday] = useState(new Date());
	const [seen, setSeen] = useState([
		today.getFullYear() * 100 + today.getMonth()
	]);
	const [daysEvents, setDaysEvent] = useState([]);

	useEffect(() => {
		if (props.match.params.event_id) {
			setEventId(props.match.params.event_id);
			getDate(props.match.params.event_id);
		} else {
			getEvents(today.getFullYear(), today.getMonth());
		}
	}, []);

	const styleGetter = (event, start, end, isSelected) => {
		let style = {
			backgroundColor: isSelected
				? darkColorDict[event.type]
				: colorDict[event.type],
			fontSize: isMobile ? 8 : 12
		};
		return {
			style
		};
	};

	const onSelect = event => {
		setEventId(event.eventId);
		props.history.push(`/calendar/${event.eventId}`);
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
						? "Service"
						: Boolean(event.type_fellowship)
						? "Fellowship"
						: Boolean(event.type_pledge_meeting)
						? "Pledge"
						: "Other";
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
	const getDate = async eventId => {
		await axios.get(`${API_URL}/event/date/${eventId}/`).then(response => {
			let date = new Date(response.data[0].date);
			setToday(date);
			getEvents(date.getFullYear(), date.getMonth());
		});
	};
	console.log(daysEvents);
	return (
		<Container>
			<Row>
				<Col>
					<EventSide id={eventId} />
				</Col>
				<Col
					style={{
						height: isMobile ? 400 : 800
					}}
					xs="12"
					md="8"
				>
					<Calendar
						events={events}
						showMultiDayTimes
						date={today}
						views={["month", "week", "day"]}
						localizer={localizer}
						eventPropGetter={styleGetter}
						onSelectEvent={onSelect}
						onRangeChange={onRangeChange}
						onNavigate={day => setToday(day)}
						popup
						selectable
						onSelectSlot={e => {
							setDaysEvent(
								events.filter(d => {
									console.log(d.start);
									console.log(e.start);
									return (
										d.start.getFullYear() ===
											e.start.getFullYear() &&
										d.start.getMonth() ===
											e.start.getMonth() &&
										d.start.getDate() === e.start.getDate()
									);
								})
							);
						}}
					/>
				</Col>
			</Row>
			<Row>
				<Col>
					<ListGroup flush className="w-75 mx-auto">
						{daysEvents.map(d => {
							return (
								<ListGroupItem key={"day" + d.eventId}>
									<Badge
										className="float-left"
										style={{
											backgroundColor:
												darkColorDict[d.type]
										}}
										pill
									>
										{d.type}
									</Badge>
									{d.title}
								</ListGroupItem>
							);
						})}
					</ListGroup>
				</Col>
			</Row>
		</Container>
	);
}

export default withRouter(Cal);
