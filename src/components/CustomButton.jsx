/**
 * CustomButton - Reusable button component
 * Types: primary (filled), secondary, outline
 */

import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useTheme } from '../hooks/reduxHooks';

const CustomButton = ({
  title,           // Button text
  onPress,         // Click handler
  loading = false, // Show spinner
  disabled = false,// Disable button
  type = 'primary',// primary | secondary | outline
  style,           // Extra container styles
  textStyle,       // Extra text styles
}) => {
  const { colors } = useTheme();

  // Get background color based on type
  const getBackgroundColor = () => {
    if (disabled) return '#B0B0B0';
    if (type === 'primary') return colors.primary;
    if (type === 'secondary') return colors.secondary;
    return 'transparent';
  };

  // Get text color based on type
  const getTextColor = () => {
    if (type === 'outline') return colors.primary;
    return '#FFFFFF';
  };

  // Get border color for outline type
  const getBorderColor = () => {
    if (type === 'outline') return colors.primary;
    return 'transparent';
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: getBackgroundColor(),
          borderColor: getBorderColor(),
          borderWidth: type === 'outline' ? 1 : 0,
        },
        style,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
    >
      {/* Show spinner when loading, otherwise show text */}
      {loading ? (
        <ActivityIndicator color={getTextColor()} />
      ) : (
        <Text style={[styles.text, { color: getTextColor() }, textStyle]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default CustomButton;
