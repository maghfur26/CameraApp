import keychain from 'react-native-keychain';

// simpan accessToken & refreshToken
export const saveTokens = async (accessToken: string, refreshToken: string) => {
  await keychain.setGenericPassword(accessToken, refreshToken, {
    service: 'authTokens',
  });
};

export const saveId = async (id: string) => {
  await keychain.setGenericPassword(id, '', { service: 'userId' });
};

export const getId = async (): Promise<string | null> => {
  const credentials = await keychain.getGenericPassword({ service: 'userId' });
  return credentials ? credentials.username : null;
};

export const getAccessToken = async (): Promise<string | null> => {
  const credentials = await keychain.getGenericPassword({
    service: 'authTokens',
  });
  return credentials ? credentials.username : null;
};

export const getRefreshToken = async (): Promise<string | null> => {
  const credentials = await keychain.getGenericPassword({
    service: 'authTokens',
  });
  return credentials ? credentials.password : null;
};

export const clearTokens = async () => {
  await keychain.resetGenericPassword({ service: 'authTokens' });
  await keychain.resetGenericPassword({ service: 'userId' });
};
