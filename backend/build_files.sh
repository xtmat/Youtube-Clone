echo "Build Start"

apt install python3-pip
python3 -m ensurepip
python3 -m pip install pipenv
python3 -m pip instal python-dotenv
python3 -m pipenv install

echo "Build End"