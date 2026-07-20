import React from 'react';
import { View, StyleSheet } from 'react-native';

import ProfileCard from '../components/ProfileCard';
import colors from '../constants/colors';
import profileImage from '../assets/profile.jpeg';


const ProfileScreen = () => {

    return (
        <View style={styles.container}>

            <ProfileCard
                name="Jonas Romano"
                role="Desarrollador Frontend"
                image={profileImage}
            />

        </View>
    );
};


const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.background,
    },

});


export default ProfileScreen;