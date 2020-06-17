<template>
	<div class="scoreboard">
		<h2>Scoreboard:</h2>
		<div v-if="loaded">
			<table class="striped-table contained-table">
				<tr v-for="t in users" :key="t[0]">
					<td>{{t.name}}</td>
					<td>{{t.solved[problem["id"]] }}</td>
				</tr>
			</table>
		</div>
		<div v-else>
			Loading...
		</div>
		<div v-if="updating">
			Updating scores...
		</div>
	</div>
</template>

<script>
import { db } from '@/firebase';

export default {
	name: 'scoreboard',
	props: {
		problem: Object
	},
	data() {
		return {
			loaded: false,
			updating: true,
			users: []
		}
	},
	mounted() {
		var scope = this;
		this.$bind('users', db.collection('users'))
		.then((u) => {
			scope.users = u;
			scope.getScore()
		})
		.catch((error) => {
			console.log('error in loading: ', error)
		})
	},

	methods: {
		updateUser(new_user){
			const user = { ...new_user }

			db
				.collection('users')
				.doc(new_user.id)
				.set(user)
				.then(() => {
				console.log('user updated!')
				})			
		},
		async getScore(){
			var scope = this
			this.users.sort(function(a, b){
				return b.solved[scope.problem["id"]] - a.solved[scope.problem["id"]]
			})
			this.loaded = true;
			for(var t=0;t<this.users.length;t+=1){
				var u = this.users[t]
				console.log(u.name)
				const response = await fetch('https://cors-anywhere.herokuapp.com/oj.uz/submissions?handle=' + u.name + '&problem=' + this.problem.ojuz_name)
				var el = document.createElement( 'html' );
				el.innerHTML = await response.text();
				var submissions = el.getElementsByClassName("progressbar")
				var maxScore = 0
				for(var e=0;e<submissions.length;e+=1){
					if(isNaN(parseInt(submissions[e].childNodes[1].innerHTML.split(' ')[0]))==false){
						console.log((parseInt(submissions[e].childNodes[1].innerHTML.split(' ')[0])))
						maxScore = Math.max(maxScore, (parseInt(submissions[e].childNodes[1].innerHTML.split(' ')[0])))
					}
				}
				if(! (this.problem['id'] in this.users[t].solved)){
					this.users[t].solved[this.problem["id"]] = maxScore
				}
				else{
					this.users[t].solved[this.problem["id"]] = Math.max(maxScore, this.users[t].solved[this.problem["id"]]);
				}
				console.log(this.users[t])
				this.updateUser(this.users[t])
			}
			this.users.sort(function(a, b){
				return b.solved[scope.problem["id"]] - a.solved[scope.problem["id"]]
			})
			this.updating = false;
		},
		
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
