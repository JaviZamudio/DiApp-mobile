import React from 'react';
import { View, Text, Linking, StyleSheet } from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';

export function Credits() {
    const handleLinkPress = () => {
        // Linking.openURL('https://bout.sh');
        Linking.openURL('https://bout-sh.vercel.app');
    };


    return (
        <View style={styles.container}>
            <Text>By </Text>
            <View style={styles.link} onTouchEnd={handleLinkPress}>
                <Text>Bout</Text>
                <FontAwesome name="external-link" size={12} color="black" />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 20,
        opacity: 0.5,
    },

    link: {
        color: 'black',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        borderBottomWidth: 1,
    },
});
