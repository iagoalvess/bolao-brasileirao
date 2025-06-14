# Bolão Brasileirão 🏆

Projeto para gerenciamento de um bolão de futebol do Campeonato Brasileiro.

## Desenvolvedores
- Iago da Silva Rodrigues Alves
- Vitor Moreira Ramos de Rezende

# Projeto em produção
https://bolao-brasileirao.vercel.app/

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
