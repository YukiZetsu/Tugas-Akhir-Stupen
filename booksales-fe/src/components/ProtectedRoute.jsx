import { Navigate, Outlet } from "react-router-dom";
import { userDecodeToken } from "../_service/auth";

export default function ProtectedRoute({ allowedRoles }) {
  const token = localStorage.getItem("accessToken");
  const userInfoStr = localStorage.getItem("userInfo");

  // 1. Jika tidak ada token atau data user di localStorage, tendang ke Login
  if (!token || !userInfoStr) {
    return <Navigate to="/login" replace />;
  }

  const userInfo = JSON.parse(userInfoStr);
  const decodedData = userDecodeToken(token);

  // 2. Jika token sudah expired/tidak valid, hapus sisa data dan tendang ke Login
  if (!decodedData || !decodedData.success) {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userInfo");
    return <Navigate to="/login" replace />;
  }

  // 3. Pengecekan Hak Akses (Role-Based Access)
  if (allowedRoles && !allowedRoles.includes(userInfo.role)) {
    alert("Akses Ditolak: Halaman ini khusus Administrator.");
    return <Navigate to="/" replace />;
  }

  // Jika semua pengecekan aman, silakan masuk ke halaman tujuan (<Outlet />)
  return <Outlet />;
}
