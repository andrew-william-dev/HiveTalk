import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700">
      <div className="bg-[#1f1f1f] p-10 rounded-2xl shadow-xl w-[500px] flex flex-col items-center gap-6">
        <h1 className="text-4xl font-bold text-white font-[Pacifico]">
          HiveTalk
        </h1>

        <p className="text-gray-300 text-center">
          Welcome back! Login to your account
        </p>

        <input
          type="email"
          placeholder="Email"
          className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400 transition"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400 transition"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full py-3 bg-amber-500 hover:bg-amber-600 rounded-lg font-semibold text-gray-900 transition">
          Login
        </button>

        <p className="text-gray-400 text-sm">
          Don't have an account? <span className="text-amber-400 cursor-pointer" onClick={() => location.href='/signup'}>Sign Up</span>
        </p>
      </div>
    </div>
  );
}
