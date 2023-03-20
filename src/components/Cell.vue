<script setup lang="ts">
import { reactive, defineProps } from 'vue';
import { SudokuNumber } from './Board.vue';

interface Props {
		number: SudokuNumber,
		row: number,
		column: number,
		isPencil: boolean,
		isSelected: boolean,
		isModifiable: boolean,
};

const props : Props = defineProps<Props>();

const state : Props = reactive(props);

const emit = defineEmits<{
		(e: 'select', row: number, column: number, isModifiable: boolean): void
}>();

</script> 

<template>
<div 
		:class="['cell', {'selected': state.isSelected}]"
		@click="$emit('select', state.row, state.column, state.isModifiable)"
>
		<p
				:class="{pencil: state.isPencil, pen: !state.isPencil}"
		>
				{{ state.number > 0 ? state.number : '' }}
		</p>
</div>
</template>

<style scoped>
div{
		transition: background-color 0.2s, color 0.2s;
}

div.cell{
		height: calc(64vh/9);
		width: calc(64vw/9);
		border: 1px solid var(--border);
		border-collapse: collapse;
		padding: auto;
		display: flex;
		flex-flow: row nowrap;
		align-items: center;
		justify-content: center;
}

div.selected{
		background-color: var(--pencilValue) !important;
}

p{
		text-align: center;
		margin: auto;
}

p.pen{
		color: var(--value);
}

p.pencil{
		color: var(--pencilValue); 
}

div.selected p{
		color: var(--text) !important;
}
</style>

