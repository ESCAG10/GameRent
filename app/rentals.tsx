import { FlatList, Text, View } from "react-native";

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