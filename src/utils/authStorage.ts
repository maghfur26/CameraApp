import * as keychain from 'react-native-keychain';

// simpan accessToken & refreshToken
export const saveTokens = async (accessToken: string, refreshToken: string) => {
  await keychain.setGenericPassword(accessToken, refreshToken);
};

// ambil accessToken
export const getAccessToken = async (): Promise<string | null> => {
  const credentials = await keychain.getGenericPassword();
  return credentials ? credentials.username : null; // username = accessToken
};

// ambil refreshToken
export const getRefreshToken = async (): Promise<string | null> => {
  const credentials = await keychain.getGenericPassword();
  return credentials ? credentials.password : null; // password = refreshToken
};

// hapus token
export const clearTokens = async () => {
  await keychain.resetGenericPassword();
};
