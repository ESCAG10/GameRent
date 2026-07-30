import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, Alert, StyleSheet, Text, View } from "react-native";

export default function LoginScreen() {
    const { correo, password } = useLocalSearchParams<{
        correo: string;
        password: string;
    }>();

    useEffect(() => {
        iniciarSesion();
    }, [correo, password]);

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
                Alert.alert("Error", data.error || "Credenciales incorrectas");
                router.back();
                return;
            }

            await AsyncStorage.setItem("usuarioId", data.usuario.id);

            await AsyncStorage.setItem("rol", data.usuario.rol);

            console.log("usuarioId:", data.usuario.id);
            console.log("rol:", data.usuario.rol);

            router.replace("/home");
        } catch (err) {
            console.log(err);
            Alert.alert("Error", "No se pudo iniciar sesión");
            router.back();
        }
    };

    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color="#2563EB" />
            <Text style={styles.text}>Iniciando sesión...</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        marginTop: 20,
        fontSize: 18,
    },
});