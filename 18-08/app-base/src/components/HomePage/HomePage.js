import React from 'react';
import {
    View,
    Text,
    SafeAreaView,
    StyleSheet
} from "react-native";

export default function HomePage() {
    return (
        <SafeAreaView  style={styles.container}>
            <View><Text>Home</Text></View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex:1
    },
});