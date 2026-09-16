import React, { useEffect, useState } from "react";
import {
    View,
    StyleSheet,
    Button,
    TouchableOpacity,
    Text,
    Image,
} from "react-native";
import { useSelector } from "react-redux";

import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { doc, getDoc } from "firebase/firestore";
import { db } from "../services/firebase";
import { logout } from "../services/authService";

import ProfileCard from "../components/ProfileCard";
import colors from "../constants/colors";
import profileImage from "../assets/profile.jpeg";

const ProfileScreen = () => {
    const user = useSelector((state) => state.auth.user);

    const [profile, setProfile] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        const loadProfile = async () => {
            if (!user?.uid) return;

            try {
                // Cargar datos del perfil desde Firestore
                const profileRef = doc(db, "users", user.uid);
                const profileSnapshot = await getDoc(profileRef);

                if (profileSnapshot.exists()) {
                    const data = profileSnapshot.data();
                    setProfile(data);
                }

                // Cargar foto guardada localmente
                const savedImage = await AsyncStorage.getItem(
                    `profileImage_${user.uid}`
                );

                if (savedImage) {
                    setSelectedImage(savedImage);
                }
            } catch (error) {
                return;
            }
        };

        loadProfile();
    }, [user?.uid]);

    const pickImage = async () => {
        const permissionResult =
            await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (!permissionResult.granted) {
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ["images"],
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            const imageUri = result.assets[0].uri;

            // Mostrar inmediatamente la imagen
            setSelectedImage(imageUri);

            // Guardar la imagen para este usuario
            await AsyncStorage.setItem(
                `profileImage_${user.uid}`,
                imageUri
            );
        }
    };

    const fullName = profile
        ? `${profile.firstName} ${profile.lastName}`.trim()
        : "";

    const currentImage = selectedImage
        ? { uri: selectedImage }
        : profileImage;

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.avatarContainer}
                onPress={pickImage}
            >
                <Image
                    source={currentImage}
                    style={styles.avatar}
                />

                <Text style={styles.changeText}>
                    Cambiar foto
                </Text>
            </TouchableOpacity>

            <ProfileCard
                name={fullName}
                role={profile?.email || ""}
                image={currentImage}
            />

            <Button
                title="Cerrar sesión"
                onPress={logout}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.background,
    },

    avatarContainer: {
        alignItems: "center",
        marginBottom: 10,
    },

    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },

    changeText: {
        marginTop: 8,
        color: colors.primary,
        fontWeight: "600",
    },
});

export default ProfileScreen;