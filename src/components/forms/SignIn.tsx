import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../ui/Button";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleFormInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email, password: password }),
      });

      if (!response.ok) {
        setError("Unable to sign in. Please try again later.");
        return;
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    } catch {
      setError("Unable to sign in. Please try again later.");
    }
  };

  return (
    <>
      <form
        onSubmit={handleFormSubmit}
        className="flex flex-col shadow-xl outline-2 outline-solid outline-lime-300 justify-center items-center max-w-lg p-8 rounded-xl m-2"
      >
        <fieldset>
          <legend className="text-center text-2xl p-3 mb-4">Sign in</legend>
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
              <label htmlFor="password">Password:</label>
              <div className="relative flex justify-end items-center mt-2 mb-4">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  className="p-2 pr-14 rounded-lg bg-white w-full"
                  value={password}
                  onChange={handleFormInput}
                />
                <Button
                  func={() => setShowPassword(!showPassword)}
                  icon={showPassword ? "faEye" : "faEyeSlash"}
                  customStyle="bg-lime-600 w-[40px] text-white hover:bg-lime-500 hover:cursor-pointer p-1 pl-2 pr-2 absolute rounded right-1"
                  ariaLabel="Show / Hide Password"
                />
              </div>
            </li>
            {error && (
              <li className="mb-2 bg-red-300 p-1 rounded">
                <p className="text-center text-pretty">{error}</p>
              </li>
            )}
            <li className="flex justify-center">
              <Button text="Submit" type="submit" ariaLabel="Submit" />
            </li>
          </ul>
        </fieldset>
      </form>
      <div className="flex flex-col gap-2">
        <p className="text-center">No account?</p>
        <Button text="Sign up" href="/sign-up" ariaLabel="Sign Up" />
      </div>
    </>
  );
};

export default SignIn;
