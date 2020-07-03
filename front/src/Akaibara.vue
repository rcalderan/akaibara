<template>
  <div id="akaibara">
    <Header />
    <b-container fluid>
      <router-view />
    </b-container>
    <Footer />
  </div>
</template>

<script>
  import Header from './components/Hdr'
  import Footer from './components/Footer'
export default {
  name: "akaibara",
  components: {
    Header,
    Footer
  }
}
</script>

<style>
#akaibara {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.container-fluid{
  padding-left: 0px;
  padding-right: 0px;
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
