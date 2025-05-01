import { useEffect, useState } from "react";
import "./App.css";

function TodaysEvents() {
  const [todaysEvents, setTodaysEvents] = useState<string[]>([]);
  const [tomorrowsEvents, setTomorrowsEvents] = useState<string[]>([]);

  const fetchEvents = () => {
    fetch(
      "https://calendar.google.com/calendar/ical/15a33cb5ee060f6c24eb5ba5a36becb4deba97a945e702cee61ecfbd62b90a75%40group.calendar.google.com/public/basic.ics"
    )
      .then((res) => res.text())
      .then((ics) => {
        const eventLines = ics.split("BEGIN:VEVENT").slice(1);

        const today = new Date();
        const tomorrow = new Date();
        tomorrow.setDate(today.getDate() + 1);

        const formatDate = (date: Date) => {
          return date.toISOString().slice(0, 10);
        };

        const todayStr = formatDate(today);
        const tomorrowStr = formatDate(tomorrow);

        const todayList: string[] = [];
        const tomorrowList: string[] = [];

        eventLines.forEach((chunk) => {
          const summaryMatch = chunk.match(/SUMMARY:(.*)/);
          const dtStartMatch = chunk.match(/DTSTART.*:(\d{8})/);

          if (summaryMatch && dtStartMatch) {
            const summary = summaryMatch[1].trim();
            const dateStr = dtStartMatch[1];
            const formatted = `${dateStr.slice(0, 4)}-${dateStr.slice(
              4,
              6
            )}-${dateStr.slice(6, 8)}`;

            if (formatted === todayStr) {
              todayList.push(summary);
            } else if (formatted === tomorrowStr) {
              tomorrowList.push(summary);
            }
          }
        });

        setTodaysEvents(todayList);
        setTomorrowsEvents(tomorrowList);
      })
      .catch((err) => console.error("Failed to fetch calendar:", err));
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="todays-events">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h3>📌 Today's Events</h3>
        <button
          onClick={fetchEvents}
          style={{ fontSize: "0.8rem", padding: "4px 8px", cursor: "pointer" }}
        >
          🔄 Refresh
        </button>
      </div>
      {todaysEvents.length > 0 ? (
        <ul>
          {todaysEvents.map((event, i) => (
            <li key={i}>{event}</li>
          ))}
        </ul>
      ) : (
        <p>No events today.</p>
      )}

      <h3>📅 Tomorrow's Events</h3>
      {tomorrowsEvents.length > 0 ? (
        <ul>
          {tomorrowsEvents.map((event, i) => (
            <li key={i}>{event}</li>
          ))}
        </ul>
      ) : (
        <p>No events tomorrow.</p>
      )}
    </div>
  );
}

export default TodaysEvents;
