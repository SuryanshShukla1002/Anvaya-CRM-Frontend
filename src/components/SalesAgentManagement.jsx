import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const SalesAgentManagement = () => {
  const [salesagent, setSalesagent] = useState([]);

  const handleAgentApi = async (req, res) => {
    try {
      const res = await fetch("http://localhost:3000/agents", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        return "Failed to fetch the agent APi";
      }
      const data = await res.json();
      console.log(data);
      setSalesagent(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    handleAgentApi();
  }, []);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      <div className="w-full md:w-70 bg-gray-900 text-white p-4 md:p-6 space-y-4 md:space-y-6">
        <h2 className="text-xl md:text-2xl font-bold mb-2 md:mb-4">
          Anvaya CRM
        </h2>
        <ul className="menu text-base md:text-lg space-y-2 hover:bg-gray-800 rounded">
          <Link to="/">
            <li>
              ← Back <br className="hidden md:block" /> to Dashboard
            </li>
          </Link>
        </ul>
      </div>

      <div className="flex-1 p-4 sm:p-6 md:p-10">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">
          Sales Agent Management
        </h1>

        <div className="space-y-4 max-w-xl w-full">
          {salesagent &&
            salesagent.map((agent, index) => (
              <Link to={`/agentView/${agent._id || agent.id}`}>
                <div
                  key={index}
                  className="card bg-white shadow-md p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center hover:shadow-lg transition rounded-xl my-3"
                >
                  <div>
                    <h2 className="font-bold text-base md:text-lg">
                      <span className="text-gray-600">Name: </span>
                      {agent.name}
                    </h2>
                    <p className="text-gray-600 text-sm md:text-base">
                      <b>Email: </b>
                      {agent.email}
                    </p>
                  </div>
                  <button className="btn btn-info mt-3 sm:mt-0">
                    view more
                  </button>
                </div>
              </Link>
            ))}
        </div>

        <div className="mt-8 md:mt-10">
          <Link to="/addSaleAgent">
            <button className="btn btn-primary px-6 text-white text-base md:text-lg w-full sm:w-auto">
              Add New Agent
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SalesAgentManagement;
