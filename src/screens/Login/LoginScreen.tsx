// src/screens/Login/LoginScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import { RootStackParamList } from '../../types/navigationTypes';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import styles from './style';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'Login'>>();

  const handleLogin = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <MaterialIcons name="account-circle" size={80} color="#4B4DED" />
        <Text style={styles.title}>Login</Text>
        <Text style={styles.subtitle}>Silakan masuk untuk melanjutkan</Text>
      </View>

      {/* Input Email */}
      <View style={styles.inputWrapper}>
        <MaterialIcons
          name="email"
          size={20}
          color="#777"
          style={styles.icon}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#aaa"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      {/* Input Password */}
      <View style={styles.inputWrapper}>
        <MaterialIcons name="lock" size={20} color="#777" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#aaa"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>

      {/* Button Login */}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      {/* Footer */}
      <Text style={styles.footerText}>© Pemerintah Kota Tegal - 2025</Text>
    </View>
  );
};


export default LoginScreen;
