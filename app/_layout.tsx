import { ClerkProvider } from "@clerk/expo";
import { tokenCache } from "@clerk/expo/token-cache";
import { useFonts } from "expo-font";
import { Slot } from "expo-router";
import "../global.css";

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

if (!publishableKey) {
  throw new Error("Add your Clerk Publishable Key to the .env file");
}

export default function RootLayout() {

  const [fontsLoaded] = useFonts({
    "InriaSerif-Bold": require("../assets/fonts/InriaSerif-Bold.ttf"),

    "DMSans-Regular": require("../assets/fonts/DMSans-Regular.ttf"),

    "DMSans-Medium": require("../assets/fonts/DMSans-Medium.ttf"),

    "DMSans-SemiBold": require("../assets/fonts/DMSans-SemiBold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ClerkProvider
      publishableKey={publishableKey}
      tokenCache={tokenCache}
    >
      <Slot />
    </ClerkProvider>
  );
}