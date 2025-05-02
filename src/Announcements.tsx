import { useEffect, useState } from "react";
import "./App.css";

interface Announcement {
  date: string;
  title: string;
  message: string;
  type: string;
}

function Announcements() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    fetch(
      "https://sheets.googleapis.com/v4/spreadsheets/19yEVLeRuiuCiC4HTE27_oQrWdKh4xXlyjy2GI1vTif0/values/Sheet1!A2:D?key=AIzaSyD4Aoz4ct02ctPQvHTCiBkh4cspPu8uwbo"
    )
      .then((res) => res.json())
      .then((data) => {
        const rows = data.values || [];
        const formatted: Announcement[] = rows.map((row: string[]) => ({
          date: row[0],
          title: row[1],
          message: row[2],
          type: row[3] || "info",
        }));

        const today = new Date().getTime();
        const threeWeeks = 21 * 24 * 60 * 60 * 1000;

        const filtered = formatted.filter((item) => {
          const itemDate = new Date(item.date).getTime();
          return today - itemDate <= threeWeeks;
        });

        const sorted = filtered.sort((a: Announcement, b: Announcement) => {
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        });

        setAnnouncements(sorted);
      });
  }, []);

  const visible = showAll ? announcements : announcements.slice(0, 3);

  const iconMap: Record<string, string> = {
    info: "ℹ️",
    update: "🆕",
    warning: "⚠️",
    reminder: "📅",
  };

  const formatDate = (iso: string) => {
    const date = new Date(iso);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <section className="announcements">
      <h2>📢 Announcements</h2>
      {announcements.length === 0 ? (
        <p>Loading announcements...</p>
      ) : (
        <>
          <ul className="announcement-list">
            {visible.map((item, idx) => (
              <li key={idx} className={`announcement ${item.type}`}>
                <div className="announcement-title">
                  {iconMap[item.type] || "📝"} {item.title}
                </div>
                <div className="announcement-date">{formatDate(item.date)}</div>
                <div className="announcement-message">{item.message}</div>
              </li>
            ))}
          </ul>
          {announcements.length > 3 && (
            <button
              onClick={() => setShowAll(!showAll)}
              className="toggle-announcements"
            >
              {showAll ? "Show Less" : "Show All"}
            </button>
          )}
        </>
      )}
    </section>
  );
}

export default Announcements;
