export interface RefereeFilters {
  firstName?: string;
  lastName?: string;
  orderBy?: 'age' | 'salary' | 'yearsOfExperience';
  maxResults?: number;
  firstResult?: number;
}
