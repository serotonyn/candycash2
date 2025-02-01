import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

// import { AppWindowContext } from '@/components/common/titlebar/context';
import { useSystemColorScheme } from "@/hooks/useSystemColorScheme";
import { css, Global, ThemeProvider } from "@emotion/react";
import { FluentProvider } from "@fluentui/react-components";

import { darkTheme, lightTheme } from "../constants/theme";
// import { Collections } from '../pocketbase-types';
// import client from '../services/client';

type AppThemeProviderProps = {
  children: JSX.Element;
};

export type ColorScheme = "Light" | "Dark" | "System";

interface ThemeContext {
  colorScheme: ColorScheme;
  changeColorScheme: (colorScheme: ColorScheme) => void;
}

const ThemeContext = createContext<ThemeContext>({
  colorScheme: "System",
  changeColorScheme: () => {},
});

export const AppThemeProvider = ({ children }: AppThemeProviderProps) => {
  // const { isWindowMaximized } = useContext(AppWindowContext);
  const [colorScheme, setColorScheme] = useState(
    // client?.authStore?.model?.colorScheme
    "System" as ColorScheme
  );

  const systemColorScheme = useSystemColorScheme();

  const computedColorScheme =
    colorScheme === "System" ? systemColorScheme : colorScheme;

  const theme = computedColorScheme === "Dark" ? darkTheme : lightTheme;

  const changeColorScheme = useCallback(async (value: ColorScheme) => {
    try {
      // const currentUserId = client?.authStore?.model?.id;
      // await client
      //   ?.collection(Collections.Users)
      //   .update(currentUserId, { colorScheme: value });
      // setColorScheme(value);
    } catch (error) {}
  }, []);

  const contextValue = useMemo(
    () => ({
      colorScheme,
      changeColorScheme,
    }),
    [colorScheme]
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      <FluentProvider
        theme={theme}
        style={{ background: theme.colorNeutralBackground2 }}>
        <ThemeProvider theme={theme}>
          <Global
            styles={css`
              body #root {
                box-sizing: border-box;
                border: "initial";
              }

              ::-webkit-scrollbar {
                width: 8px;
                height: 8px;
                border-radius: 2px;
              }

              ::-webkit-scrollbar-track {
                background: transparent;
                border-radius: 2px;
              }

              ::-webkit-scrollbar-thumb {
                background-color: ${theme.colorBrandBackground2};
                border-radius: 15px;
                border: 2px solid transparent;
                background-clip: padding-box;
              }

              ::-webkit-scrollbar-thumb:hover,
              ::-webkit-scrollbar-thumb:active {
                background-color: ${theme.colorBrandBackground2};
              }

              html {
                scrollbar-color: ${theme.colorBrandBackground2} transparent;
                scrollbar-width: thin;
                scroll-behavior: smooth;
              }
            `}
          />
          {children}
        </ThemeProvider>
      </FluentProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  return useContext(ThemeContext);
};
