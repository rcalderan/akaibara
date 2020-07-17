<template>
  <b-container fluid id="mn">
    <b-nav fill>
      <b-nav-item v-if="active==='home'" active to="/" exact>Inicio</b-nav-item>
      <b-nav-item v-else to="/" exact>Inicio</b-nav-item>

      <b-nav-item-dropdown
        id="my-nav-dropdown"
        text="Cardápio"
        toggle-class="nav-link-custom"
        right
      >

        <b-dropdown-item v-if="active==='yakisoba'" active to="/catalog?type=yakisoba" exact>Yakisoba</b-dropdown-item>
        <b-dropdown-item v-else to="/catalog?type=yakisoba" exact>Yakisoba</b-dropdown-item>
        <b-dropdown-item v-if="active==='kare'" active to="/catalog?type=kare" exact>Karê</b-dropdown-item>
        <b-dropdown-item v-else to="/catalog?type=yakisoba" exact>Karê</b-dropdown-item>
        <b-dropdown-item v-if="active==='kare'" active to="/catalog?type=more" exact>Outros</b-dropdown-item>
        <b-dropdown-item v-else to="/catalog?type=more" exact>Outros</b-dropdown-item>
        <b-dropdown-divider></b-dropdown-divider>

        <b-dropdown-item
          disabled
          v-if="active==='frio'"
          active
          to="/catalog"
          exact
        >SushiBar (soon?)</b-dropdown-item>
        <b-dropdown-item disabled v-else to="/catalog" exact>SushiBar (soon?)</b-dropdown-item>
        <b-dropdown-divider></b-dropdown-divider>
        <b-dropdown-item disabled>Sobremesas</b-dropdown-item>
      </b-nav-item-dropdown>

      <b-nav-item disabled v-if="active==='historia'" active to="/" exact>Nossa História</b-nav-item>
      <b-nav-item disabled v-else to="/" exact>Nossa História</b-nav-item>

      <b-nav-item disabled v-if="active==='sobre'" active to="/" exact>sobre</b-nav-item>
      <b-nav-item disabled v-else to="/" exact>sobre</b-nav-item>
    </b-nav>
    <!--
    <b-navbar toggleable="lg" type="light" variant="info" fill>
      <b-navbar-nav>
        
        <b-nav-item v-if="active==='home'" active to="/" exact>Inicio</b-nav-item>
        <b-nav-item v-else active to="/" exact>Inicio</b-nav-item>
        

        <b-nav-item-dropdown text="Cardápio">
          <b-dropdown-item v-if="active==='cardapio'" active to="/" exact>Entradas</b-dropdown-item>
          <b-dropdown-item v-else to="/" exact>Entradas</b-dropdown-item>
          <b-dropdown-item v-if="active==='quentes'" active to="/" exact>Pratos Quentes</b-dropdown-item>
          <b-dropdown-item v-else to="/" exact>Pratos Quentes</b-dropdown-item>

          <b-dropdown-divider></b-dropdown-divider>
          
          <b-dropdown-item v-if="active==='sushibar'" disabled active to="/" exact>SushiBar</b-dropdown-item>
          <b-dropdown-item v-else to="/" disabled exact>SushiBar</b-dropdown-item>
          <b-dropdown-divider></b-dropdown-divider>
          
          <b-dropdown-item v-if="active==='sobremesa'" active to="/" exact>Sobremesas</b-dropdown-item>
          <b-dropdown-item v-else to="/" exact>Sobremesas</b-dropdown-item>

        </b-nav-item-dropdown>

        <b-nav-item-dropdown text="Venda">
          <b-dropdown-item v-if="active==='sale'" active to="/sale" exact>Frente de caixa</b-dropdown-item>
          <b-dropdown-item v-else to="/sale" exact>Frente de caixa</b-dropdown-item>

          <b-dropdown-divider></b-dropdown-divider>
          
          <b-dropdown-item disabled to="/nfe" exact>Notas Fiscais</b-dropdown-item>
          <b-dropdown-item disabled to="/relatorio" exact>Relatório</b-dropdown-item>

        </b-nav-item-dropdown>

        
        <b-nav-item-dropdown text="Pesquisa">
          <b-dropdown-item disabled to="/" exact>Localizar Contrato (locação)</b-dropdown-item>

          <b-dropdown-divider></b-dropdown-divider>
          
          <b-dropdown-item disabled to="/" exact>Localizar Venda</b-dropdown-item>
          <b-dropdown-divider></b-dropdown-divider>
          
          <b-dropdown-item disabled to="/" exact>Localizar Nota Fiscal</b-dropdown-item>

        </b-nav-item-dropdown>
        
        
        <b-nav-item-dropdown text="Relatório">
          <b-dropdown-item disabled to="/" exact>Agendamentos</b-dropdown-item>
          <b-dropdown-divider></b-dropdown-divider>
          <b-dropdown-item disabled to="/" exact>Locação</b-dropdown-item>
          <b-dropdown-item disabled to="/" exact>Devolução</b-dropdown-item>

          <b-dropdown-divider></b-dropdown-divider>
          
          <b-dropdown-item disabled to="/" exact>Venda</b-dropdown-item>
          <b-dropdown-divider></b-dropdown-divider>
          
          <b-dropdown-item disabled to="/" exact>Notas</b-dropdown-item>

        </b-nav-item-dropdown>
        
      </b-navbar-nav>
    </b-navbar>
    -->
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
  methods: {}
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