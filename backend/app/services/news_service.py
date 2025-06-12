import requests
from bs4 import BeautifulSoup


class NewsScraper:
    def __init__(self):
        self.base_url = "https://www.uol.com.br/esporte/futebol/ultimas/"
        self.headers = {
            "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
        }
    
    def get_html_soup_of_news_page(self): 
        response = requests.get(self.base_url, headers=self.headers)
        if response.status_code == 200:
            return BeautifulSoup(response.content, "html.parser")
        else:
            None
        

    def get_news(self, html_soup):
        news = []

        if html_soup == None:
            return news
            
        items = html_soup.find_all("div", class_="thumbnails-item")

        for item in items:
            if "itemAds" in item.get("class", []):
                continue

            title = item.find("h3", class_="thumb-title")
            link = item.find("a")
            date = item.find("time", class_="thumb-date")
            author = item.find("p", class_="author")

            news.append(
                    {
                        "title": title.get_text(strip=True) if title else None,
                        "link": link["href"] if link and link.has_attr("href") else None,
                        "date": date.get_text(strip=True) if date else None,
                        "author": author.get_text(strip=True) if author else None,
                    }
                )

        return news
