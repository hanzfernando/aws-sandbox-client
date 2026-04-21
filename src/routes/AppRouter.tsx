import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import NotesPage from "../pages/notes/NotesPage";
import LoginPage from "../pages/auth/LoginPage";
import SignupPage from "../pages/auth/SignupPage";
import ProtectedRoute from "./ProtectedRoute";
import AuthLayout from "../layouts/AuthLayout";
import MainLayout from "../layouts/MainLayout";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route
        index
        element={(
          <AuthLayout
            title="Welcome back"
            subtitle="Sign in to access your AWS sandbox notes."
          >
            <LoginPage />
          </AuthLayout>
        )}
      />
      <Route
        path="signup"
        element={(
          <AuthLayout
            title="Create your account"
            subtitle="Sign up to start saving and managing your notes."
          >
            <SignupPage />
          </AuthLayout>
        )}
      />
      <Route
        path="notes"
        element={(
          <ProtectedRoute>
            <MainLayout title="AWS Sandbox Notes">
              <NotesPage />
            </MainLayout>
          </ProtectedRoute>
        )}
      />
    </Route>
  )
);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
