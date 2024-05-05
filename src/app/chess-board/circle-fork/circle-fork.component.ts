import { Component, inject } from '@angular/core';

import { ChessBoardComponent } from '../chess-board-interface';
import { WinnerListService } from '../game-service-interface';
import { CircleForkService } from './circle-fork.service';

@Component({
  selector: 'circle-fork-comp',
  templateUrl: '../chess-board.component.html',
  styleUrls: ['../chess-board.component.css'],
  providers: [CircleForkService, WinnerListService],
})
export class CircleForkComponent extends ChessBoardComponent {
  gameService: CircleForkService;
  listService: WinnerListService;

  constructor() {
    super();
  }

  override initBoardState(): void {
    this.size = 3;

    this.gameService = inject(CircleForkService);
    this.gameService.initBoardState(this.size);

    this.listService = inject(WinnerListService);
  }

  placeChess(row: number, col: number): void {
    if (this.gameService.playChess(row, col) == false) {
      return;
    }

    this.gameService.updateGameState();

    this.showGameState();

    this.markCell(row, col);

    this.gameService.takeTurn();
  }
}
