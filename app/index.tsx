import { router } from "expo-router";
import { Button, Text, TextInput, View } from "react-native";

export default function LoginScreen() {
  return (

    <View>
      <Text>
        GAME RENT
      </Text>


      <Text>Correo</Text>

      <TextInput placeholder="correo@ejemplo.com"
      />

      <Text>Contraseña</Text>

      <TextInput secureTextEntry
        placeholder="********"
      />

      <Button title="Ingresar"
        onPress={() => router.push("/home")}
      />
    </View>
  );
}