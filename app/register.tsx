import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import {
    Alert,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function RegisterScreen() {
    const [nombre, setNombre] = useState("");
    const [correo, setCorreo] = useState("");
    const [password, setPassword] = useState("");
    const [mensaje, setMensaje] = useState("");

    const IniciarSesion = async () => {
        const usuario = {
            nombre,
            correo,
            password,
            rol: "cliente",
            activo: true,
        };

        try {
            const response = await fetch("http://127.0.0.1:3000/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(usuario),
            });

            const data = await response.json();

            console.log("Respuesta del login:", data);

            if (!response.ok) {
                Alert.alert("Error", data.error || "Error al iniciar sesión");
                return;
            }

            // Guarda el ID correcto
            await AsyncStorage.setItem("usuarioId", data.id);

            // Verificar que se guardó
            const guardado = await AsyncStorage.getItem("usuarioId");
            console.log("Usuario ID guardado:", guardado);

            setMensaje("Inicio de sesión exitoso");
        } catch (error) {
            console.log(error);
            setMensaje("Error al iniciar sesión");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Registro</Text>

            <TextInput
                placeholder="Nombre"
                value={nombre}
                onChangeText={setNombre}
                style={styles.input}
            />

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

            <TouchableOpacity style={styles.button} onPress={IniciarSesion}>
                <Text style={styles.buttonText}>Registrarse</Text>
            </TouchableOpacity>

            {mensaje ? <Text>{mensaje}</Text> : null}
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