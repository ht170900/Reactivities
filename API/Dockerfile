# Use official .NET SDK image to build the backend
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

# Set working directory
WORKDIR /app

# Copy the project files
COPY *.sln ./
COPY API/ API/
COPY Application/ Application/
COPY Domain/ Domain/
COPY Persistence/ Persistence/

# Restore dependencies
RUN dotnet restore

# Build the backend
RUN dotnet publish -c Release -o /publish

# Use runtime image for a smaller final container
FROM mcr.microsoft.com/dotnet/aspnet:8.0

WORKDIR /app

# Copy the built application from the previous stage
COPY --from=build /publish .

# Expose the port used by the API
EXPOSE 5000
EXPOSE 5001

# Start the API
CMD ["dotnet", "API/Reactivities.API.dll"]
