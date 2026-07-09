import { Text, View } from "react-native";

interface GameCardProps {
    title: string;
    platform: string;
    price: number;
}

export default function GameCard({
    title,
    platform,
    price,
}: GameCardProps) {
    return (
        <View
            style={{
                borderWidth: 1,
                padding: 15,
                marginVertical: 10,
                borderRadius: 10,
            }}
        >
            <Text>{title}</Text>

            <Text>{platform}</Text>

            <Text>${price}</Text>
        </View>
    );
}