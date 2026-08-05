import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Alert, Button, FlatList, StyleSheet, Text, View } from "react-native";

export default function RentalsAdminScreen() {

    const [renta, setRenta] = useState<any[]>([]);


    const cargarRenta = async () => {

        try {

            await AsyncStorage.getItem("usuarioId");


            const response = await fetch(
                "http://localhost:3000/renta"
            );


            const data = await response.json();


            setRenta(data ?? []);


        } catch (error) {


            Alert.alert(
                "Error",
                "No se pudieron cargar las rentas"
            );


        }

    };



    useEffect(() => {

        cargarRenta();

    }, []);




    const eliminar = async (rentaId: any) => {


        try {


            const response = await fetch(

                `http://localhost:3000/renta/${String(rentaId)}`,

                {
                    method: "DELETE",
                }

            );



            const data = await response.json();




            if (!response.ok) {


                Alert.alert(
                    "Error",
                    data.error || "No se pudo eliminar"
                );


                return;


            }





            Alert.alert(
                "Éxito",
                data.message
            );





            setRenta((prev) =>

                prev.filter(
                    (r) => r.id !== rentaId
                )

            );



        } catch {


            Alert.alert(
                "Error",
                "No se pudo conectar"
            );


        }


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


                            {item.nombreUsuario}


                        </Text>





                        <Text style={styles.idUsuario}>


                            ID Usuario: {item.usuarioId}


                        </Text>






                        <Text style={styles.videojuegoNombre}>


                            Videojuego: {item.nombreVideojuego}


                        </Text>





                        <Text style={styles.idVideojuego}>


                            ID Videojuego: {item.videojuegoId}


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

        marginBottom: 2,


    },







    idUsuario: {


        fontSize: 11,

        color: "#777",

        marginBottom: 10,


    },







    videojuegoNombre: {


        fontSize: 16,

        fontWeight: "bold",

        marginTop: 5,


    },








    idVideojuego: {


        fontSize: 11,

        color: "#777",

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