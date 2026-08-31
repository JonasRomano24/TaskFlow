import React from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Alert,
} from "react-native";

import { useRoute, useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";

import { selectTaskById, toggleTaskStatus, deleteTask } from "../store/taskSlice";
import colors from "../constants/colors";

const TaskDetailScreen = () => {

    const route = useRoute();
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const { id, title } = route.params;

    // Se lee directo del store con useSelector: si esta tarea cambia
    // (por ejemplo, se completa desde acá), HomeScreen se entera solo,
    // sin que nadie tenga que "avisarle".
    const task = useSelector(selectTaskById(id));

    const formattedDate = task
        ? new Date(task.createdAt).toLocaleDateString("es-UY", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        })
        : null;

    const handleToggle = () => {
        dispatch(toggleTaskStatus(id));
    };

    const handleDelete = () => {
        Alert.alert(
            "Eliminar tarea",
            "¿Seguro que querés eliminar esta tarea?",
            [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "Eliminar",
                    style: "destructive",
                    onPress: () => {
                        dispatch(deleteTask(id));
                        navigation.navigate("TaskList");
                    },
                },
            ]
        );
    };

    return (

        <View style={styles.container}>

            <View style={styles.card}>

                <Text style={styles.sectionTitle}>
                    Detalle de tarea
                </Text>

                <Text style={styles.title}>
                    {task?.title ?? title}
                </Text>

                <View style={styles.separator} />

                {task ? (
                    <>
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
                            Estado
                        </Text>

                        <View
                            style={[
                                styles.statusBadge,
                                task.completed && styles.statusBadgeDone,
                            ]}
                        >
                            <Text
                                style={[
                                    styles.statusText,
                                    task.completed && styles.statusTextDone,
                                ]}
                            >
                                {task.completed ? "Completada" : "Pendiente"}
                            </Text>
                        </View>

                        <Text style={styles.label}>
                            Fecha de creación
                        </Text>

                        <Text style={styles.date}>
                            {formattedDate}
                        </Text>

                        <TouchableOpacity
                            style={styles.toggleButton}
                            onPress={handleToggle}
                        >
                            <Text style={styles.toggleButtonText}>
                                {task.completed
                                    ? "Marcar como pendiente"
                                    : "Marcar como completada"}
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.deleteButton}
                            onPress={handleDelete}
                        >
                            <Text style={styles.deleteButtonText}>
                                Eliminar tarea
                            </Text>
                        </TouchableOpacity>
                    </>
                ) : (
                    <Text style={styles.description}>
                        No se encontró información adicional para esta tarea.
                    </Text>
                )}

                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <Text style={styles.backButtonText}>
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

    statusBadge: {
        alignSelf: "flex-start",
        backgroundColor: "#E5E7EB",
        paddingVertical: 8,
        paddingHorizontal: 14,
        borderRadius: 20,
    },

    statusBadgeDone: {
        backgroundColor: "#DCFCE7",
    },

    statusText: {
        color: colors.textSecondary,
        fontWeight: "600",
    },

    statusTextDone: {
        color: "#16A34A",
    },

    date: {
        fontSize: 16,
        color: colors.text,
    },

    toggleButton: {
        marginTop: 25,
        backgroundColor: colors.primary,
        padding: 15,
        borderRadius: 12,
        alignItems: "center",
    },

    toggleButtonText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "bold",
    },

    deleteButton: {
        marginTop: 12,
        backgroundColor: "#FEE2E2",
        padding: 15,
        borderRadius: 12,
        alignItems: "center",
    },

    deleteButtonText: {
        color: "#DC2626",
        fontSize: 16,
        fontWeight: "bold",
    },

    backButton: {
        marginTop: 15,
        alignItems: "center",
        padding: 12,
    },

    backButtonText: {
        color: colors.primary,
        fontWeight: "600",
        fontSize: 15,
    },

});

export default TaskDetailScreen;
