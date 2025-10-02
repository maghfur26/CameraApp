import { View, Text, TouchableOpacity, Animated } from 'react-native';
import { useRef, useState } from 'react';
import Profile from '../profile/profile';
import styles from './style';
import { clearTokens } from '../../utils/authStorage';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types/navigationTypes';
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from '@react-native-vector-icons/material-icons';

const Header = () => {
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
    await clearTokens().then(() => {
      navigation.navigate('Login');
    });
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
          <Text>Pengaturan</Text>
          <Text>Pengaturan</Text>
          <Text>Pengaturan</Text>
          <TouchableOpacity onPress={handleLogout} style={styles.logout}>
            <MaterialIcons name="logout" size={20} color="white" />
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </Animated.View>
      )}
    </View>
  );
};

export default Header;
