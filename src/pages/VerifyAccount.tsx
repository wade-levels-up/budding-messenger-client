import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Button from "../components/ui/Button";
import LoadingSpinner from "../components/ui/LoadingSpinner";

const VerifyAccount = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!searchParams || !searchParams.get("token")) {
      navigate("/");
    }

    const verifyUser = async () => {
      setLoading(true);

      const response = await fetch(
        `http://localhost:3000/verify-user?token=${searchParams.get("token")}`,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        setError(`Unable to verify email`);
        setLoading(false);
        return;
      }

      setLoading(false);
    };

    verifyUser();
  }, [navigate, searchParams]);

  return (
    <div className="flex flex-col gap-8 items-center">
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          {error ? (
            <>
              <h1 className="text-xl">Error</h1>
              <div className="mb-2 bg-red-400 p-2 rounded">
                <p className="text-center text-pretty">
                  <span>Error: {error}</span>
                </p>
              </div>
            </>
          ) : (
            <h1 className="text-xl">Account verified!</h1>
          )}
          <p>Click the button below to return home.</p>
          <Button text="Home" href="/" />
        </>
      )}
    </div>
  );
};

export default VerifyAccount;
