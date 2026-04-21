import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import SignupForm from "../../components/auth/SignupForm";
import { useAuth } from "../../context/AuthContext";

const SignupPage = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && user) {
      navigate("/notes", { replace: true });
    }
  }, [user, loading, navigate]);

  return (
    <>
      <SignupForm />
      <p className="mt-4 text-center text-xs text-slate-400">
        Already have an account?{" "}
        <Link
          to="/"
          className="font-medium text-blue-400 hover:text-blue-300"
        >
          Sign in
        </Link>
      </p>
    </>
  );
};

export default SignupPage;