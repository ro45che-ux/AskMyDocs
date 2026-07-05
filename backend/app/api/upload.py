from fastapi import APIRouter, UploadFile, File
from app.loaders.pdf_loader import load_pdf
from app.chunking.text_chunker import split_documents
from app.embeddings.embedding_service import generate_embeddings
from app.vectorstore.chroma_db import store_embeddings
import os
import shutil
import uuid
router = APIRouter()

UPLOAD_DIRECTORY = "uploaded_pdfs"

os.makedirs(UPLOAD_DIRECTORY, exist_ok=True)


@router.post("/upload")
async def upload_pdf(file: UploadFile = File(...)):

    # Save uploaded PDF
    unique_filename = f"{uuid.uuid4()}_{file.filename}"

    file_path = os.path.join(
        UPLOAD_DIRECTORY,
        unique_filename
    )

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Read PDF
    documents = load_pdf(file_path)

    print("=" * 50)
    print("Documents:", len(documents))

    for i, doc in enumerate(documents):
        print(f"Page {i + 1} Length: {len(doc.page_content)}")

    # Split into chunks
    chunks = split_documents(documents)

    print("Chunks:", len(chunks))

    # Generate embeddings
    embeddings = generate_embeddings(chunks)

    store_embeddings(
        chunks,
        embeddings,
        unique_filename
    )

    print("Embeddings:", len(embeddings))
    print("Embedding Dimension:", len(embeddings[0]))
    print("=" * 50)

    return {
        "filename": file.filename,
        "pages": len(documents),
        "chunks": len(chunks),
        "stored_vectors": len(embeddings),
        "message": "Embeddings stored successfully in ChromaDB 🚀"
    }