import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LlmConnectorService {
  // private _http = inject(HttpClient);
  private apiUrl = 'http://localhost:8001';

  constructor(private _http: HttpClient) { }

  getLLMModels(): Observable<Array<string>> {
    return this._http.get<Array<string>>(`${this.apiUrl}/model-list`);
  }

  uploadDoc(data: File): Observable<any> {

    const requestOptions = {
      responseType: 'blob' as 'json'
    };
    const formData = new FormData();
    formData.append('file', data);
    return this._http.post<any>(`${this.apiUrl}/upload`, formData, requestOptions);
  }

  chat(data: string, model: string, temperature: number): Observable<any> {
    return this._http.post<any>(`${this.apiUrl}/chat`, { "query": data, "model": model, "temperature": 0.9 });
  }

}
