import { apiWithToken } from '@/shared/api/instance';
import type { ApiResponse } from '@/shared/types/authtypes';

export interface EventData {
  id: number;
  name: string;
  address: string;
  description: string;
  startDate: string;
  endDate: string;
  imageSrc?: string;
}

// 전체 행사 목록 조회
export const fetchEvents = async (
  date: string,
  memberId: number,
): Promise<ApiResponse<EventData[]>> => {
  const res = await apiWithToken.get('/api/events', {
    params: { date, memberId },
  });
  return res.data;
};

// 단일 행사 상세 조회
export const fetchEventDetail = async (
  eventId: number,
): Promise<ApiResponse<EventData>> => {
  const res = await apiWithToken.get(`/api/events/${eventId}`);
  return res.data;
};

// 북마크 추가
export const postBookmark = async (eventId: number): Promise<ApiResponse<null>> => {
  const res = await apiWithToken.post(`/api/bookmarks/${eventId}`);
  return res.data;
};

// 북마크 취소
export const deleteBookmark = async (
  eventId: number,
): Promise<ApiResponse<null>> => {
  const res = await apiWithToken.delete(`/api/bookmarks/${eventId}`);
  return res.data;
};

// 북마크 상태 조회
export const fetchBookmarkStatus = async (
  eventId: number,
): Promise<ApiResponse<{ isBookmarked: boolean }>> => {
  const res = await apiWithToken.get(`/api/bookmarks/${eventId}`);
  return res.data;
};
