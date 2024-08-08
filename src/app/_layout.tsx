import { AuthProvider } from '@/contexts/AuthContext';
import { Stack } from 'expo-router';
import { useColorScheme } from 'react-native';
import { PaperProvider, MD3LightTheme, MD3DarkTheme } from 'react-native-paper';
import { MD3Theme, ThemeProp } from 'react-native-paper/lib/typescript/src/types';

const customLightTheme: MD3Theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#01a0aa',
    secondary: '#01a0aa',
    tertiary: '#01a0aa',
    error: '#f00',
    surface: '#fff',
  },
}

const customDarkTheme: MD3Theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#01a0aa',
    surface: '#fff',
    background: '#fff',
  },
}

export default function RootLayout() {
  const colorScheme = useColorScheme()
  const deviceTheme = colorScheme === 'dark' ? customDarkTheme : customLightTheme

  const theme: ThemeProp = {
    ...deviceTheme,
    colors: {
      ...deviceTheme.colors,
      // primary: '#01a0aa',
    },
  }

  return (
    <PaperProvider theme={theme}>
      <AuthProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name='login' options={{ headerShown: false }} />
          <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
        </Stack>
      </AuthProvider>
    </PaperProvider>
  );
}