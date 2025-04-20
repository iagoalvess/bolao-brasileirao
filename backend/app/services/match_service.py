from bs4 import BeautifulSoup
from datetime import date, timedelta
import httpx
from typing import Dict, List, Any


class MatchService:
    BASE_URL = "https://www.placardefutebol.com.br"
    HEADERS = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
    }

    @staticmethod
    async def _fetch_page(url: str) -> BeautifulSoup:
        async with httpx.AsyncClient() as client:
            response = await client.get(url, headers=MatchService.HEADERS)
            response.raise_for_status()
            return BeautifulSoup(response.text, "lxml")

    @staticmethod
    def _extract_championships(page: BeautifulSoup) -> List[Any]:
        return page.find_all("div", class_="container content")

    @staticmethod
    def _is_serie_a(championship: BeautifulSoup) -> bool:
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
            time_str = status.split(" ")[1] if " " in status else "00:00"
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
                        "status": "FINISHED" if "ENCERRADO" in status else "LIVE",
                    }
                )
            else:
                info["start_time"] = status
                info["status"] = "SCHEDULED"

            return info
        except Exception:
            return None

    @staticmethod
    async def fetch_today_matches() -> List[Dict[str, Any]]:
        url = f"{MatchService.BASE_URL}/jogos-de-hoje"
        page = await MatchService._fetch_page(url)

        championships = MatchService._extract_championships(page)
        results = []
        date_str = date.today().strftime("%Y-%m-%d")

        for championship in championships:
            if not MatchService._is_serie_a(championship):
                continue
            matches = championship.find_all(
                "div", class_="row align-items-center content"
            )
            for match in matches:
                match_info = MatchService._parse_match(match, date_str)
                if match_info:
                    results.append(match_info)

        if not results:
            raise ValueError("Nenhuma partida da Série A encontrada para hoje")
        return results

    @staticmethod
    async def fetch_yesterday_results() -> List[Dict[str, Any]]:
        yesterday = date.today() - timedelta(days=1)
        date_str = yesterday.strftime("%Y-%m-%d")
        url = f"{MatchService.BASE_URL}/jogos-de-ontem"
        page = await MatchService._fetch_page(url)

        championships = MatchService._extract_championships(page)
        results = []

        for championship in championships:
            if not MatchService._is_serie_a(championship):
                continue
            matches = championship.find_all(
                "div", class_="row align-items-center content"
            )
            for match in matches:
                match_info = MatchService._parse_match(match, date_str)
                if match_info:
                    match_info["status"] = "FINISHED"
                    results.append(match_info)

        return results
