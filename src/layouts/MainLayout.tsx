import type { ReactNode } from "react";
import LogoutButton from "../components/auth/LogoutButton";
import { useAuth } from "../context/AuthContext";

interface MainLayoutProps {
  title?: string;
  children: ReactNode;
}

const MainLayout = ({ title = "AWS Sandbox", children }: MainLayoutProps) => {
  const { user } = useAuth();
  console.log("MainLayout user:", user);

  const profilePicUrl = user && (user as any).profile_pic_url ? (user as any).profile_pic_url : "/user.png";

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="flex items-center justify-between border-b border-slate-800 px-6 py-4 bg-slate-950/80 backdrop-blur">
        <div className="flex items-center gap-3">
          <img
            src={profilePicUrl}
            alt="Profile"
            className="w-9 h-9 rounded-full border border-slate-700 object-cover bg-slate-800"
            onError={(e) => { (e.currentTarget as HTMLImageElement).src = "/user.png"; }}
          />
          <div>
            <h1 className="text-lg font-semibold tracking-tight">{title}</h1>
            {user ? (
              <p className="text-xs text-slate-400">Signed in as {user.name}</p>
            ) : null}
          </div>
        </div>
        <LogoutButton />
      </header>

      <main className="p-6 max-w-5xl mx-auto">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
