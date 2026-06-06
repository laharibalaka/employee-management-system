import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login({ role }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] =
    useState(false);

  const navigate = useNavigate();

  const roleTitle = {
    admin: "👑 Admin Login",
    hr: "👨‍💼 HR Login",
    employee: "👨‍💻 Employee Login",
  };

  const handleSubmit = async (e) => {

    e.preventDefault();
    console.log("Email:", email);
console.log("Password:", password);

    try {

      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        }
      );

      if (res.data.role !== role) {

        alert(
          `Please login using ${role} account`
        );

        return;

      }

      localStorage.setItem(
        "token",
        res.data.token
      );

      localStorage.setItem(
        "role",
        res.data.role
      );

      localStorage.setItem(
        "userId",
        res.data.id
      );

      localStorage.setItem(
        "name",
        res.data.name
      );

      localStorage.setItem(
        "email",
        res.data.email
      );

      if (res.data.role === "admin") {

        navigate("/admin", {
          replace: true,
        });

      } else if (
        res.data.role === "hr"
      ) {

        navigate("/hr", {
          replace: true,
        });

      } else {

        navigate("/employee", {
          replace: true,
        });

      }

    } catch (err) {

      console.log(err);

      alert("Login Failed");

    }

  };

  return (

    <div className="min-h-screen flex">

      {/* Left Side */}

      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-blue-600 to-indigo-700 text-white flex-col justify-center px-16">

        <h1 className="text-5xl font-bold mb-6">
          Employee Management System
        </h1>

        <p className="text-lg mb-10">
          Smart HRMS platform for managing
          employees, attendance, leave requests
          and salaries.
        </p>

        <div className="space-y-4 text-lg">

          <div>
            ✅ Employee Management
          </div>

          <div>
            ✅ Attendance Tracking
          </div>

          <div>
            ✅ Leave Approval Workflow
          </div>

          <div>
            ✅ Salary Management
          </div>

          <div>
            ✅ Analytics Dashboard
          </div>

        </div>

      </div>

      {/* Right Side */}

      <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-100">

        <div className="bg-white shadow-2xl rounded-2xl p-10 w-[420px]">

          <h2 className="text-4xl font-bold text-center mb-2">
            {roleTitle[role]}
          </h2>

          <p className="text-center text-gray-500 mb-8">
            Login to continue to your portal
          </p>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            <input
              type="email"
              placeholder="Email Address"
              className="w-full border p-3 rounded-lg"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              required
            />

            <div>

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                placeholder="Password"
                className="w-full border p-3 rounded-lg"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                required
              />

              <div className="mt-2">

                <label className="text-sm">

                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={showPassword}
                    onChange={() =>
                      setShowPassword(
                        !showPassword
                      )
                    }
                  />

                  Show Password

                </label>

              </div>

            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg font-semibold"
            >
              Login
            </button>

            <div className="text-center">

              <button
                type="button"
                onClick={() =>
                  navigate(
                    "/forgot-password"
                  )
                }
                className="text-blue-600 hover:underline"
              >
                Forgot Password?
              </button>

            </div>

          </form>

          <div className="mt-6 text-center text-sm text-gray-500">

            Employee Management System © 2026

          </div>

        </div>

      </div>

    </div>

  );

}

export default Login;