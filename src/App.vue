<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import Board from "./components/Board.vue";
import Timer from './components/Timer.vue';

const time = reactive({minutes: 0, seconds: 0});
let timer : number;

const isGameWon = ref(false);

const switchGameStatus = function(): void{
		isGameWon.value = !isGameWon.value;
}

const addTime = function(): void{
		time.seconds += 1;
		if(time.seconds >= 60){
				time.minutes += Math.floor(time.seconds / 60);
				time.seconds = Math.floor(time.seconds % 60);
		}
}

onMounted(() => {timer = setInterval(() => addTime(), 1000)});

</script>



<template>
<h1>Sudoku</h1>
<Timer :minutes="time.minutes" :seconds="time.seconds" />
<Board @game-won="() => switchGameStatus()"/>
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
