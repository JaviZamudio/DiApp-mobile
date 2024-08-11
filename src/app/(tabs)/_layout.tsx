import { Credits } from '@/components/Credits';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { useTheme } from 'react-native-paper';

export default function AppLayout() {
  const theme = useTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#01a0aa',
        headerRight: () => <Credits />,
        headerTintColor: theme.colors.onSurface,
        headerStyle: { backgroundColor: theme.colors.surface, borderBottomColor: theme.colors.surfaceDisabled },
        tabBarStyle: { backgroundColor: theme.colors.surface, borderTopColor: theme.colors.surfaceDisabled },
      }}
      sceneContainerStyle={{ backgroundColor: theme.colors.background }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <FontAwesome size={24} name="home" color={color} />,
          headerTitle: 'DiApp',

        }}
      />
      <Tabs.Screen
        name="facts"
        options={{
          title: 'Today Facts',
          tabBarIcon: ({ color }) => <FontAwesome size={24} name="info" color={color} />,
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: 'Favorites',
          tabBarIcon: ({ color }) => <Ionicons size={24} name="bookmark" color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <Ionicons size={24} name="person" color={color} />,
        }}
      />
    </Tabs>
  );
}
