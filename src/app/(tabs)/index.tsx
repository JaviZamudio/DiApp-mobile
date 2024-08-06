import { router } from "expo-router";
import { Text, View } from "react-native";
import { Button } from "react-native-paper";

export default function HomePage() {

  return (
    <>
      <Text>HomePage</Text>
      <Button onPress={() => router.replace("/login")}>Go to Login</Button>
    </>
  )
}
