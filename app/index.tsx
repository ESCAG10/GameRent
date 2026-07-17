import { router } from "expo-router";
import { Image, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function LoginScreen() {
  return (

    <ImageBackground
      source={require("../assets/images/android-icon-background.png")}
      style={styles.background}
      resizeMode="cover"
    >

      {/* Overlay */}

      <View style={styles.overlay}>

        {/* Card */}

        <View style={styles.card}>

          {/* Logo */}

          <Image
            source={require("../assets/images/icon.png")}
            style={styles.logo}
          />

          {/* Título */}

          <Text style={styles.title}>
            GAME RENT
          </Text>

          {/* Subtítulo */}

          <Text style={styles.subtitle}>
            Renta tus videojuegos favoritos
          </Text>

          {/* Correo */}

          <Text style={styles.label}>
            Correo
          </Text>

          <TextInput
            placeholder="correo@ejemplo.com"
            keyboardType="email-address"
            style={styles.input}
          />

          {/* Contraseña */}

          <Text style={styles.label}>
            Contraseña
          </Text>

          <TextInput
            placeholder="********"
            secureTextEntry
            style={styles.input}
          />

          {/* Botón */}

          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push("../home")}
          >

            <Text style={styles.buttonText}>
              Ingresar
            </Text>

          </TouchableOpacity>

          {/* Pie */}

          <Text style={styles.footer}>
            Versión 1.0
          </Text>

        </View>

      </View>

    </ImageBackground>

  );

}

const styles = StyleSheet.create({

  background: {
    flex: 1,
    justifyContent: "center",
  },

  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.55)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  card: {
    width: 360,
    backgroundColor: "#FFFFFF",
    borderRadius: 25,
    padding: 25,
    alignItems: "center",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },

    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },

  logo: {
    width: 110,
    height: 110,
    marginBottom: 15,
    alignSelf: "center",
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#2C3E50",
    alignSelf: "center",
  },

  subtitle: {
    fontSize: 16,
    color: "#666",
    marginTop: 8,
    marginBottom: 30,
    textAlign: "center",
  },

  label: {
    alignSelf: "flex-start",
    marginBottom: 6,
    marginTop: 10,
    fontWeight: "600",
    color: "#444",
  },

  input: {
    width: "100%",
    backgroundColor: "#F2F2F2",
    borderRadius: 12,
    padding: 14,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#DDD",
    alignSelf: "center",
  },

  button: {
    width: "100%",
    backgroundColor: "#2563EB",
    padding: 15,
    borderRadius: 12,
    marginTop: 20,
    alignSelf: "center",
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },

  footer: {
    marginTop: 25,
    color: "#888",
    fontSize: 12,
    textAlign: "center",
  },

});