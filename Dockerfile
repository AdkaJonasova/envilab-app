FROM python:3.10-slim

RUN apt-get update \
    && apt-get install -y postgresql-server-dev-all \
                           build-essential \
                           gcc \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY . /app

EXPOSE 8000

RUN pip install --no-cache-dir -r requirements.txt

ENV PYTHONPATH=/app

CMD ["python", "src/main.py"]