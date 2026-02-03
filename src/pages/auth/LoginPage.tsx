import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import LoginForm from "../../components/auth/LoginForm";
import { useAuth } from "../../context/AuthContext";

const LoginPage = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && user) {
      navigate("/notes", { replace: true });
    }
  }, [user, loading, navigate]);

  return (
    <>
      <LoginForm />
      <p className="mt-4 text-center text-xs text-slate-400">
        Don&apos;t have an account?{" "}
        <Link
          to="/signup"
          className="font-medium text-blue-400 hover:text-blue-300"
        >
          Sign up
        </Link>
      </p>
    </>
  );
};

export default LoginPage;