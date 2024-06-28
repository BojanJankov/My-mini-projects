export interface PlayerFilters {
  firstName?: string;
  lastName?: string;
  orderBy?: 'age' | 'salary' | 'yearsOfPlayingCareer';
  maxResults?: number;
  firstResult?: number;
}
