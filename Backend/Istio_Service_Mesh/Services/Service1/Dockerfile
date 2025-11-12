# See https://aka.ms/customizecontainer to learn how to customize your debug container and how Visual Studio uses this Dockerfile to build your images for faster debugging.

# This stage is used when running from VS in fast mode (Default for Debug configuration)
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS base

RUN apt-get update -y && \
    apt-get install -y curl

USER $APP_UID
WORKDIR /app
EXPOSE 8080


# This stage is used to build the service project
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
ARG BUILD_CONFIGURATION=Release
COPY Rsrc/zscaler_root_CA.pem /usr/local/share/ca-certificates/
RUN chmod 644 /usr/local/share/ca-certificates/zscaler_root_CA.pem && update-ca-certificates
ENV SSL_CERT_FILE=/usr/local/share/ca-certificates/zscaler_root_CA.pem
WORKDIR /src
COPY ["Service1.csproj", "."]
RUN dotnet restore "./Service1.csproj"
COPY . .
WORKDIR "/src/."
RUN dotnet build "./Service1.csproj" -c $BUILD_CONFIGURATION -o /app/build

# This stage is used to publish the service project to be copied to the final stage
FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./Service1.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

# This stage is used in production or when running from VS in regular mode (Default when not using the Debug configuration)
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Service1.dll"]