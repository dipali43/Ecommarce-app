/**
 * CustomInput - Reusable text input with label and error
 * Auto-styles based on theme
 */

import React from 'react';
import { TextInput, View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../hooks/reduxHooks';

const CustomInput = ({ label, error, style, ...props }) => {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      {/* Label above input */}
      {label && <Text style={[styles.label, { color: colors.text }]}>{label}</Text>}
      
      {/* Text input */}
      <TextInput
        style={[
          styles.input,
          {
            color: colors.text,
            borderColor: error ? colors.error : colors.border,
            backgroundColor: colors.card,
          },
          style,
        ]}
        placeholderTextColor="#888"
        {...props}
      />
      
      {/* Error message */}
      {error && <Text style={[styles.error, { color: colors.error }]}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    width: '100%',
  },
  label: {
    marginBottom: 8,
    fontSize: 14,
    fontWeight: '500',
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
  },
  error: {
    marginTop: 4,
    fontSize: 12,
  },
});

export default CustomInput;
