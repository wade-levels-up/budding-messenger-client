import { useState } from "react";
import Button from "../ui/Button";
import LoadingSpinner from "../ui/LoadingSpinner";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleFormInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "email") setEmail(value);
    if (name === "username") setUsername(value);
    if (name === "password") setPassword(value);
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const response = await fetch("http://localhost:3000/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        username: username,
        password: password,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      setError(`${errorData.message}`);
      setLoading(false);
      return;
    }

    setLoading(false);
    setSubmitted(true);
  };

  return loading ? (
    <LoadingSpinner />
  ) : submitted ? (
    <div className="flex flex-col gap-8 p-4 items-center">
      <h2 className="text-2xl text-left w-full">Success!</h2>
      <p className="text-pretty text-center max-w-[600px] outline-2 outline-solid outline-lime-300 p-4 rounded-xl shadow-xl">
        Please check your inbox or junk folder to verify your account via the
        link before signing in
      </p>
      <p className="text-right w-full">Thank you</p>
      <Button text="Home" href="/" />
    </div>
  ) : (
    <form
      onSubmit={handleFormSubmit}
      className="flex flex-col shadow-xl outline-2 outline-solid outline-lime-300 justify-center items-center max-w-full p-4 rounded-xl m-4"
    >
      <fieldset>
        <legend className="text-center text-2xl p-3 mb-4">Sign up</legend>
        <ul className="flex flex-col gap-2">
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
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              className="p-2 rounded-lg mb-4 mt-2 bg-white w-full"
              value={username}
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
          <li className="flex justify-evenly">
            <Button text="Home" href="/" />
            <Button text="Submit" type="submit" />
          </li>
        </ul>
      </fieldset>
    </form>
  );
};

export default SignUp;
