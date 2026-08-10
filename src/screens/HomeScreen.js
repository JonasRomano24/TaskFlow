import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import EmptyState from "../components/EmptyState";
import TaskDetail from "../components/TaskDetail";
import colors from "../constants/colors";

const HomeScreen = ({ tasks, onAddTask }) => {

    const [selectedTask, setSelectedTask] = useState(null);

    if (selectedTask) {

        return (
            <SafeAreaView style={styles.container}>
                <TaskDetail
                    task={selectedTask}
                    onBack={() => setSelectedTask(null)}
                />
            </SafeAreaView>
        );
    }

    const renderTask = ({ item }) => {

        return (
            <TouchableOpacity
                style={styles.taskCard}
                onPress={() => setSelectedTask(item)}
                activeOpacity={0.7}
            >

                <View style={styles.taskInfo}>

                    <Text style={styles.taskTitle}>
                        {item.title}
                    </Text>

                    <Text
                        style={styles.taskDescription}
                        numberOfLines={2}
                    >
                        {item.description}
                    </Text>

                </View>

                <View style={styles.category}>
                    <Text style={styles.categoryText}>
                        {item.category}
                    </Text>
                </View>

            </TouchableOpacity>
        );
    };

    return (

        <SafeAreaView style={styles.container}>

            <View style={styles.header}>

                <View>
                    <Text style={styles.title}>
                        Mis tareas
                    </Text>

                    <Text style={styles.subtitle}>
                        {tasks.length === 1
                            ? "1 tarea pendiente"
                            : `${tasks.length} tareas pendientes`
                        }
                    </Text>
                </View>

                <TouchableOpacity
                    style={styles.addButton}
                    onPress={onAddTask}
                >
                    <Text style={styles.addButtonText}>
                        + Nueva
                    </Text>
                </TouchableOpacity>

            </View>

            {
                tasks.length === 0 ? (

                    <EmptyState />

                ) : (

                    <FlatList
                        data={tasks}
                        keyExtractor={(item) =>
                            item.id.toString()
                        }
                        renderItem={renderTask}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={
                            styles.listContent
                        }
                    />

                )
            }

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: colors.background,
        paddingHorizontal: 20,
    },

    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
        paddingTop: 10,
    },

    title: {
        fontSize: 26,
        fontWeight: "bold",
        color: colors.text,
    },

    subtitle: {
        marginTop: 4,
        fontSize: 14,
        color: colors.textSecondary,
    },

    addButton: {
        backgroundColor: colors.primary,
        paddingVertical: 10,
        paddingHorizontal: 14,
        borderRadius: 12,
    },

    addButtonText: {
        color: "#FFFFFF",
        fontWeight: "bold",
    },

    listContent: {
        paddingBottom: 20,
    },

    taskCard: {
        backgroundColor: colors.card,
        borderRadius: 16,
        padding: 18,
        marginBottom: 12,
        elevation: 3,
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowRadius: 6,
        shadowOffset: {
            width: 0,
            height: 2,
        },
    },

    taskInfo: {
        marginBottom: 12,
    },

    taskTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: colors.text,
        marginBottom: 6,
    },

    taskDescription: {
        fontSize: 14,
        color: colors.textSecondary,
        lineHeight: 20,
    },

    category: {
        alignSelf: "flex-start",
        backgroundColor: colors.primary,
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 20,
    },

    categoryText: {
        color: "#FFFFFF",
        fontSize: 13,
        fontWeight: "600",
    },

});

export default HomeScreen;