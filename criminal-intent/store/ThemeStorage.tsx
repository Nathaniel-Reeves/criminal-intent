import AsyncStorage from '@react-native-async-storage/async-storage';

const CURRENT_THEME_KEY = 'CURRENT_THEME';

export type Theme = {
  name: string;
  colors: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
    header: string;
    appbar: string;
  };
  buttons: {
    variant: "outline" | "solid" | "link" | undefined;
  };
};

export const THEMES = [
  {
    name: "Light",
    colors: {
      primary: "#FFFFFF",
      secondary: "#F0F0F0",
      background: "#FFFFFF",
      text: "#000000",
      header: "#F0F0F0",
      appbar: "#F0F0F0"
    },
    buttons: {
      variant: "outline" as "outline"
    }
  },
  {
    name: "Dark",
    colors: {
      primary: "#000000",
      secondary: "#000000",
      background: "#000000",
      text: "#FFFFFF",
      header: "#000000",
      appbar: "#000000"
    },
    buttons: {
      variant: "solid" as "solid"
    }
  },
  {
    name: "Blue",
    colors: {
      primary: "#0000FF",
      secondary: "#0000FF",
      background: "#0000FF",
      text: "#FFFFFF",
      header: "#0000FF",
      appbar: "#0000FF"
    },
    buttons: {
      variant: "solid" as "solid"
    }
  }
]

export const getThemes = (): Theme[] => {
  return THEMES;
}

export const getTheme = async (): Promise<Theme> => {
  const theme = await AsyncStorage.getItem(CURRENT_THEME_KEY);

  if (!theme) {
    await AsyncStorage.setItem(CURRENT_THEME_KEY, JSON.stringify(THEMES[0]));
  }

  return theme ? JSON.parse(theme) : THEMES[0];
};

export const setTheme = async (themeName: string): Promise<void> => {
  const theme = THEMES.find((t) => t.name === themeName);

  if (theme) {
    await AsyncStorage.setItem(CURRENT_THEME_KEY, JSON.stringify(theme));
  }
};

