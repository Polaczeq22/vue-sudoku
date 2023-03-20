<script setup lang="ts">
import { reactive, defineProps, defineEmits } from 'vue';
import { Time } from "../App.vue";

interface Props{
		time: Time
};

const props = defineProps<Props>();
const emit = defineEmits<{
		(e: "backButtonClicked"): void
}>();

</script>

<template>
<div class="win-screen">
		<h2>U won!</h2>
		<h3>Playtime: {{props.time.minutes.toString().padStart(2, '0')}}:{{props.time.seconds.toString().padStart(2, '0')}}</h3>
		<button
				class="back-button"
				@click="emit('backButtonClicked')"
		>
		Back to main menu
		</button>
</div>
</template>

<style scoped>

</style>
