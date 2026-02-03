import { useEffect, useState } from "react";
import LogoutButton from "../../components/auth/LogoutButton";
import { useAuth } from "../../context/AuthContext";
import type { Note } from "../../types/notes.type";
import { createNote, deleteNote, getNotes, updateNote } from "../../service/notes.service";

const NotesPage = () => {
  const { user } = useAuth();

  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [deletingNoteId, setDeletingNoteId] = useState<string | null>(null);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getNotes();
        setNotes(data);
      } catch (err) {
        console.error("Failed to load notes", err);
        setError("Failed to load notes. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    void fetchNotes();
  }, []);

  const resetForm = () => {
    setTitle("");
    setContent("");
    setEditingNoteId(null);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!title.trim() || !content.trim()) {
      setError("Title and content are required.");
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);

      if (editingNoteId) {
        const updated = await updateNote(editingNoteId, { title, content });
        setNotes((prev) => prev.map((note) => (note.id === editingNoteId ? updated : note)));
      } else {
        const created = await createNote({ title, content });
        setNotes((prev) => [created, ...prev]);
      }

      resetForm();
    } catch (err) {
      console.error("Failed to save note", err);
      setError("Failed to save note. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (note: Note) => {
    setEditingNoteId(note.id);
    setTitle(note.title ?? "");
    setContent(note.content ?? "");
  };

  const handleCancelEdit = () => {
    resetForm();
  };

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm("Are you sure you want to delete this note?");
    if (!confirmed) return;

    try {
      setDeletingNoteId(id);
      setError(null);
      await deleteNote(id);
      setNotes((prev) => prev.filter((note) => note.id !== id));
    } catch (err) {
      console.error("Failed to delete note", err);
      setError("Failed to delete note. Please try again.");
    } finally {
      setDeletingNoteId(null);
    }
  };

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

      <main className="p-6 max-w-5xl mx-auto">
        <div className="grid gap-6 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1.4fr)]">
          <section className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 animate-fadeIn">
            <h2 className="text-sm font-semibold tracking-tight text-slate-100 mb-4">
              {editingNoteId ? "Edit note" : "Create a new note"}
            </h2>

            {error && (
              <div className="mb-4 rounded border border-red-500/40 bg-red-500/10 px-3 py-2 text-xs text-red-300">
                {error}
              </div>
            )}

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-slate-300" htmlFor="title">
                  Title
                </label>
                <input
                  id="title"
                  type="text"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  placeholder="e.g. IAM sandbox lab"
                  className="w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-slate-300" htmlFor="content">
                  Details
                </label>
                <textarea
                  id="content"
                  value={content}
                  onChange={(event) => setContent(event.target.value)}
                  placeholder="What is this note about?"
                  rows={6}
                  className="w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 resize-y min-h-[140px]"
                />
              </div>

              <div className="flex items-center justify-between gap-3 pt-2">
                {editingNoteId ? (
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    className="text-xs text-slate-400 hover:text-slate-200 transition-colors"
                  >
                    Cancel edit
                  </button>
                ) : (
                  <span className="text-[11px] text-slate-500">
                    Notes are private to your account.
                  </span>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-3 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-blue-500 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Saving..." : editingNoteId ? "Update note" : "Save note"}
                </button>
              </div>
            </form>
          </section>

          <section className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 animate-fadeIn">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold tracking-tight text-slate-100">Your notes</h2>
              {loading && (
                <span className="text-[11px] text-slate-500">Loading...</span>
              )}
            </div>

            {!loading && notes.length === 0 ? (
              <p className="text-xs text-slate-500">
                No notes yet. Create your first note on the left.
              </p>
            ) : (
              <ul className="space-y-3 max-h-[480px] overflow-y-auto pr-1">
                {notes.map((note) => (
                  <li
                    key={note.id}
                    className="group rounded-lg border border-slate-800 bg-slate-900/80 px-3 py-2.5 text-xs text-slate-200 hover:border-slate-700 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="truncate text-[13px] font-medium text-slate-100 mb-1">
                          {note.title || "(Untitled)"}
                        </p>
                        {note.createdAt ? (
                          <p className="text-[10px] text-slate-500 mb-1">
                            Created {new Date(note.createdAt).toLocaleString()}
                          </p>
                        ) : null}
                      </div>

                      <div className="flex flex-shrink-0 items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          type="button"
                          onClick={() => handleEdit(note)}
                          className="rounded px-2 py-1 text-[11px] text-slate-200 hover:bg-slate-800"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(note.id)}
                          disabled={deletingNoteId === note.id}
                          className="rounded px-2 py-1 text-[11px] text-red-300 hover:bg-red-900/40 disabled:opacity-60"
                        >
                          {deletingNoteId === note.id ? "Deleting..." : "Delete"}
                        </button>
                      </div>
                    </div>

                    {note.content ? (
                      <p className="mt-1.5 line-clamp-3 whitespace-pre-line text-[11px] text-slate-300">
                        {note.content}
                      </p>
                    ) : null}
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      </main>
    </div>
  );
};

export default NotesPage;