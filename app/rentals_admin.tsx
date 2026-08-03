import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Alert, Button, FlatList, StyleSheet, Text, View, } from "react-native";

export default function RentalsAdminScreen() {

    const [renta, setRenta] = useState<any[]>([]);

    const cargarRenta = async () => {

        try {

            const usuarioId = await AsyncStorage.getItem("usuarioId");
            console.log("Usuario ID:", usuarioId);

            const response = await fetch("http://localhost:3000/renta");

            const data = await response.json();

            setRenta(data ?? []);

        } catch (error) {

            Alert.alert("Error", "No se pudieron cargar las rentas");

        }

    };

    useEffect(() => {

        cargarRenta();

    }, []);



    const eliminar = async (rentaId: string) => {

        Alert.alert(

            "Eliminar",

            "¿Desea eliminar esta renta?",

            [
                { text: "Cancelar", style: "cancel" },
                {

                    text: "Eliminar",

                    onPress: async () => {

                        try {
                            const response = await fetch(
                                `http://localhost:3000/renta/${rentaId}`,
                                {
                                    method: "DELETE",
                                }
                            );

                            if (!response.ok) {

                                Alert.alert("Error", "No se pudo eliminar");

                                return;

                            }

                            Alert.alert("Éxito", "Renta eliminada");
                            cargarRenta();
                        } catch (error) {

                            Alert.alert("Error", "No se pudo conectar");

                        }

                    },

                },

            ]

        );

    };

    return (

        <View style={styles.container}>

            <Text style={styles.title}>
                Administrar Rentas
            </Text>

            <FlatList

                data={renta}

                keyExtractor={(item) => item.id}

                renderItem={({ item }) => (

                    <View style={styles.card}>

                        <Text style={styles.nombre}>
                            {item.videojuegoId}
                        </Text>

                        <Text>
                            Usuario: {item.usuarioId}
                        </Text>

                        <Text>
                            FechaRenta: {item.fechaRenta}
                        </Text>

                        <Text>
                            FechaEntrega: {item.fechaEntrega}
                        </Text>

                        <Text>
                            Estado: {item.estado}
                        </Text>



                        <View style={styles.boton}>

                            <Button

                                title="Eliminar"

                                color="red"

                                onPress={() => eliminar(item.id)}

                            />

                        </View>

                    </View>

                )}

                ListEmptyComponent={

                    <Text style={styles.empty}>
                        No hay rentas registradas.
                    </Text>

                }

            />

        </View>

    );

}

const styles = StyleSheet.create({

    container: {

        flex: 1,
        backgroundColor: "#F5F5F5",
        padding: 20,

    },

    title: {

        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center",

    },

    card: {

        backgroundColor: "#FFF",
        borderRadius: 12,
        padding: 15,
        marginBottom: 15,
        elevation: 4,

    },

    nombre: {

        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,

    },

    boton: {

        marginTop: 10,

    },

    empty: {

        textAlign: "center",
        marginTop: 40,

    },

});