import Layout from "../components/Layout";
import { useEffect, useState } from "react";
import axios from "axios";

function MyAttendance() {

  const [data, setData] = useState([]);

  const name =
    localStorage.getItem("name");

  useEffect(() => {

    const loadAttendance = async () => {

      try {

        const res = await axios.get(
          "http://localhost:5000/api/attendance/all"
        );

        const myAttendance =
          res.data.filter(
            (a) => a.name === name
          );

        setData(myAttendance);

      } catch (err) {

        console.log(err);

      }

    };

    loadAttendance();

  }, [name]);

  const present =
    data.filter(
      (a) => a.status === "Present"
    ).length;

  const absent =
    data.filter(
      (a) => a.status === "Absent"
    ).length;

  const total = data.length;

  const workingDays = 30;

  const percentage =
    (
      (present / workingDays) *
      100
    ).toFixed(2);

  return (

    <Layout>

      <h1 className="text-4xl font-bold mb-6">
        📝 My Attendance
      </h1>

      <div className="grid md:grid-cols-4 gap-5 mb-8">

        <div className="bg-blue-500 text-white p-5 rounded-xl">

          <h2>Total Records</h2>

          <p className="text-3xl font-bold">
            {total}
          </p>

        </div>

        <div className="bg-green-500 text-white p-5 rounded-xl">

          <h2>Present</h2>

          <p className="text-3xl font-bold">
            {present}
          </p>

        </div>

        <div className="bg-red-500 text-white p-5 rounded-xl">

          <h2>Absent</h2>

          <p className="text-3xl font-bold">
            {absent}
          </p>

        </div>

        <div className="bg-purple-500 text-white p-5 rounded-xl">

          <h2>Attendance %</h2>

          <p className="text-3xl font-bold">
            {percentage}%
          </p>

        </div>

      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6">

        <h2 className="text-2xl font-bold mb-4">
          Attendance History
        </h2>

        <table className="w-full border">

          <thead>

            <tr className="bg-gray-200">

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
                  colSpan="2"
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

export default MyAttendance;