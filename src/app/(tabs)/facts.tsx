import { Fact } from '@/components/Fact';
import { db } from '@/configs/firebase';
import { AuthContext } from '@/contexts/AuthContext';
import { getCurrentDate } from '@/utils/utils';
import { useIsFocused } from '@react-navigation/native';
import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react'
import { ScrollView, Text, View } from 'react-native'

export default function FactsScreen() {
  const { user } = useContext(AuthContext);
  const [facts, setFacts] = useState<{ titulo: string, contenido: string, categoria: string, categoriaColor: string, id: string, isFavorite: boolean }[]>([]);
  const isFocused = useIsFocused();

  const getFacts = async () => {
    // facts with fecha == getCurrentDate(), categoriaId in usuario.categorias, just the last for each categoriaId
    let q = query(collection(db, 'usuarios'), where('uid', '==', user?.uid));
    const usuariosSnapshot = await getDocs(q);
    const usuario = usuariosSnapshot.docs[0]?.data() as any;

    // Get categorias
    q = query(collection(db, 'categorias'));
    const categoriasSnapshot = await getDocs(q);
    const categorias = categoriasSnapshot.docs.map(doc => doc.data()) as any;

    // Get facts
    q = query(collection(db, 'datos'), where('fecha', '==', getCurrentDate()), where('categoriaId', 'in', usuario.categorias));
    const datosSnapshot = await getDocs(q);

    const datos = datosSnapshot.docs.map(doc => {
      const data = doc.data();
      const categoria = categorias.find((categoria: any) => categoria.id === data.categoriaId);
      return {
        id: doc.id,
        titulo: data.titulo,
        contenido: data.contenido,
        categoria: categoria.nombre,
        categoriaColor: categoria.color,
        isFavorite: usuario.datos.includes(doc.id)
      }
    }) as any;
    console.log("Got Facts");

    setFacts(datos);
  }

  useEffect(() => {
    if (!isFocused) return;
    getFacts();
  }, [isFocused]);

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={{ height: 20 }} />

      {facts.map((fact) => {
        return (
          <Fact fact={fact} key={fact.id} />
        );
      })}
    </ScrollView>
  );
}
