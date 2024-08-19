<template>
  <Menu>
    <router-link to="/">Home</router-link>
    <router-link to="/about">About</router-link>
    <router-link to="/estudiante">Estudiantes</router-link>
    <router-link to="/tutor">Tutores</router-link>
    <router-link to="/trabajo">Trabajos</router-link>
    <router-link to="/revision">Revisiones</router-link>
  </Menu>
  <router-view />
</template>

<script>

import Menu from './components/Menu.vue'

export default {
  name: 'App',
  data() {
    return {

    }
  },
  components: {
    Menu
  }
}

</script>

<style lang="scss">
</style>