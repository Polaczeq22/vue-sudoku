import type { SudokuNumber } from "../components/Board.vue";
import { Sudoku, generator } from '@forfuns/sudoku';
import { blankNumberArray, blankBooleanArray } from "./defaultValue";

export type PuzzleLevel = 0|1|2|3;

export const generateParsedPuzzle = function(level: PuzzleLevel): [SudokuNumber[][], boolean[][]] {
		let parsed_puzzle = blankNumberArray();
		let modifiable_state = blankBooleanArray();

		const puzzle = generator(level);
		
		let puzzle_element = 0;
		for(let i = 0; i < 9; i++){
				for(let j = 0; j < 9; j++){
						parsed_puzzle[i][j] = puzzle[puzzle_element];
						modifiable_state[i][j] = puzzle[puzzle_element] > 0 ? false : true;
						puzzle_element++;
				}
		}

		return [parsed_puzzle, modifiable_state];
};
