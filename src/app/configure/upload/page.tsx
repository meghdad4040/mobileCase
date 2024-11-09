"use client";

import { useToast } from "@/hooks/use-toast";
import { useUploadThing } from "@/lib/uploadthing";
import { cn } from "@/lib/utils";
import { Progress } from "@radix-ui/react-progress";
import { Image, Loader, MousePointerSquareDashed } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import Dropzone, { FileRejection } from "react-dropzone";
import { RiDragDropLine } from "react-icons/ri";

const page = () => {
  const { toast } = useToast();
  const router = useRouter();
  const [isDragOver, setIsDragOver] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();
  const [uploadProgress, setUploadProgress] = useState<number>(0);

  const { startUpload, isUploading } = useUploadThing("imageUploader", {
    onClientUploadComplete: ([data]) => {
      const configId = data.serverData.configId;
      startTransition(() => {
        router.push(`/configure/design?id=${configId}`);
      });
    },
    onUploadProgress(p) {
      setUploadProgress(p);
    },
  });

  const onDropREjected = (rejectedFiles: FileRejection[]) => {
    const [file] = rejectedFiles;

    setIsDragOver(false);

    toast({
      title: `${file.file.type} type is not supported.`,
      description: "Please choose a PNG, JPG, or JPEG image instead.",
      variant: "destructive",
    });
  };

  const onDropAccepted = (acceptedFiles: File[]) => {
    startUpload(acceptedFiles, { configId: undefined });

    setIsDragOver(false);

    toast({
      title: `uploading ok 👍`,
      description: "Please choose a PNG, JPG, or JPEG image instead.",
      variant: "default",
    });
  };

  return (
    <div
      className={cn(
        `relative h-full flex-1 my-16 w-full rounded-xl
     bg-gray-900/20 dark:bg-gray-950/30 p-2 ring-1 ring-inset ring-gray-900/10 
     lg:rounded-2xl flex justify-center flex-col items-center`,
        { "ring-blue-900/25 bg-blue-900/10": isDragOver }
      )}
    >
      <div className=" relative flex flex-1 flex-col items-center justify-center w-full">
        <Dropzone
          onDropRejected={onDropREjected}
          onDropAccepted={onDropAccepted}
          accept={{
            "image/png": [".png"],
            "image/jpeg": [".jpeg"],
            "image/jpg": [".jpg"],
          }}
          onDragEnter={() => setIsDragOver(true)}
          onDragLeave={() => setIsDragOver(false)}
        >
          {({ getRootProps, getInputProps }) => (
            <div
              className=" h-full w-full flex-1 flex flex-col 
      items-center justify-center"
              {...getRootProps()}
            >
              <input {...getInputProps()} />
              {isDragOver ? (
                <MousePointerSquareDashed className=" h-6 w-6 dark:text-zinc-100 text-gray-700 mb-2" />
              ) : isUploading || isPending ? (
                <Loader className=" animate-spin h-6 w-6 dark:text-zinc-100 text-gray-700 mb-2" />
              ) : (
                <Image className=" h-10 w-10 dark:text-zinc-100 text-gray-700 mb-2" />
              )}
              <div className=" flex flex-col justify-center mb-2 text-sm dark:text-zinc-100 text-gray-700">
                {isUploading ? (
                  <div className=" flex flex-col items-center">
                    <p>Uploading...</p>
                    <Progress
                      value={uploadProgress}
                      className=" mt-2 w-40 h-2 bg-violet-700 dark:bg-violet-400"
                    />
                  </div>
                ) : isPending ? (
                  <div className="flex flex-col items-center">
                    <p>Redirecting, Please Wait ...</p>
                  </div>
                ) : isDragOver ? (
                  <p>
                    <span className="font-semibold">Drop File</span>
                    to upload
                  </p>
                ) : (
                  <p className=" flex justify-center items-center gap-2">
                    <span className="font-semibold">Click to upload </span>or
                    drag and drop <RiDragDropLine size={"1.5rem"} />
                  </p>
                )}
              </div>
              {isPending ? null : (
                <p className="text-xs font-bold text-gray-600">
                  PNG, JPG, JPEG
                </p>
              )}
            </div>
          )}
        </Dropzone>
      </div>
    </div>
  );
};

export default page;
