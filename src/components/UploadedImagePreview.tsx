import { useAtomValue } from "jotai";
import { HTMLProps, useMemo } from "react";
import { uploadedFileAtom } from "../variables/uploadedFile.ts";

type HTMLImageProps = HTMLProps<HTMLImageElement>;
export type UploadedImagePreviewProps = {} & Partial<HTMLImageProps>;

export const UploadedImagePreview = ({
  ...imageProps
}: UploadedImagePreviewProps) => {
  const file = useAtomValue(uploadedFileAtom);
  const uri = useMemo(() => (file ? URL.createObjectURL(file) : null), [file]);

  if (!uri) {
    return null;
  }

  return <img {...imageProps} alt={"upload"} src={uri} />;
};
