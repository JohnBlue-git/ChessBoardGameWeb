import { TestBed } from '@angular/core/testing';
import { CircleForkService } from './circle-fork.service';
import { GameState, CellState } from '../chess-board-interface';

describe('CircleForkService', () => {
  let service: CircleForkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CircleForkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize board state', () => {
    const size = 3;
    service.initBoardState(size);
    expect(service.size).toEqual(size);
    expect(service.boardState.length).toEqual(size);
    expect(service.currentPlayer).toEqual(CellState.Circle);
    expect(service.gameState).toEqual(GameState.InProgress);
  });

  it('should reset board state', () => {
    const size = 3;
    service.initBoardState(size);
    service.resetBoardState();
    expect(service.size).toEqual(size);
    expect(service.boardState.length).toEqual(size);
    expect(service.currentPlayer).toEqual(CellState.Circle);
    expect(service.gameState).toEqual(GameState.InProgress);
  });

  it('should get board states', () => {
    const size = 3;
    service.initBoardState(size);
    const boardStates = service.getBoardStates();
    expect(boardStates.length).toEqual(size);
    expect(boardStates[0].length).toEqual(size);
  });

  it('should get board state', () => {
    const size = 3;
    service.initBoardState(size);
    const row = 1;
    const col = 1;
    const boardState = service.getBoardState(row, col);
    expect(boardState).toEqual(CellState.Empty);
  });

  it('should get game state', () => {
    const size = 3;
    service.initBoardState(size);
    const gameState = service.getGameState();
    expect(gameState).toEqual(GameState.InProgress);
  });

  it('should check if there is an empty cell', () => {
    service.boardState = [
      [CellState.Circle, CellState.Fork, CellState.Empty],
      [CellState.Empty, CellState.Empty, CellState.Empty],
      [CellState.Fork, CellState.Circle, CellState.Fork],
    ];
    const hasEmptyCell = service.hasEmptyCell();
    expect(hasEmptyCell).toBe(true);
  });

  it('should check if move is valid', () => {
    const size = 3;
    service.initBoardState(size);
    service.boardState[1][1] = CellState.Circle;
    const isValidMove = service.isMoveValid(1, 1);
    expect(isValidMove).toBe(false);
  });

  it('should play chess', () => {
    const size = 3;
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

  it('should detect Circle win in rows', () => {
    service.boardState = [
      [CellState.Circle, CellState.Circle, CellState.Circle],
      [CellState.Empty, CellState.Empty, CellState.Empty],
      [CellState.Empty, CellState.Empty, CellState.Empty],
    ];
    service.updateGameState();
    expect(service.gameState).toEqual(GameState.CircleWins);
  });

  it('should detect Fork win in rows', () => {
    service.boardState = [
      [CellState.Fork, CellState.Fork, CellState.Fork],
      [CellState.Empty, CellState.Empty, CellState.Empty],
      [CellState.Empty, CellState.Empty, CellState.Empty],
    ];
    service.updateGameState();
    expect(service.gameState).toEqual(GameState.ForkWins);
  });

  //
});
