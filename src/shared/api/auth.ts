import { apiAuth } from '@/shared/api/instance';
import type { ApiResponse, TokenData } from '@/shared/api/types';
import { setTokens } from '@/shared/utils/token';

export const exchangeTempToken = async (tempToken: string) => {
  const { data } = await apiAuth.post<ApiResponse<TokenData>>(
    '/api/auth/temp-token/exchange',
    { tempToken },
  );

  if (data.success) {
    const { accessToken, refreshToken } = data.data;
    setTokens(accessToken, refreshToken);
  }

  return data;
};
