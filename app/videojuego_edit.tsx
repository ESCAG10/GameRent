import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Button, ScrollView, StyleSheet, Text, TextInput, } from "react-native";

export default function VideojuegoEditScreen() {

    const { id } = useLocalSearchParams<{ id: string }>();

    const [titulo, setTitulo] = useState("");
    const [plataforma, setPlataforma] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [precioRenta, setPrecioRenta] = useState("");
    const [stock, setStock] = useState("");
    const [categoriaId, setCategoriaId] = useState("");

    useEffect(() => {
        cargarVideojuego();
    }, []);

    const cargarVideojuego = async () => {

        try {

            const response = await fetch(`http://127.0.0.1:3000/videojuego/${id}`);

            const data = await response.json();

            setTitulo(data.titulo);
            setPlataforma(data.plataforma);
            setDescripcion(data.descripcion);
            setPrecioRenta(data.precioRenta.toString());
            setStock(data.stock.toString());
            setCategoriaId(data.categoriaId);

        } catch (error) {

            Alert.alert("Error", "No se pudo cargar el videojuego");

        }

    };

    const actualizar = async () => {

        try {

            const response = await fetch(`http://127.0.0.1:3000/videojuego/${id}`, {

                method: "PUT",

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

                Alert.alert("Error", data.error || "No se pudo actualizar");

                return;

            }

            Alert.alert("Éxito", "Videojuego actualizado");

            router.back();

        } catch (error) {

            Alert.alert("Error", "No se pudo conectar con el servidor");

        }

    };

    return (

        <ScrollView contentContainerStyle={styles.container}>

            <Text style={styles.title}>
                Editar Videojuego
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
                style={styles.input}
                multiline
            />

            <TextInput
                placeholder="Precio"
                value={precioRenta}
                onChangeText={setPrecioRenta}
                keyboardType="numeric"
                style={styles.input}
            />

            <TextInput
                placeholder="Stock"
                value={stock}
                onChangeText={setStock}
                keyboardType="numeric"
                style={styles.input}
            />

            <TextInput
                placeholder="Categoría"
                value={categoriaId}
                onChangeText={setCategoriaId}
                style={styles.input}
            />

            <Button
                title="Actualizar Videojuego"
                onPress={actualizar}
            />

        </ScrollView>

    );

}

const styles = StyleSheet.create({

    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: "#F5F5F5",
    },

    title: {
        fontSize: 28,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 20,
    },

    input: {
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: "#DDD",
        borderRadius: 10,
        padding: 12,
        marginBottom: 15,
    },

});