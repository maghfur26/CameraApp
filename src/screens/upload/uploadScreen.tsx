// src/screens/UploadProgress/UploadProgressScreen.tsx
import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import * as Progress from 'react-native-progress'; // npm install react-native-progress
import styles from './style';

interface Props {
  progress: number; // 0 - 1
}

const UploadProgressScreen: React.FC<Props> = ({ progress }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mengupload ke Google Drive...</Text>

      <Progress.Bar
        progress={progress}
        width={250}
        color="#4B4DED"
        borderRadius={8}
        height={12}
      />

      <Text style={styles.percent}>{Math.round(progress * 100)}%</Text>

      {progress < 1 ? (
        <ActivityIndicator
          size="large"
          color="#4B4DED"
          style={{ marginTop: 20 }}
        />
      ) : (
        <Text style={styles.success}>Upload selesai!</Text>
      )}
    </View>
  );
};

export default UploadProgressScreen;


