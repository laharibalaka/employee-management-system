import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {

  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const sendOTP = async () => {

    if (!email) {

      alert("Please enter email");
      return;

    }

    try {

      await axios.post(
        "https://employee-management-system-5fj7.onrender.com/api/auth/send-otp",
        {
          email,
        }
      );

      alert("OTP Sent To Your Email");

      navigate(
        `/reset-password?email=${email}`
      );

    } catch (err) {

      console.log(err);

      alert("Failed To Send OTP");

    }

  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-8 rounded-2xl shadow-lg w-[450px]">

        <h1 className="text-3xl font-bold text-center mb-3">
          🔐 Forgot Password
        </h1>

        <p className="text-center text-gray-500 mb-6">
          Enter your registered email
        </p>

        <input
          type="email"
          placeholder="Enter Email Address"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          className="w-full border p-3 rounded-lg mb-5"
        />

        <button
          onClick={sendOTP}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg"
        >
          Send OTP
        </button>

        <button
          onClick={() => navigate(-1)}
          className="w-full mt-3 border p-3 rounded-lg"
        >
          Back To Login
        </button>

      </div>

    </div>

  );

}

export default ForgotPassword;