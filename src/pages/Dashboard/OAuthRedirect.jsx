import { useEffect, useContext } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import axiosInstance from "../../utils/axiosInstance";

const OAuthRedirect = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);

      axiosInstance
        .get("/auth/user", { withCredentials: true })
        .then((res) => {
          updateUser(res.data);
          navigate("/dashboard");
        })
        .catch(() => {
          navigate("/login");
        });
    } else {
      navigate("/login");
    }
  }, [token]);

  return <p>Logging in...</p>;
};

export default OAuthRedirect;
