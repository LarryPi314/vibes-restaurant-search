import streamlit as st
from pinecone import Pinecone
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
import anthropic
import os
import google.generativeai as genai
from dotenv import load_dotenv
load_dotenv()

PINECONE_API_KEY = os.getenv("PINECONE_API_KEY")
PINECONE_INDEX_NAME = os.getenv("PINECONE_INDEX_NAME")
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
genai.configure(api_key=GEMINI_API_KEY)
model = genai.GenerativeModel("gemini-1.5-flash")

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
        inputs=[user_query],
        parameters={"input_type": "query"}
    )

    return embeddings

def add_context_retriever_chain(user_query):
    prompt = ChatPromptTemplate.from_messages([
        ("user", user_query),
        ("user", "Given the query, generate a search query to get the best restaurant relevant to the user query."),
    ])

    return prompt

# Search vectore store
def vectorstore_retrieval(embedded_query):
    results = index.query(
        namespace="example-namespace",
        vector=embedded_query[0].values,
        top_k=5,
        # include_values=True,
        include_metadata=True
    )

    restaurants = []
    for restaurant in results['matches']:
        restaurants.append(restaurant['metadata'])
        
    return restaurants

def format_restaurants_output(relevant_restaurants):
    restaurant_recs = []
    
    for restaurant in relevant_restaurants:
        restaurant_name = restaurant['name']
        restaurant_info = restaurant['description'] + ' '.join(restaurant['reviews'])
        prompt = f"""
            You are a creative writer. Your task is to write a one sentence exciting and 
          appealing description of a restaurant based on the given information.
          
          Restaurant Name: {restaurant_name}
          Restaurant Info: {restaurant_info}
          
          Description:""" # TODO move this prompt outside of loop

        response = model.generate_content(prompt) # TODO may need to edit depending on how anthropic outputs
        
        restaurant_recs.append({
            "name": restaurant_name,
            "restaurant_intro": response.text
        })
    
    return restaurant_recs
    
def write_intro(user_query):
    prompt = f"""
          {user_query}
          You are a creative writer. Your task is to write a three-sentence exciting description
          of what the user asked for, describing the theme of restaurants that are returned."""

    response = model.generate_content(prompt) # TODO may need to edit depending on how anthropic outputs
    text = response.text
    return text


# Pipeline connected
def get_relevant_restaurants(user_query):
    st.write(user_query)
    embedded_query = embed_query(user_query)
    relevant_restaurants = vectorstore_retrieval(embedded_query)
    formatted_restaurants = format_restaurants_output(relevant_restaurants)
    st.write(write_intro(user_query))
    
    # Display restaurants
    for restaurant in formatted_restaurants:
        st.subheader(restaurant["name"])
        st.write(restaurant["restaurant_intro"])
        st.markdown("---")
    return relevant_restaurants

if st.session_state.user_query and st.button("Search"):
  get_relevant_restaurants(st.session_state.user_query)

    

