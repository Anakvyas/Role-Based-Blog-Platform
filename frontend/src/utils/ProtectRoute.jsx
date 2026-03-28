import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { getAuthenticatedUser } from "./auth";

const ProtectRoute = ({ children }) => {
  const [status, setStatus] = useState("checking");

  useEffect(() => {
    let active = true;

    const checkAuthentication = async () => {
      try {
        await getAuthenticatedUser();
        if (active) {
          setStatus("authenticated");
        }
      } catch (err) {
        if (active) {
          setStatus("unauthenticated");
        }
        console.log(err.message);
        toast.error(err.message || "Please login first");
      }
    };

    checkAuthentication();

    return () => {
      active = false;
    };
  }, []);

  if (status === "checking") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100 text-lg font-semibold text-gray-700">
        Checking authentication...
      </div>
    );
  }

  if (status === "unauthenticated") {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectRoute;
