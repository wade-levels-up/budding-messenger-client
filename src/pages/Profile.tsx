import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import Button from "../components/ui/Button";
import LoadingSpinner from "../components/ui/LoadingSpinner";

type UserData = {
  username: string;
  bio: string;
  joined: string;
  profile_picture_path: string;
};

const Profile = () => {
  const [userData, getUserData] = useOutletContext<[UserData, () => void]>();
  const { username, bio, profile_picture_path } = userData;
  const [updatingBio, setUpdatingBio] = useState(false);
  const [newBio, setNewBio] = useState("");
  const [error, setError] = useState("");
  const [updatingPic, setUpdatingPic] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [submittedPic, setSubmittedPic] = useState(false);

  useEffect(() => {
    if (bio) {
      setNewBio(bio);
    }
  }, [bio]);

  const handleBioInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewBio(e.target.value);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleBioFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await fetch("http://localhost:3000/users/me/bio", {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content: newBio }),
    });

    if (!response.ok) {
      setError(`Unable to update Bio`);
      return;
    }

    setUpdatingBio(false);
    getUserData();
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
      "http://localhost:3000/users/me/profile_picture",
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
      setError(`Unable to update Profile Picture`);
      return;
    }

    setUpdatingPic(false);
    getUserData();
  };

  const updatePictureModal = (
    <div
      className={`${
        updatingPic ? "flex" : "hidden"
      } z-50 fixed animate-fade-in overflow-auto bg-black/80 inset-0 items-center justify-center`}
    >
      {submittedPic ? (
        <div className="flex flex-col items-center gap-2 bg-yellow-200 p-3 pt-6 pb-6 rounded-xl">
          <LoadingSpinner />
        </div>
      ) : (
        <form className="flex" onSubmit={handleUpdatePicFormSubmit}>
          <ul className="flex flex-col gap-2 p-6 w-full rounded-xl bg-yellow-200/10">
            <li className="flex flex-col items-center gap-2 bg-yellow-200 p-3 pt-6 pb-6 rounded-xl">
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
              <div className="flex justify-end gap-1">
                <Button
                  icon="faXmark"
                  func={() => {
                    setUpdatingPic(false);
                  }}
                  ariaLabel="Cancel"
                />
                <Button
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
  );

  return (
    <>
      <h2 className="text-center text-xl">Profile Page</h2>
      {updatePictureModal}
      <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6 p-3">
        <div className="relative border-inset border-3 rounded-xl border-lime-200 shadow-md">
          <img
            className=" w-[300px] h-min-[300px]"
            src={
              profile_picture_path
                ? `${profile_picture_path}?t=${Date.now()}` // Cache-busting string - adding Date as a query parameter force retrieval of the updated file
                : "src/assets/default_profile_picture.jpg"
            }
            alt={`${username}'s Profile Picture`}
          />
          <div className="bg-yellow-200 p-2 flex items-center justify-end rounded-xl">
            <Button
              icon="faUserPen"
              func={() => {
                setUpdatingPic(true);
              }}
              ariaLabel="Update Profile Picture"
            />
          </div>
        </div>
        <div className="flex flex-col gap-3 w-full grow">
          <div className="flex justify-between bg-yellow-200 rounded-xl p-3 items-center">
            <h3 className="text-xl">Bio</h3>
            {!updatingBio && (
              <Button
                func={() => setUpdatingBio(!updatingBio)}
                ariaLabel="Update Bio"
                icon="faPen"
              />
            )}
          </div>
          {updatingBio ? (
            <form onSubmit={handleBioFormSubmit} className="flex grow">
              <ul className="w-full">
                <li className="w-full">
                  <label htmlFor="bio"></label>
                  <textarea
                    name="bio"
                    id="bio"
                    placeholder="Tell us about yourself"
                    rows={8}
                    value={newBio}
                    onChange={handleBioInput}
                    className="bg-white p-2 w-full"
                  ></textarea>
                </li>
                {error && (
                  <li className="mb-2 bg-red-300 p-1 rounded">
                    <p className="text-center text-pretty">{error}</p>
                  </li>
                )}
                <li className="flex flex-row gap-1 justify-end p-2">
                  <Button
                    icon="faXmark"
                    func={() => setUpdatingBio(false)}
                    ariaLabel="Cancel"
                  />
                  <Button
                    icon="faCheck"
                    type="submit"
                    ariaLabel="Submit Changes"
                  />
                </li>
              </ul>
            </form>
          ) : (
            <p>
              {bio ||
                `Hmm... Looks like you haven't written a Bio yet. Click Update Bio to write one!`}
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
