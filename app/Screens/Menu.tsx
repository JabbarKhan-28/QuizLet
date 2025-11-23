import React from 'react';
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity } from 'react-native';

const Menu = ({navigation}:any) => {
  return (
    <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Step in, pick a subject, and shine!</Text>      
            <TouchableOpacity
            style={styles.box}
                onPress={() => navigation.navigate('Quiz',{category:18})}
            >
                <Image 
                style={styles.image}    
                source={require('../assets/images/Computer.png')} />
            <Text style={styles.buttonText}>Computer</Text>
            </TouchableOpacity>
             <TouchableOpacity
            style={styles.box}
                onPress={() => navigation.navigate('Quiz',{category:23})}
            >
                <Image 
                style={styles.image}    
                source={require('../assets/images/History.png')} />
                <Text style={styles.buttonText}>History</Text>
            </TouchableOpacity>
             <TouchableOpacity
            style={styles.box}
                onPress={() => navigation.navigate('Quiz',{category:9})}
            >
                <Image 
                style={styles.image}    
                source={require('../assets/images/knowledge.png')} />
                <Text style={styles.buttonText}>General Knowledge</Text>
            </TouchableOpacity>
             <TouchableOpacity
            style={styles.box}
                onPress={() => navigation.navigate('Quiz',{category:17})}
            >
                <Image 
                style={styles.image}    
                source={require('../assets/images/Nature.png')} />
                <Text style={styles.buttonText}>Nature</Text>
            </TouchableOpacity>
       
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#48CAE4',
    },  
    title: {
        fontFamily: 'Times new roman',
        fontSize: 28,
        color: '#ffffffff',
        fontWeight: 'bold',
        marginBottom: 50,
        textAlign: 'center',
    },
    box: {
        width: '90%',
        height: '10%',
        backgroundColor: '#0096C7',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        margin: 10,
        padding: 10,

    },
    image: { 
        resizeMode: 'contain',
        alignSelf: 'center',
        width: '80%',
        height: '70%',
    },
     buttonText: {
        fontFamily: 'Times new roman',
        fontSize: 16,
        color: '#ffffff',
    },

    
});

export default Menu;
