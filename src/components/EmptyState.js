import React from "react";
import {
    View,
    Text,
    StyleSheet,
} from "react-native";

import colors from "../constants/colors";

const EmptyState = () => {

    return (

        <View style={styles.container}>

            <Text style={styles.icon}>
                📝
            </Text>

            <Text style={styles.title}>
                Lista vacía
            </Text>

            <Text style={styles.message}>
                ¡No tienes tareas pendientes!
                {"\n"}
                Empieza por crear una arriba.
            </Text>

        </View>
    );
};

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 30,
    },

    icon: {
        fontSize: 50,
        marginBottom: 15,
    },

    title: {
        fontSize: 22,
        fontWeight: "bold",
        color: colors.text,
        marginBottom: 10,
    },

    message: {
        fontSize: 16,
        color: colors.textSecondary,
        textAlign: "center",
        lineHeight: 24,
    },

});

export default EmptyState;