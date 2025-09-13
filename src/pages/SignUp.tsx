import { useState } from "react";
import { useSignup } from "../queries/auth";
import type { AxiosError, AxiosResponse } from "axios";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";


export default function SignUpPage() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();
    const { login } = useAuth()

    const handleSignUp = () => {
        useSignup({
            username: username,
            email: email,
            password: password
        })
            .then((data: AxiosResponse) => {
                const user = data.data.user || {
                    username: data.data.username,
                    email: data.data.email
                };
                login(user, data.data.access_token, data.data.refresh_token)
                navigate('/home')
            })
            .catch((error: AxiosError) => {
                console.error(error)
            })
    }

    return (
        <div className="min-h-screen w-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700">
            <div className="bg-[#1f1f1f] p-10 rounded-2xl shadow-xl w-[500px] flex flex-col items-center gap-6">
                <h1 className="text-4xl font-bold text-white font-[Pacifico]">
                    HiveTalk
                </h1>

                <p className="text-gray-300 text-center">
                    Create your account and join the community
                </p>

                <input
                    type="text"
                    placeholder="Username"
                    className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400 transition"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

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

                <input
                    type="password"
                    placeholder="Confirm Password"
                    className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400 transition"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />

                <button className="w-full py-3 bg-amber-500 hover:bg-amber-600 rounded-lg font-semibold text-gray-900 transition" onClick={handleSignUp}>
                    Sign Up
                </button>

                <p className="text-gray-400 text-sm">
                    Already have an account? <span className="text-amber-400 cursor-pointer" onClick={() => navigate('/login')}>Login</span>
                </p>
            </div>
        </div>
    );
}
