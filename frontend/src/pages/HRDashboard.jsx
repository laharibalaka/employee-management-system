import Layout from "../components/Layout";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function HRDashboard() {

  const navigate = useNavigate();

  const [employees, setEmployees] =
    useState(0);

  const [attendance, setAttendance] =
    useState(0);

  const [pendingLeaves, setPendingLeaves] =
    useState(0);

  const name =
    localStorage.getItem("name") ||
    "HR Manager";

  useEffect(() => {

    const loadDashboard = async () => {

      try {

        // Employees

        const empRes =
          await axios.get(
            "https://employee-management-system-5fj7.onrender.com/api/employee/all"
          );

        setEmployees(
          empRes.data.length
        );

        // Attendance

        const attRes =
          await axios.get(
            "https://employee-management-system-5fj7.onrender.com/api/attendance/all"
          );

        const presentCount =
          attRes.data.filter(
            (a) =>
              a.status ===
              "Present"
          ).length;

        setAttendance(
          presentCount
        );

        // Leaves

        const leaveRes =
          await axios.get(
            "https://employee-management-system-5fj7.onrender.com/api/leave/all"
          );

        const pending =
          leaveRes.data.filter(
            (l) =>
              l.status ===
              "Pending"
          ).length;

        setPendingLeaves(
          pending
        );

      } catch (err) {

        console.log(err);

      }

    };

    loadDashboard();

  }, []);

  return (

    <Layout>

      {/* Header */}

      <div className="mb-8">

        <h1 className="text-4xl font-bold text-slate-800">
          Welcome, {name} 👨‍💼
        </h1>

        <p className="text-gray-500 mt-2">
          Manage employees, attendance and leave requests.
        </p>

      </div>

      {/* Stats Cards */}

      <div className="grid md:grid-cols-3 gap-6 mb-8">

        <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white p-6 rounded-2xl shadow-lg">

          <h2 className="text-lg font-semibold">
            👥 Employees
          </h2>

          <p className="text-4xl font-bold mt-3">
            {employees}
          </p>

        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-700 text-white p-6 rounded-2xl shadow-lg">

          <h2 className="text-lg font-semibold">
            📝 Present Today
          </h2>

          <p className="text-4xl font-bold mt-3">
            {attendance}
          </p>

        </div>

        <div className="bg-gradient-to-r from-orange-500 to-orange-700 text-white p-6 rounded-2xl shadow-lg">

          <h2 className="text-lg font-semibold">
            📅 Pending Leaves
          </h2>

          <p className="text-4xl font-bold mt-3">
            {pendingLeaves}
          </p>

        </div>

      </div>

      {/* Quick Actions */}

      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">

        <h2 className="text-2xl font-bold mb-5">
          Quick Actions
        </h2>

        <div className="grid md:grid-cols-3 gap-4">

          <button
            onClick={() =>
              navigate("/employees")
            }
            className="bg-blue-600 text-white p-4 rounded-xl hover:bg-blue-700"
          >
            👥 Manage Employees
          </button>

          <button
            onClick={() =>
              navigate("/attendance")
            }
            className="bg-green-600 text-white p-4 rounded-xl hover:bg-green-700"
          >
            📝 Attendance
          </button>

          <button
            onClick={() =>
              navigate("/leave-approval")
            }
            className="bg-orange-600 text-white p-4 rounded-xl hover:bg-orange-700"
          >
            📅 Leave Requests
          </button>

        </div>

      </div>

      {/* Recent Activities */}

      <div className="bg-white rounded-2xl shadow-lg p-6">

        <h2 className="text-2xl font-bold mb-5">
          📋 Recent Activities
        </h2>

        <div className="space-y-4">

          <div className="border-b pb-3">
            👥 Total Employees : {employees}
          </div>

          <div className="border-b pb-3">
            📝 Present Employees : {attendance}
          </div>

          <div className="border-b pb-3">
            📅 Pending Leaves : {pendingLeaves}
          </div>

          <div>
            ✅ HR Dashboard Active
          </div>

        </div>

      </div>

    </Layout>

  );

}

export default HRDashboard;