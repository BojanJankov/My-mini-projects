export interface TeamFilters {
  name?: string;
  league?: string;
  orderBy?: 'year' | 'valueOfTeam' | 'trophies';
  maxResults?: number;
  firstResult?: number;
}
