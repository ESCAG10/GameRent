import { Image, Text, View } from "react-native";

export default function ProfileScreen() {
    return (
        <View>

            <Image
                source={require("../assets/images/favicon.png")}
                style={{ width: 100, height: 100, borderRadius: 50, marginBottom: 20 }}
            />

            <Text>
                <Text style={{ marginTop: 10, width: 200, fontSize: 20 }}>
                    PERFIL
                </Text>
            </Text>

            <Text>
                <Text style={{ marginTop: 10, width: 200, fontSize: 18, }}>
                    Nombre: Emiliano
                </Text>
            </Text>

            <Text>
                <Text style={{ marginTop: 10, width: 200, fontSize: 18, }}>
                    Correo: usuario@email.com
                </Text>
            </Text>

            <Text>
                <Text style={{ marginTop: 10, width: 200, fontSize: 18, }}>
                    Teléfono: 9991234567
                </Text>
            </Text>

            <Text>
                <Text style={{ marginTop: 10, width: 200, fontSize: 18, }}>
                    FechaRegistro:
                </Text>
            </Text>

            <Text>
                <Text style={{ marginTop: 20, fontSize: 16, color: "#333" }}>
                    Registro de actividades: No hay videojuegos registrados.
                </Text>
            </Text>

        </View>
    );
}