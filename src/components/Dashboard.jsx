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
      const res = await fetch("http://localhost:3000/leads", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        return "Failed to fetch the data";
      }

      const data = await res.json();
      setLeads(data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchLeadNew = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/lead/status/get?status=New`,
          {
            method: "GET",
          }
        );
        const data = await res.json();
        setShowNew(data);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchLeadContacted = async () => {
      try {
        const res = await fetch(
          "http://localhost:3000/lead/status/get?status=Contacted",
          {
            method: "GET",
          }
        );
        const data = await res.json();
        // console.log(data.length);
        setShowContacted(data);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchLeadQualified = async () => {
      try {
        const res = await fetch(
          "http://localhost:3000/lead/status/get?status=Qualified",
          { method: "GET" }
        );
        const data = await res.json();
        setShowQualified(data);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchLeadProposalSent = async () => {
      try {
        const res = await fetch(
          "http://localhost:3000/lead/status/get?status=Proposal%20Sent",
          { method: "GET" }
        );
        const data = await res.json();
        setShowProposalSent(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchLeadNew();
    fetchLeadContacted();
    fetchLeadQualified();
    fetchLeadProposalSent();
  }, []);

  useEffect(() => {
    const filterByStatus = async () => {
      try {
        let url = statusUid
          ? `http://localhost:3000/lead/status/get?status=${filteringStatus}`
          : "";
        const res = await fetch(url);
        const data = await res.json();
        setFilteringStatus(data);
      } catch (error) {}
    };
    filterByStatus(filteringStatus);
  }, [filteringStatus]);

  useEffect(() => {
    fetchLeadData();
  }, []);

  return (
    <>
      <section>
        <div className="text-center mt-4 mb-4">
          <h1 className="text-4xl">
            <span className="text-primary">Welcome</span>{" "}
            <span className="text-secondary">to</span>{" "}
            <span className="text-primary">Anvaya</span>{" "}
            <span className="text-secondary">CRM</span>{" "}
            <span className="text-primary">Dashboard</span>
          </h1>
        </div>
      </section>

      <section>
        <div className="flex bg-gray-100 gap-4">
          <div className="w-64 min-h-screen bg-[#0f172a] text-white p-6 space-y-6 rounded-2xl">
            <h2 className="text-2xl font-bold mb-4">Side Bar</h2>

            <ul className="text-lg space-y-4">
              <Link to={"/leads"}>
                <li className="p-1 hover:text-secondary cursor-pointer mb-2">
                  📝 Leads
                </li>
              </Link>

              <Link to={"/salesManage"}>
                <li className="p-1 hover:text-secondary cursor-pointer mb-3">
                  📈 Sales
                </li>
              </Link>

              <Link to={"/leadStatus"}>
                <li className="p-1 hover:text-secondary cursor-pointer mb-3">
                  ⏳ Status
                </li>
              </Link>

              <Link to={"/report"}>
                <li className="p-1 hover:text-secondary cursor-pointer mb-3">
                  📊 Reports
                </li>
              </Link>

              <Link to={"/addLead"}>
                <li className="p-1 hover:text-secondary cursor-pointer mb-3">
                  ➕ Add New
                </li>
              </Link>

              <Link to={"/all-leads"}>
                <li className="p-1 hover:text-secondary cursor-pointer ">
                  ⚙️ Settings
                </li>
              </Link>
            </ul>
          </div>

          <div className="w-3/4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
              {leads.slice(0, 3).map((lead) => (
                <div key={lead._id} className="card bg-primary shadow-sm">
                  <figure className="px-10 pt-10">
                    <img
                      src="https://placehold.co/600x400?text=Leads"
                      alt="Lead"
                      className="rounded-xl"
                    />
                  </figure>
                  <div className="card-body items-center text-center">
                    <h2 className="card-title text-white">
                      Lead name: {lead.name}
                    </h2>
                    <p className="text-white">
                      <b>Source: {lead.source}</b>
                    </p>
                    <div className="card-actions">
                      <Link to={`/leadManage/${lead.id || lead._id}`}>
                        <button className="btn btn-secondary hover:bg-amber-600">
                          View Now
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-white shadow-md p-4 rounded-lg mb-4  mt-5 w-3/4">
              <h1 className=" font-semibold mb-2 text-3xl">Lead Status:</h1>
              {(!filteringStatus || filteringStatus === "New") && (
                <>
                  <div className="card shadow p-4 rounded-xl bg-green-300">
                    <h2 className="text-xl font-semibold">
                      New: [{showNew.length}]{" "}
                      {showNew.length > 1 ? "Leads" : "Lead"}
                    </h2>
                  </div>
                  <div className="divider"></div>
                </>
              )}

              {(!filteringStatus || filteringStatus === "Contacted") && (
                <>
                  <div className="card shadow p-4 rounded-xl bg-green-300">
                    <h2 className="text-xl font-semibold">
                      Contacted: [{showContacted.length}]{" "}
                      {showContacted.length > 1 ? "Leads" : "Lead"}
                    </h2>
                  </div>
                  <div className="divider"></div>
                </>
              )}
              {(!filteringStatus || filteringStatus === "Qualified") && (
                <>
                  <div className="card shadow p-4 rounded-xl bg-green-300">
                    <h2 className="text-xl font-semibold">
                      Qualified: [{showQualified.length}]{" "}
                      {showQualified.length > 1 ? "Leads" : "Lead"}
                    </h2>
                  </div>
                  <div className="divider"></div>
                </>
              )}

              {(!filteringStatus || filteringStatus === "Proposal Sent") && (
                <>
                  <div className="card shadow p-4 rounded-xl bg-green-300">
                    <h2 className="text-xl font-semibold">
                      Proposal Sent: [{showProposalSent.length}]{" "}
                      {showProposalSent.length > 1 ? "Leads" : "Lead"}
                    </h2>
                  </div>
                  <div className="divider"></div>
                </>
              )}
            </div>
            <div className="card bg-white shadow-md rounded-xl max-w-3xl p-6 mb-6">
              <div className='className="flex flex-wrap gap-4 mb-4"'>
                <div>
                  <label className="block text-sm font-semibold mb-1">
                    Filter by Status
                  </label>
                  <select
                    className="select select-bordered w-40"
                    value={filteringStatus}
                    onChange={(e) => setFilteringStatus(e.target.value)}
                  >
                    <option value="">All</option>
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Qualified">Qualified</option>
                    <option value="Proposal Sent">Proposal Sent</option>
                    <option value="Closed">Closed</option>
                  </select>
                </div>
              </div>
              <Link to={"/addLead"}>
                <button className="btn btn-primary px-6 text-white mt-3">
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
