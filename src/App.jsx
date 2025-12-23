// import "./App.css";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import { LeadCartManageMentProvide } from "./context/LeadCartContext";
import LeadList from "./components/LeadList";
import AddNewLead from "./components/AddNewLead";
import SalesAgentManagement from "./components/SalesAgentManagement";
import AddNewAgentScreen from "./components/AddNewAgentScreen";
import Report from "./components/Report";
import LeadStatus from "./components/LeadStatus";
import SalesAgentView from "./components/SalesAgentView";
import LeadManagement from "./components/LeadManagement";
import Settings from "./components/Settings";
import "./utils/chartSetup";

function App() {
  return (
    <>
      <LeadCartManageMentProvide>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/leads" element={<LeadList />} />
          <Route path="/leadManage/:detailId" element={<LeadManagement />} />
          <Route path="/addLead" element={<AddNewLead />} />
          <Route path="/salesManage" element={<SalesAgentManagement />} />
          <Route path="/addSaleAgent" element={<AddNewAgentScreen />} />
          <Route path="/report" element={<Report />} />
          <Route path="/leadStatus" element={<LeadStatus />} />
          <Route path="/agentView/:agentId" element={<SalesAgentView />} />
          <Route path="/all-leads" element={<Settings />} />
        </Routes>
      </LeadCartManageMentProvide>
    </>
  );
}

export default App;
