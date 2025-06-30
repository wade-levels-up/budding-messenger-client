import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../ui/Button";

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
              No account? <Button text="Sign up" href="/sign-up" />
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
          {email && password.length >= 8 && (
            <li className="flex justify-center">
              <Button text="Submit" type="submit" />
            </li>
          )}
        </ul>
      </fieldset>
    </form>
  );
};

export default SignIn;
