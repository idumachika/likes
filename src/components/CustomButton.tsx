import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  TouchableOpacityProps,
} from 'react-native';
import {colors} from '../util/theme';

interface CustomButtonProps extends TouchableOpacityProps {
  title: React.ReactNode;
  backgroundColor: string;
  textColor: string;
  onPress: () => void;
  variant: 'primary' | 'secondary';
  disabled?: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  backgroundColor,
  textColor,
  onPress,
  variant,
  disabled,
  style,
  ...rest
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, {backgroundColor}, style]}
      onPress={onPress}
      {...rest}>
      <Text
        style={[
          styles.text,
          {
            color: variant === 'primary' ? colors.white : colors.primary,
          },
        ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 15,
    borderRadius: 5,
    elevation: 5,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    height: 50,
  },
  text: {
    fontSize: 16,
  },
});

export default CustomButton;
