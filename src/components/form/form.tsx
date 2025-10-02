// Form.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import {
  launchCamera,
  MediaType,
  ImagePickerResponse,
} from 'react-native-image-picker';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigationTypes';
import styles from './style';

interface FormData {
  fullName: string;
  asalSekolah: string;
  tglLahir: string;
  photo: string | null;
}

type FormScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;

const Form = () => {
  const navigation = useNavigation<FormScreenNavigationProp>();

  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    asalSekolah: '',
    tglLahir: '',
    photo: null,
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});

  // Reset hanya photo ketika kembali dari Preview
  useFocusEffect(
    React.useCallback(() => {
      setFormData(prev => ({ ...prev, photo: null }));
    }, []),
  );

  const handleChange = (name: keyof FormData, value: string) => {
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: undefined });
    }
  };

  // Format tanggal otomatis
  const formatDateInput = (text: string): string => {
    const numbers = text.replace(/\D/g, '');
    if (numbers.length <= 2) {
      return numbers;
    } else if (numbers.length <= 4) {
      return `${numbers.slice(0, 2)}/${numbers.slice(2)}`;
    } else {
      return `${numbers.slice(0, 2)}/${numbers.slice(2, 4)}/${numbers.slice(
        4,
        8,
      )}`;
    }
  };

  // Request camera permission untuk Android
  const requestCameraPermission = async (): Promise<boolean> => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Izin Kamera',
            message:
              'Aplikasi membutuhkan akses kamera untuk mengambil foto peserta',
            buttonNeutral: 'Tanya Nanti',
            buttonNegative: 'Batal',
            buttonPositive: 'OK',
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true; // iOS auto handle
  };

  // Validasi form
  const validateForm = () => {
    const newErrors: Partial<FormData> = {};
    if (!formData.fullName.trim())
      newErrors.fullName = 'Nama Lengkap wajib diisi';
    if (!formData.asalSekolah.trim())
      newErrors.asalSekolah = 'Asal Sekolah wajib diisi';
    if (!formData.tglLahir.trim()) {
      newErrors.tglLahir = 'Tanggal Lahir wajib diisi';
    } else if (formData.tglLahir.length !== 10) {
      newErrors.tglLahir = 'Format tanggal harus DD/MM/YYYY';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Ambil foto
  const takePhoto = async () => {
    if (!validateForm()) {
      Alert.alert(
        'Peringatan',
        'Mohon lengkapi semua data sebelum mengambil foto',
      );
      return;
    }

    const hasPermission = await requestCameraPermission();
    if (!hasPermission) {
      Alert.alert('Izin Ditolak', 'Mohon berikan izin kamera');
      return;
    }

    const options = {
      mediaType: 'photo' as MediaType,
      includeBase64: false,
      quality: 0.8,
    };

    launchCamera(options, (response: ImagePickerResponse) => {
      if (response.didCancel) {
        console.log('User cancelled camera');
      } else if (response.errorMessage) {
        console.log('Camera Error: ', response.errorMessage);
        Alert.alert('Error', 'Gagal mengakses kamera');
      } else if (response.assets && response.assets[0]?.uri) {
        const imageUri = response.assets[0].uri;

        // langsung navigate ke PreviewScreen dengan data
        navigation.navigate('Preview', {
          formData: {
            ...formData,
            photo: imageUri,
          },
        });
      }
    });
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Registrasi Peserta</Text>
        <Text style={styles.subtitle}>
          Mohon lengkapi data peserta dengan benar
        </Text>

        {/* Input Nama Lengkap */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Nama Lengkap *</Text>
          <TextInput
            value={formData.fullName}
            onChangeText={text => handleChange('fullName', text)}
            placeholder="Masukkan Nama Lengkap"
            style={[styles.input, errors.fullName && styles.inputError]}
            placeholderTextColor="#999"
          />
          {errors.fullName && (
            <Text style={styles.errorText}>{errors.fullName}</Text>
          )}
        </View>

        {/* Input Asal Sekolah */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Asal Sekolah *</Text>
          <TextInput
            value={formData.asalSekolah}
            onChangeText={text => handleChange('asalSekolah', text)}
            placeholder="Masukkan Asal Sekolah"
            style={[styles.input, errors.asalSekolah && styles.inputError]}
            placeholderTextColor="#999"
          />
          {errors.asalSekolah && (
            <Text style={styles.errorText}>{errors.asalSekolah}</Text>
          )}
        </View>

        {/* Input Tanggal Lahir */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Tanggal Lahir *</Text>
          <TextInput
            value={formData.tglLahir}
            onChangeText={text => {
              const formatted = formatDateInput(text);
              handleChange('tglLahir', formatted);

              // kalau panjang sudah 10 (DD/MM/YYYY), convert ke ISO
              if (formatted.length === 10) {
                const [day, month, year] = formatted.split('/');
                const iso = `${year}-${month}-${day}`; // YYYY-MM-DD
                handleChange('tglLahir', iso);
              }
            }}
            placeholder="DD/MM/YYYY"
            style={[styles.input, errors.tglLahir && styles.inputError]}
            placeholderTextColor="#999"
            keyboardType="numeric"
            maxLength={10}
          />
          <Text style={styles.helperText}>Format: Tanggal/Bulan/Tahun</Text>
          {errors.tglLahir && (
            <Text style={styles.errorText}>{errors.tglLahir}</Text>
          )}
        </View>

        {/* Camera Button */}
        <TouchableOpacity
          style={[styles.cameraButton]}
          onPress={takePhoto}
          activeOpacity={0.8}
        >
          <Text style={styles.cameraButtonText}>📷 Ambil Foto Peserta</Text>
        </TouchableOpacity>

        {/* Info Text */}
        <Text style={styles.infoText}>
          Pastikan semua data sudah benar sebelum mengambil foto. Foto akan
          digunakan untuk identifikasi peserta.
        </Text>
      </View>
    </ScrollView>
  );
};

export default Form;
