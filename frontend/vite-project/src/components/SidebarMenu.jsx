// SidebarMenu.jsx
import { useNavigate } from "react-router-dom";
import "./SidebarMenu.css";

const SidebarMenu = () => {
  const navigate = useNavigate();

  return (
    <div className="sidebar">
      <div className="sidebar-header">Menú COBOCE</div>
      <ul className="sidebar-nav">
        <li
          className="sidebar-item"
          onClick={() => navigate("/dashboard/documentos")}
        >
          Gestión Documental
        </li>
      </ul>
    </div>
  );
};

export default SidebarMenu;
