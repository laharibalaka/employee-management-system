import Layout from "../components/Layout";
import { useEffect, useState } from "react";
import axios from "axios";

function LeaveList() {

  const [data, setData] = useState([]);

  const loadLeaves = async () => {

    try {

      const res = await axios.get(
        "http://localhost:5000/api/leave/all"
      );

      setData(res.data);

    } catch (err) {

      console.log(err);

    }

  };

  const updateStatus = async (
    id,
    status
  ) => {

    try {

   await axios.put(
  "http://localhost:5000/api/leave/update/" + id,
  { status }
);

alert(`Leave ${status}`);

loadLeaves();

window.location.reload();

    } catch (err) {

      console.log(err);

      alert("Error");

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
          📅 Leave Requests
        </h1>

        <p className="text-gray-500 mt-2">
          Manage employee leave applications
        </p>

      </div>

      {/* Table */}

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

        <table className="w-full">

          <thead>

            <tr className="bg-slate-800 text-white">

              <th className="p-4 text-left">
                Employee
              </th>

              <th className="p-4 text-left">
                Reason
              </th>

              <th className="p-4 text-left">
                Date
              </th>

              <th className="p-4 text-left">
                Status
              </th>

              <th className="p-4 text-left">
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {data.length === 0 ? (

              <tr>

                <td
                  colSpan="5"
                  className="text-center p-10 text-gray-500"
                >
                  No Leave Requests Found
                </td>

              </tr>

            ) : (

              data.map((leave) => (

                <tr
                  key={leave._id}
                  className="border-b hover:bg-gray-50"
                >

                  <td className="p-4 font-medium">
                    {leave.name}
                  </td>

                  <td className="p-4">
                    {leave.reason}
                  </td>

                  <td className="p-4">
                    {leave.date}
                  </td>

                  <td className="p-4">

                    {leave.status ===
                      "Pending" && (

                      <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">
                        Pending
                      </span>

                    )}

                    {leave.status ===
                      "Approved" && (

                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                        Approved
                      </span>

                    )}

                    {leave.status ===
                      "Rejected" && (

                      <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm">
                        Rejected
                      </span>

                    )}

                  </td>

                  <td className="p-4">

                    {leave.status ===
                    "Pending" ? (

                      <div className="flex gap-2">

                        <button
                          onClick={() =>
                            updateStatus(
                              leave._id,
                              "Approved"
                            )
                          }
                          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
                        >
                          Approve
                        </button>

                        <button
                          onClick={() =>
                            updateStatus(
                              leave._id,
                              "Rejected"
                            )
                          }
                          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                        >
                          Reject
                        </button>

                      </div>

                    ) : (

                      <span className="text-gray-500">
                        Completed
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

export default LeaveList;