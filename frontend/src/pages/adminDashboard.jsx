import Layout from "../components/Layout";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

function AdminDashboard() {
    const navigate = useNavigate();
    const [hrCount, setHrCount] = useState(0);
  const [stats, setStats] = useState({
    employees: 0,
    leaves: 0,
    attendance: 0,
  });

  const [pendingLeaves, setPendingLeaves] =
    useState([]);

  const [employees, setEmployees] =
    useState([]);

  const loadStats = async () => {

    try {

      const res = await axios.get(
        "http://localhost:5000/api/stats"
      );

      setStats(res.data);

    } catch (err) {

      console.log(err);

    }

  };

  const loadPendingLeaves = async () => {

    try {

      const res = await axios.get(
        "http://localhost:5000/api/leave/all"
      );

      const pending = res.data.filter(
        (leave) => leave.status === "Pending"
      );

      setPendingLeaves(pending);

    } catch (err) {

      console.log(err);

    }

  };

  const loadEmployees = async () => {

    try {

      const res = await axios.get(
        "http://localhost:5000/api/employee/all"
      );

      setEmployees(res.data);

    } catch (err) {

      console.log(err);

    }

  };
  const loadHRs = async () => {

  try {

    const res = await axios.get(
      "http://localhost:5000/api/auth/hrs"
    );

    setHrCount(res.data.length);

  } catch (err) {

    console.log(err);

  }

};



  useEffect(() => {

    loadStats();
    loadPendingLeaves();
    loadEmployees();
     loadHRs();

  }, []);

  const chartData = {

    labels: [
      "Employees",
      "Leaves",
      "Attendance",
    ],

    datasets: [
      {
        label: "System Overview",
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

      {/* Header */}

      <div className="mb-8">

        <h1 className="text-4xl font-bold text-slate-800">
          Welcome Admin 👋
        </h1>

        <p className="text-gray-500 mt-2">
          Manage employees, attendance,
          leaves and salaries efficiently.
        </p>

      </div>

      {/* Stats Cards */}

      <div className="grid md:grid-cols-5 gap-6 mb-8">

        <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition">

          <h2 className="text-lg font-semibold">
            👥 Total Employees
          </h2>

          <p className="text-4xl font-bold mt-3">
            {stats.employees}
          </p>

        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-700 text-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition">

          <h2 className="text-lg font-semibold">
            📅 Leave Requests
          </h2>

          <p className="text-4xl font-bold mt-3">
            {stats.leaves}
          </p>

        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-700 text-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition">

          <h2 className="text-lg font-semibold">
            📝 Attendance Records
          </h2>

          <p className="text-4xl font-bold mt-3">
            {stats.attendance}
          </p>

        </div>
        <div className="bg-gradient-to-r from-red-500 to-red-700 text-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition">

  <h2 className="text-lg font-semibold">
    ⏳ Pending Leaves
  </h2>

  <p className="text-4xl font-bold mt-3">
    {pendingLeaves.length}
  </p>

</div>
<div className="bg-gradient-to-r from-cyan-500 to-cyan-700 text-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition">

  <h2 className="text-lg font-semibold">
    👨‍💼 Total HRs
  </h2>

  <p className="text-4xl font-bold mt-3">
    {hrCount}
  </p>

</div>

      </div>

      {/* Quick Actions */}

      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">

        <h2 className="text-2xl font-bold mb-5">
          Quick Actions
        </h2>

        <div className="grid md:grid-cols-4 gap-4">

        <button
  onClick={() => navigate("/add")}
  className="bg-blue-600 text-white p-4 rounded-xl hover:bg-blue-700"
>
  ➕ Add Employee
</button>

<button
  onClick={() => navigate("/leave-list")}
  className="bg-green-600 text-white p-4 rounded-xl hover:bg-green-700"
>
  📅 Approve Leaves
</button>

<button
  onClick={() => navigate("/salary")}
  className="bg-purple-600 text-white p-4 rounded-xl hover:bg-purple-700"
>
  💰 Salary Management
</button>

<button
  onClick={() => navigate("/chart")}
  className="bg-orange-600 text-white p-4 rounded-xl hover:bg-orange-700"
>
  📊 Reports
</button>

        </div>

      </div>

      {/* Pending Leaves */}

      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">

        <h2 className="text-2xl font-bold mb-5">
          📅 Pending Leave Requests
        </h2>

        {
          pendingLeaves.length === 0 ? (

            <p className="text-gray-500">
              No Pending Requests
            </p>

          ) : (

            pendingLeaves
              .slice(0, 5)
              .map((leave) => (

                <div
                  key={leave._id}
                  className="border-b py-3"
                >

                  <p className="font-semibold">
                    {leave.name}
                  </p>

                  <p className="text-gray-500">
                    {leave.reason}
                  </p>

                </div>

              ))

          )
        }

      </div>
      

      {/* Recent Employees */}

      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">

        <h2 className="text-2xl font-bold mb-5">
          👥 Recent Employees
        </h2>

        {
          employees.length === 0 ? (

            <p className="text-gray-500">
              No Employees Found
            </p>

          ) : (

            employees
              .slice(-5)
              .reverse()
              .map((emp) => (

                <div
                  key={emp._id}
                  className="border-b py-3"
                >

                  <p className="font-semibold">
                    {emp.name}
                  </p>

                  <p className="text-gray-500">
                    {emp.email}
                  </p>

                </div>

              ))

          )
        }

      </div>

      {/* Analytics Chart */}

      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">

        <h2 className="text-2xl font-bold mb-5">
          📊 Analytics Overview
        </h2>

        <Bar data={chartData} />

      </div>
      {/* Activity Timeline */}

<div className="bg-white rounded-2xl shadow-lg p-6 mb-8">

  <h2 className="text-2xl font-bold mb-5">
    📋 Recent Activities
  </h2>

  <div className="space-y-4">

    <div className="flex items-start gap-4">

      <div className="bg-blue-500 text-white w-10 h-10 rounded-full flex items-center justify-center">
        👤
      </div>

      <div>

        <p className="font-semibold">
          New Employee Added
        </p>

        <p className="text-gray-500 text-sm">
          Employee record created successfully
        </p>

      </div>

    </div>


    <div className="flex items-start gap-4">

      <div className="bg-green-500 text-white w-10 h-10 rounded-full flex items-center justify-center">
        📅
      </div>

      <div>

        <p className="font-semibold">
          Leave Approved
        </p>

        <p className="text-gray-500 text-sm">
          Employee leave request approved
        </p>

      </div>

    </div>


    <div className="flex items-start gap-4">

      <div className="bg-purple-500 text-white w-10 h-10 rounded-full flex items-center justify-center">
        📝
      </div>

      <div>

        <p className="font-semibold">
          Attendance Updated
        </p>

        <p className="text-gray-500 text-sm">
          Daily attendance marked
        </p>

      </div>

    </div>


    <div className="flex items-start gap-4">

      <div className="bg-orange-500 text-white w-10 h-10 rounded-full flex items-center justify-center">
        💰
      </div>

      <div>

        <p className="font-semibold">
          Salary Generated
        </p>

        <p className="text-gray-500 text-sm">
          Payroll processed successfully
        </p>

      </div>

    </div>

  </div>

</div>

      {/* System Overview */}

      <div className="bg-white rounded-2xl shadow-lg p-6">


        <h2 className="text-2xl font-bold mb-4">
          System Overview
        </h2>

        <ul className="space-y-3 text-gray-700">

          <li>✅ Employee Management Active</li>

          <li>✅ Attendance Tracking Active</li>

          <li>✅ Leave Management Active</li>

          <li>✅ Salary Management Active</li>

          <li>🚀 Analytics Module Active</li>

        </ul>

      </div>

    </Layout>

  );

}

export default AdminDashboard;