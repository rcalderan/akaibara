<template>
  <b-conteiner fluid id="catalog">
    <Menu active="catalog" />
    <Catalog />
  </b-conteiner>
</template>

<script>
// @ is an alias to /src
import Menu from "../components/Menu";
import Catalog from "../components/Catalog";
export default {
  name: "Home",
  components: {
    Menu,
    Catalog
  }
};
</script>
<style>
#home {
  padding-left: 0px;
  padding-right: 0px;
}
</style>
