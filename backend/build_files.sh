echo "Build Start"

python3.x -m pip install pipenv
pipenv install
python3.x manage.py collectstatic --no-input --clear

echo "Build End"