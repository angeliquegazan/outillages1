import { Component, OnInit } from '@angular/core';
import { timer }             from 'rxjs';
import { DataService }       from '../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  valueToFind : number;
  userValue: number;
  scoreList: any;
  messagesList: any;
  displayMessage: String;
  elapsedTime: number;
  attempt: number;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    let self = this;
    this.messagesList = ["Trop petit...", "Bingo !", "Trop grand :-("];
    this.reset();
    this.scoreList = new Array();

    this.dataService.get().subscribe((results) => {
      results.forEach(function(result){
        let score = {
          time: result.elapsedtime,
          attempt: result.attempt,
          valueToFind: result.valuetotind,
          date: new Date(parseInt(result.date))
        };
        self.scoreList.push(score);
      })
      console.log(results);
    });

    timer(1000, 1000).subscribe(function(value){
      self.elapsedTime++;
    });
  }

  /**
  * Reset les attributs permettant de refaire le jeu
  */
  reset(){
    window["startFireworks"] = false; // Variable défini dans fireworks.js
    this.elapsedTime = 0;
    this.attempt = 0;
    this.displayMessage = "";
    this.userValue = undefined;
    this.valueToFind = Math.floor((Math.random() * 100) + 1);
  }

  /**
  * Permet de savoir si le nombre saisi par l'utilisateur est <, > ou = au nombre recherché
  * @return -1 si le nombre de l'utilisateur est inférieur, 1 s'il est supérieur ou 0 si c'est le bon nombre
  */
  compute(){
    if(this.userValue > this.valueToFind) return 2;
    else if(this.userValue < this.valueToFind) return 0;
    else return 1;
  }

  /**
  * Affiche un message à l'utilisateur en fonction de sa saisie
  */
  getMessage(){
    let computeValue = this.compute();
    this.displayMessage = this.messagesList[computeValue];
    this.attempt++;
    if(computeValue == 1) this.persistScore();
  }

  /**
  * Persist data to database on update score list
  */
  persistScore(){
    window["startFireworks"] = true; // Variable défini dans fireworks.js
    let score = {
      time: this.elapsedTime,
      attempt: this.attempt,
      valueToFind: this.valueToFind,
      date: new Date()
    };

    this.dataService.add(score.attempt, score.time, score.valueToFind).subscribe((result) => {});
    this.scoreList.push(score);
  }

}
