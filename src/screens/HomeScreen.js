import React, { useLayoutEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

import EmptyState from "../components/EmptyState";
import { useTasks } from "../context/TasksContext";
import colors from "../constants/colors";

const HomeScreen = () => {

    const navigation = useNavigation();
    const { tasks } = useTasks();

    // El botón "+ Nueva" ahora vive en el header nativo de la pantalla,
    // no en un header propio (así el título de arriba queda consistente
    // con el resto de las pantallas).
    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => navigation.navigate("TaskForm")}
                >
                    <Text style={styles.addButtonText}>
                        + Nueva
                    </Text>
                </TouchableOpacity>
            ),
        });
    }, [navigation]);

    const renderTask = ({ item }) => {

        return (
            <TouchableOpacity
                style={styles.taskCard}
                onPress={() =>
                    navigation.navigate("TaskDetail", {
                        id: item.id,
                        title: item.title,
                    })
                }
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

        <SafeAreaView style={styles.container} edges={["left", "right", "bottom"]}>

            <Text style={styles.subtitle}>
                {tasks.length === 1
                    ? "1 tarea pendiente"
                    : `${tasks.length} tareas pendientes`
                }
            </Text>

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

    subtitle: {
        marginTop: 14,
        marginBottom: 8,
        fontSize: 14,
        color: colors.textSecondary,
    },

    addButton: {
        backgroundColor: colors.primary,
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 10,
        marginRight: 12,
    },

    addButtonText: {
        color: "#FFFFFF",
        fontWeight: "bold",
        fontSize: 13,
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
