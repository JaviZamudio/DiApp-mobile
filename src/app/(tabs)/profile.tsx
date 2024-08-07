import { Category, UsableCategory } from '@/components/Category';
import { AuthContext } from '@/contexts/AuthContext';
import { getCategories } from '@/services/categoriesServices';
import { useIsFocused, } from '@react-navigation/native';
import { useContext, useEffect, useState } from 'react';
import { FlatList, ScrollView, View } from 'react-native';
import { Avatar, Button, Card, Text, useTheme } from 'react-native-paper';

export default function ProfileScreen() {
  const { logout, user } = useContext(AuthContext);
  const [categories, setCategories] = useState<UsableCategory[]>([]);
  const isScreenFocused = useIsFocused();
  const theme = useTheme()

  useEffect(() => {
    getCategories(user?.uid).then((categories) => {
      setCategories(categories);
    });
  }, [isScreenFocused]);

  return (
    <ScrollView contentContainerStyle={{ padding: 4 * 4 }}>

      {/* <Text>
        Name: {user?.displayName}
        Email: {user?.email}
      </Text> */}

      <Card>
        <Card.Title
          // title="Profile"
          // subtitle="User Information"
          title={user?.name}
          subtitle={user?.email}
          left={(props) => <Avatar.Icon {...props} icon="account" />}
        />
        {/* <Card.Content>
          <Text>
            <Text style={{ fontWeight: 'bold' }}>Name:</Text> {user?.name}
          </Text>
          <Text>
            <Text style={{ fontWeight: 'bold' }}>Email:</Text> {user?.email}
          </Text>
        </Card.Content> */}

        <Card.Actions>
          <Button mode='outlined' onPress={() => logout()} icon='logout' textColor={theme.colors.error}>
            Logout
          </Button>
        </Card.Actions>
      </Card>


      {/* Categories */}
      <Text style={{ fontSize: 20, marginTop: 20 }}>Categories</Text>
      {/* <FlatList
        data={categories}
        renderItem={({ item }) => <Category category={item} />}
        keyExtractor={item => item.id}
      /> */}
      {categories.map((category) => {
        return (
          <Category category={category} key={category.id} />
        );
      })}

    </ScrollView >
  );
}