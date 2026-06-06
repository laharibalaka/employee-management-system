import Layout from "../components/Layout";
import { useEffect, useState } from "react";
import axios from "axios";

function AttendanceList() {

  const [data, setData] = useState([]);

  const loadAttendance = async () => {

    try {

      const res = await axios.get(
        "https://employee-management-system-5fj7.onrender.com/api/attendance/all"
      );

      setData(res.data);

    } catch (err) {

      console.log(err);

      alert("Failed to load attendance");

    }

  };

  useEffect(() => {

    loadAttendance();

  }, []);

  const exportAttendance = () => {

    window.open(
      "https://employee-management-system-5fj7.onrender.com/api/attendance/export",
      "_blank"
    );

  };

  return (

    <Layout>

      <div className="bg-white p-6 rounded-2xl shadow-lg">

        <div className="flex justify-between items-center mb-6">

          <h1 className="text-3xl font-bold">
            📋 Attendance List
          </h1>

          <button
            onClick={exportAttendance}
            className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg"
          >
            📥 Export Attendance
          </button>

        </div>

        <table className="w-full border-collapse border">

          <thead>

            <tr className="bg-gray-200">

              <th className="border p-3">
                Employee Name
              </th>

              <th className="border p-3">
                Status
              </th>

              <th className="border p-3">
                Date
              </th>

            </tr>

          </thead>

          <tbody>

            {data.length > 0 ? (

              data.map((a) => (

                <tr key={a._id}>

                  <td className="border p-3">
                    {a.name}
                  </td>

                  <td className="border p-3">

                    <span
                      className={`px-3 py-1 rounded-full text-white ${
                        a.status === "Present"
                          ? "bg-green-500"
                          : "bg-red-500"
                      }`}
                    >
                      {a.status}
                    </span>

                  </td>

                  <td className="border p-3">
                    {a.date}
                  </td>

                </tr>

              ))

            ) : (

              <tr>

                <td
                  colSpan="3"
                  className="text-center p-4"
                >
                  No Attendance Records Found
                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

    </Layout>

  );

}

export default AttendanceList;