import { Navigate, useParams } from "react-router-dom";
import { AuthFlow, isAuthMode } from "@/features/auth";

const AuthPage = () => {
  const { mode } = useParams<{ mode?: string }>();

  if (!isAuthMode(mode)) {
    return <Navigate to="/auth/login" replace />;
  }

  return <AuthFlow mode={mode} />;
};

export default AuthPage;
