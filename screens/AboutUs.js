import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

const AboutUsScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.appTitle}>Scrap Connect</Text>
      <Text style={styles.tagline}>Connect.Collect</Text>

      <Text style={styles.header}>About Scrap Connect</Text>

      <Text style={styles.paragraph}>
        Scrap Connect is a digital platform that bridges the gap between homeowners and scrap collectors.
        We make it easy to schedule scrap pickups, promote recycling, and ensure homeowners are fairly compensated.
      </Text>

      <Text style={styles.sectionTitle}>Our Mission</Text>
      <Text style={styles.paragraph}>
        Our mission is to simplify the scrap collection process while promoting environmental sustainability.
        We aim to empower communities by turning household waste into economic opportunities.
      </Text>

      <Text style={styles.sectionTitle}>What We Do</Text>
      <Text style={styles.paragraph}>
        - Connect homeowners with verified scrap collectors{'\n'}
        - Enable secure and scheduled scrap pickups{'\n'}
        - Facilitate transparent communication and payments between users
      </Text>

      <Text style={styles.sectionTitle}>Why Choose Us?</Text>
      <Text style={styles.paragraph}>
        With a user-friendly dashboard, real-time notifications, and reliable service, Scrap Connect provides
        a seamless way to manage scrap without hassle.
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#ffffff', // White background
  },
  appTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'green',
    textAlign: 'center',
  },
  tagline: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
    marginBottom: 24,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'green',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'green',
    marginTop: 16,
    marginBottom: 8,
  },
  paragraph: {
    fontSize: 16,
    color: '#000000',
    fontWeight: 'bold',
    lineHeight: 22,
  },
});

export default AboutUsScreen;
