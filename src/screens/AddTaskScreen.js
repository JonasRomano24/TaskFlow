import React from "react";
import {
    View,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    TouchableOpacity,
    Text,
    Alert,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";

import TaskForm from "../components/TaskForm";
import { addTask } from "../store/taskSlice";
import colors from "../constants/colors";

export default function AddTaskScreen() {

    const navigation = useNavigation();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);

    const handleTaskCreated = async (taskInput) => {
        try {
            await dispatch(
                addTask({
                    task: taskInput,
                    userId: user.uid,
                })
            ).unwrap();

            Alert.alert(
                "Éxito",
                "Tarea creada correctamente"
            );

            navigation.navigate("TaskList");
        } catch (error) {
            console.error("Error al crear la tarea:", error);

            Alert.alert(
                "Error",
                "No se pudo guardar la tarea."
            );
        }
    };
    return (

        <SafeAreaView style={styles.safeArea}>

            <KeyboardAvoidingView
                style={styles.container}
                behavior={
                    Platform.OS === "ios"
                        ? "padding"
                        : "height"
                }
            >

                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >

                    <View style={styles.card}>

                        <Text style={styles.title}>
                            Nueva tarea
                        </Text>

                        <TaskForm
                            onTaskCreated={handleTaskCreated}
                        />

                        <TouchableOpacity
                            style={styles.backButton}
                            onPress={() => navigation.goBack()}
                        >
                            <Text style={styles.backButtonText}>
                                Volver a mis tareas
                            </Text>
                        </TouchableOpacity>

                    </View>

                </ScrollView>

            </KeyboardAvoidingView>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({

    safeArea: {
        flex: 1,
        backgroundColor: colors.background,
    },

    container: {
        flex: 1,
        backgroundColor: colors.background,
    },

    scrollContent: {
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },

    card: {
        width: "100%",
        maxWidth: 420,
        backgroundColor: colors.card,
        borderRadius: 20,
        padding: 22,

        elevation: 8,

        shadowColor: "#000",
        shadowOpacity: 0.15,
        shadowRadius: 10,

        shadowOffset: {
            width: 0,
            height: 4,
        },
    },

    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: colors.text,
        marginBottom: 10,
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
