export interface RecommendCourseRequest {
  travelPurpose: string;
  stayDuration: string;
  transportation: string;
  userLatitude?: number;
  userLongitude?: number;
  mustVisitPlace?: string;
}

export interface CoursePlace {
  placeId: number | null;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  description: string;
  placeImg: string | null;
}

export interface RecommendCourseResponse {
  success: boolean;  
  code: string;
  message: string;
  data: {
    sessionId: string;
    places: CoursePlace[];
    routeSummary: string;
    totalDistance: number;
  };
  timestamp: string; 
}
