import { of, Observable } from 'rxjs';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CellState, GameState } from '../chess-board-interface';
import { ReversiComponent } from './reversi.component';
import { ReversiService } from './reversi.service';
import { WinnerListService } from '../game-service-interface';

describe('RevrsiComponent', () => {
  let component: ReversiComponent;
  let fixture: ComponentFixture<ReversiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReversiComponent],
      imports: [HttpClientTestingModule],
      providers: [
        { provide: ReversiService },
        { provide: WinnerListService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReversiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize board state', () => {
    // 還不知知道怎麼處理
    // https://angular.io/errors/NG0203
    spyOn(component.gameService, 'initBoardState');
    component.initBoardState();
    expect(component.size).toEqual(8);
    expect(component.gameService.initBoardState).toHaveBeenCalledWith(3);
  });

  it('should initialize board', () => {
    spyOn(component, 'setCellWidthHeight');
    spyOn(component, 'showGameState');
    spyOn(component, 'markCells');
    component.initBoard();
    expect(component.board.length).toEqual(component.size);
    expect(component.setCellWidthHeight).toHaveBeenCalled();
    expect(component.showGameState).toHaveBeenCalled();
    expect(component.markCells).toHaveBeenCalled();
  });

  it('should reset game', () => {
    spyOn(component.gameService, 'resetBoardState');
    spyOn(component, 'initBoard');
    component.resetGame();
    expect(component.gameService.resetBoardState).toHaveBeenCalled();
    expect(component.initBoard).toHaveBeenCalled();
  });

  /*
  it('should set cell width and height', () => {
    spyOn(window, 'innerWidth').and.returnValue(600);
    component.setCellWidthHeight();
    expect(component.cellHeight).toEqual(186.66666666666666);
    expect(component.cellWidth).toEqual(560);
    expect(component.cellFrontSize).toEqual(167.99999999999997);
  });
  */

  it('should update cell width and height on window resize', () => {
    spyOn(component, 'setCellWidthHeight');
    component.onResize(null);
    expect(component.setCellWidthHeight).toHaveBeenCalled();
  });

  //it('should place chess', () => {
    //spyOn(component.gameService, 'playChess').and.returnValue(true);
    //spyOn(component.gameService, 'updateGameState');
    //spyOn(component.gameService, 'takeTurn');
    //spyOn(component, 'markCell');
    //expect(component.gameService.playChess).toHaveBeenCalledWith(1, 1);
    //expect(component.gameService.updateGameState).toHaveBeenCalled();
    //expect(component.gameService.takeTurn).toHaveBeenCalled();
    //expect(component.markCell).toHaveBeenCalled();
  //});

  it('should not place chess if invalid move', () => {
    spyOn(component.gameService, 'playChess').and.returnValue(false);
    spyOn(component.gameService, 'updateGameState');
    spyOn(component.gameService, 'takeTurn');
    spyOn(component, 'markCell');
    component.placeChess(1, 1);
    expect(component.gameService.playChess).toHaveBeenCalledWith(1, 1);
    expect(component.gameService.updateGameState).not.toHaveBeenCalled();
    expect(component.gameService.takeTurn).not.toHaveBeenCalled();
    expect(component.markCell).not.toHaveBeenCalled();
  });

  it('should mark cell', () => {
    component.board
      = Array(8).fill(null)
      .map(() => Array(8).fill(''));
    component.gameService.boardState[1][1] = CellState.Circle;
    component.markCell(1, 1);
    expect(component.board[1][1]).toEqual('O');
  });

  it('should mark cells', () => {
    component.board
      = Array(8).fill(null)
      .map(() => Array(8).fill(''));
    component.gameService.boardState[1][1] = CellState.Circle;
    component.markCells();
    expect(component.board[1][1]).toEqual('O');
  });

  it('should show game state', () => {
    spyOn(component.gameService, 'getGameState').and.returnValue(
      GameState.CircleWins
    );
    spyOn(component.listService, 'postWinner');
    spyOn(component.listService, 'getWinner').and.returnValue(
      of(['Circle', 'Fork'])
    );
    component.showGameState();
    expect(component.gameStateStr).toEqual('Circle wins!');
    expect(component.listService.postWinner).toHaveBeenCalledWith('Circle');
    expect(component.listService.getWinner).toHaveBeenCalled();
  });
});
