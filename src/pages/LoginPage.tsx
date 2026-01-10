import { Link, useNavigate } from "react-router";
import { useContext, useState } from "react";
import AuthContext from "../context/AppContext";
function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await login(email, password);
    if (result.success) {
      alert("Login successful!");
      navigate("/");
    } else {
      alert("Login failed: " + result.message);
      console.error(result.message);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-900 to-neutral-900">
      <div className="w-full max-w-md bg-neutral-900/90 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/10">
        <h1 className="text-3xl font-semibold text-center text-amber-50 mb-6">
          Sign in
        </h1>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm text-neutral-400 mb-1">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="
                w-full px-4 py-3 rounded-xl
                bg-neutral-800 text-white
                border border-neutral-700
                focus:outline-none focus:ring-2 focus:ring-amber-700
                transition
              "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm text-neutral-400 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="
                w-full px-4 py-3 rounded-xl
                bg-neutral-800 text-white
                border border-neutral-700
                focus:outline-none focus:ring-2 focus:ring-amber-700
                transition
              "
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="
              w-full mt-6 py-3 rounded-xl
              bg-amber-600 hover:bg-amber-500
              text-black font-semibold
              transition
              shadow-lg shadow-amber-600/30
            "
          >
            Sign in
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-neutral-400">
          Don’t have an account?{" "}
          <span className="text-amber-500 hover:underline cursor-pointer">
            <Link to="/register">Register</Link>
          </span>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
