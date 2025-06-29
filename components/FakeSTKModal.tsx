import React, { useState } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';

export default function FakeSTKModal({ visible, amount, phoneNumber, onClose, onSuccess }) {
  const [pin, setPin] = useState('');
  const [processing, setProcessing] = useState(false);

  const handlePay = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      onSuccess(); // fire your real payment logic
      onClose();   // hide modal
      setPin('');
    }, 3000);
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.backdrop}>
        <View style={styles.container}>
          <Text style={styles.header}>M-PESA</Text>
          <Text style={styles.message}>
            Enter M-PESA PIN to pay KES {amount} to {phoneNumber}
          </Text>
          {processing ? (
            <ActivityIndicator size="large" color="#0a7e07" />
          ) : (
            <>
              <TextInput
                style={styles.input}
                value={pin}
                onChangeText={setPin}
                placeholder="****"
                keyboardType="number-pad"
                secureTextEntry
                maxLength={4}
              />
              <View style={styles.buttons}>
                <TouchableOpacity onPress={onClose} style={styles.cancel}>
                  <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handlePay} style={styles.pay}>
                  <Text style={styles.buttonText}>Pay</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#fff',
    padding: 20,
    width: '85%',
    borderRadius: 10,
    alignItems: 'center',
  },
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 10, color: '#0a7e07' },
  message: { fontSize: 16, marginBottom: 20, textAlign: 'center' },
  input: { width: '60%', borderBottomWidth: 1, fontSize: 24, textAlign: 'center', marginBottom: 20 },
  buttons: { flexDirection: 'row', justifyContent: 'space-between', width: '100%' },
  cancel: { flex: 1, marginRight: 5, padding: 10, backgroundColor: '#ccc', borderRadius: 5, alignItems: 'center' },
  pay: { flex: 1, marginLeft: 5, padding: 10, backgroundColor: '#0a7e07', borderRadius: 5, alignItems: 'center' },
  buttonText: { color: '#fff' },
});