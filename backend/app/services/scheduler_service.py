from apscheduler.schedulers.background import BackgroundScheduler
from apscheduler.triggers.cron import CronTrigger
from sqlalchemy.orm import Session
from datetime import datetime
import pytz

from ..database.connection import SessionLocal
from ..services.match_service import MatchService


def update_matches_job():
    print(f"Executando tarefa de atualização de partidas às {datetime.now()}")
    db: Session = SessionLocal()
    try:
        MatchService.sync_all_matches_from_api(MatchService, db=db)
        print("Sincronização de partidas concluída com sucesso.")
    except Exception as e:
        print(f"Erro na tarefa de atualização: {str(e)}")
    finally:
        db.close()


def start_scheduler():
    scheduler = BackgroundScheduler()

    brasilia_tz = pytz.timezone("America/Sao_Paulo")
    scheduler.configure(timezone=brasilia_tz)

    scheduler.add_job(
        update_matches_job,
        trigger=CronTrigger(hour=2, minute=0, timezone=brasilia_tz),
        id="update_matches_job",
        replace_existing=True,
    )

    scheduler.start()
