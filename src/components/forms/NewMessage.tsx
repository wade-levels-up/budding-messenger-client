import Button from "../ui/Button";

const NewMessage = () => {
  const handleSubmit = (): void => {
    console.log("hi!");
  };

  return (
    <>
      <form className="w-full" onSubmit={handleSubmit}>
        <ul className="flex gap-2 w-full items-center">
          <li className="flex w-full justify-end items-center">
            <label className="hidden" htmlFor="openingMessage">
              Message:
            </label>
            <input
              className="bg-white p-2 w-full rounded-xl max-w-xl"
              type="text"
              maxLength={200}
              placeholder="Aa"
            />
          </li>
          <li className="text-right">
            <Button type="submit" text="Submit" ariaLabel="Submit" />
          </li>
        </ul>
      </form>
    </>
  );
};

export default NewMessage;
