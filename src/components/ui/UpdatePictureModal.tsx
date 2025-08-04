import Button from "./Button";
import LoadingSpinner from "./LoadingSpinner";
import { useState } from "react";

type UpdatePictureModalParams = {
  error: string;
  getUserData: () => void;
  setError: (value: string) => void;
  updatingPic: boolean;
  setUpdatingPic: (value: boolean) => void;
};

const UpdatePictureModal = ({
  error,
  getUserData,
  setError,
  updatingPic,
  setUpdatingPic,
}: UpdatePictureModalParams) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [submittedPic, setSubmittedPic] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpdatePicFormSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!selectedFile) {
      setError("Please select a file.");
      return;
    }

    setSubmittedPic(true);

    const formData = new FormData();
    formData.append("file", selectedFile);

    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/users/me/profile_picture`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      }
    );

    setSubmittedPic(false);

    if (!response.ok) {
      const data = await response.json();
      setError(data.message);
      return;
    }

    setUpdatingPic(false);
    getUserData();
  };

  return (
    <>
      <div
        className={`${
          updatingPic ? "flex" : "hidden"
        } z-50 fixed animate-fade-in overflow-auto bg-black/80 inset-0 items-center justify-center`}
      >
        {submittedPic ? (
          <div className="flex flex-col items-center justify-center gap-2 bg-lime-100/90 p-6 w-screen h-screen animate-pulse">
            <LoadingSpinner />
          </div>
        ) : (
          <form className="flex w-80" onSubmit={handleUpdatePicFormSubmit}>
            <ul className="flex flex-col gap-2 p-6 w-full rounded-xl bg-lime-200/10">
              <li className="flex flex-col items-center gap-2 bg-lime-100 p-3 pt-6 pb-6 rounded-xl">
                <label
                  htmlFor="file"
                  className="bg-lime-600 hover:bg-lime-500 text-white px-10 py-2 rounded-lg cursor-pointer transition-colors"
                >
                  Choose File
                </label>
                <input
                  id="file"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                {selectedFile && (
                  <span className="text-s text-gray-700 mt-1">
                    {selectedFile.name}
                  </span>
                )}
                <p className="text-center w-full m-2">
                  Max file size 1<abbr title="Megabyte"> MB</abbr>
                </p>
              </li>
              {error && (
                <li className="mb-2 bg-red-300 p-1 rounded">
                  <p className="text-center text-pretty">{error}</p>
                </li>
              )}
              <li>
                <div className="flex justify-between gap-1">
                  <Button
                    text="Cancel"
                    icon="faXmark"
                    func={() => {
                      setUpdatingPic(false);
                    }}
                    ariaLabel="Cancel"
                  />
                  <Button
                    text="Update"
                    type="submit"
                    icon="faCheck"
                    ariaLabel="Update Profile Picture"
                  />
                </div>
              </li>
            </ul>
          </form>
        )}
      </div>
    </>
  );
};

export default UpdatePictureModal;
