import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Response } from './response';

@Injectable({
    providedIn: 'root',
})
export class ConnectionService{
    private api = "http://localhost:3000";
    constructor(private http: HttpClient){
    }
    public getQuestions(){
        return this.http.get<Response>(this.api+'/getQuestionSet')     
    }        
}