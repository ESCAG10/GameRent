import { Stack } from "expo-router";
// import "../global.css";

export default function Layout() {
  return (
    <Stack>

      <Stack.Screen
        name="index"
        options={{
          title: "Login",
        }}
      />

      <Stack.Screen
        name="home"
        options={{
          title: "Inicio",
        }}
      />

      <Stack.Screen
        name="game-detail"
        options={{
          title: "Detalle del Juego",
        }}
      />

      <Stack.Screen
        name="rentals"
        options={{
          title: "Mis Rentas",
        }}
      />

      <Stack.Screen
        name="profile"
        options={{
          title: "Perfil",
        }}
      />

    </Stack>
  );
}
