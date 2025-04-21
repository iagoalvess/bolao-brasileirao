# Bolão Brasileirão 🏆

Projeto para gerenciamento de um bolão de futebol do Campeonato Brasileiro.

## Como rodar
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

# Documentação por enquanto local em
http://localhost:8000/docs#/
