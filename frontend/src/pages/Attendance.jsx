import Layout from "../components/Layout";
import { useState } from "react";
import axios from "axios";

function Attendance() {

  const [name, setName] = useState("");
  const [status, setStatus] = useState("Present");

  const saveAttendance = async () => {

    try {

      await axios.post(
        "http://localhost:5000/api/attendance/mark",
        {
          name,
          status,
          employeeId: Date.now(),
        }
      );

      alert("Saved");

    } catch (err) {

      alert("Error");

    }

  };

  return (

    <Layout>

      <h1 className="text-2xl mb-4">
        Attendance
      </h1>

      <input
        placeholder="Name"
        className="border p-2 mr-2"
        onChange={(e) => setName(e.target.value)}
      />

      <select
        className="border p-2 mr-2"
        onChange={(e) => setStatus(e.target.value)}
      >
        <option>Present</option>
        <option>Absent</option>
      </select>

      <button
        className="bg-green-500 text-white px-4 py-2"
        onClick={saveAttendance}
      >
        Save
      </button>

    </Layout>

  );

}

export default Attendance;