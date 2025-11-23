import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const image = require('../assets/images/Quiz.png');

const Home = ({navigation}: any) => {

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.centerView}>
                <Text style={styles.title}>Welcome to the Quiz App</Text>
                <Image 
                    source={image} 
                    style={styles.image}
                />
                <TouchableOpacity
                    onPress={() => navigation.navigate('Menu')}
                >
                    <View style={styles.button}>
                        <Text style={styles.buttonText}> Get Started</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#48CAE4',
        alignItems: 'center',
    },
    centerView: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0096C7',
        padding: 20,
        width: '90%',
        borderRadius: 15,


    },
    title: {
        fontFamily: 'Times new roman',
        fontSize: 28,
        color: '#ffffffff',
        fontWeight: 'bold',
        margin: 20,
        textAlign: 'center',
    },
    image: {
        width: '90%',
        height: 300,
        resizeMode: 'contain',
        margin: 20,
    },
    button: {
        backgroundColor: '#023E8A',
        padding: 20,
        borderRadius: 10,
    },
    buttonText: {
        fontFamily: 'Times new roman',
        fontSize: 18,
        color: '#ffffff',
    },
});
export default Home;
