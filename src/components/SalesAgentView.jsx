import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const SalesAgentView = () => {
  const { agentId } = useParams();
  const [specificAgentLead, setSpecificAgentLead] = useState([]);
  const [eachStatusId, setEachStatusId] = useState("");
  const [noResult, setNoResult] = useState(false);

  const handleEachSalesAgent = async () => {
    try {
      const res = await fetch(
        `https://anvaya-crm-backend-taupe.vercel.app/lead/status/get?salesAgent=${agentId}`,
        {
          method: "GET",
        }
      );
      if (!res.ok) {
        console.log("Failed to fetch particular sales Agent leads");
        return;
      }
      const data = await res.json();
      setSpecificAgentLead(data);
      setNoResult(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleEachSalesAgent();
  }, []);

  useEffect(() => {
    const fetchUserByStatus = async (statusId) => {
      if (!eachStatusId) return;
      try {
        const url = statusId
          ? `https://anvaya-crm-backend-taupe.vercel.app/lead/status/get?salesAgent=${agentId}&status=${statusId}`
          : ``;
        const res = await fetch(url);
        if (!res.ok) {
          setNoResult(true);
          return;
        }
        const data = await res.json();
        console.log(data);
        setSpecificAgentLead(data);
        setNoResult(data.length == 0);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserByStatus(eachStatusId);
  }, [eachStatusId, agentId]);

  const fetchAgentByPriority = async (e) => {
    const sortValue = e.target.value;

    if (!["High", "Medium", "Low"].includes(sortValue)) return;

    const order = {
      High: { High: 1, Medium: 2, Low: 3 },
      Medium: { Medium: 1, High: 2, Low: 3 },
      Low: { Low: 1, Medium: 2, High: 3 },
    };

    const sortLeads = [...specificAgentLead].sort(
      (a, b) => order[sortValue][a.priority] - order[sortValue][b.priority]
    );

    setSpecificAgentLead(sortLeads);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-[#0f172a] text-white p-4 md:p-6 space-y-4 md:space-y-6">
        <h2 className="text-xl md:text-2xl font-bold">Lead List</h2>
        <ul className="menu text-base md:text-lg space-y-2">
          <Link to={"/"}>
            <li className="hover:bg-gray-800 p-2 rounded">
              ← Back <br className="hidden md:block" /> Dashboard
            </li>
          </Link>
        </ul>
      </div>

      {/* Main Content */}
      <main className="flex-1 p-4 sm:p-6 md:p-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-5">
          Leads by Sales Agent
        </h1>

        <div className="bg-gray-300 rounded-xl shadow p-4 sm:p-6">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2">
            Lead List by Agent
          </h1>

          {noResult ? (
            <p></p>
          ) : (
            <p className="text-base sm:text-lg md:text-xl text-purple-800 mb-6 mt-3">
              Sales Agent:{" "}
              {specificAgentLead
                .slice(0, 1)
                .map((agentLead) => agentLead.salesAgent?.name)}
            </p>
          )}

          {noResult && (
            <p className="text-center text-lg sm:text-xl md:text-2xl text-red-600 font-semibold mb-4">
              No results found for this status
            </p>
          )}

          {specificAgentLead &&
            specificAgentLead.map((agentLead) => (
              <div className="space-y-4">
                <div className="card bg-base-200 shadow mb-3">
                  <div className="card-body">
                    <h2 className="card-title text-base sm:text-lg">
                      Lead Name: {agentLead.name}
                    </h2>
                    <p className="font-semibold">Status: {agentLead?.status}</p>
                    <p className="font-semibold">
                      Priority: {agentLead?.priority}
                    </p>
                    <p className="font-semibold">
                      Time to Close: {agentLead?.timeToClose}
                    </p>
                  </div>
                </div>
              </div>
            ))}

          {/* Filters */}
          <div className="mt-8">
            <h3 className="font-semibold mb-3">Filters</h3>
            <div className="flex flex-col sm:flex-row gap-4">
              <select
                className="select select-bordered w-full sm:w-56"
                onChange={(e) => setEachStatusId(e.target.value)}
              >
                <option value="">Select Status {"->"}</option>
                <option value="New">New</option>
                <option value="Contacted">Contacted</option>
                <option value="Qualified">Qualified</option>
                <option value="Proposal Sent">Proposal Sent</option>
                <option value="Closed">Closed</option>
              </select>
            </div>
          </div>

          {/* Sort */}
          <div className="mt-6">
            <h3 className="font-semibold mb-2">Sort by</h3>
            <select
              className="select select-bordered w-full sm:w-56"
              onChange={fetchAgentByPriority}
            >
              <option>Select Priority {"->"}</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SalesAgentView;
