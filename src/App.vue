<script setup lang="ts">
import { ref, Ref, reactive } from 'vue';
import type { PuzzleLevel } from "./utils/sudokuHandlers";
import Board from "./components/Board.vue";
import Timer from './components/Timer.vue';
import StartScreen from './components/StartScreen.vue';
import WinScreen from './components/WinScreen.vue';

export interface Time{
		minutes: number,
		 seconds: number
};

const time: Time = reactive({minutes: 0, seconds: 0});
let timer: number;

const isGameWon = ref(false);
const hasGameStarted = ref(false);
const puzzle_level : Ref<PuzzleLevel> = ref(0);

const switchGameWinStatus = function(): void{
		isGameWon.value = !isGameWon.value;
}

const switchGameStartedStatus = function(): void{
		hasGameStarted.value = !hasGameStarted.value;
}

const initializeGame = function(level: PuzzleLevel): void {
		puzzle_level.value = level;
		switchGameStartedStatus();
		timer = setInterval(() => addTime(), 1000);
}

const haltGame = function(): void{
		clearInterval(timer);
		switchGameWinStatus();
}

const resetGame = function(): void{
		switchGameWinStatus();
		switchGameStartedStatus();
}

const addTime = function(): void{
		time.seconds += 1;
		if(time.seconds >= 60){
				time.minutes += Math.floor(time.seconds / 60);
				time.seconds = Math.floor(time.seconds % 60);
		}
}

</script>



<template>
<h1>Sudoku</h1>
<StartScreen v-if="!hasGameStarted && !isGameWon" @level-chosen="(level) => initializeGame(level)" />
<Timer :minutes="time.minutes" :seconds="time.seconds" v-if="hasGameStarted && !isGameWon"/>
<Board :level="puzzle_level" @game-won="() => haltGame()" v-if="hasGameStarted && !isGameWon"/>
<WinScreen v-if="hasGameStarted && isGameWon" :time="time" @back-button-clicked="resetGame()"/>
<footer>Michał Mikuła 2023</footer>
</template>


<style scoped>
h1{
		color: var(--text);
		font-size: 2em;
		text-align: center;
}



footer{
		font-size: 1em;
		color: var(--text);
		text-align: center;
}
</style>
