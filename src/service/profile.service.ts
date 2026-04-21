const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export async function uploadAvatar(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("avatar", file);

  const response = await fetch(`${API_URL}/users/avatar`, {
    method: "PUT",
    credentials: "include",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to upload avatar");
  }

  const rawRes = await response.json();
  // Expecting { data: { profile_pic_url: string } }
  return rawRes.data?.profile_pic_url || "";
}
