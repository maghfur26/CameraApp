// src/screens/Login/LoginScreen.tsx
import React, { useState, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import { RootStackParamList } from '../../types/navigationTypes';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { saveTokens, getAccessToken, saveId } from '../../utils/authStorage';
import styles from './style';
import api from '../../config/api';
import axios from 'axios';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList, 'Login'>>();

  const handleLogin = async () => {
    try {
      const res = await api.post('/api/auth/login', { email, password });

      if (res) {
        await saveTokens(
          res.data.data.accessToken,
          res.data.data.refreshToken,
        ).then(() => {
          saveId(res.data.data.user.id);
        });

        navigation.reset({
          index: 0,
          routes: [{ name: 'Home' }],
        });
      }

      if (res.status !== 200) {
        console.log(res.data);
      }
    } catch (err: any) {
      if (axios.isAxiosError(err)) {
        if (err.response?.data?.message) {
          setError(err.response.data.message);
        } else {
          setError('Terjadi kesalahan. Coba lagi nanti.');
        }
      } else {
        setError('Unexpected error occurred.');
      }
    }
  };
  const handleChange = async (key: string, value: string) => {
    if (key === 'email') {
      setEmail(value);
    } else if (key === 'password') {
      setPassword(value);
    }

    setError('');
  };

  useFocusEffect(
    useCallback(() => {
      const checkToken = async () => {
        const token = await getAccessToken();
        if (token) {
          navigation.navigate('Home');
        }
      };
      checkToken();
    }, [navigation]),
  );

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
          onChangeText={handleChange.bind(null, 'email')}
          // caretHidden={false}
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
          onChangeText={handleChange.bind(null, 'password')}
          secureTextEntry={!showPassword}
        />
        <MaterialIcons
          name={showPassword ? 'visibility' : 'visibility-off'}
          size={20}
          color="#777"
          style={styles.icon}
          onPress={() => setShowPassword(!showPassword)}
        />
      </View>

      <View>{error && <Text style={styles.error}>{error}</Text>}</View>

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
