export interface CoursePlace {
  placeId: number;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  description: string;
  placeImg: string;
}

export interface CourseSessionResponse {
  success: boolean;      
  code: string;
  message: string;
  data: {          
    memberId: number;
    places: CoursePlace[];
    createdAt: string;
    travelPurpose: string;
    stayDuration: string;
    transportation: string;
    mustVisitPlace?: string;
  };
  timestamp: string;
}
