import React from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
} from "react-native";

import colors from "../constants/colors";

const TaskDetail = ({ task, onBack }) => {

    const formattedDate = new Date(
        task.createdAt
    ).toLocaleDateString("es-UY", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });

    return (

        <View style={styles.container}>

            <View style={styles.card}>

                <Text style={styles.sectionTitle}>
                    Detalle de tarea
                </Text>

                <Text style={styles.title}>
                    {task.title}
                </Text>

                <View style={styles.separator} />

                <Text style={styles.label}>
                    Descripción
                </Text>

                <Text style={styles.description}>
                    {task.description}
                </Text>

                <Text style={styles.label}>
                    Categoría
                </Text>

                <View style={styles.category}>
                    <Text style={styles.categoryText}>
                        {task.category}
                    </Text>
                </View>

                <Text style={styles.label}>
                    Fecha de creación
                </Text>

                <Text style={styles.date}>
                    {formattedDate}
                </Text>

                <TouchableOpacity
                    style={styles.button}
                    onPress={onBack}
                >
                    <Text style={styles.buttonText}>
                        Volver
                    </Text>
                </TouchableOpacity>

            </View>

        </View>
    );
};

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: colors.background,
        justifyContent: "center",
        padding: 20,
    },

    card: {
        width: "100%",
        maxWidth: 420,
        alignSelf: "center",
        backgroundColor: colors.card,
        borderRadius: 20,
        padding: 24,
        elevation: 8,
        shadowColor: "#000",
        shadowOpacity: 0.15,
        shadowRadius: 10,
        shadowOffset: {
            width: 0,
            height: 4,
        },
    },

    sectionTitle: {
        fontSize: 14,
        color: colors.primary,
        fontWeight: "600",
        marginBottom: 8,
        textTransform: "uppercase",
    },

    title: {
        fontSize: 26,
        fontWeight: "bold",
        color: colors.text,
    },

    separator: {
        height: 1,
        backgroundColor: "#E5E7EB",
        marginVertical: 20,
    },

    label: {
        fontSize: 14,
        fontWeight: "600",
        color: colors.textSecondary,
        marginTop: 15,
        marginBottom: 6,
    },

    description: {
        fontSize: 16,
        color: colors.text,
        lineHeight: 24,
    },

    category: {
        alignSelf: "flex-start",
        backgroundColor: colors.primary,
        paddingVertical: 8,
        paddingHorizontal: 14,
        borderRadius: 20,
    },

    categoryText: {
        color: "#FFFFFF",
        fontWeight: "600",
    },

    date: {
        fontSize: 16,
        color: colors.text,
    },

    button: {
        marginTop: 25,
        backgroundColor: colors.primary,
        padding: 15,
        borderRadius: 12,
        alignItems: "center",
    },

    buttonText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "bold",
    },

});

export default TaskDetail;