import { useEffect, useState } from "react";
import "./App.css";

const SHEET_ID = "1aMHuvLBb-A7ixcEvhZJKuUkB3QTnhwFzUKcZs6cYRYs";
const API_KEY = "AIzaSyD4Aoz4ct02ctPQvHTCiBkh4cspPu8uwbo";
const RANGE = "A3:E17"; // Now includes 5 columns for start date
const START_DATE_CELL = "E1";

function MonthlyZones() {
  const [data, setData] = useState<string[][]>([]);
  const [month, setMonth] = useState("");
  const [startDate, setStartDate] = useState("");

  useEffect(() => {
    const fetchSheet = async () => {
      try {
        // Table data
        const res = await fetch(
          `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${RANGE}?key=${API_KEY}`
        );
        const json = await res.json();

        const paddedValues = (json.values || []).map((row: string[]) => {
          const newRow = [...row];
          while (newRow.length < 5) newRow.push("");
          return newRow;
        });

        setData(paddedValues);

        // Month
        const monthRes = await fetch(
          `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/C1?key=${API_KEY}`
        );
        const monthJson = await monthRes.json();
        setMonth(monthJson.values?.[0]?.[0] || "");

        // Start date
        const startRes = await fetch(
          `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${START_DATE_CELL}?key=${API_KEY}`
        );
        const startJson = await startRes.json();
        setStartDate(startJson.values?.[0]?.[0] || "");
      } catch (err) {
        console.error("Failed to load sheet data", err);
      }
    };

    fetchSheet();
  }, []);

  if (data.length <= 1) return <p>Loading zone assignments...</p>;

  return (
    <div className="rotation-table">
      <h2 className="zone-header">📍 Monthly Zone Assignments – {month}</h2>
      {startDate && (
        <p style={{ fontWeight: "bold", marginBottom: "1rem", color: "#555" }}>
          Start Date:{" "}
          <span
            style={{
              background: "#f0f0f0",
              padding: "4px 8px",
              borderRadius: "6px",
            }}
          >
            {startDate}
          </span>
        </p>
      )}
      <div className="zone-instructions">
        <p>
          <strong>You're responsible to:</strong>
        </p>
        <ol>
          <li>Carry out tasks listed for the corner(s) you’re assigned to</li>
          <li>Keep your corner tidy and dust free</li>
          <li>Verify the condition of the items in your corner</li>
        </ol>
        <p>
          You may also be responsible to help with display and take down of
          another section.
        </p>
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              {data[0].map((header, i) => (
                <th key={i}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.slice(1).map((row, i) => (
              <tr key={i}>
                {row.map((cell, j) => (
                  <td key={j} className={j === 0 ? "first-column" : ""}>
                    {cell || "—"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MonthlyZones;
