import { Component, inject } from '@angular/core';

import { ChessBoardComponent } from '../chess-board-interface';
import { WinnerListService } from '../game-service-interface';
import { GomokuService } from './gomoku.service';

@Component({
  selector: 'gomoku-comp',
  templateUrl: '../chess-board.component.html',
  styleUrls: ['../chess-board.component.css'],
  providers: [GomokuService, WinnerListService],
})
export class GomokuComponent extends ChessBoardComponent {
  gameService: GomokuService;
  listService: WinnerListService;

  constructor() {
    super();
  }

  override initBoardState(): void {
    this.size = 15;

    this.gameService = inject(GomokuService);
    this.gameService.initBoardState(this.size);

    this.listService = inject(WinnerListService);
  }

  placeChess(row: number, col: number): void {
    if (this.gameService.playChess(row, col) == false) {
      return;
    }

    this.gameService.updateGameState(row, col);

    this.showGameState();

    this.markCell(row, col);

    this.gameService.takeTurn();
  }

  //
}
