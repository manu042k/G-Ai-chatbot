from langchain_community.embeddings import OllamaEmbeddings 
from langchain_community.document_loaders import WebBaseLoader
from langchain_community.document_loaders import PyPDFLoader

from langchain_community.llms import Ollama 

from langchain_community.embeddings import OllamaEmbeddings,HuggingFaceInstructEmbeddings

from langchain_community.vectorstores import Chroma
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain import hub
from langchain_community.llms import Ollama
from langchain.chains import RetrievalQA

from langchain.document_loaders import DirectoryLoader

# loader = PyPDFLoader("docs/enterprise-angular.pdf")
directory = 'docs'

def load_docs(directory):
  loader = DirectoryLoader(directory)
  documents = loader.load()
  return documents

documents = load_docs(directory)
print(len(documents))
# data = loader.load_and_split()
# text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=500)
# all_splits = text_splitter.split_documents(data)
# vectorstore = Chroma.from_documents(documents=all_splits,
#                                         embedding=OllamaEmbeddings())
# QA_CHAIN_PROMPT = hub.pull("rlm/rag-prompt-llama")
    
    
# llm = Ollama(model="llama2")
# qa_chain = RetrievalQA.from_chain_type(
#         llm,
#         retriever=vectorstore.as_retriever(search_kwargs={"k": 1}),
#         chain_type_kwargs={"prompt": QA_CHAIN_PROMPT},


#     )

# print(qa_chain("Generate a sample html using sh tags"))
