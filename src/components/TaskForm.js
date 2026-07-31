import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
} from "react-native";

import colors from "../constants/colors";


const TaskForm = () => {

    const categories = [
        "Trabajo",
        "Estudio",
        "Personal",
    ];


    // Estados locales de cada campo
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("Trabajo");


    const [errors, setErrors] = useState({});

    const [focusedInput, setFocusedInput] = useState(null);



    const validateForm = () => {

        let newErrors = {};


        // Validación título
        if (!title.trim()) {

            newErrors.title = "El título es obligatorio";

        } else if (title.trim().length < 5) {

            newErrors.title =
                "El título debe tener mínimo 5 caracteres";

        }



        // Validación descripción
        if (!description.trim()) {

            newErrors.description =
                "La descripción es obligatoria";

        } else if (description.trim().length < 10) {

            newErrors.description =
                "La descripción debe tener mínimo 10 caracteres";

        }



        // Validación categoría
        if (!category) {

            newErrors.category =
                "Debe seleccionar una categoría";

        }


        setErrors(newErrors);


        return Object.keys(newErrors).length === 0;

    };




    // Simulación de API
    const handleAddTask = () => {


        if (!validateForm()) {
            return;
        }



        const newTask = {

            id: Date.now(),

            title,

            description,

            category,

            createdAt: new Date().toISOString(),

        };



        console.log("Nueva tarea:", newTask);



        Alert.alert(
            "Éxito",
            "Tarea capturada localmente"
        );



        // Limpieza de campos

        setTitle("");

        setDescription("");

        setCategory("Trabajo");

    };




    return (

        <View>


            <Text style={styles.label}>
                Título
            </Text>


            <TextInput

                style={[
                    styles.input,

                    focusedInput === "title" &&
                    styles.inputFocused,

                    errors.title &&
                    styles.inputError
                ]}

                placeholder="Ingrese título"

                value={title}


                onChangeText={(text) => {

                    setTitle(text);

                    setErrors({
                        ...errors,
                        title: null
                    });

                }}


                onFocus={() => setFocusedInput("title")}

                onBlur={() => setFocusedInput(null)}

            />


            {
                errors.title &&

                <Text style={styles.errorText}>
                    {errors.title}
                </Text>
            }





            <Text style={styles.label}>
                Descripción
            </Text>


            <TextInput

                style={[
                    styles.input,

                    styles.textArea,

                    focusedInput === "description" &&
                    styles.inputFocused,

                    errors.description &&
                    styles.inputError
                ]}


                placeholder="Ingrese descripción"


                multiline


                value={description}



                onChangeText={(text) => {

                    setDescription(text);

                    setErrors({
                        ...errors,
                        description: null
                    });

                }}



                onFocus={() => setFocusedInput("description")}


                onBlur={() => setFocusedInput(null)}

            />



            {
                errors.description &&

                <Text style={styles.errorText}>
                    {errors.description}
                </Text>

            }





            <Text style={styles.label}>
                Categoría
            </Text>



            <View style={styles.categoriesContainer}>


                {
                    categories.map((item) => (

                        <TouchableOpacity

                            key={item}

                            style={[
                                styles.categoryButton,

                                category === item &&
                                styles.categorySelected
                            ]}


                            onPress={() => {

                                setCategory(item);

                                setErrors({
                                    ...errors,
                                    category: null
                                });

                            }}

                        >


                            <Text

                                style={[
                                    styles.categoryText,

                                    category === item &&
                                    styles.categoryTextSelected
                                ]}

                            >

                                {item}

                            </Text>


                        </TouchableOpacity>

                    ))
                }


            </View>



            {
                errors.category &&

                <Text style={styles.errorText}>
                    {errors.category}
                </Text>

            }





            <TouchableOpacity

                style={styles.button}

                onPress={handleAddTask}

            >

                <Text style={styles.buttonText}>
                    Guardar
                </Text>


            </TouchableOpacity>


        </View>

    );

};



const styles = StyleSheet.create({

    label: {

        color: colors.text,

        fontSize: 15,

        fontWeight: "600",

        marginBottom: 6,

        marginTop: 12,

    },


    input: {

        borderWidth: 1,

        borderColor: "#D1D5DB",

        borderRadius: 12,

        padding: 12,

        backgroundColor: "#FFFFFF",

        color: colors.text,

    },


    inputFocused: {

        borderColor: colors.primary,

    },


    inputError: {

        borderColor: "#DC2626",

    },


    textArea: {

        height: 100,

        textAlignVertical: "top",

    },


    categoriesContainer: {

        flexDirection: "row",

        gap: 10,

    },


    categoryButton: {

        borderWidth: 1,

        borderColor: "#D1D5DB",

        paddingVertical: 10,

        paddingHorizontal: 15,

        borderRadius: 20,

        backgroundColor: "#FFFFFF",

    },


    categorySelected: {

        backgroundColor: colors.primary,

        borderColor: colors.primary,

    },


    categoryText: {

        color: colors.text,

    },


    categoryTextSelected: {

        color: "#FFFFFF",

        fontWeight: "bold",

    },


    errorText: {

        color: "#DC2626",

        fontSize: 13,

        marginTop: 5,

    },


    button: {

        marginTop: 20,

        backgroundColor: colors.primary,

        padding: 15,

        borderRadius: 12,

        alignItems: "center",

    },


    buttonText: {

        color: "#FFFFFF",

        fontSize: 16,

        fontWeight: "bold",

    },


});


export default TaskForm;