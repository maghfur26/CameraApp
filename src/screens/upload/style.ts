import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 16,
    marginBottom: 20,
    color: '#333',
  },
  percent: {
    marginTop: 10,
    fontSize: 14,
    color: '#555',
  },
  success: {
    marginTop: 20,
    fontSize: 16,
    color: 'green',
    fontWeight: 'bold',
  },
});

export default styles;