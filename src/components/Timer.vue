<script setup lang="ts">
import { ref, Ref } from 'vue';

interface Props{
		minutes: number,
		seconds: number
};

const props = defineProps<Props>();

</script>

<template>
<h3 class="timer">
		Playtime: {{props.minutes.toString().padStart(2, '0')}}:{{props.seconds.toString().padStart(2, '0')}}
</h3>
</template>

<style scoped>
h3.timer{
		text-align:center;
		color: var(--text);
		font-size: 1em;
		transition: content 0.2s;
		margin: 1em auto;
}
</style>
