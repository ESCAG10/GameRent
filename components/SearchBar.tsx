import { TextInput } from "react-native";

export default function SearchBar() {
    return (
        <TextInput
            placeholder="Buscar videojuego..."
            style={{
                borderWidth: 1,
                padding: 10,
                borderRadius: 10,
                marginVertical: 10,
                width: 200,
                alignSelf: "center"
            }}
        />



    );
}