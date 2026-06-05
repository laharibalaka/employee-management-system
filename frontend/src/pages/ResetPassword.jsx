import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

function ResetPassword() {

  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");

  const [searchParams] =
    useSearchParams();

  const email =
    searchParams.get("email");

  const resetPassword = async () => {

    try {

      await axios.post(
        "http://localhost:5000/api/auth/reset-password",
        {
          email,
          otp,
          password,
        }
      );

      alert(
        "Password Reset Successfully"
      );

    } catch (err) {

      console.log(err);

      alert("Invalid OTP");

    }

  };

  return (

    <div className="min-h-screen flex justify-center items-center bg-gray-100">

      <div className="bg-white p-8 rounded-xl shadow-lg w-[450px]">

        <h1 className="text-3xl font-bold mb-5">
          Reset Password
        </h1>

        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) =>
            setOtp(e.target.value)
          }
          className="border p-3 w-full mb-4 rounded"
        />

        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          className="border p-3 w-full mb-4 rounded"
        />

        <button
          onClick={resetPassword}
          className="bg-blue-600 text-white px-5 py-3 rounded w-full"
        >
          Reset Password
        </button>

      </div>

    </div>

  );

}

export default ResetPassword;