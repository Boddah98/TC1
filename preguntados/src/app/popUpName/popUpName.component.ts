import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
@Component ({
    selector: 'app-popUpName',
    templateUrl: './popUpName.component.html',
    styleUrls: ['../../styles.css']
  })
  export class PopUpName implements OnInit{     
    public player: string;
    constructor(public popUpDiaglog:MatDialogRef<PopUpName>){   //Required to create an object for to close        
        this.player = "Jugador Invitado";
    }
    ngOnInit(): void {
        this.init();
        
    }
    async init() { 
        document.getElementById("play")?.addEventListener('click', evt => { 
            this.play();
            
        })
            
    }
    play():void{
        //Required to look for NUll elements in the player name                    
        const inputPlayerName = document.getElementById("playerName") as HTMLInputElement;
        if (inputPlayerName?.value.trim() !== "") { //we use trim for ignore empty inputs
            this.player = inputPlayerName.value;
        }
 
        this.popUpDiaglog.close(this.player);
    }
  }