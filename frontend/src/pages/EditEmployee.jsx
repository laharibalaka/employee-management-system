import Layout from "../components/Layout";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function EditEmployee() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");


  // LOAD employee data

  const loadEmployee = async () => {

    const res = await axios.get(
      "http://localhost:5000/api/employee/all"
    );

    const emp = res.data.find(
      (e) => e._id === id
    );

    if (emp) {
      setName(emp.name);
      setEmail(emp.email);
    }

  };


  // UPDATE

  const updateEmployee = async () => {

    await axios.put(
      "http://localhost:5000/api/employee/update/" + id,
      {
        name,
        email,
      }
    );

    navigate("/employees");

  };


  useEffect(() => {
    loadEmployee();
  }, []);


  return (

    <Layout>

      <h1 className="text-2xl mb-4">
        Edit Employee
      </h1>

      <input
        className="border p-2 mr-2"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        className="border p-2 mr-2"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button
        className="bg-green-500 text-white px-4 py-2"
        onClick={updateEmployee}
      >
        Update
      </button>

    </Layout>

  );

}

export default EditEmployee;