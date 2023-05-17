import TeamModel from '../models/TeamModel';
import MatchModel from '../models/MatchModel';
import ILeaderBoard from '../interface/ILeaderBoard';
import IMatch from '../interface/IMatch';

export default class LeaderBoardService {
  constructor(
    private teamModel = new TeamModel(),
    private matchModel = new MatchModel(),
  ) { }

  async generateBoardHome() {
    const matchesFinished = await this.matchModel.findAllFinished();

    const board = LeaderBoardService.createBoardHome(matchesFinished);
    LeaderBoardService.calculateTotalsHome(board, matchesFinished);
    LeaderBoardService.calculatePoints(board);

    return board.slice(1);
  }

  async generateBoardAway() {
    const matchesFinished = await this.matchModel.findAllFinished();

    const board = LeaderBoardService.createBoardAway(matchesFinished);
    LeaderBoardService.calculateTotalsAway(board, matchesFinished);
    LeaderBoardService.calculatePoints(board);

    return board.slice(1);
  }

  static createBoardHome(matchesFinished: IMatch[]): ILeaderBoard[] {
    const board: ILeaderBoard[] = [];

    for (let i = 0; i < matchesFinished.length; i += 1) {
      const match: IMatch = matchesFinished[i];

      if (!board[match.homeTeamId] && match.homeTeam !== undefined) {
        board[match.homeTeamId] = {
          name: match.homeTeam.teamName,
          totalPoints: 0,
          totalGames: 0,
          totalVictories: 0,
          totalDraws: 0,
          totalLosses: 0,
          goalsFavor: 0,
          goalsOwn: 0,
        };
      }
    }

    return board;
  }

  static createBoardAway(matchesFinished: IMatch[]): ILeaderBoard[] {
    const board: ILeaderBoard[] = [];

    for (let i = 0; i < matchesFinished.length; i += 1) {
      const match: IMatch = matchesFinished[i];

      if (!board[match.awayTeamId] && match.awayTeam !== undefined) {
        board[match.awayTeamId] = {
          name: match.awayTeam.teamName,
          totalPoints: 0,
          totalGames: 0,
          totalVictories: 0,
          totalDraws: 0,
          totalLosses: 0,
          goalsFavor: 0,
          goalsOwn: 0,
        };
      }
    }

    return board;
  }

  static calculateTotalsHome(board: ILeaderBoard[], matchesFinished: IMatch[]) {
    for (let i = 0; i < matchesFinished.length; i += 1) {
      const match: IMatch = matchesFinished[i];
      const teamBoard = board[match.homeTeamId];

      if (teamBoard) {
        teamBoard.totalGames += 1;
        teamBoard.goalsFavor += match.homeTeamGoals;
        teamBoard.goalsOwn += match.awayTeamGoals;

        if (match.homeTeamGoals > match.awayTeamGoals) {
          teamBoard.totalVictories += 1;
        } else if (match.homeTeamGoals < match.awayTeamGoals) {
          teamBoard.totalLosses += 1;
        } else {
          teamBoard.totalDraws += 1;
        }
      }
    }
  }

  static calculateTotalsAway(board: ILeaderBoard[], matchesFinished: IMatch[]) {
    for (let i = 0; i < matchesFinished.length; i += 1) {
      const match: IMatch = matchesFinished[i];
      const teamBoard = board[match.awayTeamId];

      if (teamBoard) {
        teamBoard.totalGames += 1;
        teamBoard.goalsFavor += match.awayTeamGoals;
        teamBoard.goalsOwn += match.homeTeamGoals;

        if (match.awayTeamGoals > match.homeTeamGoals) {
          teamBoard.totalVictories += 1;
        } else if (match.awayTeamGoals < match.homeTeamGoals) {
          teamBoard.totalLosses += 1;
        } else {
          teamBoard.totalDraws += 1;
        }
      }
    }
  }

  static calculatePoints(board: ILeaderBoard[]) {
    for (let i = 0; i < board.length; i += 1) {
      const teamBoard = board[i];

      if (teamBoard) {
        teamBoard.totalPoints = teamBoard.totalVictories * 3 + teamBoard.totalDraws;
      }
    }
  }
}
