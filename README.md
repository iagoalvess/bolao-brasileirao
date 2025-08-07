# Bolão Brasileirão 🏆

O sistema desenvolvido tem como objetivo proporcionar uma plataforma interativa para a realização de apostas em jogos de futebol. Por meio dela, os usuários podem participar de grupos de apostas, onde são ranqueados de acordo com a quantidade de pontos acumulados, baseados nos acertos de suas apostas. Além da competição entre os participantes, o sistema oferece recursos adicionais, como acesso a estatísticas detalhadas de pontuação e a um feed de notícias atualizadas sobre o mundo do futebol, tornando a experiência mais dinâmica, informativa e divertida para os amantes do esporte.

# Desenvolvedores
- Iago da Silva Rodrigues Alves
- Vitor Moreira Ramos de Rezende

# Tecnologias Usadas

O sistema foi desenvolvido em Python, utilizando FastAPI no backend, com SQLAlchemy para gerenciar o banco de dados e JWT para autenticação segura. As senhas são criptografadas com Passlib, e as variáveis sensíveis são tratadas com dotenv. O sistema consome dados da API da CBF para atualizar informações dos jogos e também realiza scraping de notícias do site UOL Esporte, garantindo que os usuários acompanhem as últimas novidades do futebol. Ademais, foi utilizado pytest e MagicMock do unittest para a realização dos testes, além de outras bibliotecas utilizadas para implementar o sistema.
No frontend, foi utilizado React, Tailwind CSS e Axios, além de outras bibliotecas que garantem uma interface moderna e de fácil navegação. O resultado é uma plataforma segura, dinâmica e atualizada, que permite aos usuários fazer apostas, participar de rankings e acompanhar estatísticas e notícias esportivas.

## Projeto para desenvolvedor
```bash
# Crie o virtualenv e ative
python3 -m venv venv
source venv/bin/activate

# Instale as dependências
pip install -r requirements.txt

# Rode a API
uvicorn app.main:app --reload

# Rode o Frontend
npm i
npm run dev

# Swagger
https://bolao-brasileirao-oy40.onrender.com/docs#/
