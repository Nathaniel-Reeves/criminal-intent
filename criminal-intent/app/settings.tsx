import React from 'react';
import { Button, ButtonText } from '@/components/ui/button';
import { VStack } from '@/components/ui/vstack';

import { setTheme, getThemes } from '@/store/ThemeStorage';

export default function SettingsScreen() {

  const themes = getThemes();

  const setTheme = async (themeName: string) => {
    await setTheme(themeName);
  };

  return (
    <VStack className="gap-6 w-full p-6 justify-center">
      {themes.map((theme) => (
        <Button
          key={theme.name}
          onPress={() => {
            setTheme(theme.name);
          }}
          variant={theme.buttons.variant}
          className={`bg-[${theme.colors.background}]`}
        >
          <ButtonText className={`text-[${theme.colors.text}]`}>{theme.name}</ButtonText>
        </Button>
      ))}
    </VStack>
  );
}