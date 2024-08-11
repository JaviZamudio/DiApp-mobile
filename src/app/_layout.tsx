import { AuthProvider } from '@/contexts/AuthContext';
import { Stack } from 'expo-router';
import { useColorScheme } from 'react-native';
import { PaperProvider, MD3LightTheme, MD3DarkTheme } from 'react-native-paper';
import { MD3Theme, ThemeProp } from 'react-native-paper/lib/typescript/src/types';

const customLightTheme: MD3Theme = {
  ...MD3LightTheme,
  dark: false,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#01a0aa',
    secondary: '#01a0aa',
    tertiary: '#01a0aa',
    error: '#f00',
    surface: '#eee',
    background: '#fff',
    onSurface: '#000',
    onBackground: '#000',
    onSurfaceVariant: '#333',
  },
}

const customDarkTheme: MD3Theme = {
  ...MD3LightTheme,
  dark: true,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#01a0aa',
    secondary: '#01a0aa',
    tertiary: '#01a0aa',
    error: '#e74c3c',
    surface: '#333',
    background: '#121212',
    onSurface: '#fff',
    onBackground: '#fff',
    onSurfaceVariant: '#ddd',
  },
}

export default function RootLayout() {
  const colorScheme = useColorScheme()
  console.log('colorScheme', colorScheme)
  const deviceTheme = colorScheme === 'dark' ? customDarkTheme : customLightTheme

  const theme: ThemeProp = {
    ...deviceTheme,
    colors: {
      ...deviceTheme.colors,
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