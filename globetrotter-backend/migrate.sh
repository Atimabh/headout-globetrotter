export FLASK_APP=run.py
# flask db init
flask db migrate -m "Automated migration"
flask db upgrade
