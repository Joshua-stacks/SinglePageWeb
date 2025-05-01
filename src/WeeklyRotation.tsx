import { useEffect, useState } from "react";
import "./App.css";

function WeeklyRotation() {
  const [rows, setRows] = useState<string[][]>([]);

  useEffect(() => {
    fetch(
      "https://sheets.googleapis.com/v4/spreadsheets/19PSgX7HYBCVkpP0BgEDqpMqOEXk82wRuQozrAeqtLhU/values/Rotation!A1:F?key=AIzaSyCC6vEFTyU7boykZKxDoB6gK2G9iaeE-Gc"
    )
      .then((res) => res.json())
      .then((data) => {
        setRows(data.values || []);
      });
  }, []);

  return (
    <section className="rotation-table">
      <h2>📅 Weekly Rotation</h2>
      {rows.length > 0 ? (
        <table>
          <thead>
            <tr>
              {rows[0].map((header, index) => (
                <th key={index}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.slice(1).map((row, i) => (
              <tr key={i}>
                {row.map((cell, j) => (
                  <td key={j} className={j === 0 ? "first-column" : ""}>
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Loading...</p>
      )}
    </section>
  );
}

export default WeeklyRotation;
