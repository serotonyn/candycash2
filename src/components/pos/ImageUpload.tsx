import React, { ReactNode, useRef, useState } from "react";

import styled from "@emotion/styled";
import { Body1, CardPreview, Image, tokens } from "@fluentui/react-components";

import { fileToBase64 } from "./helpers";

const CardPreviewStyled = styled(CardPreview)`
  width: 64px;
  height: 64px;
  padding: ${tokens.spacingHorizontalL};
`;

const CardImageStyled = styled(Image)`
  width: 44px;
  height: 44px;
  object-fit: contain;
`;

const HiddenFileInput = styled.input`
  display: none;
`;

interface OwnProps {
  Trigger: ReactNode;
  setFile?: (file: File) => void;
  img?: string;
  hideLabel?: boolean;
}

export const ImageUpload: React.FC<OwnProps> = ({
  Trigger,
  setFile,
  img,
  hideLabel = false,
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [tempImg, setTempImg] = useState<string | null>(null);

  async function handleUpload() {
    try {
      if (inputRef.current?.files && inputRef.current?.files?.length) {
        const base64Array = await fileToBase64(inputRef.current?.files[0]);
        setFile?.(inputRef.current!.files![0]);
        setTempImg("data:image/jpeg;base64," + base64Array);
      }
    } catch (error) {}
  }

  const uploadClicked = () => {
    if (!inputRef.current) return;
    inputRef.current.click();
  };

  return (
    <>
      <HiddenFileInput
        ref={inputRef}
        type="file"
        accept="image/png, image/jpeg"
        multiple={false}
        onChange={handleUpload}
      />
      <div>
        {!hideLabel && <Body1>Image</Body1>}
        <CardPreviewStyled>
          <CardImageStyled src={tempImg || img} alt="NoImage" />
        </CardPreviewStyled>
      </div>
      {React.cloneElement(Trigger as React.ReactElement, {
        onClick: uploadClicked,
      })}
    </>
  );
};
