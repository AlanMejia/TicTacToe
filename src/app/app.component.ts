import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  //Created an array od squares to hold the grid of buttons properties
  squares = new Array<Square>();
  // who is next?
  xIsNext = true;
  // save the winner
  winner = '';
  // holds who is in turn
  currentPlayer = 'X';

  ngOnInit(){   
    // reset the board when loading component
    this.reset(); 
  }
  
  // returns the next player
  whosNext(){
    return this.xIsNext ? 'X' : 'O';
  }

  //clean all used values fromthe board to start a new game
  reset(){
    this.squares = [new Square(''), new Square(''),new Square(''),new Square(''),
    new Square(''),new Square(''),new Square(''),new Square(''),new Square('')];
    this.xIsNext = true;
    this.currentPlayer = this.whosNext();
    this.winner = '';

  }

  // records the value of the button clicked when there is no winner and the button clicked is empty
  play(squareNumber: number){
    if(this.squares[squareNumber].getVal() == '' && this.winner == ''){      
      this.squares[squareNumber].setVal(this.currentPlayer);
      this.squares[squareNumber].setStyle();
      // switch player
      this.xIsNext = !this.xIsNext;
      this.currentPlayer = this.whosNext();
    }
    //check if there's a winner already
    this.winner = this.isWin();
  }

  //function to play randomly bot vs bot (no best path algorithm here, just random)
  playBotVsBot(){
    let squareNumbers = new Array();
    while(this.winner == ''){
      const snum =  this.randomIntFromInterval(0,8)
      if(!squareNumbers.includes(snum)){
        this.play(snum);         
      }      
    }
  }

  //random function to retrieve numbers from 0 to 8 as I named my grid numbers from those numbers
  randomIntFromInterval(min: number, max: number) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  // Checks if there is a winner
  isWin(){
    console.log('calculating win')
    //Array to store all the possible winning combinations
    const arr=[
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6],
      [0,1,2],
      [3,4,5],
      [6,7,8]      
    ]
    //iterate over the matrix
    for(let idx=0; idx<arr.length; idx++){
      //create constants to store each of the array winning combinations
      const [a,b,c]= arr[idx];
      //check if the squares array that hold buttons values are not empty, then see if the values match to return a winner!
      if( this.squares[a].getVal() != '' && this.squares[a].getVal() === this.squares[b].getVal() &&
          this.squares[b].getVal() === this.squares[c].getVal() ){
            console.log('winner is '+ this.squares[a].getVal())
            return this.squares[a].getVal();
        }
    }
    return '';
  }
}

//Class Square holds the value X or Y as a string and handles holds style for the button
class Square {
  value: string;
  isX = false; 
  isO = false;

  constructor(value: string){
    this.value=value;
  }

  setVal(value: string){
    this.value=value;
  }

  getVal(){
    return this.value;
  }

  setStyle(){
    if(this.value=='X') this.isX = true;
    if(this.value=='O') this.isO = true;
  }
}