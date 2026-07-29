import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Button, Text, View } from "react-native";

export default function GameDetailScreen() {

    const { id } = useLocalSearchParams();

    const [videojuego, setVideojuego] = useState<any>(null);


    useEffect(() => {

        const cargarVideojuego = async () => {
            try {
                const response = await fetch(
                    `http://127.0.0.1:3000/videojuego/${id}`
                );

                const data = await response.json();

                console.log("Videojuego:", data);

                setVideojuego(data);

            } catch (error) {

                console.log(error);

            }

        };

        cargarVideojuego();

    }, [id]);

    const registrarRenta = async () => {
        try {

            const usuarioId = await AsyncStorage.getItem("usuarioId");

            if (!usuarioId) {
                Alert.alert("Error", "No hay un usuario logueado");
                return;
            }

            const hoy = new Date();
            const entrega = new Date();
            entrega.setDate(hoy.getDate() + 7);

            const renta = {
                usuarioId: usuarioId,
                videojuegoId: videojuego.id,
                categoriaId: videojuego.categoriaId,
                fechaRenta: hoy.toISOString().substring(0, 10),
                periodoRenta: 7,
                fechaEntrega: entrega.toISOString().substring(0, 10),
                estado: "Activo",
                activo: true,
            };

            console.log("Enviando renta:");
            console.log(renta);

            const response = await fetch("http://127.0.0.1:3000/renta", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(renta),
            });

            const data = await response.json();

            console.log("Respuesta del servidor:");
            console.log(data);

            if (!response.ok) {
                Alert.alert("Error", data.error || "No se pudo registrar la renta");
                return;
            }

            Alert.alert("Éxito", "Renta registrada correctamente");
        } catch (error) {

            console.log(error);
            Alert.alert("Error", "Ocurrió un error");
        }
    };

    if (!videojuego) {
        return (
            <View>
                <Text>Cargando...</Text>
            </View>
        );
    }

    return (
        <View style={{ flex: 1, padding: 20 }}>
            <Text style={{ fontSize: 22, fontWeight: "bold" }}>
                {videojuego.titulo}
            </Text>


            <Text>Plataforma: {videojuego.plataforma}</Text>
            <Text>Descripción: {videojuego.descripcion}</Text>
            <Text>Precio: ${videojuego.precioRenta}</Text>
            <Text>Stock: {videojuego.stock}</Text>
            <Text>Categoría: {videojuego.categoriaId}</Text>

            <View style={{ marginTop: 20 }}>
                <Button
                    title="Rentar videojuego"
                    onPress={registrarRenta}
                />
            </View>
        </View>
    );
}
