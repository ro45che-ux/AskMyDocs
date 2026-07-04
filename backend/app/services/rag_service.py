import os

from dotenv import load_dotenv
from google import genai

load_dotenv()

print("KEY =", os.getenv("GEMINI_API_KEY"))

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))


def generate_answer(question, context):

    prompt = f"""
You are an intelligent AI Research Assistant.

Rules:
1. Answer ONLY using the provided context.
2. Do NOT make up information.
3. If the answer is not present, reply:
   "I couldn't find the answer in the uploaded documents."
4. Answer in a clear and concise manner.
5. If the context contains multiple relevant points, summarize them naturally.
6. Do not mention the word 'context' in your answer.

Context:
{context}

Question:
{question}

Answer:
"""

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt
    )

    return response.text