import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../../service/auth.service";
import { useAuth } from "../../context/AuthContext";

const SignupForm = () => {
	const navigate = useNavigate();
	const { refreshUser } = useAuth();

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [submitting, setSubmitting] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const handleSubmit = async (event: FormEvent) => {
		event.preventDefault();
		setError(null);

		if (!name || !email || !password) {
			setError("Please fill in all fields.");
			return;
		}

		setSubmitting(true);
		try {
			await signup({ name, email, password });
			await refreshUser();
			navigate("/notes", { replace: true });
		} catch (err) {
			const message = err instanceof Error ? err.message : "Signup failed";
			setError(message);
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-5">
			{error ? (
				<div className="rounded-md border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-300">
					{error}
				</div>
			) : null}

			<div className="space-y-1.5">
				<label className="block text-sm font-medium text-slate-200" htmlFor="name">
					Name
				</label>
				<input
					id="name"
					type="text"
					autoComplete="name"
					className="w-full rounded-md border border-white/10 bg-black/30 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
					value={name}
					onChange={(event) => setName(event.target.value)}
					disabled={submitting}
				/>
			</div>

			<div className="space-y-1.5">
				<label className="block text-sm font-medium text-slate-200" htmlFor="email">
					Email
				</label>
				<input
					id="email"
					type="email"
					autoComplete="email"
					className="w-full rounded-md border border-white/10 bg-black/30 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
					value={email}
					onChange={(event) => setEmail(event.target.value)}
					disabled={submitting}
				/>
			</div>

			<div className="space-y-1.5">
				<label className="block text-sm font-medium text-slate-200" htmlFor="password">
					Password
				</label>
				<input
					id="password"
					type="password"
					autoComplete="new-password"
					className="w-full rounded-md border border-white/10 bg-black/30 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
					value={password}
					onChange={(event) => setPassword(event.target.value)}
					disabled={submitting}
				/>
			</div>

			<button
				type="submit"
				disabled={submitting}
				className="inline-flex w-full items-center justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:bg-blue-700/60"
			>
				{submitting ? "Creating account..." : "Create account"}
			</button>
		</form>
	);
};

export default SignupForm;

