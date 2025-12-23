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
    <div className="flex min-h-screen bg-gray-100">
      <div className="w-70 bg-gray-900 text-white p-6 space-y-6">
        <h2 className="text-2xl font-bold mb-4">Anvaya CRM</h2>
        <ul className="menu text-lg space-y-2 hover:bg-gray-800">
          <Link to="/">
            <li>
              ← Back <br /> to Dashboard
            </li>
          </Link>
        </ul>
      </div>

      <div className="flex-1 p-10">
        <h1 className="text-3xl font-bold mb-6"> Sales Agent Management </h1>
        <div className="space-y-4 max-w-xl">
          {salesagent &&
            salesagent.map((agent, index) => (
              <Link to={`/agentView/${agent._id || agent.id}`}>
                <div
                  key={index}
                  className="card bg-white shadow-md p-4 flex items-left hover:shadow-lg transition rounded-xl my-3"
                >
                  <div>
                    <h2 className="font-bold text-lg">
                      <span className="text-gray-600">Name: </span>
                      {agent.name}
                    </h2>
                    <p className="text-gray-600">
                      <b>Email: </b>
                      {agent.email}
                    </p>
                  </div>
                  <button className="btn btn-info mt-4 mb-3">view more</button>
                </div>
              </Link>
            ))}
        </div>

        <div className="mt-10">
          <Link to="/addSaleAgent">
            <button className="btn btn-primary px-6 text-white text-lg">
              Add New Agent
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SalesAgentManagement;
