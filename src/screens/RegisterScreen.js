import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";

import colors from "../constants/colors";
import { register } from "../services/authService";

const RegisterScreen = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleRegister = async () => {
        setError(null);

        if (password.length < 6) {
            setError("La contraseña necesita al menos 6 caracteres.");
            return;
        }

        setLoading(true);

        try {
            await register(email, password, firstName, lastName);
            // Igual que en Login: el onAuthStateChanged se encarga de la navegación.
        } catch (err) {
            setError(traducirError(err.code));
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Crear cuenta</Text>

            {error && <Text style={styles.error}>{error}</Text>}

            <TextInput
                style={styles.input}
                placeholder="Nombre"
                value={firstName}
                onChangeText={setFirstName}
            />

            <TextInput
                style={styles.input}
                placeholder="Apellido"
                value={lastName}
                onChangeText={setLastName}
            />

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
                placeholder="Contraseña (mínimo 6 caracteres)"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            <TouchableOpacity style={styles.button} onPress={handleRegister} disabled={loading}>
                <Text style={styles.buttonText}>{loading ? "Creando cuenta..." : "Registrarme"}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text style={styles.link}>¿Ya tenés cuenta? Iniciá sesión</Text>
            </TouchableOpacity>
        </View>
    );
};

function traducirError(code) {
    switch (code) {
        case "auth/email-already-in-use":
            return "Ese email ya tiene una cuenta.";
        case "auth/invalid-email":
            return "El email no es válido.";
        case "auth/weak-password":
            return "La contraseña es muy débil.";
        default:
            return "No se pudo crear la cuenta. Probá de nuevo.";
    }
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", padding: 24, backgroundColor: colors.background },
    title: { fontSize: 28, fontWeight: "bold", color: colors.text, textAlign: "center", marginBottom: 24 },
    input: { backgroundColor: colors.card, borderRadius: 8, padding: 12, marginBottom: 12, fontSize: 16 },
    button: { backgroundColor: colors.primary, borderRadius: 8, padding: 14, alignItems: "center", marginTop: 8 },
    buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
    link: { color: colors.primary, textAlign: "center", marginTop: 16 },
    error: { color: "#d32f2f", textAlign: "center", marginBottom: 12 },
});

export default RegisterScreen;