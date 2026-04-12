"use client";

import React, { useCallback, useState } from "react";

import { FileWithPath, useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { cn, convertFileToUrl, getFileType } from "@/lib/utils";
import Image from "next/image";
import Thumbnail from "@/components/Thumbnail";
import { MAX_FILE_SIZE } from "@/constants";
import { useToast } from "@/hooks/use-toast";
import { uploadFile } from "@/lib/actions/file.actions";
import { usePathname, useRouter } from "next/navigation";

interface Props {
  ownerId: string;
  accountId: string;
  className?: string;

  caption?: string;
  tags?: string;
  location?: string;
  // fieldChange: (files: File[]) => void;
}

const FileUploader = ({ ownerId, accountId, className, caption, tags, location }: Props) => {
  // const [file, setFile] = useState<File[]>([]);
  // const [fileUrl, setFileUrl] = useState<string>(mediaUrl);
  const path = usePathname();
  const { toast } = useToast();
  const [files, setFiles] = useState<File[]>([]);
  const router = useRouter();


  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      setFiles(acceptedFiles);
      // fieldChange(acceptedFiles);
      // setFileUrl(convertFileToUrl(acceptedFiles[0]));
      console.log("FILES 👉", acceptedFiles);
      const uploadPromises = acceptedFiles.map(async (file) => {
        if (file.size > MAX_FILE_SIZE) {
          setFiles((prevFiles) =>
            prevFiles.filter((f) => f.name !== file.name),
          );

          return toast({
            description: (
              <p className="body-2 text-white">
                <span className="font-semibold">{file.name}</span> is too large.
                Max file size is 50MB.
              </p>
            ),
            className: "error-toast",
          });
        }

        return uploadFile({ file, ownerId, accountId, path, caption, tags, location }).then(
          (uploadedFile) => {
            if (uploadedFile) {
              setFiles((prevFiles) =>
                prevFiles.filter((f) => f.name !== file.name),
              );
            }
            router.push("/onlyboard");
            console.log('Posted whith sucess')
          },

        );
      });

      await Promise.all(uploadPromises);
    },
    [ownerId, accountId, path, toast, files, caption, tags, location],
  );

  // const onDrop = useCallback(
  //   (acceptedFiles: FileWithPath[]) => {
  //     setFile(acceptedFiles);
  //     fieldChange(acceptedFiles);
  //     setFileUrl(convertFileToUrl(acceptedFiles[0]));
  //   },
  //   [file]
  // );
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    // accept: {
    //   "image/*": [".png", ".jpeg", ".jpg", ".svg"],
    // },
  });

  // const handleRemoveFile = (
  //   e: React.MouseEvent<HTMLImageElement, MouseEvent>,
  //   fileName: string,
  // ) => {
  //   e.stopPropagation();
  //   setFiles((prevFiles) => prevFiles.filter((file) => file.name !== fileName));
  // };

  return (
    <div
      {...getRootProps()}
      className="flex flex-center w-full  max-w-5xl flex-col bg-gray-20 rounded-xl cursor-pointer">

      <input {...getInputProps()} className="cursor-pointer" />
      {/* <Button type="button" className={cn("uploader-button", className)}>
        <Image
          src="/assets/icons/upload.svg"
          alt="upload"
          width={24}
          height={24}
        />{" "}
        <p>Upload</p>
      </Button> */}

      {/* {fileUrl ? (
        <>
          <div className="flex flex-1 justify-center w-full p-5 lg:p-10">
            <img src={fileUrl} alt="image" className="file_uploader-img" />
          </div>
          <p className="file_uploader-label">Click or drag photo to replace</p>
        </>
      ) : ( */}
      <div className="file_uploader-box ">
        <img
          src="/assets/icons/file-upload.svg"
          width={96}
          height={77}
          alt="file upload"
        />

        <h3 className="base-medium text-light-2 mb-2 mt-6">
          Drag photo here
        </h3>
        <p className="text-light-4 small-regular mb-6">SVG, PNG, JPG, Video</p>

        <Button type="button" className="shad-button_dark_4">
          Select from computer
        </Button>
      </div>
      {/* )} */}
    </div>
  );
};

export default FileUploader;
