<script setup lang="ts">
import { ref, Ref, reactive, onUpdated } from 'vue';
import Cell from './Cell.vue';
import { defaultBooleanArray, blankNumberArray, blankBooleanArray } from "../utils/defaultValue";
import { generateParsedPuzzle } from "../utils/sudokuHandlers";

export type SudokuNumber = -1|1|2|3|4|5|6|7|8|9;
interface SelectedCell {
		row: number,
		column: number
};

const usePencil = ref(false);
const selectedCell : Ref<SelectedCell> = ref({row: -1, column: -1});

const selectCell = function(row: number, column: number): void {
		if(selectedCell.value.row == row && selectedCell.value.column == column){
				selectedCell.value = {row: -1, column: -1};
		}
		else selectedCell.value = {row: row, column: column};
}

const switchPencil = () => { usePencil.value = !usePencil.value; }

const values : SudokuNumber[] = [1,2,3,4,5,6,7,8,9];

const numbers : SudokuNumber[][] = reactive(blankNumberArray());
const isPencil : boolean[][] = reactive(blankBooleanArray());

const default_nums = generateParsedPuzzle(2);
const default_pencils = defaultBooleanArray();

for(let i = 0; i < numbers.length; i++){
		for(let j = 0; j < numbers[i].length; j++){
				numbers[i][j] = default_nums[i][j];
				isPencil[i][j] = default_pencils[i][j];
		}
}

const changeValue = function(row: number, column: number, value: SudokuNumber): void {
		if(selectedCell.value.row === -1 || selectedCell.value.column === -1) return;
		numbers[row][column] = value;
		isPencil[row][column] = usePencil.value;
		selectedCell.value = {row: -1, column: -1};
}

const checkColumns = function(numbers : SudokuNumber[][]): boolean{
		let values_copy = JSON.parse(JSON.stringify(values));
		for(let i = 0; i < numbers[0].length; i++){
				let values_copy = JSON.parse(JSON.stringify(values));
				for(let j = 0; j < numbers.length; j++){
						let value = numbers[j][i];
						if(values_copy.findIndex((element : SudokuNumber) => element === value) === -1){
								return false;
						}
						else{
								values_copy = values_copy.filter((element : SudokuNumber) => element !== value);
						}
				}
		}

		return true;
}

const checkRows = function(numbers : SudokuNumber[][]): boolean{
	for(let i = 0; i < numbers[0].length; i++){
			let values_copy = JSON.parse(JSON.stringify(values));
			for(let j = 0; j < numbers.length; j++){
					let value = numbers[i][j];
					if(values_copy.findIndex((element : SudokuNumber) => element === value) === -1){
							return false;
					}
					else{
							values_copy = values_copy.filter((element : SudokuNumber) => element !== value);
					}
			}
	}

	return true;
}

const checkSquares = function(numbers: SudokuNumber[][]): boolean{
		for(let i = 0; i < numbers.length; i += 3){
				for(let j = 0; j < numbers[i].length; j += 3){
						let values_copy = JSON.parse(JSON.stringify(values));
						for(let k = i; k < i+3; k++){
								for(let l = j; l < j+3; l++){
										let value = numbers[k][l];
										if(values_copy.findIndex((element : SudokuNumber) => element === value) === -1){
												return false;
										}
										else{
												values_copy = values_copy.filter((element : SudokuNumber) => element !== value);
										}
								}
						}
				}
		}
return true;
};

const checkGameStatus = function(): void{
		if(checkColumns(numbers) && checkRows(numbers) && checkSquares(numbers)){
				emit('gameWon');
		}
};

const emit = defineEmits<{
		(e: 'gameWon' ): void,
}>();

onUpdated(() => {
		checkGameStatus();
});

</script>

<template>
<div class="board">
		<div 
				class="board-row"
				v-for="(row, key) in numbers"
				:key="key"
		>
				<Cell
						v-for="(cell, cell_key) in row"
						:key="cell_key"
						:number="cell"
						:row="key"
						:column="cell_key"
						:isPencil="isPencil[key][cell_key]"
						:isSelected="selectedCell.row == key && selectedCell.column == cell_key"
						@select="(row, column) => selectCell(row, column)"
				/>
		</div>
</div>
<div class="button-bar">
		<button
				@click="switchPencil"
		>{{ usePencil ? "Use Pen" : "Use Pencil" }}</button>

		<button
				v-for="value in values"
				key="value"
				@click="() => changeValue(selectedCell.row, selectedCell.column, value)"
		>{{ value }}</button>

		<button
				@click="() => changeValue(selectedCell.row, selectedCell.column, -1)"
		>Clear Cell</button>
</div>
</template>

<style scoped>
div.board{
		width: 64vw;
		height: 64vh;
		background-color: var(--bg);
		margin: auto;
		border: 5px solid var(--border);
}

div.board-row{
		width: 64vw;
		height: calc(64vh / 9);
		display: flex;
		flex-flow: row nowrap;
		align-items: center;
		justify-content: space-evenly;
}

div.button-bar{
		display: flex;
		flex-flow: row nowrap;
		width: 80vw;
		align-items: center;
		justify-content: space-evenly;
		border: 3px solid var(--border);
		margin: 5vh auto;
		padding: 1vh 1vw;
}

button{
		background: none;
		border: 2px solid var(--border);
		color: var(--value);
		font-size: 1em;
		padding: 0.5vh 1vw;
		margin: auto;
		transition: background-color 0.2s, color 0.2s;
}

button:hover{
		background-color: var(--border);
		color: var(--text);
}
</style>
