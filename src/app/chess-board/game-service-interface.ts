import { of, Observable } from 'rxjs';
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { CellState, GameState } from './chess-board-interface';

export abstract class GameService {
  size: number;
  boardState: CellState[][];
  currentPlayer: CellState;
  gameState: GameState;

  initBoardState(size: number): void {
    this.size = size;

    this.boardState = Array(this.size)
      .fill(null)
      .map(() => Array(this.size).fill(CellState.Empty));

    this.currentPlayer = CellState.Circle;

    this.gameState = GameState.InProgress;

    this.initPlace();
  }

  initPlace(): void {}

  resetBoardState(): void {
    this.initBoardState(this.size);
  }

  getBoardStates(): CellState[][] {
    return this.boardState;
  }

  getBoardState(row: number, col: number): CellState {
    return this.boardState[row][col];
  }

  getGameState(): GameState {
    return this.gameState;
  }

  hasEmptyCell(): boolean {
    return this.boardState.some((row) => row.includes(CellState.Empty));
  }

  isMoveValid(row: number, col: number): boolean {
    return this.boardState[row][col] === CellState.Empty;
  }

  playChess(row: number, col: number): boolean {
    if (
      this.gameState !== GameState.InProgress ||
      this.isMoveValid(row, col) == false
    ) {
      return false;
    }

    this.boardState[row][col] = this.currentPlayer;

    return true;
  }

  takeTurn(): void {
    if (this.currentPlayer === CellState.Circle) {
      this.currentPlayer = CellState.Fork;
    } else {
      this.currentPlayer = CellState.Circle;
    }
  }

  abstract updateGameState(row: number, col: number): void;
}

export abstract class RESTService {
  //
  http = inject(HttpClient);
  //constructor(private http: HttpClient) {}

  // how to use http tools
  // ref:https://www.telerik.com/blogs/angular-basics-how-to-use-httpclient

  abstract postWinner(name: string): void;
  abstract getWinner(): Observable<string[]>;
}

@Injectable({
  providedIn: 'root',
})
export class WinnerListService extends RESTService {
  postWinner(name: string): void {
    // 沒有json-server --watch db.json,無法運作
    //this.http.post<string>('http://localhost:3000/winner', name);
  }

  getWinner(): Observable<string[]> {
    // 沒有json-server --watch db.json,無法運作
    //this.winners$ = this.http.get<string[]>('http://localhost:3000/winner');

    // 示範
    let winner: string[] = ['Circle', 'Circle', 'Fork'];
    return of(winner);
  }
}
