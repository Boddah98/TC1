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

  constructor(private cs : ConnectionService,  private router: Router, private dialog: MatDialog){
    this.playerName = "Jugador Invitado";
  }
  ngOnInit(): void {
    this.init();
  }
  async init() {
    
    this.AskName();
    
    
  }
  //Create a pop up component for take tha playerName
  AskName():void{
    const popUpName = this.dialog.open(PopUpName,{
      width : '250 px'

    });
    popUpName.afterClosed().subscribe(result =>{
      console.log("Let's play");
      this.playerName = result;
      this.startGame();      
    });
  }
 
  async startGame():Promise<void>{
    
    let next  = false;
    let questionSorted : Question[] = await this.getQuestionSet();
    for (let i=0; i<10; i++){ 

      //Takes the question data           
      let question : Question =  questionSorted[i];
      let questionNumber = document.getElementById("questionNumber");
      if (!questionNumber) return;
      questionNumber.textContent = "Pregunta: #"+ (i+1);

      //Question statement
      let questionStatement = document.getElementById("questionStatement");
      if (!questionStatement) return;
      questionStatement.textContent = question.question;

      let questionAnswers = document.getElementById("answerUl");
      for (let j=0; j<3; j++){
        let answer = question.answers[j];
        
        let optionDiv = document.createElement("div");
        let optionLabel = document.createElement("label");
        
        optionLabel.innerText = answer;
        let option = document.createElement("input");
        option.setAttribute("type", "radio");
        option.setAttribute("value",answer);
        option.setAttribute("name","answer");
        
        
        optionDiv.appendChild(option);
        optionDiv.appendChild(optionLabel);
        questionAnswers?.appendChild(optionDiv);
      }
    }
  }

  async getQuestionSet(){
    let questions : Question[]= (await firstValueFrom(this.cs.getQuestions())).data as Question[];        
    return questions.sort(function() {return Math.random() - 0.5}); //Simple script for to sort the array
  }
}
