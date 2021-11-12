import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'rock-paper-scissors';
  result = false;
  extended = false;
  win = 0;
  score = 0;
  playerPicked = 0;
  housePicked = 0;
  showRules = false;
  table = [
    [0, -1, 1, 1, -1],
    [1, 0, -1, -1, 1],
    [-1, 1, 0, 1, -1],
    [-1, 1, -1, 0, 1],
    [1, -1, 1, -1, 0]
  ];

  ngOnInit(): void {
    console.log(document.cookie);
    const cookies = document.cookie.split(";");
    const parts = cookies[0].split("=");
    this.score = parseInt(parts[1]);
    if (!this.score) {
      this.score = 0;
    }
  }

  onClick(event: any) {
    this.result = true;
    this.playerPicked = parseInt(event.target.id);
    if (this.extended) {
      this.housePicked = Math.floor(Math.random() * 5);
    } else {
      this.housePicked = Math.floor(Math.random() * 3);
    }
    switch (this.table[this.playerPicked][this.housePicked]) {
      case -1:
        this.win = -1;
        break;
      case 0:
        this.win = 0;
        break;
      case 1:
        this.win = 1;
        this.score++;
        const date = new Date();
        date.setTime(date.getTime() + (24 * 60 * 60 * 1000));
        document.cookie = "score=" + this.score + ";expires=" + date.toUTCString() + ";path=/";
        break;
    }
  }

  onChangeMode(event: any) {
    this.extended = !this.extended;
  }

  onNewGame(event: any) {
    this.result = false;
  }

  onOpenRules(event: any) {
    this.showRules = true;
  }

  onCloseRules(event: any) {
    this.showRules = false;
  }

  getSelectedImage(id: number): string {
    switch (id) {
      case 0:
        return "assets/icon-rock.svg";
      case 1:
        return "assets/icon-paper.svg";
      case 2:
        return "assets/icon-scissors.svg";
      case 3:
        return "assets/icon-lizard.svg";
      case 4:
        return "assets/icon-spock.svg";
      default:
        return "";
    }
  }

  getResultMessage(): string {
    switch (this.win) {
    case -1:
      return "YOU LOSE";
    case 0:
      return "DRAW";
    case 1:
      return "YOU WIN";
    default:
      return "";
    }
  }
}
