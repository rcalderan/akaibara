<template>
  <b-row id="ftr" no-gutters>
    <b-col class="m-5">
      <b-row>
        <b-col class="m-2">
        </b-col>
      </b-row>
      <b-row>
        <b-col class="m-2">
          <p class="endereco">
            Cozinha de família,
            <br />cada prato com sua identidade!
          </p>
        </b-col>
      </b-row>
      <b-row>
        <b-col class="m-2"></b-col>
      </b-row>
    </b-col>
    <b-col class="m-3">
      <h5>Faça seu pedido pelo whatsapp:</h5>
      <h6>(16) 99769.6789</h6>
    </b-col>
    <b-col>
      <b-row>
        <b-col class="p-3">
          <p class="endereco">
            Rua Benedito da Silva, 1090. Jardim São Carlos
            <br />São Carlos/SP
          </p>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <p>
            Deixe sua opinião:<br />
            emikacal@gmail.com
            <br />
            <font-awesome-icon :icon="['fab', 'whatsapp']" color="#fff" />(16)99769.6789 | (16)3372.9897
          </p>
        </b-col>
      </b-row>
    </b-col>
  </b-row>
</template>

<script>
export default {
  name: "ftr",
  components: {}
};
</script>

<style>
#ftr svg:hover {
  color: #2b2d2c;
  cursor: pointer;
}
#ftr {
  color: #fff;
  background-color: #2b2d2c;
}
#ftr .btn-info {
  background-color: red;
  border-color: red;
}
#ftr .form-control {
  color: red;
  border: 1px solid red;
}
.endereco {
  font-size: 1rem;
  font-weight: 400;
  color: #9d9d9d;
}
.social {
  padding: 1rem 0 3rem 0;
}
</style>