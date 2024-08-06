import { ScrollView, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useContext, useEffect, useState } from 'react';
import { getDocs, query, collection, where } from 'firebase/firestore';
import { useIsFocused } from '@react-navigation/native';
import { addFavorite, getFavorites, removeFavorite, UsableDato } from '@/services/datosServices';
import { AuthContext } from '@/contexts/AuthContext';
import { db } from '@/configs/firebase';
import { Fact } from '@/components/Fact';

export default function FavoritesPage() {
  const [facts, setFacts] = useState<UsableDato[]>([]);
  const { user } = useContext(AuthContext);
  const isFocused = useIsFocused();

  const initialize = async () => {
    try {
      // get user
      const userSnapshot = (await getDocs(query(collection(db, 'usuarios'), where('uid', '==', user?.uid)))).docs[0];

      // get favorites
      const favorites = await getFavorites(userSnapshot.id);
      console.log("Got Favorites");

      setFacts(favorites);
    } catch (error) {
      console.log("Error initializing FavoritesScreen", error);
    }
  }

  useEffect(() => {
    if (!isFocused) return;
    initialize();
  }, [isFocused]);

  return (
    <ScrollView contentContainerStyle={{ backgroundColor: '#ddd', flexGrow: 1 }}>
      <View style={{ height: 20 }} />
      {facts.map(fact => {
        return (
          <Fact fact={fact} key={fact.id} />
        )
      })}
    </ScrollView>
  );
}