import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';


const Result = ({navigation,route}:any) => {
  const { correct_answer } = route.params;
 const totalQuestions = 10;
  const correctAnswers = correct_answer;
  const scorePercentage = Math.round((correctAnswers / totalQuestions) * 100);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.resultBox}>
          <Text style={styles.title}>Quiz Result</Text>

          <Text style={styles.text}>Total Questions: {totalQuestions}</Text>
          <Text style={styles.text}>Correct Answers: {correctAnswers}</Text>
          <Text style={styles.text}>Score: {scorePercentage}%</Text>

          

          <TouchableOpacity style={styles.button}
            onPress={() => navigation.navigate('Home')}>
            <Text style={styles.buttonText}>Go To Home</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#48CAE4'
  },
  scrollContainer: {
    flexGrow: 1,
   
    justifyContent: 'center',
    padding: 20,
  },
  resultBox: {
    width: '100%',
     backgroundColor: '#0096C7',
    padding: 25,
    borderRadius: 12,
    alignItems: 'center',         
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  text: {
    fontSize: 20,
    marginBottom: 12,
  },
  button: {
    marginTop: 15,
    backgroundColor: '#023E8A',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default Result;
