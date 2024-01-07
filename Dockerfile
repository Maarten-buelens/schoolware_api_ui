FROM python:3

WORKDIR /usr/src/app

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt && sudo locale-gen nl_BE && sudo update-locale 

COPY . .
CMD [ "python", "./ui.py" ]