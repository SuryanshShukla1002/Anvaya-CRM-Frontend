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
      const res = await fetch("http://localhost:3000/agents", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(agentcreate),
      });
      if (!res.ok) {
        console.log("Failed to create a new agent");
        return;
      }
      await res.json();
      setAgentcreate({ name: "", email: "" });
      setSuccessMessage(true);
      setTimeout(() => {
        setSuccessMessage(false);
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="flex min-h-screen bg-gray-100">
        <div className="w-72 bg-gray-900 text-white p-6 space-y-6">
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
          <h1 className="text-3xl font-bold mb-6 ml-8">Add New Sales Agent </h1>
          <div className="space-y-4 max-w-xl bg-gray-500 pl-10 p-10 w-fit rounded-2xl">
            <form onSubmit={handleCreateAgent}>
              <p className="font-semibold">Agent name:</p>
              <input
                type="text"
                placeholder="Enter the name"
                className="input"
                value={agentcreate.name}
                onChange={(e) =>
                  setAgentcreate({ ...agentcreate, name: e.target.value })
                }
              />
              <br />
              <br />
              <p className="font-semibold">Email Address: </p>
              <input
                type="email"
                placeholder="Enter the email"
                className="input"
                value={agentcreate.email}
                onChange={(e) =>
                  setAgentcreate({ ...agentcreate, email: e.target.value })
                }
              />
              <br />
              <br />
              <button className="btn btn-neutral w-80 hover:btn-primary">
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
