<template>
    <div>
        <problem :problem="last_problem[0]"></problem>
    </div>
</template>

<script>
    import Problem from '@/components/Problem.vue'
    import { db } from '@/firebase';
    
	export default {
        name: 'App',
        components: {
            Problem
        },
        firestore() {
            return {
                last_problem: db.collection('problems').orderBy('date', 'desc').limit(1),
            }
        }

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

</style>