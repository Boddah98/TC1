import { Component, OnInit } from '@angular/core';
import{ ConnectionService } from '../services/connection';
import { firstValueFrom } from 'rxjs';
import { Question } from '../models/question.model'
import { Router } from '@angular/router';
import { PopUpName } from '../popUpName/popUpName.component';
import {MatDialog} from '@angular/material/dialog'


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['../../styles.css']
})
export class AppGame implements OnInit{
  title = 'Preguntados running';
  public playerName: string;
  private questionSorted : Question[];
  private index : number;
  private correctSubmited : number;

  constructor(private cs : ConnectionService,  private router: Router, private dialog: MatDialog){
    this.playerName = "Jugador Invitado";
    this.questionSorted = [];
    this.index = 0;
    this.correctSubmited = 0;
    
  }
  ngOnInit(): void {
    
    this.init();
  }
  async init() {    
    this.AskName();
    let correctReq = document.getElementById("correctReq");
    if (!correctReq) return;
    correctReq.textContent = "Respuestas correctas: "+ ( this.correctSubmited);
    
    document.getElementById("submitAnswer")?.addEventListener('click',evt=>{
      let optionSelected = document.getElementById("optionSelected") as HTMLInputElement;
      this.verify(optionSelected.value);
      
    });
  }
  async verify(optionSelected:string){    
    let correctAnswer = this.questionSorted[this.index].correctAnswer;
    if (correctAnswer == optionSelected){
      this.correctSubmited+=1;
    }
    await this.nextQuestion();
  }
  async nextQuestion():Promise<void>{

    //Takes the question data           
    let question : Question =  this.questionSorted[this.index];
    let questionNumber = document.getElementById("questionNumber");
    if (!questionNumber) return;
    questionNumber.textContent = "Pregunta: #"+ (this.index+1);

    //Question statement ignoring nulls
    let questionStatement = document.getElementById("questionStatement");
    if (!questionStatement) return;
    questionStatement.textContent = question.question;

    //We take the ul for append.child
    let questionAnswers = document.getElementById("answerUl");

    for (let j=0; j<3; j++){

      //We takes the answer option string for give to htm
      let answer = question.answers[j];

      //the idea is to create bot elements input and label into a div
      //for appent to the ul tag and create each option
      let optionDiv = document.createElement("div");
      let optionLabel = document.createElement("label");      
      optionLabel.innerText = answer;
      let option = document.createElement("input");
      option.setAttribute("type", "radio");
      option.setAttribute("value",answer);
      option.setAttribute("name","answer");
      option.setAttribute("id","optionSelected");
      //appending      
      optionDiv.appendChild(option);
      optionDiv.appendChild(optionLabel);
      questionAnswers?.appendChild(optionDiv);
    }
  }
  //Create a pop up component for take tha playerName
  AskName():void{
    
    const popUpName = this.dialog.open(PopUpName,{
      width : '250 px'

    });
    popUpName.afterClosed().subscribe(result =>{
      
      this.playerName = result;
      this.startGame(popUpName);      
    });
  }
 
  async startGame(popUpName: any):Promise<void>{
    popUpName.close();
    let questions: Question[] = await this.getQuestionSet();
    this.questionSorted = questions;
    await this.nextQuestion();
    
  }
  async getQuestionSet(){
    let questions : Question[]= (await firstValueFrom(this.cs.getQuestions())).data as Question[];        
    return questions.sort(function() {return Math.random() - 0.5}); //Simple script for to sort the array
  }
}
