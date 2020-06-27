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
      <h3>akaibara: cozinha oriental</h3>
      <h4>Estamos em Construção!</h4>
      <h5>Faça seu pedido pelo whatsapp:</h5>
      <h6>(16) 99769-67899</h6>
    </b-col>
    <b-col>
      <b-row>
        <b-col>
          <b-input-group class="mt-3">
            <b-form-input placeholder="Seu e-mail"></b-form-input>
            <b-input-group-append>
              <b-button variant="info">
                <font-awesome-icon :icon="['fas', 'envelope']" color="#fff" />
              </b-button>
            </b-input-group-append>
          </b-input-group>
        </b-col>
      </b-row>
<!--
      <b-row>
        <b-col class="p-2">
          <h3>Redes Sociais</h3>
        </b-col>
      </b-row>

      <b-row align-h="center">
        <b-col cols="3" class="p-2">
          <font-awesome-icon :icon="['fab', 'facebook']" size="3x" color="red" />
        </b-col>
        <b-col cols="3" class="p-2">
          <font-awesome-icon :icon="['fab', 'instagram']" size="3x" color="red" />
        </b-col>
      </b-row>
--->
      <b-row>
        <b-col class="p-3">
          <p class="endereco">
            Rua Benedito da Silva. Jardim São Carlos
            <br />São Carlos/SP
          </p>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <p>
            contato@akaibara.com.br
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