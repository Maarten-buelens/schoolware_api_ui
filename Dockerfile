FROM python:3.12-slim

WORKDIR /usr/src/app

COPY requirements.txt ./

# Set the locale
ENV LANG=nl_BE.UTF-8
ENV LANGUAGE=nl_BE:nl
ENV LC_ALL=nl_BE.UTF-8

# Install locales package
RUN apt-get update && \
    apt-get install -y locales && \
    rm -rf /var/lib/apt/lists/* && \
    sed -i -e 's/# \(nl_BE.UTF-8\)/\1/' /etc/locale.gen && \
    locale-gen
RUN apt-get update && apt-get install -y git

RUN pip install --no-cache-dir -r requirements.txt

COPY . .
RUN playwright install && playwright install-deps
CMD [ "python", "./ui.py" ]
