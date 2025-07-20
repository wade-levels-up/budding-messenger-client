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
  const [showPassword, setShowPassword] = useState(false);

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
      if (!username || !password || !email) {
        errorData.message = "Please fill in all fields";
      }
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
      <Button text="Home" href="/" ariaLabel="Home" />
    </div>
  ) : (
    <>
      <form
        onSubmit={handleFormSubmit}
        className="animate-ghost-drop flex flex-col shadow-xl outline-2 outline-solid outline-lime-300 justify-center items-center max-w-lg p-4 rounded-xl m-2"
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
                minLength={3}
                maxLength={100}
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
                minLength={2}
                maxLength={24}
              />
            </li>
            <li>
              <label htmlFor="password">Password:</label>
              <div className="relative flex justify-end items-center mt-2 mb-4">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  className="p-2 pr-14 rounded-lg bg-white w-full"
                  value={password}
                  onChange={handleFormInput}
                  minLength={8}
                />
                <Button
                  func={() => setShowPassword(!showPassword)}
                  icon={showPassword ? "faEye" : "faEyeSlash"}
                  customStyle="flex justify-center items-center bg-lime-600 w-[40px] text-white hover:bg-lime-500 hover:cursor-pointer p-1 pl-2 pr-2 absolute rounded right-1"
                  ariaLabel="Show / Hide Password"
                />
              </div>
            </li>
            {error && (
              <li className="mb-2 bg-red-300 p-1 rounded">
                <p className="text-center text-pretty">{error}</p>
              </li>
            )}
            <li className="flex justify-evenly">
              <Button text="Submit" type="submit" ariaLabel="Submit" />
            </li>
          </ul>
        </fieldset>
      </form>
      <Button text="Home" href="/" ariaLabel="Home" />
    </>
  );
};

export default SignUp;
