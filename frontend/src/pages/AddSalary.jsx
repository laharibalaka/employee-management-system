import Layout from "../components/Layout";
import { useEffect, useState } from "react";
import axios from "axios";

function AddSalary() {

  const [employees, setEmployees] =
    useState([]);

  const [employeeId, setEmployeeId] =
    useState("");

  const [month, setMonth] =
    useState("");

  useEffect(() => {

    loadEmployees();

  }, []);

  const loadEmployees = async () => {

    try {

      const res =
        await axios.get(
          "https://employee-management-system-5fj7.onrender.com/api/employee/all"
        );

      setEmployees(
        res.data
      );

    } catch (err) {

      console.log(err);

    }

  };

  const generatePayroll =
    async () => {

      if (
        !employeeId ||
        !month
      ) {

        alert(
          "Select Employee and Month"
        );

        return;

      }

      try {

        const res =
          await axios.post(

            "https://employee-management-system-5fj7.onrender.com/api/salary/generate-payroll",

            {
              employeeId,
              month,
            }

          );

        alert(

          `Payroll Generated

Salary: ₹${res.data.amount}

Present Days: ${res.data.presentDays}`

        );

      } catch (err) {

        console.log(err);

        alert(

          err.response?.data ||
            "Payroll Generation Failed"

        );

      }

    };

  return (

    <Layout>

      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-xl">

        <h1 className="text-3xl font-bold mb-6">
          💰 Auto Payroll
        </h1>

        <select

          value={employeeId}

          onChange={(e) =>
            setEmployeeId(
              e.target.value
            )
          }

          className="border p-3 w-full mb-4 rounded-lg"

        >

          <option value="">
            Select Employee
          </option>

          {employees.map(
            (emp) => (

              <option
                key={
                  emp._id
                }
                value={
                  emp._id
                }
              >

                {emp.name}
                {" - "}
                {emp.email}

              </option>

            )
          )}

        </select>

        <input

          type="text"

          placeholder="Month (Example: June-2026)"

          value={month}

          onChange={(e) =>
            setMonth(
              e.target.value
            )
          }

          className="border p-3 w-full mb-4 rounded-lg"

        />

        <button

          onClick={
            generatePayroll
          }

          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg w-full"

        >

          Generate Payroll

        </button>

      </div>

    </Layout>

  );

}

export default AddSalary;