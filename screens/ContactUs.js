import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Linking, Image } from 'react-native';

const openLink = async (url) => {
  const supported = await Linking.canOpenURL(url);
  if (supported) {
    await Linking.openURL(url);
  } else {
    alert("Can't open the link: " + url);
  }
};

const ContactUsScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.appTitle}>Scrap Connect</Text>
      <Text style={styles.tagline}>Connect.Collect</Text>

      <Text style={styles.header}>Contact Us</Text>

      <Text style={styles.sectionTitle}>Customer Support</Text>
      <Text style={styles.paragraph}>
        Phone: +254 712 345 678{'\n'}
        Email: support@scrapconnect.com
      </Text>

      <Text style={styles.sectionTitle}>Working Hours</Text>
      <Text style={styles.paragraph}>
        Mon - Fri: 8 AM – 6 PM{'\n'}
        Sat: 9 AM – 4 PM{'\n'}
        Sun: Closed
      </Text>

      <Text style={styles.sectionTitle}>Location</Text>
      <Text style={styles.paragraph}>
        University of Eastern Africa, Baraton{'\n'}
        Main Campus, Nandi County, Kenya
      </Text>

      <Text style={styles.sectionTitle}>Follow Us</Text>

      <TouchableOpacity style={styles.iconRow} onPress={() => openLink('https://www.facebook.com/scrapconnect')}>
        <Image source={require('../assets/facebook_icon.png')} style={styles.iconImage} />
        <Text style={styles.linkText}>@scrapconnect</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.iconRow} onPress={() => openLink('https://twitter.com/scrapconnect')}>
        <Image source={require('../assets/Instagram_icon.png')} style={styles.iconImage} />
        <Text style={styles.linkText}>@scrapconnect</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.iconRow} onPress={() => openLink('https://instagram.com/scrap.connect')}>
        <Image source={require('../assets/twitter_icon.png')} style={styles.iconImage} />
        <Text style={styles.linkText}>@scrap.connect</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#ffffff',
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
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconImage: {
    width: 24,
    height: 24,
    marginRight: 8,
    resizeMode: 'contain',
  },
  linkText: {
    fontSize: 16,
    color: '#000000',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});

export default ContactUsScreen;
