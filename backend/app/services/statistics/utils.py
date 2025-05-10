def calculate_points(pred, match) -> int:
    if (
        pred.home_team_score == match.home_score
        and pred.away_team_score == match.away_score
    ):
        return 5
    elif (pred.home_team_score - pred.away_team_score) * (
        match.home_score - match.away_score
    ) > 0:
        return 3
    return 0
