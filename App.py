import streamlit as st
from pinecone import Pinecone
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from anthropic import Anthropic
import os
from dotenv import load_dotenv
load_dotenv()

PINECONE_API_KEY = os.getenv("PINECONE_API_KEY")
PINECONE_INDEX_NAME = os.getenv("PINECONE_INDEX_NAME")
ANTHROPIC_API_KEY = os.getenv("ANTHROPIC_API_KEY")

anthropic_client = Anthropic()

st.title("Vibes-Based Restaurant Search")
st.write("Finding underground taco 🌮 spots should be easy. Enter your vibe and let's find the perfect spot for you.")

# Set initial states
st.session_state.user_query = ""

# Set query to text input
st.session_state.user_query = st.text_input("Enter your vibe")

# Initialize Pinecone
pc = Pinecone(PINECONE_API_KEY)

# Get pinecone vector store
index = pc.Index(PINECONE_INDEX_NAME)

# Embed user query + natural language prompting
def embed_query(user_query):
    embeddings = pc.inference.embed(
        model="multilingual-e5-large",
        inputs=user_query,
        parameters={"input_type": "query", "truncate": "END"}
    )

    print(embeddings)

def add_context_retriever_chain(user_query):
    prompt = ChatPromptTemplate.from_messages([
        ("user", user_query),
        ("user", "Given the query, generate a search query to get the best restaurant relevant to the user query."),
    ])

    return prompt

# Search vectore store
def vectorstore_retrieval(embedded_query):
    results = index.query(
        queries=embedded_query,
        top_k=5,
        # include_values=True,
        include_metadata=True
    )

    restaurants = []
    for restaurant in results["restaurants"]:
        restaurants.append(restaurant.metadata)
    
    # get restaurant names and their metadata in some format TODO
    
    return restaurants

def format_restaurants_output(relevant_restaurants):
    restaurant_recs = []
    prompt = f"""
          You are a creative writer. Your task is to write a two-sentence exciting and 
          appealing description of a restaurant based on the given information.
          
          Restaurant Name: {restaurant_name}
          Restaurant Info: {restaurant_info}
          
          Description:"""
    
    for restaurant in relevant_restaurants:
        restaurant_name = restaurant["name"]
        restaurant_info = restaurant["info"]

        response = Anthropic.messages.create(
            model="claude-1.3",  # Use your preferred Claude version
            max_tokens_to_sample=150,
            messages=[
                {"role": "user", "content": prompt}
            ],
            temperature=0.7,
        ) # TODO may need to edit depending on how anthropic outputs
        
        restaurant_recs.append({
            "name": restaurant_name,
            "description": response.completion
        })
    
    return restaurant_recs
    
def write_intro(user_query):
    prompt = f"""
          {user_query}
          You are a creative writer. Your task is to write a three-sentence exciting description
          of what the user asked for, describing the theme of restaurants that are returned."""

    response = Anthropic.messages.create(
        model="claude-1.3",  # Use your preferred Claude version
        max_tokens_to_sample=150,
        messages=[
                {"role": "user", "content": prompt}
        ],
        temperature=0.7,
    ) # TODO may need to edit depending on how anthropic outputs

    return response.completion


# Pipeline connected
def get_relevant_restaurants(user_query):
    embedded_query = embed_query(user_query)
    relevant_restaurants = vectorstore_retrieval(embedded_query)
    formatted_restaurants = format_restaurants_output(relevant_restaurants)
    st.write(write_intro(user_query))
    st.write(formatted_restaurants)
    return relevant_restaurants


st.write(get_relevant_restaurants(st.session_state.user_query))

    

