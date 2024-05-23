from pydantic import BaseModel,Field


class PromptModel(BaseModel):
    query:str
    model:str
    temperature:float = Field(gt=0, lt=1.1) 
    
class FewShotPromptModel(BaseModel):
    input_query:str
    output_query:str
    context:str
    
class GenPromptModel(BaseModel):
    query:str
   