import { useState } from "react";
import type { ImgHTMLAttributes } from "react";
import defaultProfilePicture from "../../assets/default_profile_picture.jpg";

type ProfileProps = {
  src: string;
  alt: string;
} & ImgHTMLAttributes<HTMLImageElement>;

const ProfilePicture = ({ src, alt, ...props }: ProfileProps) => {
  const [loading, setLoading] = useState(true);

  return (
    <div className="relative w-64 h-64">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-green-200 rounded-full">
          <div className="absolute inset-0 animate-pulse bg-green-100 rounded-full" />
        </div>
      )}
      <img
        src={src || defaultProfilePicture}
        alt={alt}
        className={`w-64 h-64 border-2 border-lime-200 rounded-full object-cover transition-opacity duration-300 ${
          loading ? "opacity-0" : "opacity-100"
        }`}
        onLoad={() => setLoading(false)}
        {...props}
      />
    </div>
  );
};

export default ProfilePicture;
