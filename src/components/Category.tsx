import { AuthContext } from "@/contexts/AuthContext";
import { addCategory, removeCategory } from "@/services/categoriesServices";
import { useContext, useState } from "react";
import { View } from "react-native";
import { Checkbox, Text } from "react-native-paper";

export interface UsableCategory {
  id: string;
  nombre: string;
  color: string;
  inUser: boolean;
}
export function Category({ category }: { category: UsableCategory; }) {
  const { user } = useContext(AuthContext);
  const [checked, setChecked] = useState(category.inUser);

  const handlePress = async () => {
    if (checked) {
      console.log("Removing category");
      await removeCategory(user?.uid, category.id);
    } else {
      console.log("Adding category");
      await addCategory(user?.uid, category.id);
    }

    setChecked(!checked);
  };

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10, marginLeft: 20 }}>
      <View style={{ width: 20, height: 20, borderRadius: 10, backgroundColor: category.color }}></View>
      <Text style={{ marginLeft: 10 }}>{category.nombre}</Text>

      <Checkbox
        status={checked ? 'checked' : 'unchecked'}
        onPress={handlePress} />
    </View>
  );
}