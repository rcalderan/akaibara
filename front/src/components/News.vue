<template>
  <b-container fluid id="news">
    <b-row>
      <b-col>
        <h2>Estamos em construção!</h2>
        <p>Estamos nos ajustando para poder servir o mais breve possível.</p>
        <p>Para mais infornmações, mande um whatsapp para (16) 99769-6789</p>
        <Catalog type="yakisoba"/>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import Catalog from './Catalog'
export default {
  name: "news",
  components:{
    Catalog
  },
  props: {},
  computed: {},
  methods: {}
};
</script>

<style>
.bg-info {
  background-color: #fff !important;
  color: red;
}
#mn .nav-link {
  color: red;
}
#mn .active {
  border-bottom: 3px solid red;
}
#mn .disabled {
  color: #bea1a1;
}
</style>