import { useState } from "react";
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
      console.log(data);

      if (!data.Success) {
        throw new Error("Invalid credentials");
      }

      // Store tokens
      localStorage.setItem("accessToken", data.Token);
      localStorage.setItem("refreshToken", data.RefreshToken);
      localStorage.setItem("user", JSON.stringify(data.User));

      // Redirect to dashboard
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <form
          onSubmit={handleLogin}
          className="bg-white p-6 rounded-xl shadow-md w-full max-w-sm space-y-4"
        >
          <h2 className="text-2xl font-semibold text-center">Login</h2>

          {error && <p className="text-red-600 text-sm text-center">{error}</p>}

          <div>
            <label
              htmlFor="UserName"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              name="UserName"
              type="text"
              id="UserName"
              onChange={handleChange}
              value={formData.UserName}
              className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
              required
            />
          </div>

          <div>
            <label
              htmlFor="Password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              name="Password"
              type="password"
              id="Password"
              onChange={handleChange}
              value={formData.Password}
              className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-200"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
