import { useEffect, useState } from "react";
import { Link, Links } from "react-router-dom";

const LeadList = () => {
  const [allLead, setAllLead] = useState([]);
  const [agent, setAgent] = useState([]);
  const [salesAgentId, setSalesAgentId] = useState("");
  const [statusId, setStatusId] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSalesAgent = async () => {
    try {
      const res = await fetch("http://localhost:3000/agents", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        return "Failed to get the salesAgent data";
      }
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
    // console.log(sortLeads);

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
        console.log(error);
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
        console.log(error);
        setLoading(false);
      }
    };
    fetchLeadsByStatus(statusId);
  }, [statusId]);

  useEffect(() => {
    // fetchAllLeads();
    handleSalesAgent();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="w-64 bg-[#0f172a] text-white p-6 space-y-6">
        <h2 className="text-2xl font-bold">Lead List</h2>

        <ul className="menu text-lg space-y-2">
          <Link to={"/"}>
            <li className="hover:bg-gray-800 p-2">
              ← Back to <br /> Dashboard
            </li>
          </Link>
        </ul>
      </div>

      <div className="flex-1 p-10">
        <h1 className="text-3xl font-bold mb-6">Lead Overview</h1>
        {/* Filters & Sort */}
        <div className="card bg-white shadow-md rounded-xl max-w-3xl p-6 mb-6">
          <div className="flex flex-wrap gap-4 mb-4">
            <div>
              <label className="block text-sm font-semibold mb-1">
                Filter by Status
              </label>
              <select
                className="select select-bordered w-40"
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

            <div>
              <label className="block text-sm font-semibold mb-1">
                Filter by Sales Agent
              </label>
              <select
                className="select select-bordered w-40"
                value={salesAgentId}
                onChange={(e) => setSalesAgentId(e.target.value)}
              >
                <option value={""}>All</option>
                {agent &&
                  agent.map((agent) => (
                    <>
                      <option value={agent._id}>{agent?.name}</option>
                    </>
                  ))}
              </select>
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <div>
              <label className="block text-sm font-semibold mb-1">
                Sort by Priority
              </label>
              <select
                className="select select-bordered w-48"
                onChange={handleSortPriorty}
              >
                <option value="">Select</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Lead List */}
        {loading ? (
          <p className="text-center text-3xl font-semibold p-4 mb-4">
            Loading leads...
          </p>
        ) : (
          <div className="card bg-white shadow-md rounded-xl max-w-3xl mb-6">
            {allLead.map((lead, index) => (
              <div
                key={index}
                className={`p-4 ${index !== lead.length - 1 ? "border-b" : ""}`}
              >
                <p className="">
                  <b>Lead Name:</b>{" "}
                  <span className="text-amber-500 text-lg font-semibold">
                    {lead.name} -{" "}
                    <b className="text-black font-medium">Status:</b>{" "}
                    <span>{lead.status}</span> -{" "}
                    <b className="text-black font-medium">Agent:</b>{" "}
                    {lead.salesAgent?.name}
                  </span>
                </p>
              </div>
            ))}
          </div>
        )}
        <Link to={"/addLead"}>
          <button className="btn btn-primary px-6 text-white">
            Add New Lead
          </button>
        </Link>
      </div>
    </div>
  );
};

export default LeadList;
