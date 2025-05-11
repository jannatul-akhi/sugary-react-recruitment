import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    UserName: "",
    Password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        "https://sugarytestapi.azurewebsites.net/AdminAccount/Login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();
      if (!data.Success) {
        throw new Error("Invalid credentials");
      }

      localStorage.setItem("accessToken", data.Token);
      localStorage.setItem("refreshToken", data.RefreshToken);
      localStorage.setItem("user", JSON.stringify(data.User));
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden">

      {/* Background image layer */}
      <div className="absolute inset-0 bg-[url('/login-bg.jpg')] bg-cover bg-center z-0" />

      {/* Gradient overlay (now in orange tones) */}
      <div className="absolute inset-0 bg-gradient-to-tr from-orange-600 via-orange-400 to-yellow-300 opacity-80 z-10 animate-gradient" />

      {/* Noise texture overlay */}
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5 pointer-events-none z-20" />

      {/* Login form card */}
      <div className="z-30 w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-2xl animate-fade-in backdrop-blur-md bg-opacity-90">
        <h2 className="text-2xl font-bold text-center text-gray-800">Sign in to your account</h2>

        {error && <p className="text-center text-red-600 text-sm">{error}</p>}

        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label htmlFor="UserName" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              name="UserName"
              type="text"
              id="UserName"
              required
              value={formData.UserName}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Enter your username"
            />
          </div>

          <div>
            <label htmlFor="Password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              name="Password"
              type="password"
              id="Password"
              required
              value={formData.Password}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition"
          >
            {loading ? "Logging in..." : "Sign In"}
          </button>
        </form>

        {/* <p className="text-sm text-center text-gray-600">
          Don't have an account?{" "}
          <a href="#" className="text-orange-500 hover:underline">Sign up</a>
        </p> */}
      </div>
    </div>
  );
};

export default LoginPage;
