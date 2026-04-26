FROM python:3.11-slim

WORKDIR /app

# Install dependencies
COPY requirements.txt /app/requirements.txt
# Since we are building from backend directory but requirements might be at root...
# Wait, usually Dockerfile for backend expects requirements.txt in backend or we run docker-compose from root.
# Let's assume the build context is the project root for the backend.
RUN pip install --no-cache-dir -r requirements.txt

# Copy the app code
COPY backend/app /app/app

# Expose port
EXPOSE 8000

# Run the app
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
