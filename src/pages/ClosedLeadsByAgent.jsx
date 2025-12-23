import { Legend, plugins } from "chart.js";
import { Bar } from "react-chartjs-2";

const ClosedLeadsByAgent = ({ closedByAgent }) => {
  const barData = {
    labels: closedByAgent.map((item) => item.salesAgentName),
    datasets: [
      {
        label: closedByAgent.map((item) => item.salesAgentName),
        data: closedByAgent.map((item) => item.closedLeadsCount),
        backgroundColor: [
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 99, 132, 0.5)",
          "rgba(255, 205, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
          "rgba(153, 102, 255, 0.5)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };
  return <Bar data={barData} options={barOptions} />;
};
export default ClosedLeadsByAgent;
