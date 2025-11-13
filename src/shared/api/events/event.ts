import { apiWithToken } from '@/shared/api/instance';
import type { ApiResponse } from '@/shared/types/authtypes';
import type { EventData, EventResponse } from '@/shared/types/eventtypes';
import { mapEvent } from '@/shared/hooks/events/EventMapper';

// 전체 행사 목록 조회
export const fetchEvents = async (
  date: string,
): Promise<ApiResponse<EventData[]>> => {
  const res = await apiWithToken.get('/api/events', {
    params: { date },
  });

  const mapped = await Promise.all(
    res.data.data.map(async (item: EventResponse) => {
      const detail = await apiWithToken.get(`/api/events/${item.eventId}`);
      const fullItem = {
        ...item,
        imageUrl: detail.data.data.imageUrl,
        isBookmarked: detail.data.data.isBookmarked,
      };

      return mapEvent(fullItem);
    }),
  );

  return {
    ...res.data,
    data: mapped,
  };
};

// 행사 상세 조회
export const fetchEventDetail = async (
  eventId: number,
): Promise<ApiResponse<EventData>> => {
  const res = await apiWithToken.get(`/api/events/${eventId}`);

  return {
    ...res.data,
    data: res.data.data,
  };
};

// 북마크 추가
export const postBookmark = async (
  eventId: number,
): Promise<ApiResponse<null>> => {
  const res = await apiWithToken.post(`/api/events/${eventId}/bookmark`);
  return res.data;
};

// 북마크 취소
export const deleteBookmark = async (
  eventId: number,
): Promise<ApiResponse<null>> => {
  const res = await apiWithToken.delete(`/api/events/${eventId}/bookmark`);
  return res.data;
};

// 북마크 상태 조회
export const fetchBookmarkStatus = async (
  eventId: number,
): Promise<ApiResponse<{ isBookmarked: boolean }>> => {
  const res = await apiWithToken.get(`/api/events/${eventId}/bookmark`);
  return res.data;
};
