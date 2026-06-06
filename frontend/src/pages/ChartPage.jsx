import Layout from "../components/Layout";
import { useEffect, useState } from "react";
import axios from "axios";

import {
  Chart as ChartJS,
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

import {
  Bar,
  Doughnut,
} from "react-chartjs-2";

ChartJS.register(
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

function ChartPage() {

  const [stats, setStats] = useState({
    employees: 0,
    leaves: 0,
    attendance: 0,
  });

  const loadStats = async () => {

    try {

      const res = await axios.get(
        "https://employee-management-system-5fj7.onrender.com/api/stats"
      );

      setStats(res.data);

    } catch (err) {

      console.log(err);

    }

  };

  useEffect(() => {
    loadStats();
  }, []);


  const barData = {

    labels: [
      "Employees",
      "Leaves",
      "Attendance",
    ],

    datasets: [
      {
        label: "System Statistics",
        data: [
          stats.employees,
          stats.leaves,
          stats.attendance,
        ],
        backgroundColor: [
          "#3B82F6",
          "#22C55E",
          "#A855F7",
        ],
      },
    ],

  };


  const doughnutData = {

    labels: [
      "Employees",
      "Leaves",
      "Attendance",
    ],

    datasets: [
      {
        data: [
          stats.employees,
          stats.leaves,
          stats.attendance,
        ],
        backgroundColor: [
          "#3B82F6",
          "#22C55E",
          "#A855F7",
        ],
      },
    ],

  };


  return (

    <Layout>

      <h1 className="text-4xl font-bold mb-8">
        📈 Analytics Dashboard
      </h1>


      {/* Summary Cards */}

      <div className="grid md:grid-cols-3 gap-6 mb-8">

        <div className="bg-blue-500 text-white p-6 rounded-2xl shadow-lg">

          <h2 className="text-lg">
            Employees
          </h2>

          <p className="text-4xl font-bold">
            {stats.employees}
          </p>

        </div>


        <div className="bg-green-500 text-white p-6 rounded-2xl shadow-lg">

          <h2 className="text-lg">
            Leaves
          </h2>

          <p className="text-4xl font-bold">
            {stats.leaves}
          </p>

        </div>


        <div className="bg-purple-500 text-white p-6 rounded-2xl shadow-lg">

          <h2 className="text-lg">
            Attendance
          </h2>

          <p className="text-4xl font-bold">
            {stats.attendance}
          </p>

        </div>

      </div>


      {/* Charts */}

      <div className="grid md:grid-cols-2 gap-8">

        <div className="bg-white p-6 rounded-2xl shadow-lg">

          <h2 className="text-xl font-bold mb-4">
            Bar Analytics
          </h2>

          <Bar data={barData} />

        </div>


        <div className="bg-white p-6 rounded-2xl shadow-lg">

          <h2 className="text-xl font-bold mb-4">
            Distribution
          </h2>

          <Doughnut data={doughnutData} />

        </div>

      </div>

    </Layout>

  );

}

export default ChartPage;