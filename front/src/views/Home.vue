<template>
  <div class="home">
    <Menu active="home"/>
    <News />
  </div>
</template>

<script>
// @ is an alias to /src
import Menu from '../components/Menu'
import News from '../components/News'
export default {
  name: 'Home',
  components: {
    Menu,News
  }
}
</script>
