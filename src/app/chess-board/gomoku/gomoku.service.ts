import { Injectable } from '@angular/core';

import { CellState, GameState } from '../chess-board-interface';
import { GameService } from '../game-service-interface';

@Injectable({
  providedIn: 'root',
})
export class GomokuService extends GameService {
  updateGameState(row: number, col: number): void {
    this.gameState = this.updateGameStateByPos(row, col);
  }

  updateGameStateByPos(row: number, col: number): GameState {
    const directions = [
      { dx: 1, dy: 0 }, // Vertical
      { dx: 0, dy: 1 }, // Horizontal
      { dx: 1, dy: 1 }, // Diagonal \
      { dx: 1, dy: -1 }, // Diagonal /
    ];

    for (const dir of directions) {
      let count = 1; // Count of consecutive symbols in the current direction

      // Check forward in the current direction
      for (let i = 1; i < 5; i++) {
        const newRow = row + i * dir.dy;
        const newCol = col + i * dir.dx;

        if (
          newRow >= 0 &&
          newRow < 15 &&
          newCol >= 0 &&
          newCol < 15 &&
          this.boardState[newRow][newCol] === this.currentPlayer
        ) {
          count++;
        } else {
          break;
        }
      }

      // Check backward in the current direction
      for (let i = 1; i < 5; i++) {
        const newRow = row - i * dir.dy;
        const newCol = col - i * dir.dx;

        if (
          newRow >= 0 &&
          newRow < 15 &&
          newCol >= 0 &&
          newCol < 15 &&
          this.boardState[newRow][newCol] === this.currentPlayer
        ) {
          count++;
        } else {
          break;
        }
      }

      // If there are 5 or more consecutive symbols in any direction, set the winner
      if (count >= 5) {
        switch (this.currentPlayer) {
          case CellState.Circle:
            return GameState.CircleWins;
          case CellState.Fork:
            return GameState.ForkWins;
        }
      }
    }

    // Check for draw
    if (this.hasEmptyCell()) {
      return GameState.InProgress;
    } else {
      return GameState.Draw;
    }
  }

  //
}
