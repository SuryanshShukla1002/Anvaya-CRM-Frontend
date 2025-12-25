import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const LeadList = () => {
  const [allLead, setAllLead] = useState([]);
  const [agent, setAgent] = useState([]);
  const [salesAgentId, setSalesAgentId] = useState("");
  const [statusId, setStatusId] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSalesAgent = async () => {
    try {
      const res = await fetch("http://localhost:3000/agents");
      const salesData = await res.json();
      setAgent(salesData);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSortPriorty = async (e) => {
    const sortValue = e.target.value;

    const priorityOrder = {
      High: { High: 1, Medium: 2, Low: 3 },
      Medium: { Medium: 1, High: 2, Low: 3 },
      Low: { Low: 1, Medium: 2, High: 3 },
    };

    if (!sortValue) return;

    const sortLeads = [...allLead].sort(
      (a, b) =>
        priorityOrder[sortValue][a.priority] -
        priorityOrder[sortValue][b.priority]
    );

    setAllLead(sortLeads);
  };

  useEffect(() => {
    const fetchLeadsBySalesAgent = async (agentId) => {
      setLoading(true);
      try {
        const url = agentId
          ? `http://localhost:3000/lead/status/get?salesAgent=${agentId}`
          : `http://localhost:3000/leads`;
        const res = await fetch(url);
        const data = await res.json();
        setAllLead(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    fetchLeadsBySalesAgent(salesAgentId);
  }, [salesAgentId]);

  useEffect(() => {
    const fetchLeadsByStatus = async (status) => {
      setLoading(true);
      try {
        const statusUrl = status
          ? `http://localhost:3000/lead/status/get?status=${status}`
          : `http://localhost:3000/leads`;
        const res = await fetch(statusUrl);
        const data = await res.json();
        setAllLead(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    fetchLeadsByStatus(statusId);
  }, [statusId]);

  useEffect(() => {
    handleSalesAgent();
  }, []);

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100">
      <div className="w-full lg:w-64 bg-[#0f172a] text-white p-4 sm:p-6">
        <h2 className="text-xl sm:text-2xl font-bold">Lead List</h2>
        <ul className="menu text-base sm:text-lg mt-4">
          <Link to={"/"}>
            <li className="hover:bg-gray-800 p-2 rounded">
              ← Back to <br className="hidden sm:block" /> Dashboard
            </li>
          </Link>
        </ul>
      </div>

      <div className="flex-1 p-4 sm:p-6 lg:p-10">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-6">
          Lead Overview
        </h1>

        <div className="card bg-white shadow-md rounded-xl w-full max-w-3xl p-4 sm:p-6 mb-6">
          <div className="flex flex-col sm:flex-row flex-wrap gap-4 mb-4">
            <div className="w-full sm:w-auto">
              <label className="block text-sm font-semibold mb-1">
                Filter by Status
              </label>
              <select
                className="select select-bordered w-full sm:w-40"
                value={statusId}
                onChange={(e) => setStatusId(e.target.value)}
              >
                <option value="">All</option>
                <option value="New">New</option>
                <option value="Contacted">Contacted</option>
                <option value="Qualified">Qualified</option>
                <option value="Proposal Sent">Proposal Sent</option>
                <option value="Closed">Closed</option>
              </select>
            </div>

            <div className="w-full sm:w-auto">
              <label className="block text-sm font-semibold mb-1">
                Filter by Sales Agent
              </label>
              <select
                className="select select-bordered w-full sm:w-40"
                value={salesAgentId}
                onChange={(e) => setSalesAgentId(e.target.value)}
              >
                <option value="">All</option>
                {agent.map((agent) => (
                  <option key={agent._id} value={agent._id}>
                    {agent.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="w-full sm:w-auto">
            <label className="block text-sm font-semibold mb-1">
              Sort by Priority
            </label>
            <select
              className="select select-bordered w-full sm:w-48"
              onChange={handleSortPriorty}
            >
              <option value="">Select</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
        </div>

        {loading ? (
          <p className="text-center text-xl sm:text-2xl font-semibold p-4">
            Loading leads...
          </p>
        ) : (
          <div className="card bg-white shadow-md rounded-xl w-full max-w-3xl mb-6">
            {allLead.map((lead, index) => (
              <div
                key={index}
                className={`p-4 ${
                  index !== allLead.length - 1 ? "border-b" : ""
                }`}
              >
                <p className="text-sm sm:text-base">
                  <b>Lead Name:</b>{" "}
                  <span className="text-amber-500 font-semibold">
                    {lead.name}
                  </span>{" "}
                  <span className="block sm:inline">
                    - <b>Status:</b> {lead.status} - <b>Agent:</b>{" "}
                    {lead.salesAgent?.name}
                  </span>
                </p>
              </div>
            ))}
          </div>
        )}

        <Link to={"/addLead"}>
          <button className="btn btn-primary w-full sm:w-auto px-6">
            Add New Lead
          </button>
        </Link>
      </div>
    </div>
  );
};

export default LeadList;
