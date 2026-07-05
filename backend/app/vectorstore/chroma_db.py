import chromadb
import uuid

client = chromadb.PersistentClient(path="./chroma_db")

collection = client.get_or_create_collection(
    name="research_documents"
)


def store_embeddings(chunks, embeddings, filename):

    ids = [str(uuid.uuid4()) for _ in chunks]

    documents = [chunk.page_content for chunk in chunks]

    metadatas = []

    original_filename = filename.split("_", 1)[1] if "_" in filename else filename

    for chunk in chunks:
        metadatas.append({
            "filename": original_filename,
            "page": chunk.metadata.get("page", 0)
        })

    collection.add(
        ids=ids,
        documents=documents,
        embeddings=embeddings.tolist(),
        metadatas=metadatas
    )


def search_documents(query_embedding, top_k=5):

    results = collection.query(
        query_embeddings=[query_embedding.tolist()],
        n_results=top_k
    )

    return results