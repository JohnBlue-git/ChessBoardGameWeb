import { Injectable } from '@angular/core';

import { CellState, GameState } from '../chess-board-interface';
import { GameService } from '../game-service-interface';

// reversi
//https://en.wikipedia.org/wiki/Reversi

@Injectable({
  providedIn: 'root',
})
export class ReversiService extends GameService {
  override initPlace() {
    this.boardState[3][3] = CellState.Fork;
    this.boardState[4][4] = CellState.Fork;
    this.boardState[3][4] = CellState.Circle;
    this.boardState[4][3] = CellState.Circle;
  }

  override isMoveValid(row: number, col: number): boolean {
    if (this.boardState[row][col] !== CellState.Empty) {
      return false;
    }

    const currentPlayer = this.currentPlayer;
    const opponentPlayer =
      currentPlayer === CellState.Fork ? CellState.Circle : CellState.Fork;

    const directions = [
      { dx: 0, dy: -1 }, // Up
      { dx: 1, dy: -1 }, // Up-Right
      { dx: 1, dy: 0 }, // Right
      { dx: 1, dy: 1 }, // Down-Right
      { dx: 0, dy: 1 }, // Down
      { dx: -1, dy: 1 }, // Down-Left
      { dx: -1, dy: 0 }, // Left
      { dx: -1, dy: -1 }, // Up-Left
    ];

    let isValid = false;

    for (const dir of directions) {
      let rowDelta = dir.dy;
      let colDelta = dir.dx;
      let r = row + rowDelta;
      let c = col + colDelta;
      let foundOpponentPiece = false;

      while (
        r >= 0 &&
        r < 8 &&
        c >= 0 &&
        c < 8 &&
        this.boardState[r][c] === opponentPlayer
      ) {
        r += rowDelta;
        c += colDelta;
        foundOpponentPiece = true;
      }

      if (
        r >= 0 &&
        r < 8 &&
        c >= 0 &&
        c < 8 &&
        this.boardState[r][c] === currentPlayer &&
        foundOpponentPiece
      ) {
        isValid = true; // Valid move found in at least one direction
        break;
      }
    }

    return isValid;
  }

  isNoMoreMoves(): boolean {
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        if (this.isMoveValid(r, c)) {
          return false; // Found a valid move
        }
      }
    }
    return true; // No valid moves found
  }

  override playChess(row: number, col: number): boolean {
    if (
      this.gameState !== GameState.InProgress ||
      this.isMoveValid(row, col) == false
    ) {
      return false;
    }

    this.boardState[row][col] = this.currentPlayer;

    this.flipOpponentPieces(row, col);

    return true;
  }

  updateGameState(): void {
    let forkCount = 0;
    let circleCount = 0;

    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        if (this.boardState[row][col] === CellState.Fork) {
          forkCount++;
        } else if (this.boardState[row][col] === CellState.Circle) {
          circleCount++;
        }
      }
    }

    if (forkCount > circleCount) {
      this.gameState = GameState.ForkWins;
    } else if (circleCount > forkCount) {
      this.gameState = GameState.CircleWins;
    } else {
      this.gameState = GameState.Draw;
    }
  }

  flipOpponentPieces(row: number, col: number): void {
    const currentPlayer = this.currentPlayer;
    const opponentPlayer =
      currentPlayer === CellState.Fork ? CellState.Circle : CellState.Fork;

    const directions = [
      { dx: 0, dy: -1 }, // Up
      { dx: 1, dy: -1 }, // Up-Right
      { dx: 1, dy: 0 }, // Right
      { dx: 1, dy: 1 }, // Down-Right
      { dx: 0, dy: 1 }, // Down
      { dx: -1, dy: 1 }, // Down-Left
      { dx: -1, dy: 0 }, // Left
      { dx: -1, dy: -1 }, // Up-Left
    ];

    for (const dir of directions) {
      let rowDelta = dir.dy;
      let colDelta = dir.dx;
      let r = row + rowDelta;
      let c = col + colDelta;

      while (
        r >= 0 &&
        r < 8 &&
        c >= 0 &&
        c < 8 &&
        this.boardState[r][c] === opponentPlayer
      ) {
        r += rowDelta;
        c += colDelta;
      }

      if (
        r >= 0 &&
        r < 8 &&
        c >= 0 &&
        c < 8 &&
        this.boardState[r][c] === currentPlayer
      ) {
        // Flip opponent's pieces in the current direction
        while (!(row === r && col === c)) {
          r -= rowDelta;
          c -= colDelta;
          this.boardState[r][c] = currentPlayer;
        }
      }
    }
  }

  //
}
