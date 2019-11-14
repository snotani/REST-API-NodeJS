FROM java:8-jdk-alpine
COPY ./src/ ./usr
COPY ./libs/ ./usr
WORKDIR ./usr
EXPOSE 8080
RUN javac -cp .:json-20190722.jar Server.java
CMD java -cp .:json-20190722.jar Server