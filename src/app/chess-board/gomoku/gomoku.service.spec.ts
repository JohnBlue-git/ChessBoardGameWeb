import { TestBed } from '@angular/core/testing';
import { GomokuService } from './gomoku.service';
import { GameState, CellState } from '../chess-board-interface';

describe('GomokuService', () => {
  let service: GomokuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GomokuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize board state', () => {
    const size = 15;
    service.initBoardState(size);
    expect(service.size).toEqual(size);
    expect(service.boardState.length).toEqual(size);
    expect(service.currentPlayer).toEqual(CellState.Circle);
    expect(service.gameState).toEqual(GameState.InProgress);
  });

  it('should reset board state', () => {
    const size = 15;
    service.initBoardState(size);
    service.resetBoardState();
    expect(service.size).toEqual(size);
    expect(service.boardState.length).toEqual(size);
    expect(service.currentPlayer).toEqual(CellState.Circle);
    expect(service.gameState).toEqual(GameState.InProgress);
  });

  it('should get board states', () => {
    const size = 15;
    service.initBoardState(size);
    const boardStates = service.getBoardStates();
    expect(boardStates.length).toEqual(size);
    expect(boardStates[0].length).toEqual(size);
  });

  it('should get board state', () => {
    service.initBoardState(15);
    const row = 1;
    const col = 1;
    const boardState = service.getBoardState(row, col);
    expect(boardState).toEqual(CellState.Empty);
  });

  it('should get game state', () => {
    service.initBoardState(15);
    const gameState = service.getGameState();
    expect(gameState).toEqual(GameState.InProgress);
  });

  /*
  it('should check if there is an empty cell', () => {
    service.boardState = [
      ...AbortController
    ];
    const hasEmptyCell = service.hasEmptyCell();
    expect(hasEmptyCell).toBe(true);
  });
  */

  it('should check if move is valid', () => {
    const size = 15;
    service.initBoardState(size);
    service.boardState[1][1] = CellState.Circle;
    const isValidMove = service.isMoveValid(1, 1);
    expect(isValidMove).toBe(false);
  });

  it('should play chess', () => {
    const size = 15;
    service.initBoardState(size);
    const isValidMove = service.playChess(1, 1);
    expect(isValidMove).toBe(true);
    expect(service.boardState[1][1]).toEqual(CellState.Circle);
  });

  it('should take turn', () => {
    service.currentPlayer = CellState.Circle;
    service.takeTurn();
    //expect(service.currentPlayer).toEqual(CellState.Fork);
    service.takeTurn();
    expect(service.currentPlayer).toEqual(CellState.Circle);
  });

  it('should detect vertical win', () => {
    const boardState = [
      [
        CellState.Circle,
        CellState.Empty,
        CellState.Empty,
        CellState.Empty,
        CellState.Empty,
      ],
      [
        CellState.Circle,
        CellState.Empty,
        CellState.Empty,
        CellState.Empty,
        CellState.Empty,
      ],
      [
        CellState.Circle,
        CellState.Empty,
        CellState.Empty,
        CellState.Empty,
        CellState.Empty,
      ],
      [
        CellState.Circle,
        CellState.Empty,
        CellState.Empty,
        CellState.Empty,
        CellState.Empty,
      ],
      [
        CellState.Circle,
        CellState.Empty,
        CellState.Empty,
        CellState.Empty,
        CellState.Empty,
      ],
    ];
    service.boardState = boardState;
    service.currentPlayer = CellState.Circle;
    service.updateGameState(0, 0);
    expect(service.gameState).toEqual(GameState.CircleWins);
  });

  it('should detect draw', () => {
    const boardState = [
      [
        CellState.Circle,
        CellState.Circle,
        CellState.Fork,
        CellState.Fork,
        CellState.Circle,
      ],
      [
        CellState.Fork,
        CellState.Fork,
        CellState.Circle,
        CellState.Circle,
        CellState.Fork,
      ],
      [
        CellState.Circle,
        CellState.Circle,
        CellState.Fork,
        CellState.Fork,
        CellState.Circle,
      ],
      [
        CellState.Fork,
        CellState.Fork,
        CellState.Circle,
        CellState.Circle,
        CellState.Fork,
      ],
      [
        CellState.Circle,
        CellState.Circle,
        CellState.Fork,
        CellState.Fork,
        CellState.Circle,
      ],
    ];
    service.boardState = boardState;
    service.currentPlayer = CellState.Fork;
    service.updateGameState(0, 2); // Assuming the last move was made here
    expect(service.gameState).toEqual(GameState.Draw);
  });

  //
});
