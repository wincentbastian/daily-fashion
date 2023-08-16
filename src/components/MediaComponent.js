import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
export const MediaComponent = (props) => {
    const { value } = props;
    return (
        <TouchableOpacity
            style={styles.button}
            {...props}
        >
            <Image
                {...props}
            />
            <Text style={styles.textt}>{value}</Text>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row', justifyContent: 'center',
        alignItems: 'center', margin: 8
    },
    text: {
        color: 'black', fontSize: 18,
        marginLeft: 8
    },
    textt: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        margin: 10
    },
    image: {
        width: 300, height: 300
    }
});