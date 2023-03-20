import SudokuNumber from "../components/Board.vue";
import { Sudoku, generator } from '@forfuns/sudoku';
import { blankNumberArray } from "./defaultValue";

type PuzzleLevel = 0|1|2|3;

export const generateParsedPuzzle = function(level: PuzzleLevel): SudokuNumber[][] {
		let parsed_puzzle = blankNumberArray();
		const puzzle = generator(level);
		
		let puzzle_element = 0;
		for(let i = 0; i < 9; i++){
				for(let j = 0; j < 9; j++){
						parsed_puzzle[i][j] = puzzle[puzzle_element];
						puzzle_element++;
				}
		}

		return parsed_puzzle;
};
