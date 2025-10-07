import { View, Text, TouchableOpacity, Animated } from 'react-native';
import { useRef, useState } from 'react';
import Profile from '../profile/profile';
import styles from './style';
import { clearTokens } from '../../utils/authStorage';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types/navigationTypes';
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import api from '../../config/api';
import { getId } from '../../utils/authStorage';

const Drawer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const slideAnim = useRef(new Animated.Value(-250)).current;
  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList, 'Home'>>();

  const openDrawer = () => {
    if (isOpen) {
      Animated.timing(slideAnim, {
        toValue: -250,
        duration: 300,
        useNativeDriver: false,
      }).start(() => setIsOpen(false));
    } else {
      setIsOpen(true); // render dulu
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  };

  const handleLogout = async () => {
    try {
      const id = await getId();

      // Panggil logout ke server terlebih dahulu
      await api.post('/api/auth/logout', { id });

      // Setelah server clear token, baru hapus token lokal
      await clearTokens();

      // Navigasi ke halaman login
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    } catch (error) {
      console.error('Logout error:', error);
      // Pastikan token lokal tetap dibersihkan walau server gagal merespons
      await clearTokens();
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>KTP-Jembol</Text>
      <TouchableOpacity onPress={openDrawer}>
        <Profile />
      </TouchableOpacity>

      {isOpen && (
        <Animated.View style={[styles.drawer, { left: slideAnim }]}>
          <Text style={styles.textHeader}>Menu</Text>
          <TouchableOpacity onPress={handleLogout} style={styles.logout}>
            <MaterialIcons name="logout" size={20} color="white" />
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </Animated.View>
      )}
    </View>
  );
};

export default Drawer;
