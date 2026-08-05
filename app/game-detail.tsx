import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Button, Text, View } from "react-native";

export default function GameDetailScreen() {

    const { id } = useLocalSearchParams();

    const [videojuego, setVideojuego] = useState<any>(null);
    const [rol, setRol] = useState("");


    useEffect(() => {

        const cargarRol = async () => {

            const r = await AsyncStorage.getItem("rol");

            if (r) {
                setRol(r);
            }

        };

        const cargarVideojuego = async () => {
            try {
                const response = await fetch(`http://localhost:3000/videojuego/${id}`);
                const data = await response.json();

                console.log("VIDEOJUEGO:");
                console.log(data);

                setVideojuego(data);

            } catch (error) {

                console.log(error);

            }

        };

        cargarRol();

        cargarVideojuego();

    }, [id]);

    const registrarRenta = async () => {
        try {

            const usuarioId = await AsyncStorage.getItem("usuarioId");

            console.log("========== DATOS ==========");
            console.log("usuarioId:", usuarioId);
            console.log("videojuegoId:", videojuego.id);
            console.log("categoriaId:", videojuego.categoriaId);
            console.log("===========================");

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

            console.log("JSON enviado:");
            console.log(JSON.stringify(renta, null, 2));

            const response = await fetch("http://localhost:3000/renta", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(renta),
            });

            const data = await response.json();

            console.log("RESPUESTA DEL SERVIDOR:");
            console.log(data);

            if (!response.ok) {
                Alert.alert("Error", data.error);
                return;
            }

            Alert.alert("Éxito", "Renta registrada");
        } catch (error) {

            console.log(error);

        }
    };

    const eliminarVideojuego = async () => {

        Alert.alert(

            "Eliminar",

            "¿Desea eliminar este videojuego?",

            [

                {
                    text: "Cancelar",
                    style: "cancel",
                },

                {

                    text: "Eliminar",

                    onPress: async () => {

                        try {

                            const response = await fetch(
                                `http://localhost:3000/videojuego/${videojuego.id}`,
                                {
                                    method: "DELETE",
                                }
                            );

                            if (!response.ok) {

                                Alert.alert("Error", "No se pudo eliminar");

                                return;

                            }

                            Alert.alert(
                                "Éxito",
                                "Videojuego eliminado",
                                [
                                    {
                                        text: "OK",
                                        onPress: () => router.replace("/home"),
                                    },
                                ]
                            );

                            router.back();

                        } catch (error) {

                            Alert.alert(
                                "Error",
                                "No se pudo conectar con el servidor"
                            );

                        }

                    },

                },

            ]

        );

    };

    if (!videojuego) {
        return <Text>Cargando...</Text>;
    }

    return (
        <View style={{ padding: 20 }}>

            <Text style={{ fontSize: 22, fontWeight: "bold" }}>
                {videojuego.titulo}
            </Text>

            <Text>Plataforma: {videojuego.plataforma}</Text>

            <Text>Descripción: {videojuego.descripcion}</Text>

            <Text>Precio: ${videojuego.precioRenta}</Text>

            <Text>Stock: {videojuego.stock}</Text>

            <View style={{ marginTop: 20 }}>

                {rol === "cliente" && (

                    <Button
                        title="Rentar"
                        onPress={registrarRenta}
                    />

                )}

                {rol === "administrador" && (

                    <>
                        <Button
                            title="Editar Videojuego"
                            onPress={() =>
                                router.push({
                                    pathname: "/videojuego_edit",
                                    params: {
                                        id: videojuego.id,
                                    },
                                })
                            }
                        />

                        <View style={{ height: 10 }} />

                        <Button
                            color="red"
                            title="Eliminar Videojuego"
                            onPress={() => eliminarVideojuego()}
                        />
                    </>

                )}

            </View>

        </View>
    );
}