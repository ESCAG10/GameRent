import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function HomeScreen() {

    const [videojuego, setVideojuego] = useState<any[]>([]);
    const [busqueda, setBusqueda] = useState("");
    const [rol, setRol] = useState("");

    const videojuegoFiltrado = Array.isArray(videojuego)
        ? videojuego.filter((item: any) =>
            (item.titulo ?? "")
                .toLowerCase()
                .includes(busqueda.toLowerCase())
        )
        : [];

    useEffect(() => {

        const cargarRol = async () => {

            const rolGuardado = await AsyncStorage.getItem("rol");

            if (rolGuardado) {
                setRol(rolGuardado);
            }

        };

        const cargarVideojuego = async () => {

            try {

                const response = await fetch("http://localhost:3000/videojuego");

                const data = await response.json();

                setVideojuego(Array.isArray(data) ? data : []);

            } catch (error) {

                console.error(error);
                setVideojuego([]);

            }

        };

        cargarRol();
        cargarVideojuego();

    }, []);

    return (

        <View style={styles.container}>

            <View style={styles.header}>

                <View>

                    <Text style={styles.title}>
                        🎮 Catálogo
                    </Text>

                    <Text style={styles.subtitle}>
                        Encuentra tu próximo videojuego
                    </Text>

                </View>

                <TouchableOpacity
                    style={styles.profileButton}
                    onPress={() => router.push("/profile")}
                >

                    <Text style={styles.profileText}>
                        👤
                    </Text>

                </TouchableOpacity>

            </View>

            <TextInput
                placeholder="Buscar videojuego..."
                placeholderTextColor="#999"
                style={styles.search}
                value={busqueda}
                onChangeText={setBusqueda}
            />

            <TouchableOpacity
                style={styles.rentasButton}
                onPress={() => router.push("/rentals")}
            >

                <Text style={styles.rentasText}>
                    📦 Mis Rentas
                </Text>

            </TouchableOpacity>

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

            <FlatList
                data={videojuegoFiltrado}
                keyExtractor={(item: any, index) =>
                    item.id ? item.id.toString() : index.toString()
                }
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
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    title: {
        fontSize: 30,
        fontWeight: "bold",
        color: "#1F2937",
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

    search: {
        backgroundColor: "#FFFFFF",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#DDD",
        padding: 12,
        marginBottom: 20,
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

    card: {
        backgroundColor: "#FFFFFF",
        borderRadius: 15,
        padding: 15,
        marginBottom: 15,
        elevation: 5,
    },

    topRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
    },

    gameTitle: {
        fontSize: 22,
        fontWeight: "bold",
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

});