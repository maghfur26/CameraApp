import { View, Text, ActivityIndicator } from 'react-native';
import * as Progress from 'react-native-progress';
import styles from './style';

interface Props {
  progress: number;
  isProcessing?: boolean; // Tambahan: flag untuk proses di backend
}

const UploadProgressScreen: React.FC<Props> = ({
  progress,
  isProcessing = false,
}) => {
  return (
    <View style={styles.container}>
      {/* Phase 1: Upload ke Server */}
      {!isProcessing && (
        <>
          <Text style={styles.title}>Mengupload ke Server...</Text>
          <Progress.Bar
            progress={progress}
            width={250}
            color="#4B4DED"
            borderRadius={8}
            height={12}
          />
          <Text style={styles.percent}>{Math.round(progress * 100)}%</Text>
          <ActivityIndicator
            size="large"
            color="#4B4DED"
            style={{ marginTop: 20 }}
          />
        </>
      )}

      {/* Phase 2: Processing di Backend (Upload ke Google Drive) */}
      {isProcessing && (
        <>
          <Text style={styles.title}>Menyimpan ke Google Drive...</Text>
          <ActivityIndicator
            size="large"
            color="#4B4DED"
            style={{ marginTop: 20 }}
          />
          <Text style={[styles.percent, { marginTop: 10 }]}>
            Mohon tunggu sebentar...
          </Text>
        </>
      )}
    </View>
  );
};

export default UploadProgressScreen;
