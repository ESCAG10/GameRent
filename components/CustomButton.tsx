import {
    Text,
    TouchableOpacity,
} from "react-native";

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
                padding: 12,
                borderRadius: 10,
                marginVertical: 10,
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