import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./widgets";

const HomePage = lazy(() => import("./pages/HomePage"));
const LaboratoryPage = lazy(() => import("./pages/LaboratoryPage"));
const AuthPage = lazy(() => import("./pages/AuthPage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));

const App = () => {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {/* сторінки з хедером і футером */}
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route
              path="/auth"
              element={<Navigate to="/auth/login" replace />}
            />

            {/* mode зчитується через useParams в AuthPage */}
            <Route path="/auth/:mode" element={<AuthPage />} />
          </Route>

          {/* сторінки без спільного Layout */}
          <Route path="/lab" element={<LaboratoryPage />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default App;
