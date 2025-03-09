import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { Stack } from 'expo-router';
import { Button, ButtonIcon } from "@/components/ui/button";
import { HStack } from "@/components/ui/hstack";
import { Plus, Cog } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { getTheme } from "@/store/ThemeStorage";

import "../global.css";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

// export const unstable_settings = {
//   // Ensure that reloading on `/modal` keeps a back button present.
//   initialRouteName: "gluestack",
// };

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  const [styleLoaded, setStyleLoaded] = useState(false);
  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  // useLayoutEffect(() => {
  //   setStyleLoaded(true);
  // }, [styleLoaded]);

  // if (!loaded || !styleLoaded) {
  //   return null;
  // }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const router = useRouter();

  return (
    <GluestackUIProvider>
      <Stack
        screenOptions={{
          headerTitleStyle: {
            fontSize: 20,
            // color: "black",
          },
          // headerStyle: {
          //   backgroundColor: "white",
          // },
          // statusBarBackgroundColor: "white",
          // statusBarStyle: "dark",
        }}>
        <Stack.Screen name="index" options={{
          title: "Criminal Intent",
          headerRight: () => (<HStack className="gap-6">
            <Button onPress={() => router.push(`/crime-detail/${null}`)} variant="link" size="lg" className="rounded-full"><ButtonIcon as={Plus} size="lg" className="w-[28px] h-[28px]"/></Button>
            <Button onPress={() => router.push('/settings')} variant="link" size="lg" className="rounded-full"><ButtonIcon as={Cog} size="lg" className="w-[28px] h-[28px]"/></Button>
          </HStack>),
          headerShown: true,
        }} />
        <Stack.Screen name="crime-detail/[id]" options={{
          title: "Crime Details",
          headerShown: true
        }} />
        <Stack.Screen name="settings" options={{ headerShown: true, title: "Theme Settings" }} />
      </Stack>
    </GluestackUIProvider>
  );
}
