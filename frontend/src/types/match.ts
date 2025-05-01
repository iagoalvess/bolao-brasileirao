export interface Match {
 id: number;
 round: number;
 match_id: string;
 match_date: string;
 home_team: string;
 away_team: string;
 status: string;
 home_score: number | null;
 away_score: number | null;
 stadium?: string | null;
 city?: string | null;
 state?: string | null;
 broadcasters?: string | null;
}
