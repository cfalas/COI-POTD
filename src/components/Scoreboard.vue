<template>
	<div class="scoreboard">
		<h2>Scoreboard:</h2>
		<div v-if="loaded">
			<table class="striped-table contained-table">
				<tr v-for="t in scores" :key="t[0]">
					<td>{{t[0]}}</td>
					<td>{{t[1]}}</td>
				</tr>
			</table>
		</div>
		<div v-else>
			Loading...
		</div>
	</div>
</template>

<script>
export default {
	name: 'scoreboard',
	props: {
		problem: Object
	},
	data() {
		return {
			loaded: false,
			scores: [
				["Theo830", 0],
				["Dremix10", 0],
				["cfalas", 0],
				["ctziapo", 0],
				["Charis02", 0]
			]
		}
	},
	mounted(){
		this.getScore()
	},
	methods: {
		async getScore(){
			for(var t=0;t<this.scores.length;t+=1){
				var u = this.scores[t][0]
				console.log(u)
				const response = await fetch('https://cors-anywhere.herokuapp.com/oj.uz/submissions?handle=' + u + '&problem=' + this.problem.ojuz_name)
				var el = document.createElement( 'html' );
				el.innerHTML = await response.text();
				var submissions = el.getElementsByClassName("progressbar")
				console.log(submissions)
				for(var e=0;e<submissions.length;e+=1){
					if(isNaN(parseInt(submissions[e].childNodes[1].innerHTML.split(' ')[0]))==false){
						console.log((parseInt(submissions[e].childNodes[1].innerHTML.split(' ')[0])))
						this.scores[t][1] = Math.max(this.scores[t][1], (parseInt(submissions[e].childNodes[1].innerHTML.split(' ')[0])))
					}
				}
				console.log('-------------')
			}
			console.log(this.scores)
			this.scores.sort(function (a, b) {
				return b[1] - a[1];
			});

			this.loaded = true;
		}
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
	table {
		margin: auto;
		width: 50%;
	}
</style>
