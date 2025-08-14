import { Routes, Route } from "react-router-dom";
import SidebarMenu from "../components/SidebarMenu";
import Documentos from "../components/Documentos";

const Dashboard = () => {
  return (
    <div style={{ display: "flex" }}>
      <SidebarMenu />
      <div style={{ flexGrow: 1, padding: "20px" }}>
        <Routes>
          <Route path="documentos" element={<Documentos />} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
