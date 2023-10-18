import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@context/AuthContext";

const NotFound = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/search");
    } else {
      navigate("/login");
    }
  }, [navigate, isAuthenticated]);
};
export default NotFound;
