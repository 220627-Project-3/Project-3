# actual container
FROM adoptopenjdk/openjdk11:alpine-jre
ENV ARTIFACT_NAME=e-commerce-backend-main-0.0.1-SNAPSHOT.jar
COPY ./build/libs /usr/app/build/libs/
WORKDIR /usr/app/build/libs/
ENTRYPOINT exec java -jar $ARTIFACT_NAME