<template>
	<div>
		<table>
			<tr>
				<th>User</th>
				<th v-for="p in problems" :key="p['id']">
					{{p.title}}
				</th>
				<th>Total</th>
			</tr>
			<tr v-for="u in users" :key="u['id']">
				<td>{{u.name}}</td>
				<td v-for="p in problems" :key="p['id']">
					<span v-if="p['id'] in u.solved">
						{{u.solved[p['id']]}}
					</span>
					<span v-else>
						0
					</span>
				</td>
				<td>
					<span v-if="loading">
						-
					</span>
					<span v-else>
						{{u.total}}
					</span>
				</td>
			</tr>
		</table>
	</div>
</template>

<script>
	import { db } from '@/firebase';
	
	export default {
		name: 'App',
		data(){
			return {
				users: null,
				loading: true
			}
		},
		firestore() {
			return {
				problems: db.collection('problems').orderBy('date', 'asc'),
			}
		},
		mounted() {
			var scope = this;
			this.$bind('users', db.collection('users'))
			.then((users) => {
				var u=0
				for(u in users){
					var tot=0
					console.log(u)
					for(var t in users[u].solved){
						tot+=users[u].solved[t]
					}
					console.log(users[u].name, tot)
					scope.users[u].total = tot
					
				}
				users.sort((a, b) => {
					return b.total - a.total
				})
				scope.users = users
				console.log(scope.users)
				scope.loading = false
			})
			.catch((error) => {
				console.log('error in loading: ', error)
			})
		},
	}
</script>

<style>
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	margin-top: 60px;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
table{
	width: 80%;
	margin: auto;
}

</style>