import time
from fastapi import FastAPI, Path, HTTPException, Response
import uvicorn
from models import PromptModel, FewShotPromptModel, BaseModel,GenPromptModel
from llm_loader import generate_text, RAGResponseGenerator, DocumentProcess, ChatOllamaWrapper
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
import os
import ollama
import json
from fastapi.responses import StreamingResponse


app = FastAPI()
origins = ["*"]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/chat-general")
async def chat(prompt: GenPromptModel):
    print(prompt)
    try:
        print(prompt.query)
        response = generate_text(prompt.query)
        print(response)
        return response

    except Exception as e:
        raise HTTPException(status_code=404, detail=e)


@app.post("/chat")
async def chat(prompt: PromptModel):
    print(prompt)
    return prompt
    try:
        print(prompt.query)
        response = ChatOllamaWrapper().answer_query(prompt.query)
        print(response)
        return response

    except Exception as e:
        raise HTTPException(status_code=404, detail=e)


@app.post("/few-shot")
async def few_shot_generater(few_shot_prompt: FewShotPromptModel):
    try:
        response = generate_text(few_shot_prompt.input_query+"/n" +
                                 few_shot_prompt.output_query+"/n"+few_shot_prompt.context)
        return response
    except Exception as e:
        raise HTTPException(status_code=404, detail=e)


@app.post("/chat-RAG")
async def chat(prompt: PromptModel):
    try:
        response = RAGResponseGenerator().generate_text(prompt.query)
        print(response)
        return response

    except Exception as e:
        raise HTTPException(status_code=404, detail=e)


@app.post("/upload/")
async def upload_pdf(file: UploadFile = File(...)):

    folder_path = "docs"
    os.makedirs(folder_path, exist_ok=True)
    contents = await file.read()
    file_path = os.path.join(folder_path, file.filename)

    with open(file_path, "wb") as f:
        f.write(contents)
    time.sleep(3)
    # process = DocumentProcess()
    # process.get_vectorstore()

    return JSONResponse(status_code=200, content={"file": file.filename})


@app.get("/model-list")
async def get_model_list():
    names = [model['name'] for model in ollama.list()['models']]

    return names


if __name__ == "__main__":

    uvicorn.run("main:app", port=8001, host="0.0.0.0", reload=True)
