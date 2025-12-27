import { useState } from "react";
import { Link } from "react-router-dom";

const AddNewAgentScreen = () => {
  const [successMessage, setSuccessMessage] = useState(false);
  const [agentcreate, setAgentcreate] = useState({
    name: "",
    email: "",
  });

  const handleCreateAgent = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        "https://anvaya-crm-backend-taupe.vercel.app/agents",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(agentcreate),
        }
      );
      if (!res.ok) return;
      await res.json();
      setAgentcreate({ name: "", email: "" });
      setSuccessMessage(true);
      setTimeout(() => setSuccessMessage(false), 3000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100">
        <div className="w-full lg:w-72 bg-gray-900 text-white p-4 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-bold mb-4">Anvaya CRM</h2>
          <ul className="menu text-base sm:text-lg">
            <Link to="/">
              <li className="hover:bg-gray-800 rounded p-2">
                ← Back <br className="hidden sm:block" /> to Dashboard
              </li>
            </Link>
          </ul>
        </div>

        <div className="flex-1 p-4 sm:p-6 lg:p-10">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-6 text-center lg:text-left">
            Add New Sales Agent
          </h1>

          <div className="space-y-4 w-full max-w-xl bg-gray-500 p-6 sm:p-10 rounded-2xl mx-auto lg:mx-0">
            <form onSubmit={handleCreateAgent} className="space-y-4">
              <div>
                <p className="font-semibold">Agent name:</p>
                <input
                  type="text"
                  placeholder="Enter the name"
                  className="input w-full"
                  value={agentcreate.name}
                  onChange={(e) =>
                    setAgentcreate({ ...agentcreate, name: e.target.value })
                  }
                />
              </div>

              <div>
                <p className="font-semibold">Email Address:</p>
                <input
                  type="email"
                  placeholder="Enter the email"
                  className="input w-full"
                  value={agentcreate.email}
                  onChange={(e) =>
                    setAgentcreate({ ...agentcreate, email: e.target.value })
                  }
                />
              </div>

              <button className="btn btn-neutral w-full sm:w-80">
                Create a new Agent
              </button>
            </form>

            {successMessage && (
              <div className="toast toast-top toast-center">
                <div className="alert alert-success">
                  <span>Agent Created successfully.</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AddNewAgentScreen;
