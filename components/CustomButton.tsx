import { Text, TouchableOpacity, } from "react-native";

interface CustomButtonProps {
    title: string;
    onPress: () => void;
}

export default function CustomButton({
    title,
    onPress,
}: CustomButtonProps) {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={{
                backgroundColor: "#2563EB",
                padding: 10,
                borderRadius: 5,
                marginVertical: 10,
                width: 200,
            }}
        >
            <Text
                style={{
                    color: "white",
                    textAlign: "center",
                }}
            >
                {title}
            </Text>
        </TouchableOpacity>
    );
}