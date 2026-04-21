import { useRef, useState } from "react";

interface AvatarUploadProps {
  currentUrl?: string;
  onUpload: (file: File) => void;
  uploading?: boolean;
}

const AvatarUpload = ({ currentUrl, onUpload, uploading }: AvatarUploadProps) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) {
      setFile(f);
      setPreview(URL.createObjectURL(f));
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    // Pass the File object to parent for upload
    onUpload(file);
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative">
        <img
          src={preview || currentUrl || "/user.png"}
          alt="Avatar preview"
          className="w-20 h-20 rounded-full border border-slate-700 object-cover bg-slate-800"
        />
        <button
          type="button"
          className="absolute bottom-0 right-0 bg-blue-600 text-white rounded-full p-1 text-xs hover:bg-blue-500"
          onClick={() => inputRef.current?.click()}
        >
          Edit
        </button>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
      <button
        type="button"
        className="mt-1 px-3 py-1 rounded bg-blue-600 text-xs text-white hover:bg-blue-500 disabled:opacity-60"
        onClick={handleUpload}
        disabled={!file || uploading}
      >
        {uploading ? "Uploading..." : "Upload Avatar"}
      </button>
    </div>
  );
};

export default AvatarUpload;
