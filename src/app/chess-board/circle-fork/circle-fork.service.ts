import { Injectable } from '@angular/core';

import { CellState, GameState } from '../chess-board-interface';
import { GameService } from '../game-service-interface';

@Injectable({
  providedIn: 'root',
})
export class CircleForkService extends GameService {
  updateGameState(): void {
    // Check rows
    for (let i = 0; i < 3; i++) {
      if (
        this.boardState[i][0] !== CellState.Empty &&
        this.boardState[i][0] === this.boardState[i][1] &&
        this.boardState[i][0] === this.boardState[i][2]
      ) {
        if (this.boardState[i][0] === CellState.Circle) {
          this.gameState = GameState.CircleWins;
          return;
        } else {
          this.gameState = GameState.ForkWins;
          return;
        }
      }
    }

    // Check columns
    for (let i = 0; i < 3; i++) {
      if (
        this.boardState[0][i] !== CellState.Empty &&
        this.boardState[0][i] === this.boardState[1][i] &&
        this.boardState[0][i] === this.boardState[2][i]
      ) {
        if (this.boardState[0][i] === CellState.Circle) {
          this.gameState = GameState.CircleWins;
          return;
        } else {
          this.gameState = GameState.ForkWins;
          return;
        }
      }
    }

    // Check diagonals
    if (
      this.boardState[0][0] !== CellState.Empty &&
      this.boardState[0][0] === this.boardState[1][1] &&
      this.boardState[0][0] === this.boardState[2][2]
    ) {
      if (this.boardState[0][0] === CellState.Circle) {
        this.gameState = GameState.CircleWins;
        return;
      } else {
        this.gameState = GameState.ForkWins;
        return;
      }
    }

    if (
      this.boardState[0][2] !== CellState.Empty &&
      this.boardState[0][2] === this.boardState[1][1] &&
      this.boardState[0][2] === this.boardState[2][0]
    ) {
      if (this.boardState[0][2] === CellState.Circle) {
        this.gameState = GameState.CircleWins;
        return;
      } else {
        this.gameState = GameState.ForkWins;
        return;
      }
    }

    // Check for draw
    if (this.hasEmptyCell()) {
      this.gameState = GameState.InProgress;
      return;
    } else {
      this.gameState = GameState.Draw;
      return;
    }
  }

  updateGameStateByPos(row: number, col: number): void {
    this.gameState = GameState.InProgress;
  }
}
