import os

from fastapi import APIRouter
from pydantic import BaseModel

from app.embeddings.embedding_service import model
from app.vectorstore.chroma_db import search_documents
from app.services.rag_service import generate_answer

router = APIRouter()


class ChatRequest(BaseModel):
    question: str


@router.post("/chat")
def chat(request: ChatRequest):

    query_embedding = model.encode(request.question)

    results = search_documents(query_embedding)

    context = "\n\n----------------------\n\n".join(
        results["documents"][0]
    )
    print("\n" + "=" * 60)
    print("QUESTION:", request.question)
    print("=" * 60)

    for i, doc in enumerate(results["documents"][0]):
        print(f"\nChunk {i+1}:\n")
        print(doc[:500])

    print("=" * 60)

    answer = generate_answer(
        request.question,
        context
    )

    # Remove duplicate sources
    unique_sources = []
    seen = set()

    for metadata in results["metadatas"][0]:

        source = (
            metadata.get("filename"),
            metadata.get("page")
        )

        if source not in seen:
            seen.add(source)

            unique_sources.append({
                "filename": metadata.get("filename"),
                "page": metadata.get("page", 0) + 1
            })

    return {
        "question": request.question,
        "answer": answer,
        "sources": unique_sources
    }