//copied one

"use client";
import type { UploadedImageDataType } from "@/app/(private)/(producer)/producer/create/type";
import Image from "next/image";
import { useState } from "react";
import { LuUpload } from "react-icons/lu";

export const CloudinaryImgUploader = ({
  imgHandlerFuncInParent,
}: {
  imgHandlerFuncInParent: (images: UploadedImageDataType[]) => void;
}) => {
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);

  const [uploadedImgUrl, setUploadImgUrl] = useState<
    UploadedImageDataType[] | null
  >([]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (!files || files.length === 0) return;

    try {
      setUploading(true);

      const uploadedURLs: string[] = [];

      // Get signature once (same signature can be used for these uploads if your backend allows it)
      const signRes = await fetch("/api/cloudinary-sign", {
        method: "POST",
      });

      const { signature, timestamp, apiKey } = await signRes.json();

      const uploadPromises = Array.from(files).map(async (file) => {
        const formData = new FormData();

        formData.append("file", file);
        formData.append("signature", signature);
        formData.append("timestamp", timestamp.toString());
        formData.append("api_key", apiKey);
        formData.append("invalidate", "true");

        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
          {
            method: "POST",
            body: formData,
          },
        );

        if (!response.ok) {
          throw new Error("Signed upload failed");
        }

        const data = await response.json();

        return { imgSrc: data.secure_url, public_id: data.public_id };
      });

      const uploadedUrls = await Promise.all(uploadPromises);

      // Array of all uploaded image URLs

      console.log(uploadedURLs);

      // if you need previews
      setUploadImgUrl(uploadedUrls);
      imgHandlerFuncInParent(uploadedUrls);
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const removeImgFromCloudinary = async (public_id: string) => {
    setDeleting(public_id);
    try {
      await fetch("/api/cloudinary-delete", {
        method: "POST",
        body: JSON.stringify({ public_id }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const tempArr = uploadedImgUrl?.filter((e) => e.public_id !== public_id);
      setUploadImgUrl(tempArr!);
      imgHandlerFuncInParent(tempArr!);

      //   setUploadImgUrl(
      //     (prev) => prev && prev.filter((img) => img.public_id !== public_id),
      //   );
    } catch (err) {
      console.log(err);
    }
    setDeleting(null);
  };

  return (
    <div className="flex flex-col items-stretch gap-4 w-full   ">
      <div className="flex gap-4 flex-wrap">
        <label
          className={`
        relative flex flex-col items-center justify-center  w-52 h-30 xs:h-40
        border border-dashed rounded-xl cursor-pointer 
         group
        ${uploading ? "opacity-50 pointer-events-none" : ""}
      `}
        >
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            disabled={uploading}
            //   onChange={testFunc}
            className="sr-only w-52 h-30 xs:h-40"
            multiple
          />

          <div className="flex flex-col  items-center justify-center pt-5 pb-6">
            <div className="p-3 mb-3 bg-blue-50 rounded-full text-blue-500 group-hover:bg-blue-100 transition-colors duration-200">
              <LuUpload />
            </div>

            <div className="mb-1 text-sm  font-semibold text-center">
              <span className="text-muted-text"> UPLOAD</span>
              {uploading && (
                <p className="text-sm text-blue-500 mt-1 animate-pulse">
                  Uploading...
                </p>
              )}
            </div>
          </div>
        </label>

        {uploadedImgUrl &&
          uploadedImgUrl.length > 0 &&
          uploadedImgUrl.map((e: UploadedImageDataType, index: number) => {
            const isThisImageDeleting = deleting === e.public_id;

            return (
              <div
                key={index}
                className="relative w-52 h-30 xs:h-40 p-2 hover:scale-100 scale-90 transition-all duration-500"
              >
                <Image
                  src={e.imgSrc}
                  alt="Preview"
                  fill
                  className="object-cover object-center "
                  unoptimized
                />
                {!isThisImageDeleting ? (
                  <div
                    onClick={() => removeImgFromCloudinary(e.public_id)}
                    className="absolute top-0 right-0 hover:cursor-pointer bg-black/40 flex items-center justify-center "
                  >
                    <p className="text-white text-sm font-medium p-2">X</p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center h-full  justify-center gap-2">
                    <div className="w-6 h-6 border-2 border-blue-700 border-t-white rounded-full animate-spin" />
                    <span className="text-white text-xs font-medium">
                      Deleting...
                    </span>
                  </div>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
};
