import { AuthProvider } from '@/contexts/AuthContext';
import { Slot, Stack } from 'expo-router';
import { StyleSheet, useColorScheme } from 'react-native';
import { PaperProvider, MD3LightTheme, MD3DarkTheme } from 'react-native-paper';
import { ThemeProp } from 'react-native-paper/lib/typescript/src/types';

const theme: ThemeProp = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#01a0aa',
  },
}

export default function RootLayout() {
  const colorScheme = useColorScheme()
  const deviceTheme = colorScheme === 'dark' ? MD3DarkTheme : MD3LightTheme

  const theme: ThemeProp = {
    ...deviceTheme,
    colors: {
      ...deviceTheme.colors,
      primary: '#01a0aa',
    },
  }

  return (
    <PaperProvider theme={theme}>
      <AuthProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
          <Stack.Screen name='login' options={{ headerShown: false }} />
        </Stack>
      </AuthProvider>
    </PaperProvider>
  );
}