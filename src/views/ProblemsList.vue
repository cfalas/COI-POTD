<template>
	<div class="list">
		<table>
			<tr v-for="p in problems" :key="p.id">
				<td>{{p.date}}</td>
				<td>
					<router-link :to="{name:'problem', params: {problem: p} }" >
						{{p.title}}
					</router-link>
				</td>
			</tr>
		</table>
  </div>
</template>

<script>
import { db } from '@/firebase';
export default {
	name: 'ProblemsList',
	firestore() {
		return {
			problems: db.collection('problems').orderBy('date', 'desc'),
		}
	}
}
</script>

<style scoped>
table{
	width: 60%;
	margin: auto;
	text-align: center;
}
</style>