import React from "react";
import {
    View,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    ScrollView
} from "react-native";

import TaskForm from "../components/TaskForm";
import colors from "../constants/colors";

export default function AddTaskScreen() {

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >

            <ScrollView
                contentContainerStyle={styles.scrollContent}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
            >

                <View style={styles.card}>
                    <TaskForm />
                </View>

            </ScrollView>

        </KeyboardAvoidingView>
    );
}


const styles = StyleSheet.create({

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

});