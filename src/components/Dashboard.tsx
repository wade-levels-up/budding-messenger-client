const Dashboard = () => {
  return (
    <div className="w-full grow grid gap-1 grid-cols-[150px_1fr] grid-rows-[80px_1fr_30px] bg-green-200 rounded-lg p-2 shadow-md">
      <header className="text-center bg-red-300">User's Dash</header>
      <nav className="row-span-full bg-red-300">
        <ul>
          <li>Profile</li>
          <li>Friends</li>
          <li>Conversations</li>
          <li>Users</li>
        </ul>
      </nav>
      <main className="col-start-2 col-end-3 row-start-2 row-end-3 bg-red-300">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis
        incidunt neque amet nemo harum provident commodi! Soluta porro alias
        repellat, ullam est molestiae minima, dolorum dolor accusamus
        perspiciatis debitis fugiat?
      </main>
      <footer className="flex justify-end pr-2 col-start-2 col-end-3 row-start-3 row-end-4 bg-red-300">
        Made by Wade
      </footer>
    </div>
  );
};

export default Dashboard;
