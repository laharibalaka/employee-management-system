import Layout from "../components/Layout";
import { useState } from "react";
import axios from "axios";

function AddHR() {

const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] =
useState("");

const [file, setFile] =
useState(null);

const addHR = async () => {


try {

  await axios.post(
    "https://employee-management-system-5fj7.onrender.com/api/auth/register",
    {
      name,
      email,
      password,
      role: "hr",
    }
  );

  alert("HR Added Successfully");

  setName("");
  setEmail("");
  setPassword("");

} catch (err) {

  console.log(err);

  alert("Error");

}


};

const importHRs = async () => {


if (!file) {

  alert("Please Select Excel File");
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

      "https://employee-management-system-5fj7.onrender.com/api/auth/import-hrs",

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
    "HR Import Failed"
  );

}


};

return (


<Layout>

  <div className="bg-white p-8 rounded-2xl shadow-lg max-w-xl">

    <h1 className="text-3xl font-bold mb-6">
      👨‍💼 Add HR
    </h1>

    <input
      type="text"
      placeholder="HR Name"
      value={name}
      onChange={(e) =>
        setName(e.target.value)
      }
      className="border p-3 w-full mb-4 rounded-lg"
    />

    <input
      type="email"
      placeholder="HR Email"
      value={email}
      onChange={(e) =>
        setEmail(e.target.value)
      }
      className="border p-3 w-full mb-4 rounded-lg"
    />

    <input
      type="password"
      placeholder="Password"
      value={password}
      onChange={(e) =>
        setPassword(e.target.value)
      }
      className="border p-3 w-full mb-4 rounded-lg"
    />

    <button
      onClick={addHR}
      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg w-full"
    >
      Add HR
    </button>

    <hr className="my-8" />

    <h2 className="text-2xl font-bold mb-4">
      📊 Import HRs from Excel
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
      onClick={importHRs}
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

export default AddHR;
