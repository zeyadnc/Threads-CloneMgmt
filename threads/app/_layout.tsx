import { Slot, Stack } from "expo-router";
import { ClerkProvider, ClerkLoaded } from "@clerk/clerk-expo";
import { tokenCache } from "@/utils/Cache";
import { LogBox } from "react-native";
import { useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";

import { 
  useFonts,
  DMSans_400Regular,
  DMSans_500Medium,
  DMSans_700Bold,
 } from "@expo-google-fonts/dm-sans";

const CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;
if(!CLERK_PUBLISHABLE_KEY){
  throw  Error('Missing CLERK_PUBLISHABLE_KEY');
}

LogBox.ignoreLogs(['Clerk: Clerk has been loaded with development keys']);

SplashScreen.preventAutoHideAsync();

const InitialLayout = () => {

const [fontsLoaded] = useFonts({
  DMSans_400Regular,
  DMSans_500Medium,
  DMSans_700Bold,
});

useEffect(()=>{
  if(fontsLoaded){
    SplashScreen.hideAsync();
  }
},[fontsLoaded]);

  return (
      <Slot />
  );
};




export default function RootLayout() {
  return (

    <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY!} tokenCache={tokenCache} >
      <ClerkLoaded>
      <InitialLayout />
      </ClerkLoaded>
    </ClerkProvider>
  );
}
