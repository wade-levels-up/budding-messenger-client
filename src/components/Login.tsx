const Login = () => {
  return (
    <div className="bg-green-300 flex flex-col justify-center items-center max-w-3xs">
      <h1 className="text-center">Login</h1>
      <input type="text" className="p-1 border rounded-lg mb-2 bg-white" />
      <button className="bg-green-800 p-2 border rounded-lg mb-2">
        Submit
      </button>
    </div>
  );
};

export default Login;
