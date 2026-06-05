import Layout from "../components/Layout";
import { useState } from "react";
import axios from "axios";

function AddEmployee() {

const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [baseSalary, setBaseSalary] =
useState(30000);

const [file, setFile] =
useState(null);

const addEmployee = async () => {

if (
  !name ||
  !email ||
  !baseSalary
) {

  alert(
    "Please fill all fields"
  );

  return;

}

try {

  await axios.post(

    "http://localhost:5000/api/employee/add",

    {
      name,
      email,
      baseSalary,
    }

  );

  alert(
    "Employee Added Successfully"
  );

  setName("");
  setEmail("");
  setBaseSalary(30000);

} catch (err) {

  console.log(err);

  alert(
    "Error Adding Employee"
  );

}

};

const importExcel = async () => {

if (!file) {

  alert(
    "Please select an Excel file"
  );

  return;

}

try {

  const formData =
    new FormData();

  formData.append(
    "file",
    file
  );

  const res =
    await axios.post(

      "http://localhost:5000/api/employee/import",

      formData,

      {
        headers: {
          "Content-Type":
            "multipart/form-data",
        },
      }

    );

  alert(

    `${res.data.added} Imported Successfully\n${res.data.skipped || 0} Already Exist`

  );

  setFile(null);

} catch (err) {

  console.log(err);

  alert(
    "Excel Import Failed"
  );

}

};

return (

<Layout>

  <div className="max-w-xl bg-white p-8 rounded-2xl shadow-lg">

    <h1 className="text-3xl font-bold mb-6">
      ➕ Add Employee
    </h1>

    <div className="mb-4">

      <label className="block mb-2 font-medium">
        Employee Name
      </label>

      <input
        type="text"
        placeholder="Enter Employee Name"
        value={name}
        onChange={(e) =>
          setName(
            e.target.value
          )
        }
        className="border p-3 w-full rounded-lg"
      />

    </div>

    <div className="mb-4">

      <label className="block mb-2 font-medium">
        Employee Email
      </label>

      <input
        type="email"
        placeholder="Enter Employee Email"
        value={email}
        onChange={(e) =>
          setEmail(
            e.target.value
          )
        }
        className="border p-3 w-full rounded-lg"
      />

    </div>

    <div className="mb-6">

      <label className="block mb-2 font-medium">
        Base Salary
      </label>

      <input
        type="number"
        placeholder="Enter Base Salary"
        value={baseSalary}
        onChange={(e) =>
          setBaseSalary(
            e.target.value
          )
        }
        className="border p-3 w-full rounded-lg"
      />

    </div>

    <button
      onClick={addEmployee}
      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg w-full"
    >
      Add Employee
    </button>

    <hr className="my-8" />

    <h2 className="text-2xl font-bold mb-4">
      📊 Import Employees from Excel
    </h2>

    <input
      type="file"
      accept=".xlsx,.xls"
      onChange={(e) =>
        setFile(
          e.target.files[0]
        )
      }
      className="border p-3 w-full rounded-lg mb-4"
    />

    <button
      onClick={importExcel}
      className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg w-full"
    >
      Upload Excel
    </button>

    <div className="mt-4 text-sm text-gray-500">

      Excel format:

      <br />

      Name | Email

    </div>

  </div>

</Layout>

);

}

export default AddEmployee;