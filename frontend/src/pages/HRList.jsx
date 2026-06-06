import Layout from "../components/Layout";
import { useEffect, useState } from "react";
import axios from "axios";

function HRList() {

  const [hrs, setHrs] = useState([]);

  const loadHRs = async () => {

    try {

      const res = await axios.get(
        "https://employee-management-system-5fj7.onrender.com/api/auth/hrs"
      );

      setHrs(res.data);

    } catch (err) {

      console.log(err);

    }

  };

  useEffect(() => {

    loadHRs();

  }, []);

  return (

    <Layout>

      {/* Header */}

      <div className="mb-8">

        <h1 className="text-4xl font-bold text-slate-800">
          👨‍💼 HR Management
        </h1>

        <p className="text-gray-500 mt-2">
          View all HR users in the system
        </p>

      </div>

      {/* Total HR Card */}

      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6 rounded-2xl shadow-lg mb-8">

        <h2 className="text-lg font-semibold">
          Total HR Users
        </h2>

        <p className="text-4xl font-bold mt-2">
          {hrs.length}
        </p>

      </div>

      {/* HR Table */}

      <div className="bg-white rounded-2xl shadow-lg p-6">

        <h2 className="text-2xl font-bold mb-5">
          📋 HR List
        </h2>

        {hrs.length === 0 ? (

          <p className="text-gray-500">
            No HR Users Found
          </p>

        ) : (

          <table className="w-full border-collapse">

            <thead>

              <tr className="bg-slate-100">

                <th className="p-3 border text-left">
                  Name
                </th>

                <th className="p-3 border text-left">
                  Email
                </th>

                <th className="p-3 border text-left">
                  Role
                </th>

              </tr>

            </thead>

            <tbody>

              {hrs.map((hr) => (

                <tr key={hr._id}>

                  <td className="p-3 border">
                    {hr.name}
                  </td>

                  <td className="p-3 border">
                    {hr.email}
                  </td>

                  <td className="p-3 border">
                    {hr.role}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        )}

      </div>

    </Layout>

  );

}

export default HRList;