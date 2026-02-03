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

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<LoginPage />} />
      <Route path="signup" element={<SignupPage />} />
      <Route
        path="notes"
        element={(
          <ProtectedRoute>
            <NotesPage />
          </ProtectedRoute>
        )}
      />
    </Route>
  )
);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
