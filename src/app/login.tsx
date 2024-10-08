import { AuthContext } from "@/contexts/AuthContext";
import { useContext, useState } from "react";
import { View, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native";
import { Button, Text, TextInput, useTheme } from "react-native-paper";

const logo = require('@/../assets/LogoPNG.png');

export default function LoginPage() {
  const [loginOrRegister, setLoginOrRegister] = useState("login");
  const theme = useTheme();

  return (
    <ScrollView contentContainerStyle={{ ...styles.fullContainer, backgroundColor: theme.colors.background }}>
      <Image source={logo} style={styles.logoImage} />
      <Text style={styles.title}>DiApp</Text>

      {/* Selection between login and register */}
      <View style={{ display: 'flex', flexDirection: 'row', marginVertical: 30, justifyContent: 'center', alignItems: 'center' }}>
        <TouchableOpacity
          style={{
            width: 150, borderBottomColor: loginOrRegister === "login" ? '#01a0aa' : '#ddd',
            padding: 5,
            borderBottomWidth: 3,
          }}
          // onTouchEnd={() => setLoginOrRegister("login")}
          onPress={() => setLoginOrRegister("login")}
        >
          <Text style={{ textAlign: 'center', fontSize: 18 }}>
            Login
          </Text>
        </TouchableOpacity>
        <View style={{ height: 25, width: 0, borderLeftWidth: 1, borderLeftColor: '#ddd', marginHorizontal: 10 }} />
        <TouchableOpacity
          style={{
            width: 150, borderBottomColor: loginOrRegister === "register" ? '#01a0aa' : '#ddd',
            padding: 5,
            borderBottomWidth: 3,
          }}
          // onTouchEnd={() => setLoginOrRegister("register")}
          onPress={() => setLoginOrRegister("register")}
        >
          <Text style={{ textAlign: 'center', fontSize: 18 }}>
            Register
          </Text>
        </TouchableOpacity>
      </View>

      {loginOrRegister === "login" ? <LoginForm /> : <RegisterForm />}
    </ScrollView>
  )
}

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);

  return (
    <>
      <TextInput style={styles.textinput} placeholder="Email" keyboardType='email-address' onChangeText={setEmail} value={email} />
      <TextInput style={styles.textinput} placeholder="Password" secureTextEntry={true} maxLength={20} onChangeText={setPassword} value={password} />

      <Button mode="contained" style={styles.button} onPress={() => login(email, password)}>
        Login
      </Button>
    </>
  );
}

const RegisterForm = () => {
  const [form, setForm] = useState({
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
  });

  const { signup } = useContext(AuthContext);

  const handleFormChange = (key: string, value: string) => {
    setForm({ ...form, [key]: value });
  }

  const handleRegister = () => {
    // verify form
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    signup(form.email, form.password, form.name);
  }

  return (
    <>
      <TextInput style={styles.textinput} placeholder="Email" keyboardType='email-address' onChangeText={(text) => handleFormChange("email", text)} value={form.email} />
      <TextInput style={styles.textinput} placeholder="Name" onChangeText={(text) => handleFormChange("name", text)} value={form.name} />
      <TextInput style={styles.textinput} placeholder="Password" secureTextEntry={true} maxLength={20} onChangeText={(text) => handleFormChange("password", text)} value={form.password} />
      <TextInput style={styles.textinput} placeholder="Confirm Password" secureTextEntry={true} maxLength={20} onChangeText={(text) => handleFormChange("confirmPassword", text)} value={form.confirmPassword} />

      <Button mode="contained" style={styles.button} onPress={handleRegister}>
        Register
      </Button>
    </>
  );
}

const styles = StyleSheet.create({
  fullContainer: {
    display: 'flex',
    flexGrow: 1,
    paddingVertical: 4 * 14,
    overflow: "scroll",
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoImage: {
    width: 150,
    height: 150,
    marginBottom: 20,
    objectFit: 'contain',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  textinput: {
    marginVertical: 10,
    backgroundColor: 'transparent',
    width: 300,
  },
  button: {
    padding: 4 * 1,
    width: 150,
    marginTop: 20,
  },
});
