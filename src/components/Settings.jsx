import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Settings = () => {
  const [leadsAllShow, setLeadsAllShow] = useState([]);
  const [successMessage, setSuccessMessage] = useState(false);

  const fetchAllLeads = async () => {
    try {
      const res = await fetch(
        "https://anvaya-crm-backend-taupe.vercel.app/leads",
        {
          method: "GET",
        }
      );
      if (!res.ok) {
        console.log("Unable to fetch all leads");
        return;
      }
      const data = await res.json();
      setLeadsAllShow(data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteLead = async (id) => {
    try {
      const res = await fetch(
        `https://anvaya-crm-backend-taupe.vercel.app/leads/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!res.ok) {
        console.log("Unable to delete the lead ");
        return;
      }

      setLeadsAllShow((prev) =>
        prev.filter((lead) => lead._id != id && lead.id != id)
      );
      setSuccessMessage(true);
      setTimeout(() => {
        setSuccessMessage(false);
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllLeads();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100 flex-col md:flex-row">
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-[#0f172a] text-white p-6 space-y-6">
        <h2 className="text-2xl font-bold text-center md:text-left">
          Anvaya CRM
        </h2>
        <ul className="menu text-lg space-y-2">
          <Link to={"/"}>
            <li className="hover:bg-gray-800 p-2 text-center md:text-left">
              ← Back to <br className="hidden md:block" /> Dashboard
            </li>
          </Link>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 sm:p-6 md:p-10">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center">
          Displaying All Leads
        </h1>

        {successMessage && (
          <div className="toast toast-top toast-center z-10">
            <div className="alert alert-error">
              <span>Lead Deleted Successfully</span>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          {leadsAllShow.map((lead) => (
            <div key={lead._id} className="card bg-primary shadow-sm">
              <figure className="px-6 sm:px-10 pt-6 sm:pt-10">
                <img
                  src="https://placehold.co/600x400?text=Leads"
                  alt="Lead"
                  className="rounded-xl"
                />
              </figure>

              <div className="card-body items-center text-center">
                <h2 className="card-title text-white text-lg sm:text-xl">
                  Lead name: {lead.name}
                </h2>
                <p className="text-white">
                  <b>Source: {lead.source}</b>
                </p>

                <div className="card-actions justify-center flex-wrap gap-2">
                  <Link to={`/leadManage/${lead.id || lead._id}`}>
                    <button className="btn btn-secondary hover:bg-amber-600">
                      View Now
                    </button>
                  </Link>
                  <button
                    onClick={(e) => deleteLead(lead._id || lead.id)}
                    className="btn btn-error hover:bg-red-500"
                  >
                    Delete Lead
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Settings;
