import { useNavigate } from "react-router-dom";

function RoleSelection() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-950 overflow-hidden relative">

      {/* Background Effects */}

      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-600 opacity-20 blur-[150px] rounded-full"></div>

      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-600 opacity-20 blur-[150px] rounded-full"></div>

      {/* Main Container */}

      <div className="relative z-10 min-h-screen flex items-center justify-center px-8">

        <div className="max-w-7xl w-full grid lg:grid-cols-2 gap-10 items-center">

          {/* Left Side */}

          <div>

            {/* Logo */}

            <div className="flex items-center gap-4 mb-10">

              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-3xl shadow-xl">
                👥
              </div>

              <div>
                <h1 className="text-4xl font-bold text-white">
                  EMS PRO
                </h1>

                <p className="text-gray-400">
                  Employee Management System
                </p>
              </div>

            </div>

            {/* Heading */}

            <h2 className="text-6xl font-bold text-white leading-tight">

              Smart Management
              <br />

              <span className="text-yellow-400">
                Better Workplace
              </span>

            </h2>

            <p className="text-gray-300 text-xl mt-8 leading-relaxed max-w-xl">

              Complete HRMS solution to manage employees,
              attendance, leave requests, salaries and
              analytics all in one platform.

            </p>

            {/* Features */}

            <div className="grid grid-cols-2 gap-4 mt-10">

              <div className="bg-white/5 border border-white/10 p-4 rounded-2xl text-white">
                👥 Employee Management
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-2xl text-white">
                📝 Attendance Tracking
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-2xl text-white">
                📅 Leave Management
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-2xl text-white">
                💰 Payroll Management
              </div>

            </div>

          </div>

          {/* Right Side */}

          <div className="bg-white rounded-[40px] shadow-2xl p-10">

            <div className="text-center mb-10">

              <div className="text-5xl mb-4">
                🔐
              </div>

              <h2 className="text-4xl font-bold text-slate-800">
                Welcome to EMS PRO
              </h2>

              <p className="text-gray-500 mt-3">
                Please choose your portal to continue
              </p>

            </div>

            <div className="space-y-5">

              {/* Admin */}

              <div
                onClick={() => navigate("/admin-login")}
                className="cursor-pointer border border-red-200 bg-red-50 rounded-3xl p-6 hover:scale-105 transition-all duration-300"
              >

                <div className="flex justify-between items-center">

                  <div>

                    <h3 className="text-2xl font-bold text-red-600">
                      👑 Admin Login
                    </h3>

                    <p className="text-gray-600 mt-2">
                      Full access to system management
                    </p>

                  </div>

                  <div className="text-3xl">
                    ➜
                  </div>

                </div>

              </div>

              {/* HR */}

              <div
                onClick={() => navigate("/hr-login")}
                className="cursor-pointer border border-green-200 bg-green-50 rounded-3xl p-6 hover:scale-105 transition-all duration-300"
              >

                <div className="flex justify-between items-center">

                  <div>

                    <h3 className="text-2xl font-bold text-green-600">
                      👨‍💼 HR Login
                    </h3>

                    <p className="text-gray-600 mt-2">
                      Manage employees and attendance
                    </p>

                  </div>

                  <div className="text-3xl">
                    ➜
                  </div>

                </div>

              </div>

              {/* Employee */}

              <div
                onClick={() => navigate("/employee-login")}
                className="cursor-pointer border border-blue-200 bg-blue-50 rounded-3xl p-6 hover:scale-105 transition-all duration-300"
              >

                <div className="flex justify-between items-center">

                  <div>

                    <h3 className="text-2xl font-bold text-blue-600">
                      👨‍💻 Employee Login
                    </h3>

                    <p className="text-gray-600 mt-2">
                      View profile, leave and salary
                    </p>

                  </div>

                  <div className="text-3xl">
                    ➜
                  </div>

                </div>

              </div>

            </div>

            <div className="mt-10 text-center text-gray-500">

              Employee Management System © 2026

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default RoleSelection;