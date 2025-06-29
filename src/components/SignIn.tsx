const SignIn = () => {
  return (
    <form className="flex flex-col outline-2 outline-solid outline-lime-300 justify-center items-center max-w-full p-4 rounded-xl m-4">
      <fieldset>
        <legend className="text-center text-xl p-3">Sign in</legend>
        <ul>
          <li>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              className="p-2 rounded-lg mb-4 mt-2 bg-white w-full"
            />
          </li>
          <li>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              className="p-2 rounded-lg mb-4 mt-2 bg-white w-full"
            />
          </li>
          <li className="flex justify-end">
            <button className="bg-lime-600 p-2 text-white rounded-lg mb-2 outline-2 outline-solid outline-lime-300">
              Submit
            </button>
          </li>
        </ul>
      </fieldset>
    </form>
  );
};

export default SignIn;
