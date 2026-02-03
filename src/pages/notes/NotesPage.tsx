import LogoutButton from "../../components/auth/LogoutButton";
import { useAuth } from "../../context/AuthContext";

const NotesPage = () => {
  const { user } = useAuth();

  console.log("NotesPage rendered with user:", user);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="flex items-center justify-between border-b border-slate-800 px-6 py-4 bg-slate-950/80 backdrop-blur">
        <div>
          <h1 className="text-lg font-semibold tracking-tight">AWS Sandbox Notes</h1>
          {user ? (
            <p className="text-xs text-slate-400">Signed in as {user.name}</p>
          ) : null}
        </div>
        <LogoutButton />
      </header>

      <main className="p-6">
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 text-sm text-slate-300">
          NotesPage content goes here.
        </div>
      </main>
    </div>
  );
};

export default NotesPage;