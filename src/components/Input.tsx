/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Control, Controller, FieldValues, Path} from 'react-hook-form';
import {StyleSheet, Text, View, TextInput} from 'react-native';
import {colors, fonts} from '../util/theme';

interface InputProps<T extends FieldValues> extends FloatingLabelProps {
  label: string;
  control: Control<T>;
  name: Path<T>;
  placeholder: String;
}

const Input = <T extends FieldValues>({
  label,
  control,
  name,
  placeholder,
  ...otherProps
}: InputProps<T>) => {
  const [isFocused, setIsFocused] = React.useState(false);
  return (
    <Controller
      control={control}
      name={name}
      render={({field: {onChange, value}, fieldState: {error}}) => (
        <View>
          <TextInput
            style={[styles.input, {borderColor: error ? 'red' : '#5946D2'}]}
            value={value}
            control={control}
            onChangeText={onChange}
            placeholder={placeholder}
          />

          {error ? <Text style={styles.error}>{error?.message}</Text> : null}
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  error: {
    // fontFamily: fonts.dmsans_regular,
    paddingTop: 3,
    fontSize: 12,
    lineHeight: 16,
    color: 'red',
    paddingHorizontal: 10,
  },

  input: {
    height: 40,
    width: '90%',
    backgroundColor: '#FAF9FB',
    borderBottomColor: '#515CC6',
    borderBottomWidth: 0.5,
  },
});
export default Input;
