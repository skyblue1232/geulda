// 로컬스토리지에서 토큰을 get & set
export const getAccessToken = () => localStorage.getItem('accessToken');
export const setAccessToken = (token: string) => localStorage.setItem('accessToken', token);
