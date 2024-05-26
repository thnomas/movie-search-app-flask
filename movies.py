import requests
from dotenv import dotenv_values

# Load environment variables from .env file
env_vars = dotenv_values('.env')

# Access the API key
api_key = env_vars['API_KEY']

def get_movie(movie):
    movie_request = requests.get(f"http://www.omdbapi.com/?t={movie}&apikey={api_key}")
    movie_data = movie_request.json()
    return movie_data