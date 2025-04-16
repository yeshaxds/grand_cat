FROM ubuntu:latest
LABEL authors="26548"

ENTRYPOINT ["top", "-b"]
# 构建阶段
FROM gradle:7-jdk17 AS build
WORKDIR /app
COPY . .
RUN gradle build --no-daemon

# 运行阶段
FROM eclipse-temurin:17-jre
WORKDIR /app
COPY --from=build /app/build/libs/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","app.jar"]