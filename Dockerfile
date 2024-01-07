FROM python:3

WORKDIR /usr/src/app

COPY requirements.txt ./
RUN apt-get update && DEBIAN_FRONTEND=noninteractive apt-get install -y locales
RUN sed -i -e 's/# nl_BE.UTF-8 UTF-8/nl_BE.UTF-8 UTF-8/' /etc/locale.gen && \
    dpkg-reconfigure --frontend=noninteractive locales && \
    update-locale LANG=nl_BE.UTF-8
ENV LANG nl_BE.UTF-8
RUN pip install --no-cache-dir -r requirements.txt

COPY . .
CMD [ "python", "./ui.py" ]