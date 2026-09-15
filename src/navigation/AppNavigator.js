import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { ActivityIndicator, View } from "react-native";
import { onAuthStateChanged } from "firebase/auth";

import HomeScreen from "../screens/HomeScreen";
import TaskDetailScreen from "../screens/TaskDetailScreen";
import AddTaskScreen from "../screens/AddTaskScreen";
import ProfileScreen from "../screens/ProfileScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import colors from "../constants/colors";
import { auth } from "../services/firebase";
import { setUser, clearUser } from "../store/authSlice";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const AuthStack = createNativeStackNavigator();

// Stack de tareas: se anida DENTRO de la pestaña "Home".
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
            <Stack.Screen name="TaskList" component={HomeScreen} options={{ title: "Mis Tareas" }} />
            <Stack.Screen name="TaskDetail" component={TaskDetailScreen} options={{ title: "Detalle de tarea" }} />
            <Stack.Screen name="TaskForm" component={AddTaskScreen} options={{ title: "Nueva tarea" }} />
        </Stack.Navigator>
    );
}

// Stack público: se ve solo cuando NO hay usuario logueado.
function AuthStackNavigator() {
    return (
        <AuthStack.Navigator screenOptions={{ headerShown: false }}>
            <AuthStack.Screen name="Login" component={LoginScreen} />
            <AuthStack.Screen name="Register" component={RegisterScreen} />
        </AuthStack.Navigator>
    );
}

// Tabs privados: se ven solo cuando SÍ hay usuario logueado.
function MainTabNavigator() {
    return (
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
                    headerShown: false,
                    title: "Tareas",
                    tabBarIcon: ({ color, size }) => <Ionicons name="list" size={size} color={color} />,
                }}
            />
            <Tab.Screen
                name="Perfil"
                component={ProfileScreen}
                options={{
                    title: "Mi Perfil",
                    headerStyle: { backgroundColor: colors.card },
                    headerTintColor: colors.text,
                    tabBarIcon: ({ color, size }) => <Ionicons name="person" size={size} color={color} />,
                }}
            />
        </Tab.Navigator>
    );
}

export default function AppNavigator() {
    const dispatch = useDispatch();
    const { user, loading } = useSelector((state) => state.auth);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            if (firebaseUser) {
                dispatch(setUser({ uid: firebaseUser.uid, email: firebaseUser.email }));
            } else {
                dispatch(clearUser());
            }
        });

        return unsubscribe;
    }, [dispatch]);

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: colors.background }}>
                <ActivityIndicator size="large" color={colors.primary} />
            </View>
        );
    }

    return (
        <NavigationContainer>
            {user ? <MainTabNavigator /> : <AuthStackNavigator />}
        </NavigationContainer>
    );
}