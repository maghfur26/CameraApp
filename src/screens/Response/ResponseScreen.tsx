// src/screens/ResponseScreen.tsx
import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types/navigationTypes';
import styles from './style';

const ResponseScreen = () => {
  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList, 'Response'>>();

  // Animated values
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  const hanleClick = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Home' }],
    });
  };

  useEffect(() => {
    Animated.sequence([
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 5,
        tension: 80,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Upload Complete</Text>
      </View>

      {/* Icon Check */}
      <Animated.View
        style={[
          styles.iconWrapper,
          { transform: [{ scale: scaleAnim }], opacity: opacityAnim },
        ]}
      >
        <MaterialIcons name="check" size={48} color="#2D36B3" />
      </Animated.View>

      {/* Text */}
      <Animated.View style={{ opacity: opacityAnim }}>
        <Text style={styles.title}>Data Berhasil Diupload!</Text>
        <Text style={styles.subtitle}>
          Informasi peserta KTP telah berhasil diunggah ke Google Drive.
        </Text>
      </Animated.View>

      {/* Button */}
      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.8}
        onPress={hanleClick}
      >
        <Text style={styles.buttonText}>Daftarkan Peserta Lain</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ResponseScreen;
