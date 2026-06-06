import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function EmployeeDashboard() {

const navigate = useNavigate();

const [leaveCount, setLeaveCount] =
useState(0);

const [attendance, setAttendance] =
useState(0);

const [salary, setSalary] =
useState("0");

const name =
localStorage.getItem("name");

const userId =
localStorage.getItem("userId");

useEffect(() => {


const loadLeaves = async () => {

  try {

    const res = await axios.get(
      "https://employee-management-system-5fj7.onrender.com/api/leave/my/" +
        userId
    );

    setLeaveCount(
      res.data.length
    );

  } catch (err) {

    console.log(err);

  }

};

const loadAttendance = async () => {

  try {

    const res = await axios.get(
      "https://employee-management-system-5fj7.onrender.com/api/attendance/all"
    );

    const myAttendance =
      res.data.filter(
        (a) => a.name === name
      );

    const present =
      myAttendance.filter(
        (a) =>
          a.status === "Present"
      ).length;

    const workingDays = 30;

    const percent =
      (
        (present / workingDays) *
        100
      ).toFixed(2);

    setAttendance(percent);

  } catch (err) {

    console.log(err);

  }

};

const loadSalary = async () => {

  try {

    const res = await axios.get(
      "https://employee-management-system-5fj7.onrender.com/api/salary/all"
    );

    const mySalary =
      res.data.filter(
        (s) => s.name === name
      );

    if (
      mySalary.length > 0
    ) {

      setSalary(
        mySalary[
          mySalary.length - 1
        ].amount
      );

    }

  } catch (err) {

    console.log(err);

  }

};

loadLeaves();
loadAttendance();
loadSalary();


}, [name, userId]);

return (


<Layout>

  <div className="mb-8">

    <h1 className="text-4xl font-bold text-slate-800">
      Welcome, {name} 👋
    </h1>

    <p className="text-gray-500 mt-2">
      Manage your profile, leaves and attendance
    </p>

  </div>

  <div className="grid md:grid-cols-3 gap-6 mb-8">

    <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white p-6 rounded-2xl shadow-lg">

      <h2 className="text-lg font-semibold">
        📅 My Leaves
      </h2>

      <p className="text-4xl font-bold mt-3">
        {leaveCount}
      </p>

    </div>

    <div className="bg-gradient-to-r from-green-500 to-green-700 text-white p-6 rounded-2xl shadow-lg">

      <h2 className="text-lg font-semibold">
        📝 Attendance
      </h2>

      <p className="text-4xl font-bold mt-3">
        {attendance}%
      </p>

    </div>

    <div className="bg-gradient-to-r from-purple-500 to-purple-700 text-white p-6 rounded-2xl shadow-lg">

      <h2 className="text-lg font-semibold">
        💰 Salary
      </h2>

      <p className="text-4xl font-bold mt-3">
        ₹{salary}
      </p>

    </div>

  </div>

  <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">

    <h2 className="text-2xl font-bold mb-5">
      ⚡ Quick Actions
    </h2>

    <div className="grid md:grid-cols-3 gap-4">

      <button
        onClick={() =>
          navigate("/leave")
        }
        className="bg-blue-600 text-white p-4 rounded-xl hover:bg-blue-700"
      >
        📝 Apply Leave
      </button>

      <button
        onClick={() =>
          navigate("/my-leaves")
        }
        className="bg-green-600 text-white p-4 rounded-xl hover:bg-green-700"
      >
        📅 My Leaves
      </button>

      <button
        onClick={() =>
          navigate("/profile")
        }
        className="bg-purple-600 text-white p-4 rounded-xl hover:bg-purple-700"
      >
        👤 My Profile
      </button>

    </div>

  </div>

  <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">

    <h2 className="text-2xl font-bold mb-5">
      📋 Recent Activities
    </h2>

    <div className="space-y-4">

      <div className="border-b pb-3">
        📝 Leave Request Submitted
      </div>

      <div className="border-b pb-3">
        ✅ Leave Approved
      </div>

      <div className="border-b pb-3">
        🕒 Attendance Updated
      </div>

      <div>
        👤 Profile Updated
      </div>

    </div>

  </div>

  <div className="bg-white rounded-2xl shadow-lg p-6">

    <h2 className="text-2xl font-bold mb-5">
      🔔 Notifications
    </h2>

    <div className="space-y-3">

      <div className="bg-green-50 border border-green-200 p-4 rounded-xl">
        Your leave requests: {leaveCount}
      </div>

      <div className="bg-blue-50 border border-blue-200 p-4 rounded-xl">
        Attendance: {attendance}%
      </div>

    </div>

  </div>

</Layout>


);

}

export default EmployeeDashboard;
