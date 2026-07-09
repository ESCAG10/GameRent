import { router } from "expo-router";
import { Button, Text, TextInput, View } from "react-native";

export default function HomeScreen() {
    return (
        <View>

            <Text>
                Catálogo de Videojuegos
            </Text>

            <TextInput
                placeholder="Buscar juego"
            />

            <Text>FIFA 26</Text>

            <Button
                title="Ver Detalle"
                onPress={() =>
                    router.push("/game-detail")
                }
            />

            <Button
                title="Mis Rentas"
                onPress={() =>
                    router.push("/rentals")
                }
            />

            <Button
                title="Perfil"
                onPress={() =>
                    router.push("/profile")
                }
            />

        </View>
    );
}