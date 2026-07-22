import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Button, FlatList, StyleSheet, Text, TextInput, View } from "react-native";

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

    const videojuegoFiltrado = videojuego
        .filter((videojuego) => videojuego.titulo
            .toLowerCase().includes(busqueda.toLowerCase()));


    useEffect(() => {

        const cargarVideojuego = async () => {

            try {
                const response = await fetch("http://127.0.0.1:3000/videojuego");
                const data = await response.json();
                setVideojuego(data ?? []);

            }


            catch (error) {
                console.error(error)
            }
        }; cargarVideojuego();

    }, []);

    return (
        <View style={styles.container}>

            {/* Encabezado */}

            <View style={styles.header}>

                <Text style={styles.welcome}>
                    Bienvenido 👋
                </Text>

                <Text style={styles.title}>
                    GameRent
                </Text>

            </View>

            {/* Banner */}

            <View style={styles.banner}>

                <Text style={styles.bannerEmoji}>
                    🎮
                </Text>

                <Text style={styles.bannerTitle}>
                    Promociones Especiales
                </Text>

                <Text style={styles.bannerText}>
                    Renta dos videojuegos y obtén un día extra.
                </Text>

            </View>

            {/* Barra de búsqueda */}

            <TextInput
                placeholder="🔍 Buscar videojuego..."
                value={busqueda}
                onChangeText={setBusqueda}
                style={styles.search}
            />

            {/* Lista */}

            <FlatList

                data={videojuegoFiltrado}

                keyExtractor={(item) => item.id}

                renderItem={({ item }) => (

                    <View style={styles.card}>

                        {/* Portada simulada */}

                        <View style={styles.gamePlaceholder}>

                            <Text style={styles.gameEmoji}>
                                🎮
                            </Text>

                        </View>

                        <Text style={styles.gameTitle}>
                            {item.titulo}
                        </Text>

                        <Text>
                            Plataforma: {item.plataforma}
                        </Text>

                        <Text>
                            Precio: ${item.precioRenta}
                        </Text>

                        <Text>
                            Stock: {item.stock}
                        </Text>

                        <View style={styles.detailButton}>

                            <Button
                                title="Ver Detalle"
                                onPress={() => router.push({ pathname: "/game-detail", params: { id: item.id } })}
                            />


                        </View>

                    </View>

                )}

                ListEmptyComponent={
                    <Text style={styles.empty}>
                        No hay videojuegos registrados.
                    </Text>
                }

            />

            {/* Botones inferiores */}

            <View style={styles.bottomButtons}>

                <View style={styles.buttonContainer}>

                    <Button
                        title="Mis Rentas"
                        onPress={() => router.push("/rentals")}
                    />

                </View>

                <View style={styles.buttonContainer}>

                    <Button
                        title="Perfil"
                        onPress={() => router.push("/profile")}
                    />

                </View>

            </View>

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

    detailButton: {
        marginTop: 10,
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