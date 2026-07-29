import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from "react";
import { Alert, FlatList, Text, View } from "react-native";

interface RentalItem {
    id: string;
    titulo: string;
    periodoRenta: number;
    fechaRenta: string;
    fechaEntrega: string;
    categoriaId: string;
    activo: boolean;
}

interface RentalsScreenProps {
    rentas: RentalItem[];
}

export default function RentalsScreen({ rentas }: RentalsScreenProps) {


    const [renta, setRenta] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {


        const registrarRenta = async () => {

            const usuarioId = await AsyncStorage.getItem("usuarioId");

            if (!usuarioId) {
                console.log("No hay usuario logueado");
                return;
            }

            const videojuegoId = await AsyncStorage.getItem("videojuegoId");

            if (!videojuegoId) {
                console.log("No hay videojuego logueado");
                return;
            }

            const usuario = JSON.parse(usuarioId);
            const videojuego = JSON.parse(videojuegoId);


            const renta = {
                usuarioId: usuario.id,
                videojuegoId: videojuego.id,
                fechaInicio: new Date(),
                fechaFin: new Date(
                    Date.now() + 7 * 24 * 60 * 60 * 1000
                ),
                estado: "Activa"
            };


            console.log("Renta enviada:", renta);


            const response = await fetch(
                `http://localhost:3000/renta/usuario/${usuarioId}`

            );

            const texto = await response.text();

            console.log("Respuesta:", texto);

            if (!response.ok) {
                Alert.alert("Error", texto);
                return;
            }
            const data = JSON.parse(texto);


        };
        registrarRenta();
    }, []);

    return (


        <View>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>MIS RENTAS</Text>

            <FlatList
                data={rentas}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={{ marginVertical: 10 }}>
                        <Text style={{ fontSize: 18 }}>{item.titulo}</Text>
                        <Text style={{ fontSize: 16 }}>
                            {item.periodoRenta} días restantes
                        </Text>
                        <Text>Fecha de renta: {item.fechaRenta}</Text>
                        <Text>Entrega: {item.fechaEntrega}</Text>
                        <Text>Categoría: {item.categoriaId}</Text>
                        <Text>Estado: {item.activo ? "Activo" : "Finalizado"}</Text>
                    </View>
                )}
                ListEmptyComponent={
                    <Text style={{ textAlign: "center", marginTop: 20 }}>
                        No tienes rentas registradas.
                    </Text>
                }
            />
        </View>
    );
}