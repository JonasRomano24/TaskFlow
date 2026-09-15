import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";

import colors from "../constants/colors";
import { login } from "../services/authService";

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        setError(null);
        setLoading(true);

        try {
            await login(email, password);
            // No navegamos a mano: el onAuthStateChanged en AppNavigator
            // detecta la sesión nueva y cambia solo al Tab Navigator.
        } catch (err) {
            setError(traducirError(err.code));
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>TaskFlow</Text>
            <Text style={styles.subtitle}>Iniciá sesión para ver tus tareas</Text>

            {error && <Text style={styles.error}>{error}</Text>}

            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
            />

            <TextInput
                style={styles.input}
                placeholder="Contraseña"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
                <Text style={styles.buttonText}>{loading ? "Ingresando..." : "Ingresar"}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                <Text style={styles.link}>¿No tenés cuenta? Registrate</Text>
            </TouchableOpacity>
        </View>
    );
};

function traducirError(code) {
    switch (code) {
        case "auth/invalid-email":
            return "El email no es válido.";
        case "auth/invalid-credential":
        case "auth/wrong-password":
        case "auth/user-not-found":
            return "Email o contraseña incorrectos.";
        default:
            return "No se pudo iniciar sesión. Probá de nuevo.";
    }
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", padding: 24, backgroundColor: colors.background },
    title: { fontSize: 32, fontWeight: "bold", color: colors.text, textAlign: "center" },
    subtitle: { fontSize: 14, color: colors.textSecondary, textAlign: "center", marginBottom: 24 },
    input: { backgroundColor: colors.card, borderRadius: 8, padding: 12, marginBottom: 12, fontSize: 16 },
    button: { backgroundColor: colors.primary, borderRadius: 8, padding: 14, alignItems: "center", marginTop: 8 },
    buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
    link: { color: colors.primary, textAlign: "center", marginTop: 16 },
    error: { color: "#d32f2f", textAlign: "center", marginBottom: 12 },
});

export default LoginScreen;