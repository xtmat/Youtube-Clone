echo "Build Start"

apt install python3-pip
python3 -m ensurepip
python3 -m pip install -r requirements.txt

echo "Build End"