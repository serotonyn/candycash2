// import { useAuth } from "@/providers/UserProvider";
import styled from "@emotion/styled";
import { Image } from "@fluentui/react-components";

const ImageStyled = styled(Image)<{
  small?: boolean;
  isAdmin: boolean;
}>`
  width: ${({ small }) => (small ? "40px" : "80px")};
  height: ${({ small }) => (small ? "40px" : "80px")};
  border-radius: 50%;

  top: 0;
  top: ${({ small }) => (small ? "24px" : "38px")};
  filter: ${({ isAdmin }) => (!isAdmin ? "grayscale(1)" : "none")};
`;

export interface ICompositionAvatarProps {
  small?: boolean;
  image?: string;
  bordered?: boolean;
}

export const AvatarImage = ({
  small,
  image,
  bordered,
  ...props
}: ICompositionAvatarProps) => {
  // const { currentUser } = useAuth();
  // if (!image && !currentUser) return null;

  // return (
  //   <ImageStyled
  //     small={small}
  //     src={image}
  //     isAdmin={currentUser!.isAdmin}
  //     {...props}
  //   />
  // );
  return null;
};
