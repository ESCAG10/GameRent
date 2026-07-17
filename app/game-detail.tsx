import { useLocalSearchParams } from "expo-router";
import { Button, Text, View } from "react-native";

const videojuegosDemo = [
    { id: "1", titulo: "FIFA 26", plataforma: "PS5", descripcion: "El último juego de fútbol...", precio: 50, stock: 8, categoriaId: "Deportes" },
    { id: "2", titulo: "Halo Infinite", plataforma: "Xbox Series X", descripcion: "Shooter futurista...", precio: 45, stock: 6, categoriaId: "Accion" },
    { id: "3", titulo: "Minecraft", plataforma: "PC", descripcion: "Juego de construcción...", precio: 30, stock: 12, categoriaId: "Sandbox" },
    { id: "4", titulo: "Resident Evil 4", plataforma: "PS5", descripcion: "Juego de terror...", precio: 55, stock: 4, categoriaId: "Terror" },
    { id: "5", titulo: "Forza Horizon 5", plataforma: "Xbox Series X", descripcion: "Juego de carreras...", precio: 60, stock: 7, categoriaId: "Carreras" },
];

export default function GameDetailScreen() {
    const { id } = useLocalSearchParams();
    const juego = videojuegosDemo.find(v => v.id === id);

    if (!juego) {
        return <Text>Juego no encontrado</Text>;
    }

    const registrarRenta = (videojuego: typeof juego) => {
        console.log("Renta registrada", videojuego);
    }

    return (
        <View>
            <Text style={{ fontSize: 20 }}>{juego.titulo}</Text>
            <Text>Plataforma: {juego.plataforma}</Text>
            <Text>Descripción: {juego.descripcion}</Text>
            <Text>Precio: ${juego.precio}</Text>
            <Text>Stock: {juego.stock}</Text>
            <Text>CategoriaID {juego.categoriaId}</Text>
            <Button title="Rentar" onPress={() => registrarRenta(juego)} />
        </View>
    );
}
