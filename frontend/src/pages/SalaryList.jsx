import Layout from "../components/Layout";
import { useEffect, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";

function SalaryList() {

  const [data, setData] = useState([]);

  const loadSalary = async () => {

    const res = await axios.get(
      "http://localhost:5000/api/salary/all"
    );

    setData(res.data);

  };


  const deleteSalary = async (id) => {

    await axios.delete(
      "http://localhost:5000/api/salary/delete/" + id
    );

    loadSalary();

  };


  // ✅ PDF

  const downloadPDF = (s) => {

    const doc = new jsPDF();

    doc.text("Salary Slip", 20, 20);

    doc.text("Name: " + s.name, 20, 40);
    doc.text("Amount: " + s.amount, 20, 50);
    doc.text("Month: " + s.month, 20, 60);

    doc.save("salary.pdf");

  };


  useEffect(() => {
    loadSalary();
  }, []);


  return (

    <Layout>

      <h1 className="text-2xl mb-4">
        Salary List
      </h1>


      <table className="border w-full">

        <thead>

          <tr className="bg-gray-300">

            <th>Name</th>
            <th>Amount</th>
            <th>Month</th>
            <th>Action</th>

          </tr>

        </thead>

        <tbody>

          {data.map((s) => (

            <tr key={s._id}>

              <td>{s.name}</td>
              <td>{s.amount}</td>
              <td>{s.month}</td>

              <td>

                <button
                  className="bg-green-500 text-white px-2 mr-2"
                  onClick={() => downloadPDF(s)}
                >
                  PDF
                </button>

                <button
                  className="bg-red-500 text-white px-2"
                  onClick={() => deleteSalary(s._id)}
                >
                  Delete
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </Layout>

  );

}

export default SalaryList;