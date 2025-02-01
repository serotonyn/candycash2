import {
  BrandVariants,
  createDarkTheme,
  createLightTheme,
  PartialTheme,
} from "@fluentui/react-components";

const myNewTheme: BrandVariants = {
  10: "#060200",
  20: "#251207",
  30: "#3E1B0D",
  40: "#532110",
  50: "#692811",
  60: "#802E13",
  70: "#973513",
  80: "#AF3B14",
  90: "#C74114",
  100: "#E14714",
  110: "#FA4E14",
  120: "#FF6B37",
  130: "#FF875B",
  140: "#FF9F7B",
  150: "#FFB69A",
  160: "#FFCBB8",
};

export type AppTheme = PartialTheme & {
  winBackground: string;
  winBackgroundHover: string;
};

const lightTheme: AppTheme = {
  ...createLightTheme(myNewTheme),
  winBackground: "rgba(255,255,255,0.7)",
  winBackgroundHover: "rgba(255,255,255,0.5)",
};

const darkTheme: AppTheme = {
  ...createDarkTheme(myNewTheme),
  winBackground: "rgba(255,255,255,0.07)",
  winBackgroundHover: "rgba(255,255,255,0.1)",
};

darkTheme.colorBrandForeground1 = myNewTheme[110];
darkTheme.colorBrandForeground2 = myNewTheme[120];

export { darkTheme, lightTheme };
