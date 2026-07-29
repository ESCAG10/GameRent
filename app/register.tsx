import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View, } from "react-native";

export default function LoginScreen() {
    const [correo, setCorreo] = useState("");
    const [password, setPassword] = useState("");

    const iniciarSesion = async () => {
        try {
            const response = await fetch("http://127.0.0.1:3000/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    correo,
                    password,
                }),
            });

            const data = await response.json();

            console.log(data);

            if (!response.ok) {
                Alert.alert("Error", data.error);
                return;
            }

            await AsyncStorage.setItem("usuarioId", data.usuario.id);

            const guardarUsuarioId = async (id: string) => {
                await AsyncStorage.setItem("usuarioId", id);
            };


            Alert.alert("Éxito", "Sesión iniciada");
        } catch (err) {
            console.log(err);
            Alert.alert("Error", "No se pudo iniciar sesión");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Iniciar Sesión</Text>

            <TextInput
                placeholder="Correo"
                value={correo}
                onChangeText={setCorreo}
                style={styles.input}
            />

            <TextInput
                placeholder="Contraseña"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={styles.input}
            />

            <TouchableOpacity style={styles.button} onPress={iniciarSesion}>
                <Text style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", padding: 20 },
    title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 10,
        marginBottom: 15,
        borderRadius: 8,
    },
    button: {
        backgroundColor: "#2563EB",
        padding: 15,
        borderRadius: 8,
    },
    buttonText: {
        color: "#fff",
        textAlign: "center",
        fontWeight: "bold",
    },
});