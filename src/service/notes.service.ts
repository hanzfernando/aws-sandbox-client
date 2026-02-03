import type { CreateNoteRequest, Note, UpdateNoteRequest } from "../types/notes.type";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

function parseListResponse(raw: any): Note[] {
  if (Array.isArray(raw?.data)) {
    return raw.data as Note[];
  }
  if (Array.isArray(raw)) {
    return raw as Note[];
  }
  if (Array.isArray(raw?.data?.notes)) {
    return raw.data.notes as Note[];
  }
  return [];
}

function parseSingleResponse(raw: any): Note {
  if (raw?.data?.note) {
    return raw.data.note as Note;
  }
  if (raw?.data) {
    return raw.data as Note;
  }
  return raw as Note;
}

export async function getNotes(): Promise<Note[]> {
  const response = await fetch(`${API_URL}/notes`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch notes");
  }

  const rawRes = await response.json();
  return parseListResponse(rawRes);
}

export async function getNoteById(id: string): Promise<Note> {
  const response = await fetch(`${API_URL}/notes/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch note");
  }

  const rawRes = await response.json();
  return parseSingleResponse(rawRes);
}

export async function createNote(payload: CreateNoteRequest): Promise<Note> {
  const response = await fetch(`${API_URL}/notes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Failed to create note");
  }

  const rawRes = await response.json();
  return parseSingleResponse(rawRes);
}

export async function updateNote(id: string, payload: UpdateNoteRequest): Promise<Note> {
  const response = await fetch(`${API_URL}/notes/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Failed to update note");
  }

  const rawRes = await response.json();
  return parseSingleResponse(rawRes);
}

export async function deleteNote(id: string): Promise<void> {
  const response = await fetch(`${API_URL}/notes/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to delete note");
  }
}
