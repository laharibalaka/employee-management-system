import Layout from "../components/Layout";
import { useState } from "react";
import axios from "axios";

function Leave() {

  const [reason, setReason] = useState("");

  const userId = localStorage.getItem("userId");
  const name = localStorage.getItem("name");
  const email = localStorage.getItem("email");

  const applyLeave = async () => {

    try {

      await axios.post(
        "https://employee-management-system-5fj7.onrender.com/api/leave/apply",
        {
          userId,
          name,
          email,
          reason,
        }
      );

      alert("Leave Applied Successfully");

      setReason("");

    } catch (err) {

      console.log(err);

      alert("Error Applying Leave");

    }

  };

  return (

    <Layout>

      <div className="bg-white p-6 rounded-xl shadow-lg w-[500px]">

        <h1 className="text-3xl font-bold mb-5">
          📅 Apply Leave
        </h1>

        <input
          type="text"
          value={name}
          disabled
          className="border p-3 w-full mb-4 bg-gray-100 rounded"
        />

        <input
          type="email"
          value={email}
          disabled
          className="border p-3 w-full mb-4 bg-gray-100 rounded"
        />

        <input
          type="text"
          placeholder="Enter Leave Reason"
          value={reason}
          onChange={(e) =>
            setReason(e.target.value)
          }
          className="border p-3 w-full mb-4 rounded"
        />

        <button
          onClick={applyLeave}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg"
        >
          Apply Leave
        </button>

      </div>

    </Layout>

  );

}

export default Leave;