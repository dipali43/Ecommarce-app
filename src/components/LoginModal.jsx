/**
 * LoginModal - Popup for user authentication
 * Mock login with test credentials
 */

import React, { useState } from 'react';
import { Modal, View, Text, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useTheme, useAppDispatch } from '../hooks/reduxHooks';
import { loginUser } from '../redux/slices/authSlice';
import CustomButton from './CustomButton';
import CustomInput from './CustomInput';

const LoginModal = ({ visible, onClose, onSuccess }) => {
  const { colors } = useTheme();
  const dispatch = useAppDispatch();
  
  // Form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Test credentials for demo
  const TEST_EMAIL_1 = 'test@zignuts.com';
  const TEST_EMAIL_2 = 'practical@zignuts.com';
  const TEST_PASS = '123456';

  // Handle login button press
  const handleLogin = async () => {
    Keyboard.dismiss();
    setError('');
    
    // Validate inputs
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    // Check credentials
    if ((email === TEST_EMAIL_1 || email === TEST_EMAIL_2) && password === TEST_PASS) {
      setLoading(true);
      try {
        await dispatch(loginUser({ email })).unwrap();
        setLoading(false);
        onSuccess();
        onClose();
        // Clear form
        setEmail('');
        setPassword('');
      } catch (err) {
        setLoading(false);
        setError('Login failed. Please try again.');
      }
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      {/* Dismiss keyboard on tap outside */}
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.overlay}>
          <View style={[styles.modalContainer, { backgroundColor: colors.background }]}>
            {/* Title */}
            <Text style={[styles.title, { color: colors.text }]}>Login Required</Text>
            <Text style={[styles.subtitle, { color: colors.text }]}>
              Please login to add items to your cart.
            </Text>

            {/* Email input */}
            <CustomInput
              label="Email"
              placeholder="e.g. test@zignuts.com"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />

            {/* Password input */}
            <CustomInput
              label="Password"
              placeholder="******"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              error={error}
            />

            {/* Action buttons */}
            <View style={styles.buttonContainer}>
              <CustomButton
                title="Cancel"
                type="outline"
                onPress={onClose}
                style={styles.cancelButton}
              />
              <CustomButton
                title="Login"
                onPress={handleLogin}
                loading={loading}
                style={styles.loginButton}
              />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: 24,
  },
  modalContainer: {
    borderRadius: 16,
    padding: 24,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 24,
    textAlign: 'center',
    opacity: 0.7,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 16,
  },
  cancelButton: {
    flex: 1,
    marginRight: 8,
  },
  loginButton: {
    flex: 1,
    marginLeft: 8,
  },
});

export default LoginModal;
