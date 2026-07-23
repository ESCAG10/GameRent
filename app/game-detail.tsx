import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Button, Text, View } from "react-native";



export default function GameDetailScreen() {
    const { id } = useLocalSearchParams();
    //const juego = videojuegosDemo.find(v => v.id === id);
    const [videojuego, setVideojuego] = useState<any>(null);


    useEffect(() => {

        const cargarVideojuego = async () => {
            try {

                const response = await fetch(`http://127.0.0.1:3000/videojuego/${id}`);

                const data = await response.json();

                setVideojuego(data);

            } catch (error) {

                console.log(error);

            }

        };

        cargarVideojuego();

    }, [id]);

    const registrarRenta = (videojuego: any) => {
        console.log("Renta registrada", videojuego);
    }

    if (!videojuego) {
        return <Text>No encontrado</Text>;
    }

    return (
        <View>

            <Text style={{ fontSize: 20 }}>{videojuego.titulo}</Text>
            <Text>Plataforma: {videojuego.plataforma}</Text>
            <Text>Descripción: {videojuego.descripcion}</Text>
            <Text>Precio: ${videojuego.precioRenta}</Text>
            <Text>Stock: {videojuego.stock}</Text>
            <Text>CategoriaID {videojuego.categoriaId}</Text>
            <Button title="Rentar" onPress={() => registrarRenta(videojuego)} />
        </View>
    );
}
