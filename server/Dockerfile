# 1 
FROM python:3.8
#FROM node:17.3.0

# 2
RUN pip install Flask gunicorn
RUN pip install firebase-admin
RUN pip install -U flask-cors
#RUN npm install
#RUN yarn install

# 3
COPY src/ /app
WORKDIR /app

# 4
ENV PORT 8080

# 5
CMD exec gunicorn --bind :$PORT --workers 1 --threads 8 app:app