import os

from dotenv import load_dotenv
from google import genai

load_dotenv()

print("KEY =", os.getenv("GEMINI_API_KEY"))

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))


def generate_answer(question, context):

    prompt = f"""
    You are an AI Research Assistant.

    Answer ONLY from the retrieved information.

    Formatting Rules:
    - Use proper Markdown.
    - Use headings (##) when appropriate.
    - Use bullet points (-) for lists.
    - Use **bold** for important terms.
    - Keep answers concise and readable.
    - Never make up information.
    - If the retrieved information is completely unrelated, reply exactly:
    "I couldn't find the answer in the uploaded documents."

    Retrieved Information:

    {context}

    Question:
    {question}

    Markdown Answer:
    """

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt
    )

    return response.text