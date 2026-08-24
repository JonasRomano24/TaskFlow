import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";

import HomeScreen from "../screens/HomeScreen";
import TaskDetailScreen from "../screens/TaskDetailScreen";
import AddTaskScreen from "../screens/AddTaskScreen";
import ProfileScreen from "../screens/ProfileScreen";
import colors from "../constants/colors";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Stack de tareas: se anida DENTRO de la pestaña "Home".
// TaskList -> TaskDetail (al tocar una tarea) y TaskList -> TaskForm (al crear una).
function TaskStackNavigator() {

    return (
        <Stack.Navigator
            initialRouteName="TaskList"
            screenOptions={{
                headerStyle: { backgroundColor: colors.card },
                headerTintColor: colors.text,
                headerTitleStyle: { fontWeight: "bold" },
            }}
        >
            <Stack.Screen
                name="TaskList"
                component={HomeScreen}
                options={{ title: "Mis Tareas" }}
            />

            <Stack.Screen
                name="TaskDetail"
                component={TaskDetailScreen}
                options={{ title: "Detalle de tarea" }}
            />

            <Stack.Screen
                name="TaskForm"
                component={AddTaskScreen}
                options={{ title: "Nueva tarea" }}
            />
        </Stack.Navigator>
    );
}

export default function AppNavigator() {

    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={{
                    tabBarActiveTintColor: colors.primary,
                    tabBarInactiveTintColor: colors.textSecondary,
                }}
            >
                <Tab.Screen
                    name="Home"
                    component={TaskStackNavigator}
                    options={{
                        // El Stack interno maneja sus propios headers.
                        headerShown: false,
                        title: "Tareas",
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="list" size={size} color={color} />
                        ),
                    }}
                />

                <Tab.Screen
                    name="Perfil"
                    component={ProfileScreen}
                    options={{
                        title: "Mi Perfil",
                        headerStyle: { backgroundColor: colors.card },
                        headerTintColor: colors.text,
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="person" size={size} color={color} />
                        ),
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
}
