import { AuthContext } from "@/contexts/AuthContext";
import { addFavorite, removeFavorite, UsableDato } from "@/services/datosServices";
import { useContext, useEffect, useState } from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";
import { Ionicons } from '@expo/vector-icons';

export const Fact = ({ fact }: { fact: UsableDato }) => {
  const { user } = useContext(AuthContext);
  const [isFavorite, setIsFavorite] = useState(fact.isFavorite);

  const handlePress = () => {
    if (!user) return

    if (isFavorite) {
      removeFavorite(user?.uid, fact.id);
    } else {
      addFavorite(user?.uid, fact.id);
    }

    setIsFavorite(!isFavorite);
  }

  useEffect(() => {
    setIsFavorite(fact.isFavorite);
  }, [fact]);

  return (
    <View style={{ padding: 20, margin: 20, borderRadius: 10, backgroundColor: '#fff', marginTop: 0 }} key={fact.id}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>
        {fact.titulo}
      </Text>
      <Text style={{ fontSize: 16, marginBottom: 20 }}>
        {fact.contenido}
      </Text>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text style={{ fontSize: 16, color: fact.categoriaColor, textAlign: 'right' }}>
          #{fact.categoria}
        </Text>
        {/* Button to make it favorite */}
        {/* <Ionicons name="heart" size={30} color="#dd0000" /> */}
        <Ionicons
          name={isFavorite ? "heart" : "heart-outline"}
          size={30}
          color={isFavorite ? "#dd0000" : "#000"}
          onPress={handlePress}
        />
      </View>
    </View>
  )
}