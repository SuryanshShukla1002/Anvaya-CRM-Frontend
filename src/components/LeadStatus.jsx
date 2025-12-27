import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const LeadStatus = () => {
  const [newStatus, setNewStatus] = useState([]);
  const [qualifiedStatus, setQualifiedStatus] = useState([]);
  const [proposalSent, setProposalSent] = useState([]);
  const [filterAgents, setFilterAgents] = useState([]);
  const [agentId, setAgentId] = useState("");

  const handleSalesAgent = async () => {
    try {
      const res = await fetch("https://anvaya-crm-backend-taupe.vercel.app/agents", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        return "Failed to get the salesAgent data";
      }
      const salesData = await res.json();
      setFilterAgents(salesData);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSortPriority = (e) => {
    const sortValue = e.target.value;
    if (!sortValue) return;

    const sortLeads = (leads) => {
      return [...leads].sort((a, b) => {
        const priorityOrder = {
          High: { High: 1, Medium: 2, Low: 3 },
          Medium: { Medium: 1, High: 2, Low: 3 },
          Low: { Low: 1, Medium: 2, High: 3 },
        };
        return (
          priorityOrder[sortValue][a.priority] -
          priorityOrder[sortValue][b.priority]
        );
      });
    };

    setNewStatus(sortLeads(newStatus));
    setQualifiedStatus(sortLeads(qualifiedStatus));
    setProposalSent(sortLeads(proposalSent));
  };

  useEffect(() => {
    if (!agentId) return;
    const handleFilterSalesAgent = async () => {
      try {
        const resNew = await fetch(
          `https://anvaya-crm-backend-taupe.vercel.app/lead/status/get?status=New&salesAgent=${agentId}`
        );
        const resQualified = await fetch(
          `https://anvaya-crm-backend-taupe.vercel.app/lead/status/get?status=Qualified&salesAgent=${agentId}`
        );
        const resProposalSent = await fetch(
          `https://anvaya-crm-backend-taupe.vercel.app/lead/status/get?status=Proposal%20Sent&salesAgent=${agentId}`
        );
        setNewStatus(await resNew.json());
        setQualifiedStatus(await resQualified.json());
        setProposalSent(await resProposalSent.json());
      } catch (error) {
        console.log("error");
      }
    };
    handleFilterSalesAgent();
  }, [agentId]);

  useEffect(() => {
    const fetchLeadBystatusNew = async () => {
      try {
        const res = await fetch(
          "https://anvaya-crm-backend-taupe.vercel.app/lead/status/get?status=New"
        );
        const data = await res.json();
        setNewStatus(data);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchLeadBystatusQualified = async () => {
      try {
        const res = await fetch(
          "https://anvaya-crm-backend-taupe.vercel.app/lead/status/get?status=Qualified"
        );
        const data = await res.json();
        setQualifiedStatus(data);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchLeadBystatusProposal = async () => {
      try {
        const res = await fetch(
          "https://anvaya-crm-backend-taupe.vercel.app/lead/status/get?status=Proposal%20Sent"
        );
        const data = await res.json();
        setProposalSent(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchLeadBystatusNew();
    fetchLeadBystatusQualified();
    fetchLeadBystatusProposal();
    handleSalesAgent();
  }, []);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      <div className="w-full md:w-64 bg-[#0f172a] text-white shadow-md p-4 flex flex-col">
        <h2 className="text-xl font-bold mb-6">Anvaya CRM</h2>
        <Link to="/" className="text-2xl hover:bg-gray-800 p-2 rounded">
          ← Back to Dashboard
        </Link>
      </div>

      <div className="flex-1 p-4 md:p-6 space-y-4">
        <h1 className="text-2xl font-bold mb-2">Leads by Status</h1>

        <div className="bg-white shadow-md p-4 rounded-lg mb-4">
          <h2 className="text-lg font-semibold mb-2">Status: New</h2>
          <div className="space-y-3">
            {newStatus.map((lead) => (
              <div
                key={lead.id}
                className="card bg-base-100 shadow p-4 rounded-xl"
              >
                <p className="font-semibold">{lead.name}</p>
                <p className="text-sm text-gray-500">
                  Sales Agent: {lead.salesAgent?.name}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="divider"></div>

        <div className="bg-white shadow-md p-4 rounded-lg mb-4">
          <h2 className="text-lg font-semibold mb-2">Status: Qualified</h2>
          <div className="space-y-3">
            {qualifiedStatus.map((qualified) => (
              <div
                key={qualified.id}
                className="card bg-base-100 shadow p-4 rounded-xl"
              >
                <p className="font-semibold">{qualified.name}</p>
                <p className="text-sm text-gray-500">
                  Sales Agent: {qualified.salesAgent?.name}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="divider"></div>

        <div className="bg-white shadow-md p-4 rounded-lg mb-4">
          <h2 className="text-lg font-semibold mb-2">Status: Proposal Sent</h2>
          <div className="space-y-3">
            {proposalSent.map((proposal) => (
              <div
                key={proposal.id}
                className="card bg-base-100 shadow p-4 rounded-xl"
              >
                <p className="font-semibold">{proposal.name}</p>
                <p className="text-sm text-gray-500">
                  Sales Agent: {proposal.salesAgent?.name}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="divider"></div>

        {/* Filters */}
        <div className="bg-white shadow-md p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Filter By Agents</h3>
          <div className="flex flex-col sm:flex-row gap-3 mb-4">
            <select
              className="select select-bordered w-full sm:w-40"
              value={agentId}
              onChange={(e) => setAgentId(e.target.value)}
            >
              <option value="">Select here :-{">"}</option>
              {filterAgents &&
                filterAgents.map((agent) => (
                  <option key={agent._id} value={agent._id}>
                    {agent?.name}
                  </option>
                ))}
            </select>
          </div>

          <h3 className="text-lg font-semibold mb-2">Sort By</h3>
          <select
            className="select select-bordered w-full sm:w-40"
            onChange={handleSortPriority}
          >
            <option value="">Priority</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default LeadStatus;
