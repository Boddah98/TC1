import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['../../styles.css']
})
export class AppHome implements OnInit {
  constructor (private router: Router){}
  ngOnInit(): void {
    this.init()
  }
  init(){
    document.getElementById("playPreguntados")?.addEventListener('click', evt =>{
      this.router.navigate(['/game']);
    });
  }
}