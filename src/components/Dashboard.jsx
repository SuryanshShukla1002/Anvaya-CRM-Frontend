import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [leads, setLeads] = useState([]);
  const [showNew, setShowNew] = useState([]);
  const [showContacted, setShowContacted] = useState([]);
  const [showQualified, setShowQualified] = useState([]);
  const [showProposalSent, setShowProposalSent] = useState([]);
  const [filteringStatus, setFilteringStatus] = useState("");

  const fetchLeadData = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        "https://anvaya-crm-backend-taupe.vercel.app/leads",
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await res.json();
      setLeads(data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchLeadNew = async () => {
      const res = await fetch(
        "https://anvaya-crm-backend-taupe.vercel.app/lead/status/get?status=New"
      );
      setShowNew(await res.json());
    };
    const fetchLeadContacted = async () => {
      const res = await fetch(
        "https://anvaya-crm-backend-taupe.vercel.app/lead/status/get?status=Contacted"
      );
      setShowContacted(await res.json());
    };
    const fetchLeadQualified = async () => {
      const res = await fetch(
        "https://anvaya-crm-backend-taupe.vercel.app/lead/status/get?status=Qualified"
      );
      setShowQualified(await res.json());
    };
    const fetchLeadProposalSent = async () => {
      const res = await fetch(
        "https://anvaya-crm-backend-taupe.vercel.app/lead/status/get?status=Proposal%20Sent"
      );
      setShowProposalSent(await res.json());
    };

    fetchLeadNew();
    fetchLeadContacted();
    fetchLeadQualified();
    fetchLeadProposalSent();
  }, []);

  useEffect(() => {
    fetchLeadData();
  }, []);

  return (
    <>
      <section>
        <div className="text-center mt-4 mb-4 px-4">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl">
            <span className="text-primary">Welcome</span>{" "}
            <span className="text-secondary">to</span>{" "}
            <span className="text-primary">Anvaya</span>{" "}
            <span className="text-secondary">CRM</span>{" "}
            <span className="text-primary">Dashboard</span>
          </h1>
        </div>
      </section>

      <section>
        <div className="flex flex-col lg:flex-row bg-gray-100 gap-4">
          <div className="w-full lg:w-64 bg-[#0f172a] text-white p-6 space-y-6 rounded-2xl">
            <h2 className="text-xl lg:text-2xl font-bold mb-4">Side Bar</h2>
            <ul className="text-base lg:text-lg space-y-4">
              <Link to={"/leads"}>
                <li className="hover:text-secondary">📝 Leads</li>
              </Link>
              <Link to={"/salesManage"}>
                <li className="hover:text-secondary">📈 Sales</li>
              </Link>
              <Link to={"/leadStatus"}>
                <li className="hover:text-secondary">⏳ Status</li>
              </Link>
              <Link to={"/report"}>
                <li className="hover:text-secondary">📊 Reports</li>
              </Link>
              <Link to={"/addLead"}>
                <li className="hover:text-secondary">➕ Add New</li>
              </Link>
              <Link to={"/all-leads"}>
                <li className="hover:text-secondary">⚙️ Settings</li>
              </Link>
            </ul>
          </div>

          <div className="w-full lg:w-3/4 px-4">
            {loading ? (
              <div className="mt-6 text-center text-lg font-semibold text-gray-600">
                Leads cards are loading...
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                {leads.slice(0, 3).map((lead) => (
                  <div key={lead._id} className="card bg-primary shadow-sm">
                    <figure className="px-6 pt-6">
                      <img
                        src="https://placehold.co/600x400?text=Leads"
                        alt="Lead"
                        className="rounded-xl"
                      />
                    </figure>
                    <div className="card-body items-center text-center">
                      <h2 className="card-title text-white text-sm sm:text-base">
                        Lead name: {lead.name}
                      </h2>
                      <p className="text-white text-sm">
                        <b>Source: {lead.source}</b>
                      </p>
                      <Link to={`/leadManage/${lead.id || lead._id}`}>
                        <button className="btn btn-secondary">View Now</button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="bg-white shadow-md p-4 rounded-lg mt-6 w-full">
              <h1 className="font-semibold mb-2 text-xl sm:text-2xl">
                Lead Status:
              </h1>

              <div className="space-y-4">
                {(filteringStatus === "" || filteringStatus === "New") && (
                  <div className="card p-4 rounded-xl bg-green-300">
                    <h2>New: [{showNew.length}]</h2>
                  </div>
                )}

                {(filteringStatus === "" ||
                  filteringStatus === "Contacted") && (
                  <div className="card p-4 rounded-xl bg-green-300">
                    <h2>Contacted: [{showContacted.length}]</h2>
                  </div>
                )}

                {(filteringStatus === "" ||
                  filteringStatus === "Qualified") && (
                  <div className="card p-4 rounded-xl bg-green-300">
                    <h2>Qualified: [{showQualified.length}]</h2>
                  </div>
                )}

                {(filteringStatus === "" ||
                  filteringStatus === "Proposal Sent") && (
                  <div className="card p-4 rounded-xl bg-green-300">
                    <h2>Proposal Sent: [{showProposalSent.length}]</h2>
                  </div>
                )}
              </div>
            </div>

            <div className="card bg-white shadow-md rounded-xl w-full max-w-3xl p-6 my-6">
              <div className="flex flex-col sm:flex-row gap-4 mb-4">
                <div>
                  <label className="block text-sm font-semibold mb-1">
                    Filter by Status
                  </label>
                  <select
                    className="select select-bordered w-full sm:w-40"
                    value={filteringStatus}
                    onChange={(e) => setFilteringStatus(e.target.value)}
                  >
                    <option value="">All</option>
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Qualified">Qualified</option>
                    <option value="Proposal Sent">Proposal Sent</option>
                  </select>
                </div>
              </div>

              <Link to={"/addLead"}>
                <button className="btn btn-primary w-full sm:w-auto">
                  Add New Lead
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
