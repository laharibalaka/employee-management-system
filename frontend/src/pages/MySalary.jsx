import Layout from "../components/Layout";
import { useEffect, useState } from "react";
import axios from "axios";

function MySalary() {

  const [salary, setSalary] = useState([]);

  const name =
    localStorage.getItem("name");

  const loadSalary = async () => {

    try {

      const res = await axios.get(
        "http://localhost:5000/api/salary/all"
      );

      const mySalary =
        res.data.filter(
          (s) => s.name === name
        );

      setSalary(mySalary);

    } catch (err) {

      console.log(err);

    }

  };

  useEffect(() => {

    loadSalary();

  }, []);

  return (

    <Layout>

      <div className="mb-8">

        <h1 className="text-4xl font-bold">
          💰 My Salary
        </h1>

        <p className="text-gray-500 mt-2">
          View your salary details
        </p>

      </div>

      <div className="grid gap-5">

        {salary.map((s) => (

          <div
            key={s._id}
            className="bg-white p-6 rounded-2xl shadow-lg"
          >

            <h2 className="text-2xl font-bold">
              ₹ {s.amount}
            </h2>

            <p className="text-gray-500 mt-2">
              Month : {s.month}
            </p>

          </div>

        ))}

      </div>

    </Layout>

  );

}

export default MySalary;