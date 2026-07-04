import chromadb

client = chromadb.PersistentClient(path="./chroma_db")

collection = client.get_or_create_collection(
    name="research_documents"
)


def store_embeddings(chunks, embeddings, filename):

    ids = [str(i) for i in range(len(chunks))]

    documents = [chunk.page_content for chunk in chunks]

    metadatas = []

    for chunk in chunks:
        metadatas.append({
            "filename": filename,
            "page": chunk.metadata.get("page", 0)
        })

    embeddings = embeddings.tolist()

    try:
        collection.delete(ids=ids)
    except:
        pass

    collection.add(
        ids=ids,
        documents=documents,
        embeddings=embeddings,
        metadatas=metadatas
    )


def search_documents(query_embedding, top_k=3):

    results = collection.query(
        query_embeddings=[query_embedding.tolist()],
        n_results=top_k
    )

    return results