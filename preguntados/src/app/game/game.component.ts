import { Component, OnInit } from '@angular/core';
import{ ConnectionService } from '../services/connection';
import { firstValueFrom } from 'rxjs';
import { Question } from '../models/question.model'
import { Router } from '@angular/router';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['../../styles.css']
})
export class AppGame implements OnInit{
  title = 'Preguntados running';
  constructor(private cs : ConnectionService,  private router: Router){

  }
  ngOnInit(): void {
    this.init();
  }
  async init() {
    await this.getQuestionSet();
    
  }
  async getQuestionSet(){
    let questions = (await firstValueFrom(this.cs.getQuestions())).data as Question[];
    console.log(questions);    
  }
}
