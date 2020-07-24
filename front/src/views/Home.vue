<template>
  <b-container fluid id="home">
    <Menu active="home" />
    <News />
  </b-container>
</template>

<script>
// @ is an alias to /src
import Menu from "../components/Menu";
import News from "../components/News";
export default {
  name: "Home",
  components: {
    Menu,
    News
  }
};
</script>
<style>
#home {
  padding-left: 0px;
  padding-right: 0px;
}
</style>
