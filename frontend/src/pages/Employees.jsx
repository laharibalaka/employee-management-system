
import Layout from "../components/Layout";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

function Employees() {

  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  // LOAD EMPLOYEES

  const loadEmployees = async () => {

    try {

      const res = await axios.get(
        "http://localhost:5000/api/employee/all"
      );

      setData(res.data);

    } catch (err) {

      console.log(err);

    }

  };

  // DELETE EMPLOYEE

  const deleteEmployee = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this employee?"
    );

    if (!confirmDelete) return;

    try {

      await axios.delete(
        "http://localhost:5000/api/employee/delete/" + id
      );

      alert("Employee Deleted");

      loadEmployees();

    } catch (err) {

      console.log(err);

      alert("Error");

    }

  };

  // PDF DOWNLOAD

  const downloadPDF = () => {

    const doc = new jsPDF();

    doc.setFontSize(18);

    doc.text(
      "Employee Report",
      14,
      20
    );

    autoTable(doc, {

      head: [["Name", "Email"]],

      body: filteredEmployees.map(
        (emp) => [
          emp.name,
          emp.email,
        ]
      ),

      startY: 30,

    });

    doc.save(
      "Employee_Report.pdf"
    );

  };

  useEffect(() => {

    loadEmployees();

  }, []);
const downloadExcel = () => {

  const worksheet = XLSX.utils.json_to_sheet(
    filteredEmployees.map((emp) => ({
      Name: emp.name,
      Email: emp.email,
    }))
  );

  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(
    workbook,
    worksheet,
    "Employees"
  );

  const excelBuffer = XLSX.write(
    workbook,
    {
      bookType: "xlsx",
      type: "array",
    }
  );

  const fileData = new Blob(
    [excelBuffer],
    {
      type:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
    }
  );

  saveAs(
    fileData,
    "Employee_Report.xlsx"
  );

};
  // SEARCH FILTER

  const filteredEmployees =
    data.filter(
      (emp) =>
        emp.name
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        emp.email
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          )
    );

  return (

    <Layout>

      {/* Header */}

      <div className="mb-6">

        <h1 className="text-4xl font-bold text-slate-800">
          👥 Employees
        </h1>

        <p className="text-gray-500 mt-2">
          Manage all employees
        </p>

      </div>

      {/* Search */}

      <div className="mb-4">

        <input
          type="text"
          placeholder="🔍 Search by Name or Email"
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="w-full border p-3 rounded-xl shadow-sm"
        />

      </div>

      {/* PDF Button */}

      <button
        onClick={downloadPDF}
        className="bg-green-600 text-white px-5 py-3 rounded-xl mb-6 hover:bg-green-700"
      >
        📄 Download Employee Report
      </button>
      <button
  onClick={downloadExcel}
  className="bg-emerald-600 text-white px-5 py-3 rounded-xl mb-6 ml-3 hover:bg-emerald-700"
>
  📊 Download Excel Report
</button>

      {/* Employee Count */}

      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6 rounded-2xl shadow-lg mb-6">

        <h2 className="text-lg font-semibold">
          Total Employees
        </h2>

        <p className="text-4xl font-bold mt-2">
          {filteredEmployees.length}
        </p>

      </div>

      {/* Employee Table */}

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

        <table className="w-full">

          <thead>

            <tr className="bg-slate-100">

              <th className="p-4 text-left">
                Name
              </th>

              <th className="p-4 text-left">
                Email
              </th>

              <th className="p-4 text-center">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {filteredEmployees.length > 0 ? (

              filteredEmployees.map(
                (emp) => (

                  <tr
                    key={emp._id}
                    className="border-t hover:bg-gray-50"
                  >

                    <td className="p-4">
                      {emp.name}
                    </td>

                    <td className="p-4">
                      {emp.email}
                    </td>

                    <td className="p-4 text-center">

                      <button
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg mr-2"
                        onClick={() =>
                          navigate("/edit/" + emp._id)
                        }
                      >
                        Edit
                      </button>

                      <button
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                        onClick={() =>
                          deleteEmployee(emp._id)
                        }
                      >
                        Delete
                      </button>

                    </td>

                  </tr>

                )
              )

            ) : (

              <tr>

                <td
                  colSpan="3"
                  className="text-center p-6 text-gray-500"
                >
                  No Employees Found
                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

    </Layout>

  );

}

export default Employees;
