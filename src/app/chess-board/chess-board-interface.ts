import { Component, OnInit } from '@angular/core';
import { of, Observable } from 'rxjs';

import { GameService, RESTService } from './game-service-interface';

export enum CellState {
  Empty,
  Circle,
  Fork,
}

export enum GameState {
  InProgress,
  CircleWins,
  ForkWins,
  Draw,
}

@Component({
  selector: 'chess-board-comp',
  template: '',
})
export abstract class ChessBoardComponent {
  size: number;
  board: Array<Array<string>>;
  gameStateStr: string;
  winners$: Observable<string[]>;

  cellFrontSize: number;
  cellHeight: number;
  cellWidth: number;

  abstract gameService: GameService;
  abstract listService: RESTService;

  constructor() {
    this.initBoardState();
    this.initBoard();
  }

  initBoardState(): void {}

  initBoard(): void {
    this.board = Array(this.size)
      .fill(null)
      .map(() => Array(this.size).fill(''));

    this.setCellWidthHeight();

    this.showGameState();

    this.markCells();
  }

  resetGame(): void {
    this.gameService.resetBoardState();
    this.initBoard();
  }

  setCellWidthHeight(): void {
    this.cellHeight = (window.innerWidth - 40) / this.size;
    this.cellWidth = window.innerWidth - 40;
    this.cellFrontSize = this.cellHeight * 0.9;

    if (this.cellHeight < 60) return;

    this.cellHeight = 60;
    this.cellWidth = this.cellHeight * this.size;
    this.cellFrontSize = this.cellHeight * 0.9;
  }

  onResize(event: any) {
    this.setCellWidthHeight();
  }

  markCell(row: number, col: number): void {
    const boardState = this.gameService.getBoardState(row, col);

    this.board[row][col] = boardState === CellState.Circle ? 'O' : 'X';
  }

  markCells(): void {
    const boardState = this.gameService.getBoardStates();

    for (var r = 0; r < this.size; r++) {
      for (var c = 0; c < this.size; c++) {
        if (boardState[r][c] === CellState.Empty) continue;

        this.board[r][c] = boardState[r][c] === CellState.Circle ? 'O' : 'X';
      }
    }
  }

  showGameState(): void {
    const gameState = this.gameService.getGameState();

    // show state
    this.gameStateStr = this.getGameStateStr(gameState);

    // post winners
    switch (gameState) {
      case GameState.CircleWins:
        this.listService.postWinner('Circle');
        break;
      case GameState.ForkWins:
        this.listService.postWinner('Fotk');
        break;
    }

    // get winners
    this.winners$ = this.listService.getWinner();
  }

  getGameStateStr(state: GameState): string {
    switch (state) {
      case GameState.InProgress:
        return 'in grogress';
      case GameState.Draw:
        return 'in draw';
      case GameState.CircleWins:
        return 'Circle wins!';
      case GameState.ForkWins:
        return 'Fork wins!';
    }
  }

  abstract placeChess(row: number, col: number): void;
}
