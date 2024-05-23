import ollama
from langchain_community.document_loaders import DirectoryLoader
from langchain_community.embeddings import OllamaEmbeddings
from langchain_community.vectorstores import Chroma
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.chains import RetrievalQA
import chromadb
from langchain_experimental.llms.ollama_functions import OllamaFunctions
from langchain.memory import ConversationBufferMemory
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain
from langchain_community.document_loaders import PyPDFLoader



memory = ConversationBufferMemory(memory_key="chat_history")

def generate_text(query:str) -> str:
    response = ollama.chat(model='llama2', messages=[{
            'role': 'user',
            'content': query,
        },])
    return response["message"]["content"] 


class ChatOllamaWrapper():
  
    def __init__(self,model="mistral",temperature=0.5):
        
        self.model = model
        self.temperature = temperature
    
    def model_loader(self):
        return OllamaFunctions(model=self.model, temperature=self.temperature)
    
    def answer_query(self,query):
        try:
            template = """Avoid interpreting your own responses; if unsure, indicate that you don't know.

                            {chat_history}
                            Human: {human_input}
                            Chatbot:"""

            prompt = PromptTemplate(
                input_variables=["chat_history", "human_input"], template=template
            )
            llm_chain = LLMChain(
                            llm=self.model_loader(),
                            prompt=prompt,
                            verbose=False,
                            memory=memory
                    )
            return str(llm_chain.invoke(query)["text"])
        except Exception as e:
            raise TypeError(str(e)) 
    

class DocumentProcess():
    model  = "llama2"
    loaded_documents = None
    splited_documents = None
    embeddings = OllamaEmbeddings(model=model)
    directory = 'docs'
    
    def __init(self):
        pass
        
    
    def load_docs(self):
        # loader = DirectoryLoader(self.directory)
        loader = PyPDFLoader("docs/SHUIDOC.pdf")
        self.loaded_documents = loader.load()
        return self.loaded_documents
        
    
    def split_docs(self,chunk_size=1000,chunk_overlap=20):
        text_splitter = RecursiveCharacterTextSplitter(chunk_size=chunk_size, chunk_overlap=chunk_overlap)
        self.splited_documents = text_splitter.split_documents(self.load_docs())
        
        return self.splited_documents
        

    def get_vectorstore(self):
        client = chromadb.Client()
        
        if client.list_collections():
            consent_collection = client.create_collection("shui_collection")
        else:
            print("Collection already exists") 
            
        vectorstore = Chroma.from_documents(documents=self.split_docs(),
                                            embedding=self.embeddings,
                                            persist_directory="chroma_store"
                                            )                                  
        vectorstore.persist()
        return vectorstore 



class RAGResponseGenerator():
    model  = "llama2"
    embeddings = OllamaEmbeddings(model="llama2")
    persist_directory = "chroma_store"
    
    def model_loader(self):
        
        return OllamaFunctions(model=self.model, temperature=1)

        
    def generate_text(self,query):
        db = Chroma(persist_directory=self.persist_directory,
                    embedding_function=self.embeddings)
        
        retrieval_chain = RetrievalQA.from_chain_type(self.model_loader(),
                                                      chain_type="stuff", 
                                                      retriever=db.as_retriever())
        print("retrieval_chain",retrieval_chain)
        return str(retrieval_chain(query)["result"])


















