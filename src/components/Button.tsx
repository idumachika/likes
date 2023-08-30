import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  TouchableOpacityProps,
  Image,
} from 'react-native';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
}

const FloatingButton: React.FC<ButtonProps> = ({
  title,
  ...rest
}: ButtonProps) => {
  return (
    <TouchableOpacity style={styles.button} {...rest}>
      {/* <Image source={require('../assets/Icons/Add.png')} /> */}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#515CC6',
    borderRadius: 50,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default FloatingButton;
