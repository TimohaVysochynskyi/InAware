import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./widgets";

const HomePage = lazy(() => import("./pages/HomePage"));
const AuthPage = lazy(() => import("./pages/AuthPage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));

const App = () => {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route
              path="/auth"
              element={<Navigate to="/auth/login" replace />}
            />

            {/* mode зчитується через useParams в AuthPage */}
            <Route path="/auth/:mode" element={<AuthPage />} />
          </Routes>
        </Layout>
      </Suspense>
    </>
  );
};

export default App;
