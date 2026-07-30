import { router } from "expo-router";
import { useState } from "react";
import { Alert, Button, ScrollView, StyleSheet, Text, TextInput } from "react-native";

export default function VideojuegoCreateScreen() {

    const [titulo, setTitulo] = useState("");
    const [plataforma, setPlataforma] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [precioRenta, setPrecioRenta] = useState("");
    const [stock, setStock] = useState("");
    const [categoriaId, setCategoriaId] = useState("");

    const guardar = async () => {

        try {

            const response = await fetch("http://127.0.0.1:3000/videojuego", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                },

                body: JSON.stringify({

                    titulo,
                    plataforma,
                    descripcion,
                    precioRenta: Number(precioRenta),
                    stock: Number(stock),
                    categoriaId,
                    activo: true,

                }),

            });

            const data = await response.json();

            if (!response.ok) {

                Alert.alert("Error", data.error || "No se pudo guardar");

                return;

            }

            Alert.alert("Éxito", "Videojuego agregado correctamente");

            router.back();

        }

        catch (error) {

            Alert.alert("Error", "No se pudo conectar con el servidor");

        }

    };

    return (

        <ScrollView
            contentContainerStyle={styles.container}
        >

            <Text style={styles.title}>
                Nuevo Videojuego
            </Text>

            <TextInput
                placeholder="Título"
                value={titulo}
                onChangeText={setTitulo}
                style={styles.input}
            />

            <TextInput
                placeholder="Plataforma"
                value={plataforma}
                onChangeText={setPlataforma}
                style={styles.input}
            />

            <TextInput
                placeholder="Descripción"
                value={descripcion}
                onChangeText={setDescripcion}
                multiline
                style={styles.input}
            />

            <TextInput
                placeholder="Precio de renta"
                keyboardType="numeric"
                value={precioRenta}
                onChangeText={setPrecioRenta}
                style={styles.input}
            />

            <TextInput
                placeholder="Stock"
                keyboardType="numeric"
                value={stock}
                onChangeText={setStock}
                style={styles.input}
            />

            <TextInput
                placeholder="Categoría"
                value={categoriaId}
                onChangeText={setCategoriaId}
                style={styles.input}
            />

            <Button
                title="Guardar Videojuego"
                onPress={guardar}
            />

        </ScrollView>

    );

}

const styles = StyleSheet.create({

    container: {

        padding: 20,
        backgroundColor: "#F5F5F5",
        flexGrow: 1,

    },

    title: {

        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center",

    },

    input: {

        backgroundColor: "#FFF",
        borderWidth: 1,
        borderColor: "#DDD",
        borderRadius: 10,
        padding: 12,
        marginBottom: 15,

    },

});