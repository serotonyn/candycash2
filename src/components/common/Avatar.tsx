import { DefaultImage } from "@/constants/default-avatar";
import styled from "@emotion/styled";
import { Image } from "@fluentui/react-components";

const ImageStyled = styled(Image)<{
  small?: boolean;
}>`
  width: ${({ small }) => (small ? "40px" : "80px")};
  height: ${({ small }) => (small ? "40px" : "80px")};
  border-radius: 50%;

  top: 0;
  top: ${({ small }) => (small ? "24px" : "38px")};
`;

export interface ICompositionAvatarProps {
  small?: boolean;
  bordered?: boolean;
}

export const AvatarImage = ({
  small,
  bordered,
  ...props
}: ICompositionAvatarProps) => {
  return <ImageStyled small={small} src={DefaultImage} {...props} />;
};
