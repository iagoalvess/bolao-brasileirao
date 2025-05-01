import requests
from sqlalchemy.orm import Session
from datetime import datetime
from ..models.match import Match
from ..models.prediction import Prediction
from ..models.user import User


class MatchService:
    @staticmethod
    def sync_all_matches_from_api(db: Session) -> None:
        url = (
            "https://cbf.com.br/api/proxy?path=/jogos/tabela-detalhada/campeonato/12606"
        )
        response = requests.get(url, verify=False)

        if response.status_code != 200:
            raise Exception(f"Erro ao acessar API da CBF: {response.status_code}")

        data = response.json()

        for fase_info in data.values():
            jogos = fase_info.get("jogos", [])

            for jogo in jogos:
                home_team = jogo["mandante"]["nome"]
                away_team = jogo["visitante"]["nome"]
                round_number = int(jogo.get("rodada", 0))
                date_str = jogo.get("data", "").strip()
                time_str = jogo.get("hora") or "00:00"

                try:
                    match_date = datetime.strptime(
                        f"{date_str} {time_str}", "%d/%m/%Y %H:%M"
                    )
                except ValueError:
                    match_date = datetime.strptime(
                        "01/01/1900 00:00", "%d/%m/%Y %H:%M"
                    )

                match_id = Match.generate_match_id(
                    match_date.isoformat(), home_team, away_team
                )

                existing_match = db.query(Match).filter_by(match_id=match_id).first()

                def parse_score(score):
                    return int(score) if score and score.isdigit() else None

                home_score = parse_score(jogo["mandante"].get("gols"))
                away_score = parse_score(jogo["visitante"].get("gols"))

                values = {
                    "round": round_number,
                    "match_id": match_id,
                    "match_date": match_date,
                    "home_team": home_team,
                    "away_team": away_team,
                    "home_score": home_score,
                    "away_score": away_score,
                    "stadium": jogo.get("estadio", "").strip(),
                    "city": jogo.get("cidade", "").strip(),
                    "state": jogo.get("uf", "").strip(),
                    "broadcasters": jogo.get("transmissao", "").strip(),
                    "status": (
                        "FINISHED"
                        if home_score is not None and away_score is not None
                        else "SCHEDULED"
                    ),
                }

                if existing_match:
                    for k, v in values.items():
                        setattr(existing_match, k, v)
                else:
                    new_match = Match(**values)
                    db.add(new_match)

        db.commit()
