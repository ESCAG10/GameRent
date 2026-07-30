import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function HomeScreen() {

    const videojuegoDemo = [

        {
            id: "5",
            titulo: "Forza Horizon 5",
            plataforma: "Xbox Series X",
            descripcion: "Juego de carreras...",
            precioRenta: 60,
            stock: 7,
            activo: true,
            categoriaId: "Carreras",
        },
    ];

    const [videojuego, setVideojuego] = useState<any[]>([]);

    const [busqueda, setBusqueda] = useState("");

    const [rol, setRol] = useState("");

    const videojuegoFiltrado = videojuego
        .filter((videojuego) => videojuego.titulo
            .toLowerCase().includes(busqueda.toLowerCase()));


    useEffect(() => {

        const cargarRol = async () => {

            const rolGuardado = await AsyncStorage.getItem("rol");

            if (rolGuardado) {
                setRol(rolGuardado);
            }

        };

        const cargarVideojuego = async () => {

            try {

                const response = await fetch("http://127.0.0.1:3000/videojuego");

                const data = await response.json();

                setVideojuego(data ?? []);

            } catch (error) {

                console.error(error);

            }

        };

        cargarRol();
        cargarVideojuego();

    }, []);

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <View>
                    <Text style={styles.title}>🎮 Catálogo</Text>
                    <Text style={styles.subtitle}>
                        Encuentra tu próximo videojuego
                    </Text>
                </View>

                <TouchableOpacity
                    style={styles.profileButton}
                    onPress={() => router.push("/profile")}
                >
                    <Text style={styles.profileText}>👤</Text>
                </TouchableOpacity>
            </View>

            {/* Buscador */}
            <TextInput
                placeholder="Buscar videojuego..."
                placeholderTextColor="#999"
                style={styles.search}
                value={busqueda}
                onChangeText={setBusqueda}
            />

            {/* Botón rentas */}
            <TouchableOpacity
                style={styles.rentasButton}
                onPress={() => router.push("/rentals")}
            >
                <Text style={styles.rentasText}>📦 Mis Rentas</Text>
            </TouchableOpacity>

            {/* Opciones del administrador */}
            {rol === "administrador" && (
                <>
                    <TouchableOpacity
                        style={styles.rentasButton}
                        onPress={() => router.push("/videojuego_create")}
                    >
                        <Text style={styles.rentasText}>
                            ➕ Agregar Videojuego
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.rentasButton}
                        onPress={() => router.push("/rentals_admin")}
                    >
                        <Text style={styles.rentasText}>
                            📋 Administrar Rentas
                        </Text>
                    </TouchableOpacity>
                </>
            )}

            {/* Lista */}

            <FlatList
                data={videojuego}
                keyExtractor={(item: any) => item.id}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 20 }}
                renderItem={({ item }: any) => (
                    <View style={styles.card}>
                        <View style={styles.topRow}>
                            <Text style={styles.gameTitle}>
                                {item.titulo}
                            </Text>

                            <Text style={styles.price}>
                                ${item.precioRenta}
                            </Text>
                        </View>

                        <Text style={styles.platform}>
                            {item.plataforma}
                        </Text>

                        <TouchableOpacity
                            style={styles.detailButton}
                            onPress={() =>
                                router.push({
                                    pathname: "/game-detail",
                                    params: {
                                        id: item.id,
                                    },
                                })
                            }
                        >
                            <Text style={styles.detailText}>
                                Ver detalles
                            </Text>
                        </TouchableOpacity>

                        {rol === "administrador" && (
                            <TouchableOpacity
                                style={styles.detailButton}
                                onPress={() =>
                                    router.push({
                                        pathname: "/videojuego_edit",
                                        params: {
                                            id: item.id,
                                        },
                                    })
                                }
                            >
                                <Text style={styles.detailText}>
                                    ✏️ Editar
                                </Text>
                            </TouchableOpacity>
                        )}

                    </View>

                )}

                ListEmptyComponent={
                    <Text style={styles.empty}>
                        No hay videojuegos registrados.
                    </Text>
                }


            />
        </View>


    );

}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#F5F5F5",
        padding: 20,
    },

    header: {
        marginBottom: 20,
    },

    welcome: {
        fontSize: 18,
        color: "#666",
    },

    title: {
        fontSize: 30,
        fontWeight: "bold",
        color: "#1F2937",
    },

    banner: {
        backgroundColor: "#2563EB",
        borderRadius: 15,
        padding: 20,
        alignItems: "center",
        marginBottom: 20,
    },

    bannerEmoji: {
        fontSize: 50,
    },

    bannerTitle: {
        color: "#FFFFFF",
        fontSize: 22,
        fontWeight: "bold",
        marginTop: 10,
    },

    bannerText: {
        color: "#FFFFFF",
        textAlign: "center",
        marginTop: 10,
    },

    search: {
        backgroundColor: "#FFFFFF",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#DDD",
        padding: 12,
        marginBottom: 20,
    },

    card: {
        backgroundColor: "#FFFFFF",
        borderRadius: 15,
        padding: 15,
        marginBottom: 15,
        elevation: 5,
    },

    gamePlaceholder: {
        height: 150,
        backgroundColor: "#D6E4FF",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 12,
        marginBottom: 15,
    },

    gameEmoji: {
        fontSize: 60,
    },

    gameTitle: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 8,
    },

    subtitle: {
        fontSize: 14,
        color: "#666",
    },

    profileButton: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: "#E5E7EB",
        alignItems: "center",
        justifyContent: "center",
    },

    profileText: {
        fontSize: 24,
    },

    rentasButton: {
        backgroundColor: "#2563EB",
        borderRadius: 10,
        padding: 12,
        marginBottom: 15,
        alignItems: "center",
    },

    rentasText: {
        color: "#FFFFFF",
        fontWeight: "bold",
        fontSize: 16,
    },

    topRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
    },

    price: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#2563EB",
    },

    platform: {
        fontSize: 14,
        color: "#666",
        marginBottom: 10,
    },

    detailButton: {
        marginTop: 10,
        backgroundColor: "#F0F0F0",
        borderRadius: 8,
        padding: 10,
        alignItems: "center",
    },

    detailText: {
        color: "#333",
        fontWeight: "600",
    },

    empty: {
        textAlign: "center",
        marginVertical: 20,
        color: "#666",
    },

    bottomButtons: {
        marginTop: 10,
        alignItems: "center",
    },

    buttonContainer: {
        width: 220,
        marginVertical: 8,
    },

});