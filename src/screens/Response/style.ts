import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    position: 'absolute',
    top: 50,
    alignSelf: 'center',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  iconWrapper: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: '#4B4DED',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginHorizontal: 16,
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#4B4DED',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
    width: '90%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default styles;