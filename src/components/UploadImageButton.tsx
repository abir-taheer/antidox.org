import { Button, ButtonProps } from "@mui/joy";
import { useSetAtom } from "jotai";
import { ChangeEventHandler, useCallback, useRef } from "react";
import { uploadedFileAtom } from "../variables/uploadedFile.ts";

export type UploadImageButtonProps = Partial<ButtonProps>;

export const UploadImageButton = ({
  ...buttonProps
}: UploadImageButtonProps) => {
  const uploadInputRef = useRef<HTMLInputElement>(null);
  const setFile = useSetAtom(uploadedFileAtom);

  const handleFileInputChange: ChangeEventHandler<HTMLInputElement> =
    useCallback(
      (ev) => {
        const file = ev.target.files?.[0];

        setFile(file ?? null);

        ev.target.value = "";
      },
      [setFile],
    );

  const onButtonClick = useCallback(() => {
    uploadInputRef.current?.click();
  }, []);

  return (
    <div>
      <input
        onChange={handleFileInputChange}
        ref={uploadInputRef}
        type={"file"}
        style={{ width: 0, height: 0, display: "none" }}
        multiple={false}
        accept={"image/*"}
      />

      <Button {...buttonProps} onClick={onButtonClick} />
    </div>
  );
};
