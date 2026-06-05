import Layout from "../components/Layout";
import { useEffect, useState } from "react";
import axios from "axios";

function MyLeaves() {

  const [data, setData] = useState([]);

  const userId = localStorage.getItem(
    "userId"
  );

  const loadLeaves = async () => {

    try {

      const res = await axios.get(
        "http://localhost:5000/api/leave/my/" +
          userId
      );

      setData(res.data);

    } catch (err) {

      console.log(err);

    }

  };

  useEffect(() => {

    loadLeaves();

  }, []);

  return (

    <Layout>

      {/* Header */}

      <div className="mb-8">

        <h1 className="text-4xl font-bold text-slate-800">
          📅 My Leave Requests
        </h1>

        <p className="text-gray-500 mt-2">
          Track all your leave applications
        </p>

      </div>

      {/* Summary Cards */}

      <div className="grid md:grid-cols-3 gap-5 mb-8">

        <div className="bg-yellow-500 text-white p-6 rounded-2xl shadow-lg">

          <h2 className="text-lg">
            Pending
          </h2>

          <p className="text-4xl font-bold mt-2">
            {
              data.filter(
                (x) =>
                  x.status === "Pending"
              ).length
            }
          </p>

        </div>

        <div className="bg-green-500 text-white p-6 rounded-2xl shadow-lg">

          <h2 className="text-lg">
            Approved
          </h2>

          <p className="text-4xl font-bold mt-2">
            {
              data.filter(
                (x) =>
                  x.status === "Approved"
              ).length
            }
          </p>

        </div>

        <div className="bg-red-500 text-white p-6 rounded-2xl shadow-lg">

          <h2 className="text-lg">
            Rejected
          </h2>

          <p className="text-4xl font-bold mt-2">
            {
              data.filter(
                (x) =>
                  x.status === "Rejected"
              ).length
            }
          </p>

        </div>

      </div>

      {/* Leave Table */}

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

        <table className="w-full">

          <thead>

            <tr className="bg-slate-800 text-white">

              <th className="p-4 text-left">
                Reason
              </th>

              <th className="p-4 text-left">
                Date
              </th>

              <th className="p-4 text-left">
                Status
              </th>

            </tr>

          </thead>

          <tbody>

            {data.length === 0 ? (

              <tr>

                <td
                  colSpan="3"
                  className="text-center p-10 text-gray-500"
                >
                  No Leave Records Found
                </td>

              </tr>

            ) : (

              data.map((leave) => (

                <tr
                  key={leave._id}
                  className="border-b hover:bg-gray-50"
                >

                  <td className="p-4">
                    {leave.reason}
                  </td>

                  <td className="p-4">
                    {leave.date}
                  </td>

                  <td className="p-4">

                    {leave.status ===
                      "Approved" && (

                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">
                        ✅ Approved
                      </span>

                    )}

                    {leave.status ===
                      "Rejected" && (

                      <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full">
                        ❌ Rejected
                      </span>

                    )}

                    {leave.status ===
                      "Pending" && (

                      <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full">
                        ⏳ Pending
                      </span>

                    )}

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </Layout>

  );

}

export default MyLeaves;