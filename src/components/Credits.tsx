import React from 'react';
import { View, Linking, StyleSheet } from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { Text, useTheme } from 'react-native-paper';

export function Credits() {
    const theme = useTheme();

    const handleLinkPress = () => {
        // Linking.openURL('https://bout.sh');
        Linking.openURL('https://bout-sh.vercel.app');
    };


    return (
        <View style={styles.container}>
            <Text>By </Text>
            <View style={{ ...styles.link, borderColor: theme.colors.onSurface }} onTouchEnd={handleLinkPress}>
                <Text>Bout</Text>
                <FontAwesome name="external-link" size={12} color={theme.colors.onSurface} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
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
