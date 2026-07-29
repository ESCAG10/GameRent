import AsyncStorage from "@react-native-async-storage/async-storage";
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

export default function RentalsScreen() {
    const [rentas, setRentas] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const cargarRentas = async () => {
            try {
                const usuarioId = await AsyncStorage.getItem("usuarioId");
                console.log("Usuario ID:", usuarioId);

                if (!usuarioId) {
                    Alert.alert("Error", "No hay un usuario logueado");
                    setLoading(false);
                    return;
                }

                const response = await fetch(
                    `http://localhost:3000/renta/usuario/${usuarioId}`
                );

                const texto = await response.text();
                console.log("Respuesta:", texto);

                if (!response.ok) {
                    Alert.alert("Error", texto);
                    setLoading(false);
                    return;
                }

                const data = JSON.parse(texto);
                console.log("Datos recibidos:", data);

                setRentas(Array.isArray(data) ? data : []);
            } catch (error: any) {
                console.log("Error:", error);
                Alert.alert("Error", "No se pudieron cargar las rentas");
            } finally {
                setLoading(false);
            }
        };

        cargarRentas();
    }, []);

    if (loading) {
        return (
            <View style={{ padding: 20 }}>
                <Text>Cargando rentas...</Text>
            </View>
        );
    }

    return (
        <View style={{ flex: 1, padding: 20 }}>
            <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 20 }}>
                MIS RENTAS
            </Text>

            <FlatList
                data={rentas}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View
                        style={{
                            marginBottom: 15,
                            padding: 15,
                            borderWidth: 1,
                            borderRadius: 10,
                        }}
                    >
                        <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                            {item.titulo}
                        </Text>

                        <Text style={{ marginTop: 5 }}>
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