import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import RoleSelection from "./pages/RoleSelection";

import AdminDashboard from "./pages/AdminDashboard";
import HRDashboard from "./pages/HRDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";

import AddEmployee from "./pages/AddEmployee";
import Employees from "./pages/Employees";
import EditEmployee from "./pages/EditEmployee";

import Attendance from "./pages/Attendance";
import AttendanceList from "./pages/AttendanceList";
import MyAttendance from "./pages/MyAttendance";

import Leave from "./pages/Leave";
import LeaveList from "./pages/LeaveList";
import MyLeaves from "./pages/MyLeaves";

import AddSalary from "./pages/AddSalary";
import SalaryList from "./pages/SalaryList";
import MySalary from "./pages/MySalary";

import ChartPage from "./pages/ChartPage";
import Profile from "./pages/Profile";

import ProtectedRoute from "./components/ProtectedRoute";
import AddHR from "./pages/AddHR";
import HRList from "./pages/HRList";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

function App() {
  return (
    <Routes>

      {/* Role Selection */}
      <Route
        path="/"
        element={<RoleSelection />}
      />

      {/* Login Pages */}
      <Route
        path="/admin-login"
        element={<Login role="admin" />}
      />

      <Route
        path="/hr-login"
        element={<Login role="hr" />}
      />

      <Route
        path="/employee-login"
        element={<Login role="employee" />}
      />

<Route
  path="/forgot-password"
  element={<ForgotPassword />}
/>

<Route
  path="/reset-password"
  element={<ResetPassword />}
/>
      {/* Admin Dashboard */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute role="admin">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      {/* HR Dashboard */}
      <Route
        path="/hr"
        element={
          <ProtectedRoute role="hr">
            <HRDashboard />
          </ProtectedRoute>
        }
      />

      {/* Employee Dashboard */}
      <Route
        path="/employee"
        element={
          <ProtectedRoute role="employee">
            <EmployeeDashboard />
          </ProtectedRoute>
        }
      />

      {/* Employees */}
      <Route
        path="/add"
        element={
          <ProtectedRoute role="admin">
            <AddEmployee />
          </ProtectedRoute>
        }
      />

      <Route
        path="/employees"
        element={<Employees />}
      />

      <Route
        path="/edit/:id"
        element={
          <ProtectedRoute role="admin">
            <EditEmployee />
          </ProtectedRoute>
        }
      />

      {/* Attendance */}
      <Route
        path="/attendance"
        element={<Attendance />}
      />

      <Route
        path="/attendance-list"
        element={
          <ProtectedRoute role="admin">
            <AttendanceList />
          </ProtectedRoute>
        }
      />

      <Route
        path="/my-attendance"
        element={
          <ProtectedRoute role="employee">
            <MyAttendance />
          </ProtectedRoute>
        }
      />

      {/* Leave */}
      <Route
        path="/leave"
        element={
          <ProtectedRoute role="employee">
            <Leave />
          </ProtectedRoute>
        }
      />

      <Route
        path="/leave-list"
        element={<LeaveList />}
      />

      <Route
        path="/my-leaves"
        element={
          <ProtectedRoute role="employee">
            <MyLeaves />
          </ProtectedRoute>
        }
      />

      {/* Salary */}
      <Route
        path="/salary"
        element={
          <ProtectedRoute role="admin">
            <AddSalary />
          </ProtectedRoute>
        }
      />

      <Route
        path="/salarylist"
        element={
          <ProtectedRoute role="admin">
            <SalaryList />
          </ProtectedRoute>
        }
      />

      <Route
        path="/my-salary"
        element={
          <ProtectedRoute role="employee">
            <MySalary />
          </ProtectedRoute>
        }
      />

      {/* Analytics */}
      <Route
        path="/chart"
        element={
          <ProtectedRoute role="admin">
            <ChartPage />
          </ProtectedRoute>
        }
      />

      {/* Profile */}
      <Route
        path="/profile"
        element={
          <ProtectedRoute role="employee">
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
  path="/add-hr"
  element={
    <ProtectedRoute role="admin">
      <AddHR />
    </ProtectedRoute>
  }
/>

<Route
  path="/hr-list"
  element={
    <ProtectedRoute role="admin">
      <HRList />
    </ProtectedRoute>
  }
/>

    </Routes>
  );
}

export default App;