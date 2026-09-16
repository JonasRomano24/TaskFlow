import React, { useEffect, useLayoutEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { Ionicons } from "@expo/vector-icons";

import EmptyState from "../components/EmptyState";
import {
    selectFilteredTasks,
    selectFilter,
    setFilter,
    toggleTaskStatus,
    setTasks,
} from "../store/taskSlice";
import { subscribeToTasks } from "../services/taskService";
import colors from "../constants/colors";

const FILTERS = [
    { value: "all", label: "Todas" },
    { value: "pending", label: "Pendientes" },
    { value: "completed", label: "Completadas" },
];

const HomeScreen = () => {

    const navigation = useNavigation();
    const dispatch = useDispatch();
    const tasks = useSelector(selectFilteredTasks);
    const activeFilter = useSelector(selectFilter);
    const user = useSelector((state) => state.auth.user);

    useEffect(() => {
        if (!user?.uid) return;

        const unsubscribe = subscribeToTasks(
            user.uid,
            (tasks) => {
                dispatch(setTasks(tasks));
            }
        );

        return unsubscribe;
    }, [dispatch, user?.uid]);

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

                <TouchableOpacity
                    style={styles.checkbox}
                    hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                    onPress={() =>
                        dispatch(
                            toggleTaskStatus({
                                id: item.id,
                                completed: item.completed,
                            })
                        )
                    }
                >
                    <Ionicons
                        name={item.completed ? "checkmark-circle" : "ellipse-outline"}
                        size={24}
                        color={item.completed ? colors.primary : colors.textSecondary}
                    />
                </TouchableOpacity>

                <View style={styles.taskContent}>

                    <View style={styles.taskInfo}>

                        <Text
                            style={[
                                styles.taskTitle,
                                item.completed && styles.taskTitleDone,
                            ]}
                        >
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

                </View>

            </TouchableOpacity>
        );
    };

    return (

        <SafeAreaView style={styles.container} edges={["left", "right", "bottom"]}>

            <View style={styles.filterRow}>
                {
                    FILTERS.map((f) => (
                        <TouchableOpacity
                            key={f.value}
                            style={[
                                styles.filterChip,
                                activeFilter === f.value && styles.filterChipActive,
                            ]}
                            onPress={() => dispatch(setFilter(f.value))}
                        >
                            <Text
                                style={[
                                    styles.filterChipText,
                                    activeFilter === f.value && styles.filterChipTextActive,
                                ]}
                            >
                                {f.label}
                            </Text>
                        </TouchableOpacity>
                    ))
                }
            </View>

            <Text style={styles.subtitle}>
                {tasks.length === 1
                    ? "1 tarea"
                    : `${tasks.length} tareas`
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

    filterRow: {
        flexDirection: "row",
        gap: 8,
        marginTop: 14,
    },

    filterChip: {
        borderWidth: 1,
        borderColor: "#D1D5DB",
        paddingVertical: 6,
        paddingHorizontal: 14,
        borderRadius: 20,
        backgroundColor: colors.card,
    },

    filterChipActive: {
        backgroundColor: colors.primary,
        borderColor: colors.primary,
    },

    filterChipText: {
        fontSize: 13,
        fontWeight: "600",
        color: colors.textSecondary,
    },

    filterChipTextActive: {
        color: "#FFFFFF",
    },

    subtitle: {
        marginTop: 12,
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
        flexDirection: "row",
        alignItems: "flex-start",
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

    checkbox: {
        marginRight: 12,
        marginTop: 2,
    },

    taskContent: {
        flex: 1,
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

    taskTitleDone: {
        textDecorationLine: "line-through",
        color: colors.textSecondary,
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
