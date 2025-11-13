// src/shared/utils/storage.ts

/**
 * ✅ 클라이언트(브라우저) 환경에서만 localStorage 접근하도록 안전하게 감싸는 유틸
 */

const isBrowser = typeof window !== 'undefined';

/** 엽서(postcard) 데이터 저장 */
export const savePostcard = (data: any) => {
  if (!isBrowser) return;
  try {
    localStorage.setItem('postcard', JSON.stringify(data));
  } catch (err) {
    console.error('❌ postcard 저장 실패:', err);
  }
};

/** 엽서(postcard) 데이터 불러오기 */
export const getPostcard = () => {
  if (!isBrowser) return null;
  try {
    const stored = localStorage.getItem('postcard');
    return stored ? JSON.parse(stored) : null;
  } catch (err) {
    console.error('❌ postcard 불러오기 실패:', err);
    return null;
  }
};

/** 엽서(postcard) 데이터 삭제 */
export const clearPostcard = () => {
  if (!isBrowser) return;
  try {
    localStorage.removeItem('postcard');
  } catch (err) {
    console.error('❌ postcard 삭제 실패:', err);
  }
};
