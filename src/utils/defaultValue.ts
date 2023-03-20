import { SudokuNumber } from "../components/Board.vue";

export const defaultNumberArray = function() : SudokuNumber[][] {
		return [
				[1,2,3,1,2,3,1,2,3],
				[4,5,6,4,5,6,4,5,6],
				[7,8,9,7,8,9,7,8,9],
				[1,2,3,1,2,3,1,2,3],
				[4,5,6,4,5,6,4,5,6],
				[7,8,9,7,8,9,7,8,9],
				[1,2,3,1,2,3,1,2,3],
				[4,5,6,4,5,6,4,5,6],
				[7,8,9,7,8,9,7,8,9]
		];
}

export const blankNumberArray = function() : SudokuNumber[][] {
		return [
				new Array<SudokuNumber>(9),
				new Array<SudokuNumber>(9),
				new Array<SudokuNumber>(9),
				new Array<SudokuNumber>(9),
				new Array<SudokuNumber>(9),
				new Array<SudokuNumber>(9),
				new Array<SudokuNumber>(9),
				new Array<SudokuNumber>(9),
				new Array<SudokuNumber>(9)
		];
}

export const defaultBooleanArray = function() : boolean[][] {
		return [
				[false, false, false, false, false, false, false, false, false],
				[false, false, false, false, false, false, false, false, false],
				[false, false, false, false, false, false, false, false, false],
				[false, false, false, false, false, false, false, false, false],
				[false, false, false, false, false, false, false, false, false],
				[false, false, false, false, false, false, false, false, false],
				[false, false, false, false, false, false, false, false, false],
				[false, false, false, false, false, false, false, false, false],
				[false, false, false, false, false, false, false, false, false],
		];
}

export const blankBooleanArray = function() : boolean[][]{
		return [
				new Array<boolean>(9),
				new Array<boolean>(9),
				new Array<boolean>(9),
				new Array<boolean>(9),
				new Array<boolean>(9),
				new Array<boolean>(9),
				new Array<boolean>(9),
				new Array<boolean>(9),
				new Array<boolean>(9)
		];
}
