import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AddNewLead = () => {
  const [agents, setAgents] = useState([]);
  const [successMessage, setSuccessMessage] = useState(false);
  const [leadform, setLeadform] = useState({
    name: "",
    source: "",
    salesAgent: "",
    status: "",
    priority: "",
    timeToClose: 1,
    tags: "",
  });

  const handleCreateLead = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("https://anvaya-crm-backend-taupe.vercel.app/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(leadform),
      });
      await res.json();
      setLeadform({
        name: "",
        source: "",
        salesAgent: "",
        status: "",
        priority: "",
        timeToClose: 1,
        tags: "",
      });
      setSuccessMessage(true);
      setTimeout(() => setSuccessMessage(false), 3000);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSalesAgent = async () => {
    try {
      const res = await fetch("https://anvaya-crm-backend-taupe.vercel.app/agents");
      const salesData = await res.json();
      setAgents(salesData);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    handleSalesAgent();
  }, []);

  return (
    <>
      <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100">
        <div className="w-full lg:w-64 bg-[#0f172a] text-white shadow-md p-4 flex flex-col">
          <h2 className="text-lg sm:text-xl font-bold mb-4">Anvaya CRM</h2>
          <Link
            to="/"
            className="text-base sm:text-lg hover:bg-gray-800 p-2 rounded"
          >
            ← Back to Dashboard
          </Link>
        </div>

        <section className="flex-1 flex flex-col items-center p-4 sm:p-6 lg:p-10">
          {successMessage && (
            <div className="toast toast-top toast-center z-10">
              <div className="alert alert-success">
                <span>Lead Created Successfully</span>
              </div>
            </div>
          )}

          <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-6">
            Add New Lead
          </h1>

          <div className="bg-gray-500 shadow-xl rounded-2xl p-5 sm:p-8 w-full max-w-xl">
            <form onSubmit={handleCreateLead} className="space-y-5">
              <div>
                <p className="font-medium mb-1">Lead Name:</p>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  value={leadform.name}
                  onChange={(e) =>
                    setLeadform({ ...leadform, name: e.target.value })
                  }
                  required
                />
              </div>

              <div>
                <p className="font-medium mb-1">Lead Source:</p>
                <select
                  className="select select-bordered w-full"
                  value={leadform.source}
                  onChange={(e) =>
                    setLeadform({ ...leadform, source: e.target.value })
                  }
                  required
                >
                  <option value="">Select</option>
                  <option value="Website">Website</option>
                  <option value="Referral">Referral</option>
                  <option value="Cold Call">Cold Call</option>
                  <option value="Advertisement">Advertisement</option>
                  <option value="Email">Email</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <p className="font-medium mb-1">Sales Agent:</p>
                <select
                  className="select select-bordered w-full"
                  value={leadform.salesAgent}
                  onChange={(e) =>
                    setLeadform({ ...leadform, salesAgent: e.target.value })
                  }
                  required
                >
                  <option value="">Select Sales Agent</option>
                  {agents.map((agent) => (
                    <option value={agent._id} key={agent._id}>
                      {agent.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <p className="font-medium mb-1">Lead Status:</p>
                <select
                  className="select select-bordered w-full"
                  value={leadform.status}
                  onChange={(e) =>
                    setLeadform({ ...leadform, status: e.target.value })
                  }
                  required
                >
                  <option value="">Select</option>
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Qualified">Qualified</option>
                  <option value="Proposal Sent">Proposal Sent</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>

              <div>
                <p className="font-medium mb-1">Priority:</p>
                <select
                  className="select select-bordered w-full"
                  value={leadform.priority}
                  onChange={(e) =>
                    setLeadform({ ...leadform, priority: e.target.value })
                  }
                  required
                >
                  <option value="">Choose</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>

              <div>
                <p className="font-medium mb-1">Time to Close:</p>
                <input
                  type="number"
                  className="input input-bordered w-full"
                  value={leadform.timeToClose}
                  onChange={(e) =>
                    setLeadform({
                      ...leadform,
                      timeToClose: Number(e.target.value),
                    })
                  }
                  required
                />
              </div>

              <div>
                <p className="font-medium mb-1">Tags:</p>
                <select
                  className="select select-bordered w-full"
                  value={leadform.tags}
                  onChange={(e) =>
                    setLeadform({ ...leadform, tags: [e.target.value] })
                  }
                  required
                >
                  <option value="">Choose</option>
                  <option value="High Value">High Value</option>
                  <option value="Low Value">Low Value</option>
                  <option value="Follow-up">Follow-up</option>
                  <option value="Urgent">Urgent</option>
                  <option value="New Inquiry">New Inquiry</option>
                </select>
              </div>

              <button className="btn btn-neutral w-full">
                Create a new Lead
              </button>
            </form>
          </div>
        </section>
      </div>
    </>
  );
};

export default AddNewLead;
