import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleFormInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await fetch("http://localhost:3000/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email, password: password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      setError(`${errorData.message}`);
      return;
    }

    navigate("/dashboard");
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className="flex flex-col shadow-xl outline-2 outline-solid outline-lime-300 justify-center items-center max-w-full p-4 rounded-xl m-4"
    >
      <fieldset>
        <legend className="text-center text-2xl p-3 mb-4">Sign in</legend>
        <ul className="flex flex-col gap-2">
          <li>
            <p className="text-center">
              No account?{" "}
              <button
                type="button"
                onClick={() => navigate("/sign-up")}
                className="bg-lime-600 hover:bg-lime-500 hover:cursor-pointer pl-2 pr-2 pb-1 text-white rounded-lg mb-2"
              >
                Sign Up
              </button>{" "}
              here.
            </p>
          </li>
          <li>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              className="p-2 rounded-lg mb-4 mt-2 bg-white w-full"
              value={email}
              onChange={handleFormInput}
            />
          </li>
          <li>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              className="p-2 rounded-lg mb-4 mt-2 bg-white w-full"
              value={password}
              onChange={handleFormInput}
            />
          </li>
          {error && (
            <li className="mb-2 bg-red-400 p-2 rounded">
              <p className="text-center text-pretty">
                <span>Error:</span> {error}
              </p>
            </li>
          )}
          <li className="flex justify-center">
            <button
              type="submit"
              className="bg-lime-600 hover:bg-lime-500 hover:cursor-pointer pl-2 pr-2 pb-1 text-white rounded-lg mb-2"
            >
              Submit
            </button>
          </li>
        </ul>
      </fieldset>
    </form>
  );
};

export default SignIn;
