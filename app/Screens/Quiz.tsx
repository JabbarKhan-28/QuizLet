import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import he from 'he';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

interface Question {
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

const TIMER_PER_QUESTION = 30;

const Quiz = ({ navigation, route }: any) => {
  const { category } = route.params;
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [score, setScore] = useState<number>(0);
  const [timer, setTimer] = useState<number>(TIMER_PER_QUESTION);
  const [finished, setFinished] = useState<boolean>(false);

  const intervalRef = useRef<number | null>(null);

  const fetchQuestions = async () => {
    try {
      const limit = 10;
      const url = `https://opentdb.com/api.php?amount=${limit}&category=${category}&type=multiple`;
      const response = await axios.get(url);
      const formattedQuestions = response.data.results.map((q: any) => ({
        question: he.decode(q.question),
        correct_answer: he.decode(q.correct_answer),
        incorrect_answers: q.incorrect_answers.map((ans: string) => he.decode(ans)),
      }));
      setQuestions(formattedQuestions);
      setCurrentQuestionIndex(0);
      setScore(0);
      setTimer(TIMER_PER_QUESTION);
      setFinished(false);
    } catch (error) {
      setQuestions([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);


  const currentQ = questions.length > 0 ? questions[currentQuestionIndex] : null;

  const options = useMemo(() => {
    if (!currentQ) return [];
    return [...currentQ.incorrect_answers, currentQ.correct_answer].sort(() => Math.random() - 0.5);
  }, [currentQuestionIndex, questions]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      if (finished || loading) return;

      setTimer(TIMER_PER_QUESTION);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      intervalRef.current = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000) as unknown as number;

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      };
    }, [currentQuestionIndex, finished, loading])
  );

  useEffect(() => {
    if (loading || finished) return;
    if (timer <= 0) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      const next = currentQuestionIndex + 1;
      if (next < questions.length) {
        setCurrentQuestionIndex(next);
        setTimer(TIMER_PER_QUESTION);
      } else {
        setFinished(true);
        navigation.navigate('Result', { correct_answer: score });
      }
    }
  }, [timer, loading, finished, currentQuestionIndex, questions.length, navigation, score]);

  if (loading) {
    return (
      <View style={styles.activityIndicator}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!questions || questions.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>No questions available.</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setFinished(true);
            if (intervalRef.current) {
              clearInterval(intervalRef.current);
              intervalRef.current = null;
            }
            navigation.navigate('Home');
          }}
        >
          <Text style={styles.buttonText}>Go To Home</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  const finishQuizAndNavigate = (finalScore: number) => {
    setFinished(true);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    navigation.navigate('Result', { correct_answer: finalScore });
  };

  const handleAnswerOptionClick = (option: string) => {
    if (finished) return;
    const updatedScore = option === currentQ!.correct_answer ? score + 1 : score;
    setScore(updatedScore);
    const next = currentQuestionIndex + 1;
    if (next < questions.length) {
      setCurrentQuestionIndex(next);
      setTimer(TIMER_PER_QUESTION);
    } else {
      finishQuizAndNavigate(updatedScore);
    }
  };

  const Next = () => {
    if (finished) return;
    const next = currentQuestionIndex + 1;
    if (next < questions.length) {
      setCurrentQuestionIndex(next);
      setTimer(TIMER_PER_QUESTION);
    }
  };

  const Previous = () => {
    if (finished) return;
    const prev = currentQuestionIndex - 1;
    if (prev >= 0) {
      setCurrentQuestionIndex(prev);
      setTimer(TIMER_PER_QUESTION);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {currentQuestionIndex < questions.length ? (
        <View style={styles.centercontainer}>
          <Text style={styles.title}>Question {currentQuestionIndex} of 10</Text>
          <View style={styles.questionBox}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
              <Text style={styles.question}>{currentQ!.question}</Text>
            </ScrollView>
          </View>
          <Text style={styles.title}>Answers</Text>
          <View>
            {options.map((option, index) => (
              <TouchableOpacity
                key={`${currentQuestionIndex}-${index}`}
                style={styles.option}
                onPress={() => handleAnswerOptionClick(option)}
              >
                <Text style={styles.optionText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.buttonright} onPress={Previous}>
            <Text style={styles.optionText}>Prev</Text>
          </TouchableOpacity>
          {currentQuestionIndex!==9 ? (
            <TouchableOpacity style={styles.buttonleft} onPress={Next}>
              <Text style={styles.optionText}>Next</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => finishQuizAndNavigate(score)}
              style={styles.buttonright}
            >
              <Text style={styles.optionText}>End</Text>
            </TouchableOpacity>
          )}
        </View>
            <Text style={styles.timerText}>Time Left: {timer}s</Text>

        </View>
      ) : (
        <TouchableOpacity
          onPress={() => finishQuizAndNavigate(score)}
          style={styles.buttonright}
        >
          <Text style={styles.optionText}>End</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#48CAE4',
  },
  centercontainer: {
    flex: 1,
    width: '90%',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: 'bold',
    alignSelf: 'center',
    color: '#fff',
   
  },
  timerText: {
    fontSize: 18,
    fontWeight: '700',
    alignSelf: 'center',
    color: '#fff',
    marginTop: 10,
    backgroundColor:"#0096C7",
    borderRadius:10,
    padding:10,
  },
  questionBox: {
    height: 120,
    backgroundColor: '#0096C7',
    borderRadius: 15,
    marginBottom: 20,
    padding: 15,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  question: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '500',
    color: '#fff',
  },
  option: {
    marginVertical: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: '#0096C7',
    borderRadius: 10,
    textAlign: 'center',
    width: '100%',
    alignItems: 'center',
  },
  optionText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '600',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-between',
    width: '100%',
  },
  buttonright: {
    backgroundColor: '#023E8A',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  buttonleft: {
    backgroundColor: '#023E8A',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 10,
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
  activityIndicator: {
    flex: 1,
    backgroundColor: '#48CAE4',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Quiz;
