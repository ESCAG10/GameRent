import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

interface Usuario {
    id: string;
    nombre: string;
    correo: string;
    fechaRegistro: string;
}

export default function ProfileScreen() {
    const [usuario, setUsuario] = useState<Usuario | null>(null);
    const [loading, setLoading] = useState(true);

    const cargarPerfil = async () => {
        try {
            const usuarioId = await AsyncStorage.getItem("usuarioId");

            if (!usuarioId) return;

            const response = await fetch(
                `http://localhost:3000/usuario/${usuarioId}`
            );

            const data = await response.json();
            setUsuario(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            cargarPerfil();
        }, [])
    );

    if (loading) {
        return (
            <View style={styles.loading}>
                <ActivityIndicator size="large" color="#2563EB" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Mi Perfil</Text>

            <View style={styles.card}>
                <Text style={styles.label}>Nombre</Text>
                <Text style={styles.value}>{usuario?.nombre}</Text>

                <Text style={styles.label}>Correo</Text>
                <Text style={styles.value}>{usuario?.correo}</Text>

                <Text style={styles.label}>Fecha de registro</Text>
                <Text style={styles.value}>{usuario?.fechaRegistro}</Text>

                <Text style={styles.label}>ID</Text>
                <Text style={styles.id}>{usuario?.id}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F3F4F6",
        padding: 20,
        justifyContent: "center",
    },

    loading: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },

    title: {
        fontSize: 30,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 30,
        color: "#1E3A8A",
    },

    card: {
        backgroundColor: "#fff",
        borderRadius: 18,
        padding: 22,
        elevation: 5,
    },

    label: {
        fontSize: 13,
        color: "#6B7280",
        marginTop: 15,
    },

    value: {
        fontSize: 18,
        fontWeight: "600",
        color: "#111827",
    },

    id: {
        fontSize: 12,
        color: "#6B7280",
        marginTop: 5,
    },
});