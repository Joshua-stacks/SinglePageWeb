import "./Sidebar.css";

const Sidebar = () => {
  return (
    <nav className="sidebar">
      <ul>
        <li>
          <a href="#documents">📄 Documents</a>
        </li>
        <li>
          <a href="#calculator">🧮 Tax Calculator</a>
        </li>
        <li>
          <a href="#tasks">🛠️ Daily Tasks</a>
        </li>
        <li>
          <a href="#warranty">📦 Warranty</a>
        </li>
        <li>
          <a href="#calendar">🗓️ Calendar</a>
        </li>
        <li>
          <a href="#zones">🗂️ Zone Assignments</a>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
