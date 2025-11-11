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
  code: string;
  message: string;
  isSuccess: boolean;
  result: {
    memberId: number;
    createdAt: string;
    travelPurpose: string;
    stayDuration: string;
    transportation: string;
    mustVisitPlace?: string; 
    places: CoursePlace[];
  };
}
