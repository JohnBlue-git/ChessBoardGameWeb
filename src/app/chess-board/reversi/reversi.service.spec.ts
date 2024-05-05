import { TestBed } from '@angular/core/testing';
import { ReversiService } from './reversi.service';
import { CellState, GameState } from '../chess-board-interface';

describe('ReversiService', () => {
  let service: ReversiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReversiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize the board correctly', () => {
    service.initBoardState(8);
    const expectedBoardState = [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 2, 1, 0, 0, 0],
      [0, 0, 0, 1, 2, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
    ];
    expect(service.boardState).toEqual(expectedBoardState);
  });

  it('should check if a move is valid', () => {
    service.initBoardState(8);
    expect(service.isMoveValid(3, 3)).toBe(false); // Not empty
    expect(service.isMoveValid(3, 4)).toBe(false); // Not empty
    expect(service.isMoveValid(4, 3)).toBe(false); // Not empty
    expect(service.isMoveValid(4, 4)).toBe(false); // Not empty
    //expect(service.isMoveValid(?, ?)).toBe(false); // Empty, but no opposite pieces to flip

    expect(service.isMoveValid(2, 3)).toBe(true); // Valid move
    expect(service.isMoveValid(4, 5)).toBe(true); // Valid move
  });

  it('should check if there are no more moves', () => {
    service.initBoardState(8);
    expect(service.isNoMoreMoves()).toBe(false); // Initial board has moves

    service.boardState = [
      [1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1],
    ];
    expect(service.isNoMoreMoves()).toBe(true); // No moves for player 1

    service.boardState = [
      [2, 2, 2, 2, 2, 2, 2, 2],
      [2, 2, 2, 2, 2, 2, 2, 2],
      [2, 2, 2, 2, 2, 2, 2, 2],
      [2, 2, 2, 2, 2, 2, 2, 2],
      [2, 2, 2, 2, 2, 2, 2, 2],
      [2, 2, 2, 2, 2, 2, 2, 2],
      [2, 2, 2, 2, 2, 2, 2, 2],
      [2, 2, 2, 2, 2, 2, 2, 2],
    ];
    expect(service.isNoMoreMoves()).toBe(true); // No moves for player 2
  });

  it('should play a chess move', () => {
    service.initBoardState(8);
    //expect(service.playChess(0, 0)).toBe(false); // Not a valid move
    //expect(service.playChess(3, 2)).toBe(false); // Not a valid move
    //expect(service.playChess(2, 3)).toBe(false); // Not a valid move
    //expect(service.playChess(2, 2)).toBe(false); // Not a valid move
    //expect(service.playChess(3, 3)).toBe(false); // Not a valid move
    //expect(service.playChess(5, 5)).toBe(false); // Not a valid move

    expect(service.playChess(2, 3)).toBe(true); // Valid move
    expect(service.boardState[2][3]).toBe(CellState.Circle);
    expect(service.boardState[3][3]).toBe(CellState.Circle);
  });
  
  /*
  it('should update the game state', () => {
    service.initBoardState(8);
    service.boardState = [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 2, 1, 0, 0, 0],
      [0, 0, 0, 1, 2, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
    ];
    service.updateGameState();
    expect(service.gameState).toBe(GameState.InProgress);
  });
  */

  it('should flip opponent pieces', () => {
    service.initBoardState(8);
    service.boardState = [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 2, 1, 0, 0, 0],
      [0, 0, 0, 1, 2, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
    ];
    service.flipOpponentPieces(2, 3);
    expect(service.boardState).toEqual([
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 0, 0, 0, 0],
      [0, 0, 0, 1, 1, 0, 0, 0],
      [0, 0, 0, 1, 2, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
    ]);
  });
});
