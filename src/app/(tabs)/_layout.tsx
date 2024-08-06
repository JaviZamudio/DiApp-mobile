import { StyleSheet, View, Text } from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { SplashScreen, Tabs, router } from 'expo-router';
import { useContext, useEffect } from 'react';
import { AuthContext } from '@/contexts/AuthContext';

export default function AppLayout() {
  const { user, isLoading } = useContext(AuthContext);

  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: '#01a0aa' }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
          headerTitle: 'DiApp',
        }}
      />
      <Tabs.Screen
        name="facts"
        options={{
          title: 'Facts',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="info" color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <Ionicons size={28} name="person" color={color} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabs: {
    display: "flex",
    flexDirection: "row",
    gap: 16,
    padding: 8,
    width: "100%",
    justifyContent: 'space-around',
    marginTop: "auto",
    backgroundColor: "fff",
  },
  tab: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 4,
  }
});
