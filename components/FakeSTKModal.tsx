import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';

interface FakeSTKModalProps {
  visible: boolean;
  amount: string | number;
  phoneNumber: string;
  onClose: () => void;
  onSuccess: () => void;
}

export default function FakeSTKModal({ visible, amount, phoneNumber, onClose, onSuccess }: FakeSTKModalProps) {
  const [pin, setPin] = useState('');
  const [processing, setProcessing] = useState(false);

  // Reset pin when modal appears/disappears
  useEffect(() => {
    if (!visible) setPin('');
  }, [visible]);

  const handlePay = () => {
    if (pin.length < 4) return; // require full PIN
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      onSuccess(); // fire your real payment logic
      onClose();   // hide modal
    }, 3000);
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
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
                onChangeText={text => setPin(text.replace(/[^0-9]/g, ''))}
                placeholder="****"
                keyboardType="number-pad"
                secureTextEntry
                maxLength={4}
                textContentType="password"
              />
              <View style={styles.buttons}>
                <TouchableOpacity onPress={onClose} style={styles.cancel}>
                  <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handlePay} style={[styles.pay, pin.length < 4 && styles.disabled]} disabled={pin.length < 4}>
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
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#0a7e07'
  },
  message: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center'
  },
  input: {
    width: '60%',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  },
  cancel: {
    flex: 1,
    marginRight: 5,
    padding: 10,
    backgroundColor: '#ccc',
    borderRadius: 5,
    alignItems: 'center'
  },
  pay: {
    flex: 1,
    marginLeft: 5,
    padding: 10,
    backgroundColor: '#0a7e07',
    borderRadius: 5,
    alignItems: 'center'
  },
  disabled: {
    backgroundColor: '#88c48b'
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600'
  },
});