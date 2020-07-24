<template>
  <b-container fluid id="mn">
    <b-nav fill fluid>
      <b-navbar-brand >
        
        <b-avatar href="../" style="marging-left:10px; color:red;" size="2.5em">aKai<br>bara  </b-avatar>
      </b-navbar-brand>
      <b-nav-item v-if="active==='home'" active to="/" exact>Inicio</b-nav-item>
      <b-nav-item v-else to="/" exact>Inicio</b-nav-item>

      <b-nav-item-dropdown
        id="my-nav-dropdown"
        text="Cardápio"
        toggle-class="nav-link-custom"
        right
      >
        <b-dropdown-item v-if="active==='entrada'" active href="catalog?type=entrada">Entradas</b-dropdown-item>
        <b-dropdown-item v-else disabled href="catalog?type=entrada">Entradas</b-dropdown-item>
        <b-dropdown-divider></b-dropdown-divider>
        <b-dropdown-item v-if="active==='yakisoba'" active href="catalog?type=yakisoba">Yakisoba</b-dropdown-item>
        <b-dropdown-item v-else href="catalog?type=yakisoba">Yakisoba</b-dropdown-item>
        <b-dropdown-item v-if="active==='kare'" active  href="catalog?type=kare">Karê</b-dropdown-item>
        <b-dropdown-item v-else href="catalog?type=kare">Karê</b-dropdown-item>
        <b-dropdown-item v-if="active==='outros'" active href="catalog?type=outros">Outros</b-dropdown-item>
        <b-dropdown-item v-else href="/catalog?type=outros">Outros</b-dropdown-item>
        <b-dropdown-divider></b-dropdown-divider>

        <b-dropdown-item
          disabled
          v-if="active==='frio'"
          active
          to="/catalog"
          exact
        >SushiBar (soon?)</b-dropdown-item>
        <b-dropdown-item disabled v-else href="/catalog" exact>SushiBar (soon?)</b-dropdown-item>
        <b-dropdown-divider></b-dropdown-divider>
        <b-dropdown-item disabled>Sobremesas</b-dropdown-item>
      </b-nav-item-dropdown>

      <b-nav-item disabled v-if="active==='historia'" active href="/" exact>Nossa História</b-nav-item>
      <b-nav-item disabled v-else href="/" exact>Nossa História</b-nav-item>

      <b-nav-item disabled v-if="active==='sobre'" active href="/" exact>sobre</b-nav-item>
      <b-nav-item disabled v-else href="/" exact>sobre</b-nav-item>
    </b-nav>
  </b-container>
</template>

<script>
export default {
  name: "mn",
  props: {
    active: { type: String }
  },
  computed: {
    user: function() {
      return "user"; //this.$store.state.user
    }
  },
  methods: {
    linkTo: function(path,type){
      this.$router.push({ path: path, query: { type: type } })
    }
  }
};
</script>

<style>
.bg-info {
  background-color: #fff !important;
  color: red;
}
.container-fluid{  
  padding-right: 0px;
  padding-left: 0px;
}
#mn {
  background-color: #2b2d2c;
}
#mn .nav-link {
  color: red;
}
.dropdown-item {
  color: #ff8181;
}
#mn .active {
  border-bottom: 3px solid red;
}
#mn .disabled {
  color: #bea1a1;
}
</style>