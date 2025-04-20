import httpx
from bs4 import BeautifulSoup
from typing import List, Dict, Any
from datetime import date


class MatchService:
    BASE_URL = "https://www.placardefutebol.com.br/jogos-de-hoje"

    @staticmethod
    async def fetch_matches() -> List[Dict[str, Any]]:
        page = await MatchService._get_page()
        championships = MatchService._extract_championships(page)
        matches = MatchService._parse_matches(championships)
        if not matches:
            raise ValueError("Sem partidas do brasileirão hoje.")
        return matches

    @staticmethod
    async def _get_page() -> BeautifulSoup:
        try:
            async with httpx.AsyncClient() as client:
                response = await client.get(
                    MatchService.BASE_URL, headers={"User-Agent": "Mozilla/5.0"}
                )
                response.raise_for_status()
                return BeautifulSoup(response.text, "lxml")
        except httpx.HTTPStatusError as e:
            raise ValueError(
                f"Erro ao buscar partidas: {e.response.status_code} - {e.response.text}"
            )
        except httpx.RequestError as e:
            raise ValueError(f"Erro de conexão ao buscar partidas: {str(e)}")

    @staticmethod
    def _extract_championships(page: BeautifulSoup) -> List[BeautifulSoup]:
        return page.find_all("div", class_="container content")

    @staticmethod
    def _parse_matches(championships: List[BeautifulSoup]) -> List[Dict[str, Any]]:
        results = []
        today_str = date.today().strftime("%Y-%m-%d")

        for championship in championships:
            if not MatchService._is_brasileirao(championship):
                continue

            matches = championship.find_all(
                "div", class_="row align-items-center content"
            )
            for match in matches:
                parsed = MatchService._parse_match(match, today_str)
                if parsed:
                    results.append(parsed)

        return results

    @staticmethod
    def _is_brasileirao(championship: BeautifulSoup) -> bool:
        link = championship.find("a")
        return bool(
            link and "href" in link.attrs and "/brasileirao-serie-a/" in link["href"]
        )

    @staticmethod
    def _parse_match(match: BeautifulSoup, date_str: str) -> Dict[str, Any] | None:
        try:
            status = match.find("span", class_="status-name").text.strip()
            teams = match.find_all("div", class_="team-name")
            scoreboard = match.find_all("span", class_="badge badge-default")

            if len(teams) < 2:
                return None

            home = teams[0].text.strip()
            away = teams[1].text.strip()
            time_str = status.split(" ")[1]
            match_date = f"{date_str} {time_str}"

            info = {
                "match": f"{home} x {away}",
                "status": status,
                "league": "Campeonato Brasileiro Série A",
                "team_home": home,
                "team_visitor": away,
                "match_date": match_date,
            }

            if len(scoreboard) == 2:
                info.update(
                    {
                        "scoreboard": {
                            "home": int(scoreboard[0].text),
                            "visitor": int(scoreboard[1].text),
                        },
                        "summary": f"{scoreboard[0].text} x {scoreboard[1].text}",
                        "status": "FINISHED" if "ENCERRADO" in status else "LIVE",
                    }
                )
            else:
                info["start_time"] = status
                info["status"] = "SCHEDULED"

            return info

        except Exception:
            return None
