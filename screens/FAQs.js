import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

const faqs = [
  {
    question: 'How do I request a scrap pickup?',
    answer: 'Go to the Pickup Requests screen, tap on "New Request," fill in the details, and submit.',
  },
  {
    question: 'Can I cancel a pickup request?',
    answer: 'Yes, you can cancel a pending request from the pending request screen before it is approved.',
  },
  {
    question: 'How and when do I receive payment from scrap collectors?',
    answer: 'Payments from scrap collectors to homeowners are processed after the scrap pickup is completed and verified.',
  },
  {
    question: 'What types of scrap can I sell?',
    answer: 'You can sell metal, plastic, paper, electronics, and other recyclable materials. Contact support for more details.',
  },
  {
    question: 'How do I contact support?',
    answer: 'Use the Contact screen or tap the support button in the Settings screen to get help.',
  },
];

const FAQScreen = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Frequently Asked Questions</Text>

      {faqs.map((faq, index) => (
        <View key={index} style={styles.faqItem}>
          <TouchableOpacity onPress={() => toggleExpand(index)} style={styles.questionContainer}>
            <Text style={styles.question}>{faq.question}</Text>
          </TouchableOpacity>
          {expandedIndex === index && (
            <View style={styles.answerContainer}>
              <Text style={styles.answer}>{faq.answer}</Text>
            </View>
          )}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#ffffff', // White background
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#000000', // Black title
  },
  faqItem: {
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  questionContainer: {
    paddingVertical: 12,
  },
  question: {
    fontSize: 18,
    fontWeight: 'bold',   // Bold questions
    color: 'green',       // Green color for questions
  },
  answerContainer: {
    paddingVertical: 8,
  },
  answer: {
    fontSize: 16,
    color: '#000000',  // Black answers
    fontWeight: 'bold',  // Bold text for answers
  },
});

export default FAQScreen;
