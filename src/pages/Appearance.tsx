import DayAndNight from "@/assets/icons/day_and_night.png";
import Moon from "@/assets/icons/Moon.png";
import Sun from "@/assets/icons/Sun.png";
import { MotionList } from "@/components/common/MotionList";
import { useTheme } from "@/providers/ThemeProvider";
import styled from "@emotion/styled";
import { Badge, Image, Title2, tokens } from "@fluentui/react-components";
import { Checkmark12Filled } from "@fluentui/react-icons";

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${tokens.spacingVerticalMNudge};
`;

const ButtonsWrap = styled.div`
  margin-top: ${tokens.spacingVerticalXL};
  display: flex;
  gap: ${tokens.spacingHorizontalS};
`;

const ButtonStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${tokens.spacingHorizontalS};
  box-shadow: ${tokens.shadow2};
  width: 100px !important;
  align-items: center;
  background-color: ${tokens.colorNeutralBackground1};
  padding: ${tokens.spacingVerticalS};
  :hover {
    background-color: ${tokens.colorNeutralBackground1Hover};
  }
  cursor: pointer;
  position: relative;

  & > #badge {
    position: absolute;
    top: 6px;
    right: 6px;
  }
`;

const Appearance = () => {
  const { colorScheme, changeColorScheme } = useTheme();

  return (
    <Wrap>
      <Title2>Appearance</Title2>

      <MotionList>
        <ButtonsWrap>
          <ButtonStyled
            onClick={() => {
              changeColorScheme("Light");
            }}>
            {colorScheme === "Light" && (
              <Badge id="badge" size="medium" icon={<Checkmark12Filled />} />
            )}
            <Image src={Sun} width={36} />
            Clair
          </ButtonStyled>
          <ButtonStyled
            onClick={() => {
              changeColorScheme("Dark");
            }}>
            {colorScheme === "Dark" && (
              <Badge id="badge" size="medium" icon={<Checkmark12Filled />} />
            )}
            <Image src={Moon} width={36} />
            Sombre
          </ButtonStyled>
          <ButtonStyled
            onClick={() => {
              changeColorScheme("System");
            }}>
            {colorScheme === "System" && (
              <Badge id="badge" size="medium" icon={<Checkmark12Filled />} />
            )}
            <Image src={DayAndNight} width={36} />
            Système
          </ButtonStyled>
        </ButtonsWrap>
      </MotionList>
    </Wrap>
  );
};

export default Appearance;
