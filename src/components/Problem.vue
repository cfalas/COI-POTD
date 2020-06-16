<template>
	<div class="hello">
		<h1>{{ problem.date }}: {{ problem.title }}</h1>
		<h3>
			<a :href="problem.url" target="_blank" rel="noopener">Open problem statement</a>
		</h3>

		<br>
		<scoreboard :problem="problem" />

		<h3>Hints</h3>
		<div class="hints-div">
			<details v-for="hint in problem.hints" :key="hint">
				<summary>Hint</summary>
				<p>{{hint}}</p>
			</details>
		</div>
	</div>
</template>

<script>
import Scoreboard from './Scoreboard.vue'
export default {
	name: 'problem',
	props: {
		problem: Object,
	},
	components: {
		Scoreboard
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
	margin: 40px 0 0;
}
ul {
	list-style-type: none;
	padding: 0;
}
li {
	display: inline-block;
	margin: 0 10px;
}
a {
	color: #42b983;
}
.hints-div {
	text-align: left;
	width: 60%;
	margin: auto;
}
.hints-div p {
	padding-left: 20px;
}
</style>
