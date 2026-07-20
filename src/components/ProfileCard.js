import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import colors from '../constants/colors';

const ProfileCard = ({ name, role, image }) => {
    return (
        <View style={styles.card}>

            <Image
                source={image}
                style={styles.avatar}
            />

            <View style={styles.info}>
                <Text style={styles.name}>
                    {name}
                </Text>

                <Text style={styles.role}>
                    {role}
                </Text>
            </View>

        </View>
    );
};


const styles = StyleSheet.create({

    card: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.card,
        padding: 20,
        margin: 20,
        borderRadius: 16,

        shadowColor: '#000',
        shadowOpacity: 0.15,
        shadowRadius: 6,
        shadowOffset: {
            width: 0,
            height: 4,
        },

        elevation: 5,
    },

    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginRight: 20,
    },

    info: {
        flex: 1,
    },

    name: {
        fontSize: 22,
        fontWeight: 'bold',
        color: colors.text,
    },

    role: {
        marginTop: 5,
        fontSize: 16,
        color: colors.textSecondary,
    },

});


export default ProfileCard;