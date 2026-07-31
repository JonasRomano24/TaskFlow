import React from "react";
import { View, StyleSheet } from "react-native";

import TaskForm from "../components/TaskForm";
import colors from "../constants/colors";

export default function AddTaskScreen() {
    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <TaskForm />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,

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
});