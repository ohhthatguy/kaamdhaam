"use client";
import Image from "next/image";
import { useState } from "react";
import { LuUpload } from "react-icons/lu";

const ProfileImageInput = ({
  UrlFromProfileImgInputComp,
}: {
  UrlFromProfileImgInputComp: (urlString: string) => void;
  //   UrlFromProfileImgInputComp: (
  //     urlString: React.ChangeEvent<HTMLInputElement>,
  //   ) => void;
}) => {
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);

      // 1. Fetch the cryptographic signature from your backend
      const signRes = await fetch("/api/cloudinary-sign", {
        method: "POST",
      });
      const { signature, timestamp, apiKey } = await signRes.json();

      // 2. Build FormData with the signature parameters
      const formData = new FormData();
      formData.append("file", file);
      formData.append("signature", signature);
      formData.append("timestamp", timestamp.toString());
      formData.append("api_key", apiKey);

      formData.append("invalidate", "true");

      // 3. Post to the standard signed upload endpoint
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        { method: "POST", body: formData },
      );

      if (!response.ok) throw new Error("Signed upload failed");

      const data = await response.json();
      UrlFromProfileImgInputComp(data.secure_url);
      setImagePreview(data.secure_url);
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  //   const handleLocalImagePreview = (e: React.ChangeEvent<HTMLInputElement>) => {
  //     const file = e.target.files?.[0];
  //     if (file) {
  //       if (imagePreview) URL.revokeObjectURL(imagePreview);
  //       const localUrl = URL.createObjectURL(file);
  //       setImagePreview(localUrl);
  //     }
  //   };

  return (
    /* FIX 1: Change items-center to items-stretch on the parent so children can actually use w-full */
    <div className="flex flex-col items-stretch gap-4 w-3/5   ">
      <label
        className={`
        relative flex flex-col items-center justify-center w-full h-30 xs:h-40
        border border-gray-300 rounded-xl cursor-pointer 
       hover:bg-gray-100 transition-all duration-200 group
        ${uploading ? "opacity-50 pointer-events-none" : ""}
      `}
      >
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          disabled={uploading}
          className="sr-only"
        />

        {imagePreview ? (
          <div className="relative w-full h-full p-2">
            <Image
              src={imagePreview}
              alt="Preview"
              fill
              className="object-contain object-center rounded-lg"
              unoptimized
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 rounded-lg flex items-center justify-center transition-opacity duration-200">
              <p className="text-white text-sm font-medium">Change Image</p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <div className="p-3 mb-3 bg-blue-50 rounded-full text-blue-500 group-hover:bg-blue-100 transition-colors duration-200">
              <LuUpload />
            </div>

            {/* FIX 2: Changed from <p> to <div> because a <p> tag cannot legally contain another nested <p> tag in HTML */}
            <div className="mb-1 text-sm text-gray-700 font-semibold text-center">
              <span className="text-muted-text"> Upload Profile Photo</span>
              {uploading && (
                <p className="text-sm text-blue-500 mt-1 animate-pulse">
                  Uploading...
                </p>
              )}
            </div>
          </div>
        )}
      </label>
    </div>
  );
};

export default ProfileImageInput;
// {uploading && (
//   <p className="text-sm text-blue-500">Uploading to Cloudflare...</p>
// )}
