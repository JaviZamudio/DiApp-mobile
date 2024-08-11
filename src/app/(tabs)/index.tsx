import { FIREBASE_CONFIG, NASA_API_KEY } from "@/configs/configs";
import { db } from "@/configs/firebase";
import { prepareFactsForFuture } from "@/services/datosServices";
import { getCurrentDate } from "@/utils/utils";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Image, ScrollView, View } from "react-native";
import { Card, Text, useTheme } from "react-native-paper";

export default function HomePage() {
  const theme = useTheme();
  const [apod, setApod] = useState({
    title: '',
    url: '',
    explanation: ''
  });
  const [factOfTheDay, setFactOfTheDay] = useState({
    contenido: '',
    titulo: ''
  });
  const [conmemoration, setConmemoration] = useState({
    contenido: '',
  });

  const getAPOD = async () => {
    const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}`);
    const body = await response.json();

    console.log("Got APOD");
    setApod(body);
  }

  const getFactOfTheDay = async () => {
    // fact with categoriaId = dato-del-dia and fecha = today (dd/mm/yyyy)
    const q = query(collection(db, 'datos'), where('categoriaId', '==', 'dato-del-dia'), where('fecha', '==', getCurrentDate()));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.log('No matching documents.');
      console.log(`Querying: find datos where categoriaId == dato-del-dia and fecha == ${getCurrentDate()}`);
      return;
    }

    setFactOfTheDay(querySnapshot.docs[0]?.data() as any);
    console.log("Got Fact of the day");
  }

  const getConmemoration = async () => {
    // efemeride with fecha == getCurrentDate()
    const q = query(collection(db, 'efemerides'), where('fecha', '==', getCurrentDate()));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.log('No matching documents in efemerides.');
      return;
    }

    setConmemoration(querySnapshot.docs[0]?.data() as any);
    console.log("Got Conmemoration");
  }

  useEffect(() => {
    getAPOD();
    getFactOfTheDay();
    getConmemoration();
    prepareFactsForFuture();
  }, []);

  return (
    <ScrollView>
      {/* Fact of the day */}
      <Card style={{ backgroundColor: theme.colors.surface, padding: 20, margin: 20, borderRadius: 10, marginBottom: 0 }}>
        {/* Fact title */}
        <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>
          {factOfTheDay.titulo}
        </Text>
        {/* Fact data */}
        <Text style={{ fontSize: 16, marginBottom: 10 }}>
          {factOfTheDay.contenido}
        </Text>
        {/* Tag (#FactOfTheDay) */}
        <Text style={{ fontSize: 16, color: '#aaa', textAlign: 'right' }}>
          #FactOfTheDay
        </Text>
      </Card>

      {/* Conmemoration */}
      <Card style={{ backgroundColor: theme.colors.surface, padding: 20, margin: 20, borderRadius: 10, marginBottom: 0, display: conmemoration.contenido ? undefined : 'none' }}>
        {/* Conmemoration title */}
        <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>
          {getCurrentDate()}
        </Text>
        {/* Conmemoration data */}
        <Text style={{ fontSize: 16, marginBottom: 10 }}>
          {conmemoration.contenido}
        </Text>
        {/* Tag (#Conmemoration) */}
        <Text style={{ fontSize: 16, color: '#aaa', textAlign: 'right' }}>
          #Conmemoration
        </Text>
      </Card>

      {/* Astronomy picture of the day */}
      <Card style={{ backgroundColor: theme.colors.surface, padding: 20, margin: 20, borderRadius: 10 }}>
        {/* Astronomy picture of the day title */}
        <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>
          {apod.title}
        </Text>
        {/* Astronomy picture of the day data */}
        {apod.url &&
          <Image
            source={{ uri: apod.url }}
            style={{ width: '100%', marginBottom: 10, aspectRatio: 16 / 9, borderRadius: 10 }}
          />
        }
        {/* Tag (#AstronomyPictureOfTheDay) */}
        <Text style={{ fontSize: 16, color: '#aaa', textAlign: 'right' }}>
          #AstronomyPictureOfTheDay
        </Text>
      </Card>
    </ScrollView>
  );
}
