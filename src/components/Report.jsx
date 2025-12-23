import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Link } from "react-router-dom";
import ClosedLeadsByAgent from "../pages/ClosedLeadsByAgent";

const Report = () => {
  const [leadsinPipeline, setLeadsinPipeline] = useState({});
  const [leadsInCloseds, setLeadsInCloseds] = useState([]);
  const [leadDistributionStatus, setLeadDistributionStatus] = useState([]);
  const [closedAgentLead, setClosedAgentLead] = useState([]);

  const leadInPipeline = async () => {
    try {
      const res = await fetch(`http://localhost:3000/report/pipeline`, {
        method: "GET",
      });
      const data = await res.json();
      setLeadsinPipeline(data);
    } catch (error) {
      console.log(error);
    }
  };

  const leadsInClosed = async () => {
    try {
      const res = await fetch("http://localhost:3000/report/last-week", {
        method: "GET",
      });
      const data = await res.json();
      setLeadsInCloseds(data);
    } catch (error) {
      console.log(error);
    }
  };

  const leadAgentClose = async () => {
    try {
      const res = await fetch("http://localhost:3000/closed/salesagent", {
        method: "GET",
      });
      const data = await res.json();
      setClosedAgentLead(data);
    } catch (error) {
      console.log(error);
    }
  };

  const leadStatusDistribution = async () => {
    try {
      const res = await fetch("http://localhost:3000/report/leadDistribution", {
        method: "GET",
      });
      const data = await res.json();
      setLeadDistributionStatus(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    leadInPipeline();
    leadsInClosed();
    leadStatusDistribution();
    leadAgentClose();
  }, []);

  const pieData = {
    labels: ["Leads in Pipeline", "Closed Leads"],
    datasets: [
      {
        data: [
          leadsinPipeline.getLeadsInPieline || 0,
          leadsInCloseds.length || 0,
        ],
        backgroundColor: ["#22c55e", "#6366f1"],
        hoverOffset: 4,
      },
    ],
  };

  const pieData1 = {
    labels: leadDistributionStatus.map((labelItem) => labelItem.status),
    datasets: [
      {
        data: leadDistributionStatus.map((leadCount) => leadCount.count),
        backgroundColor: [
          "#22c55e",
          "#6366f1",
          "#f59e0b",
          "#ef4444",
          "#cf27b8",
        ],
        hoverOffset: 4,
      },
    ],
  };

  const pieOptions = {
    plugins: {
      legend: {
        display: false,
      },
    },
  };
  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="w-64 bg-[#0f172a] text-white p-6 space-y-6">
        <h2 className="text-2xl font-bold mb-6">Anvaya CRM</h2>

        <ul className="menu text-lg space-y-2">
          <Link to={"/"}>
            <li className="hover:bg-gray-800 p-2">
              ← Back to <br /> Dashboard
            </li>
          </Link>
        </ul>
      </div>

      <main className="flex-1 p-10">
        <h1 className="text-3xl font-bold mb-8">Report Overview</h1>
        <div className="card bg-base-100 shadow-xl mb-8">
          <div className="card-body">
            <h2 className="card-title">Total Leads Closed and in Pipeline</h2>
            <div className="flex items-center gap-10 mt-6">
              {/* Pie Placeholder */}
              <div className="w-48 h-48">
                <Pie data={pieData} options={pieOptions} />
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="badge badge-primary"></span>
                  <span>All Closed Leads within last week</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="badge badge-success"></span>
                  <span>Leads In Pipeline</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Bar Chart */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Leads Closed by Sales Agent</h2>

              <div className="w-64 h-64">
                <ClosedLeadsByAgent closedByAgent={closedAgentLead} />
              </div>
            </div>
          </div>

          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Lead Status Distribution</h2>

              <div className="flex items-center justify-between mt-6">
                <div className="w-52 h-52 flex items-center justify-center">
                  <Pie data={pieData1} options={pieOptions} />
                </div>

                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <span className="w-4 h-4 rounded bg-warning"></span>
                    <span className="text-sm font-medium">New</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="w-4 h-4 rounded bg-secondary"></span>
                    <span className="text-sm font-medium">Qualified</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="w-4 h-4 rounded bg-error"></span>
                    <span className="text-sm font-medium">Proposal</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="w-4 h-4 rounded bg-primary"></span>
                    <span className="text-sm font-medium">Contacted</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="w-4 h-4 rounded bg-success"></span>
                    <span className="text-sm font-medium">Closed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Report;
