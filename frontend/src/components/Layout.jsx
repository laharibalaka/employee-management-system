import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Layout({ children }) {
const navigate = useNavigate();

const role = localStorage.getItem("role");
const name = localStorage.getItem("name");

const [time, setTime] = useState("");
const [showNotifications, setShowNotifications] =
useState(false);

const [notifications, setNotifications] =
useState([]);
const [darkMode, setDarkMode] = useState(
  localStorage.getItem("theme") === "dark"
);
const [sidebarOpen, setSidebarOpen] =
  useState(false);


useEffect(() => {
const timer = setInterval(() => {
setTime(
new Date().toLocaleTimeString()
);
}, 1000);


const loadNotifications = async () => {
 
  try {
    const res = await fetch(
      "http://localhost:5000/api/leave/all"
    );

    const data = await res.json();

    const pending = data.filter(
      (leave) =>
        leave.status === "Pending"
    );

    setNotifications(pending);
  } catch (err) {
    console.log(err);
  }
};

if (role === "admin") {
  loadNotifications();
}

return () =>
  clearInterval(timer);


}, [role]);

const logout = () => {
localStorage.clear();
navigate("/");
};
const toggleTheme = () => {

  const newTheme = !darkMode;

  setDarkMode(newTheme);

  localStorage.setItem(
    "theme",
    newTheme ? "dark" : "light"
  );

};

return (

<div
  className={`flex h-screen ${
    darkMode
      ? "bg-slate-900 text-white"
      : "bg-slate-100"
  }`}
>


  {/* Sidebar */}
<div
  className={`
    fixed md:static
    z-50
    h-full
    w-72
    bg-slate-900
    text-white
    flex
    flex-col
    transition-transform
    duration-300
    ${
      sidebarOpen
        ? "translate-x-0"
        : "-translate-x-full md:translate-x-0"
    }
  `}
>

    <div className="p-6 border-b border-slate-700">

      <h1 className="text-3xl font-bold">
        🏢 EMS PRO
      </h1>

      <p className="text-gray-400 mt-2">
        Employee Management System
      </p>

    </div>

    <div className="flex-1 p-5">

      <ul className="space-y-2">

        {/* Dashboard */}

        <li
          onClick={() => {
  navigate(
    role === "admin"
      ? "/admin"
      : role === "hr"
      ? "/hr"
      : "/employee"
  );
  setSidebarOpen(false);
}}
          className="p-3 rounded-lg hover:bg-slate-800 cursor-pointer"
        >
          📊 Dashboard
        </li>

       {/* Admin Menu */}

{role === "admin" && (
  <>
  <li
  onClick={() => {
    navigate("/add");
    setSidebarOpen(false);
  }}
  className="p-3 rounded-lg hover:bg-slate-800 cursor-pointer"
>
  ➕ Add Employee
</li>

    <li
      onClick={() => {
  navigate("/add-hr");
  setSidebarOpen(false);
}}
      className="p-3 rounded-lg hover:bg-slate-800 cursor-pointer"
    >
      👨‍💼 Add HR
    </li>

   <li
  onClick={() => {
    navigate("/employees");
    setSidebarOpen(false);
  }}
  className="p-3 rounded-lg hover:bg-slate-800 cursor-pointer"
>
  👥 Employees
</li>

    <li
    onClick={() => {
  navigate("/hr-list");
  setSidebarOpen(false);
}}
      className="p-3 rounded-lg hover:bg-slate-800 cursor-pointer"
    >
      📋 HR List
    </li>

    <li

    onClick={() => {
  navigate("/attendance");
  setSidebarOpen(false);
}}  className="p-3 rounded-lg hover:bg-slate-800 cursor-pointer"
    >
      📝 Attendance
    </li>

    <li
    onClick={() => {
  navigate("/attendance-list");
  setSidebarOpen(false);
}}
      className="p-3 rounded-lg hover:bg-slate-800 cursor-pointer"
    >
      📋 Attendance List
    </li>

    <li
     onClick={() => {
  navigate("/leave-list");
  setSidebarOpen(false);
}}
      className="p-3 rounded-lg hover:bg-slate-800 cursor-pointer"
    >
      📅 Leave Approval
    </li>

    <li
    onClick={() => {
  navigate("/salary");
  setSidebarOpen(false);
}}
      className="p-3 rounded-lg hover:bg-slate-800 cursor-pointer"
    >
      💰 Salary
    </li>

    <li
     onClick={() => {
  navigate("/salarylist");
  setSidebarOpen(false);
}}
      className="p-3 rounded-lg hover:bg-slate-800 cursor-pointer"
    >
      💵 Salary List
    </li>

    <li
     onClick={() => {
  navigate("/chart");
  setSidebarOpen(false);
}}
      className="p-3 rounded-lg hover:bg-slate-800 cursor-pointer"
    >
      📈 Analytics
    </li>
  </>
)}

        {/* HR Menu */}

        {role === "hr" && (
          <>
            <li
              onClick={() =>
                navigate("/employees")
              }
              className="p-3 rounded-lg hover:bg-slate-800 cursor-pointer"
            >
              👥 Employees
            </li>

            <li
              onClick={() =>
                navigate("/attendance")
              }
              className="p-3 rounded-lg hover:bg-slate-800 cursor-pointer"
            >
              📝 Attendance
            </li>

            <li
              onClick={() =>
                navigate("/leave-list")
              }
              className="p-3 rounded-lg hover:bg-slate-800 cursor-pointer"
            >
              📅 Leave Requests
            </li>
          </>
        )}

     {/* Employee Menu */}

{role === "employee" && (
  <>
    <li
      onClick={() => navigate("/leave")}
      className="p-3 rounded-lg hover:bg-slate-800 cursor-pointer"
    >
      📝 Apply Leave
    </li>

    <li
      onClick={() => navigate("/my-leaves")}
      className="p-3 rounded-lg hover:bg-slate-800 cursor-pointer"
    >
      📅 My Leaves
    </li>

    <li
      onClick={() => navigate("/my-salary")}
      className="p-3 rounded-lg hover:bg-slate-800 cursor-pointer"
    >
      💰 My Salary
    </li>

    <li
      onClick={() => navigate("/profile")}
      className="p-3 rounded-lg hover:bg-slate-800 cursor-pointer"
    >
      👤 Profile
    </li>
    <li
  onClick={() =>
    navigate("/my-attendance")
  }
  className="p-3 rounded-lg hover:bg-slate-800 cursor-pointer"
>
  📝 My Attendance
</li>
  </>
)}

<li
  onClick={logout}
  className="p-3 rounded-lg bg-red-500 hover:bg-red-600 cursor-pointer mt-8"
>
  🚪 Logout
</li>

      </ul>

    </div>

  </div>

  {/* Main Content */}

<div className="flex-1 flex flex-col w-full">

    {/* Navbar */}

   <div
  className={`shadow-md p-4 flex justify-between items-center ${
    darkMode
      ? "bg-slate-800 text-white"
      : "bg-white"
  }`}
>
  <button
  onClick={() =>
    setSidebarOpen(!sidebarOpen)
  }
  className="md:hidden text-2xl"
>
  ☰
</button>

      <div>

        <h1 className="text-xl font-bold">
          Welcome, {name}
        </h1>

        <p className="text-gray-500 text-sm">
          Role : {role}
        </p>

      </div>

      <div className="flex items-center gap-6">
        <button
  onClick={toggleTheme}
  className="px-4 py-2 rounded-lg bg-slate-700 text-white"
>
  {darkMode ? "☀️ Light" : "🌙 Dark"}
</button>

        <div className="text-right">

          <p className="font-semibold">
            🕒 {time}
          </p>

          <p className="text-sm text-gray-500">
            {new Date().toLocaleDateString()}
          </p>

        </div>

        {role === "admin" && (
          <div className="relative">

            <div
              className="relative cursor-pointer"
              onClick={() =>
                setShowNotifications(
                  !showNotifications
                )
              }
            >
             <span className="text-2xl animate-bounce">
  🔔
</span>

              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 rounded-full">
                {notifications.length}
              </span>
            </div>

            {showNotifications && (
              <div className="absolute right-0 mt-3 w-80 bg-white shadow-xl rounded-xl border z-50">

                <div className="p-4 border-b">

                  <div className="flex justify-between items-center">

<div className="flex justify-between items-center">

  <h3 className="font-bold text-lg">
    🔔 Notifications
  </h3>

  <button
    onClick={() =>
      setShowNotifications(false)
    }
    className="text-red-500 text-lg font-bold"
  >
    ✖
  </button>

</div>


  <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
    {notifications.length}
  </span>

</div>


                </div>

                <div className="p-4 space-y-3 max-h-72 overflow-y-auto">

                  {notifications.length === 0 ? (
                   <div className="text-center py-6">

  <div className="text-4xl mb-2">
    🔔
  </div>

  <p className="text-gray-500">
    No New Notifications
  </p>

</div>
                  ) : (
                    notifications.map(
                      (leave) => (
                        <div
                          key={leave._id}
                          className="border-b pb-2"
                        >
                        <div className="flex items-start gap-3">

  <div className="text-2xl">
    📅
  </div>

  <div>

    <p className="font-semibold">
      Leave Request
    </p>

    <p className="text-sm">
      {leave.name} applied leave
    </p>

    <p className="text-xs text-gray-400">
      {leave.reason}
    </p>

  </div>

</div>
                        </div>
                      )
                    )
                  )}

                </div>

              </div>
            )}

          </div>
        )}

      </div>

    </div>

    {/* Page Content */}

    <div className="flex-1 p-6 overflow-auto">

      {children}

    </div>

  </div>

</div>

);
}

export default Layout;
