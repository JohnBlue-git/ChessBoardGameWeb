import { Component, inject } from '@angular/core';

import { ChessBoardComponent } from '../chess-board-interface';
import { WinnerListService } from '../game-service-interface';
import { ReversiService } from './reversi.service';

@Component({
  selector: 'reversi-comp',
  templateUrl: '../chess-board.component.html',
  styleUrls: ['../chess-board.component.css'],
  providers: [ReversiService, WinnerListService],
})
export class ReversiComponent extends ChessBoardComponent {
  gameService: ReversiService;
  listService: WinnerListService;

  constructor() {
    super();
  }

  override initBoardState(): void {
    this.size = 8;

    this.gameService = inject(ReversiService);
    this.gameService.initBoardState(this.size);

    this.listService = inject(WinnerListService);
  }

  placeChess(row: number, col: number): void {
    if (this.gameService.playChess(row, col) == false) {
      return;
    }

    if (!this.gameService.hasEmptyCell() || this.gameService.isNoMoreMoves()) {
      this.gameService.updateGameState();
    }

    this.showGameState();

    this.markCells();

    this.gameService.takeTurn();
  }

  //
}
