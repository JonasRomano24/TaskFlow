import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
    KeyboardAvoidingView,
    Platform,
} from "react-native";

import colors from "../constants/colors";

export default function TaskForm() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("Trabajo");

    const [errors, setErrors] = useState({});

    const [touched, setTouched] = useState({});

    const [focused, setFocused] = useState("");

    const validate = () => {
        let newErrors = {};

        if (!title.trim()) {
            newErrors.title = "El título es obligatorio";
        } else if (title.trim().length < 5) {
            newErrors.title = "Debe tener al menos 5 caracteres";
        }

        if (!description.trim()) {
            newErrors.description = "La descripción es obligatoria";
        } else if (description.trim().length < 10) {
            newErrors.description = "Debe tener al menos 10 caracteres";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleAddTask = () => {
        setTouched({
            title: true,
            description: true,
        });

        if (!validate()) return;

        const task = {
            title,
            description,
            category,
            createdAt: new Date(),
        };

        console.log(task);

        Alert.alert(
            "Éxito",
            "Tarea capturada localmente"
        );

        setTitle("");
        setDescription("");
        setCategory("Trabajo");

        setErrors({});
        setTouched({});
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
            <Text style={styles.title}>
                Nueva tarea
            </Text>

            <TextInput
                style={[
                    styles.input,
                    focused === "title" && styles.focusInput,
                    errors.title && touched.title && styles.errorInput,
                ]}
                placeholder="Título"

                value={title}

                onChangeText={setTitle}

                autoCapitalize="sentences"

                selectionColor={colors.primary}

                returnKeyType="next"

                onFocus={() => setFocused("title")}

                onBlur={() => {
                    setFocused("");
                    setTouched({
                        ...touched,
                        title: true,
                    });
                }}
            />

            {errors.title && touched.title && (
                <Text style={styles.errorText}>
                    {errors.title}
                </Text>
            )}

            <TextInput
                style={[
                    styles.input,
                    styles.textArea,
                    focused === "description" && styles.focusInput,
                    errors.description &&
                    touched.description &&
                    styles.errorInput,
                ]}
                placeholder="Descripción"

                multiline

                numberOfLines={5}

                value={description}

                onChangeText={setDescription}

                selectionColor={colors.primary}

                onFocus={() => setFocused("description")}

                onBlur={() => {
                    setFocused("");
                    setTouched({
                        ...touched,
                        description: true,
                    });
                }}
            />

            {errors.description &&
                touched.description && (
                    <Text style={styles.errorText}>
                        {errors.description}
                    </Text>
                )}

            <Text style={styles.label}>
                Categoría
            </Text>

            <View style={styles.categories}>

                {["Trabajo", "Estudio", "Personal"].map(
                    (item) => (
                        <TouchableOpacity
                            key={item}
                            style={[
                                styles.categoryButton,
                                category === item &&
                                styles.categorySelected,
                            ]}
                            onPress={() => setCategory(item)}
                        >
                            <Text
                                style={[
                                    styles.categoryText,
                                    category === item && {
                                        color: "#fff",
                                    },
                                ]}
                            >
                                {item}
                            </Text>
                        </TouchableOpacity>
                    )
                )}
            </View>

            <TouchableOpacity
                style={styles.saveButton}
                onPress={handleAddTask}
            >
                <Text style={styles.saveText}>
                    Guardar tarea
                </Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 30,
        fontWeight: "bold",
        color: colors.text,
        marginBottom: 25,
        textAlign: "center",
    },

    input: {
        borderWidth: 1,
        borderColor: "#d9d9d9",

        borderRadius: 12,

        padding: 14,

        backgroundColor: "#fff",

        marginBottom: 6,

        color: colors.text,
    },

    focusInput: {
        borderColor: colors.primary,
    },

    errorInput: {
        borderColor: "red",
    },

    textArea: {
        height: 120,
        textAlignVertical: "top",
    },

    errorText: {
        color: "red",
        marginBottom: 12,
        marginLeft: 5,
        fontSize: 12,
    },

    label: {
        fontWeight: "600",
        color: colors.text,
        marginTop: 10,
        marginBottom: 12,
    },

    categories: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 25,
    },

    categoryButton: {
        flex: 1,

        marginHorizontal: 4,

        padding: 12,

        borderRadius: 10,

        borderWidth: 1,

        borderColor: colors.primary,

        alignItems: "center",
    },

    categorySelected: {
        backgroundColor: colors.primary,
    },

    categoryText: {
        color: colors.primary,
        fontWeight: "600",
    },

    saveButton: {
        backgroundColor: colors.primary,

        padding: 16,

        borderRadius: 12,

        alignItems: "center",
    },

    saveText: {
        color: "#fff",

        fontWeight: "bold",

        fontSize: 17,
    },
});