<template>
  <b-container fluid id="news">
    <b-row>
      <b-col>
        <hr class="my-4">
        <h6>24/07/2020</h6>
        <h2>
          <strong>IRASHAIMASE!!!</strong>
        </h2>
        <p>
          Muito obrigado pelo apoio. Algumas questões de organização foram resolvidas e com isso os pedidos sairão mais rápido.
        
        </p>
        <p>Resolvemos fazer este fim fim de semana mais uma vez! Então faça seu pedido!</p>
        
        <hr class="my-4">
        <h6>18/07/2020</h6>
        <p>Finalmente vai sair! rsrsr Atendendo a constantes pedidos, hoje faremos uma remessa dos nossos yakisobas. <br />
        Não temos previsão para uma próxima vez, então aproveite!</p>
        <hr class="my-4">
        <p>Você pode fazer sua encomenda pelo whatsapp da Renata até as 18:00. (16) 99769-6789</p>

        <p>
          ou pelo fixo
          <br />(16)3372.9897
        </p>
        <p>Esperamos que goste!</p>
        <h4>
          Taxa de entrega fixa:
          <b-badge variant="primary">R$5,00</b-badge>
        </h4>
        <b-table-simple hover small caption-top responsive>
          <caption>Tabela de preço dos pratos de hoje!</caption>
          <colgroup>
            <col />
            <col />
          </colgroup>
          <colgroup>
            <col />
            <col />
            <col />
          </colgroup>
          <colgroup>
            <col />
            <col />
          </colgroup>
          <b-thead head-variant="dark">
            <b-tr>
              <b-th colspan="12">Yakisoba</b-th>
            </b-tr>
            <b-tr>
              <b-th>Prato</b-th>
              <b-th>Peso</b-th>
              <b-th>Valor</b-th>
              <b-th>Info</b-th>
            </b-tr>
          </b-thead>
          <b-tbody>
            <b-tr>
              <b-th rowspan="3">Yakisoba Vegetariano</b-th>
              <b-th variant="secondary" class="text-right">500g</b-th>
              <b-td variant="secondary">R$16,00</b-td>
              <b-td variant="secondary">
                <b-link to="catalog?id=1">veja</b-link>
              </b-td>
            </b-tr>
            <b-tr>
              <b-th class="text-right">800g</b-th>
              <b-td>R$25,00</b-td>
              <b-td>
                <b-link to="catalog?id=1">veja</b-link>
              </b-td>
            </b-tr>
            <b-tr></b-tr>
            <b-tr>
              <b-th rowspan="3">Yakisoba de Frango</b-th>
              <b-th variant="secondary" class="text-right">500g</b-th>
              <b-td variant="secondary">R$17,00</b-td>
              <b-td variant="secondary">
                <b-link to="catalog?id=3">veja</b-link>
              </b-td>
            </b-tr>
            <b-tr>
              <b-th class="text-right">800g</b-th>
              <b-td>R$26,00</b-td>
              <b-td>
                <b-link to="catalog?id=3">veja</b-link>
              </b-td>
            </b-tr>
            <b-tr></b-tr>
            <b-tr>
              <b-th rowspan="3">Yakisoba de Carne</b-th>
              <b-th variant="secondary" class="text-right">500g</b-th>
              <b-td variant="secondary">R$17,00</b-td>
              <b-td variant="secondary">
                <b-link to="catalog?id=2">veja</b-link>
              </b-td>
            </b-tr>
            <b-tr>
              <b-th class="text-right">800g</b-th>
              <b-td>R$28,50</b-td>
              <b-td>
                <b-link to="catalog?id=2">veja</b-link>
              </b-td>
            </b-tr>
            <b-tr></b-tr>
            <b-tr>
              <b-th rowspan="3">Yakisoba Completo</b-th>
              <b-th variant="secondary" class="text-right">500g</b-th>
              <b-td variant="secondary">R$20,00</b-td>
              <b-td variant="secondary">
                <b-link to="catalog?id=4">veja</b-link>
              </b-td>
            </b-tr>
            <b-tr>
              <b-th class="text-right">800g</b-th>
              <b-td>R$32,00</b-td>
              <b-td>
                <b-link to="catalog?id=4">veja</b-link>
              </b-td>
            </b-tr>

            <b-tr></b-tr>
            <b-tr>
              <b-th variant="dark" colspan="12">Karê (curry)</b-th>
            </b-tr>
            <b-tr>
              <b-th variant="dark">Prato</b-th>
              <b-th variant="dark">Peso</b-th>
              <b-th variant="dark">Valor</b-th>
              <b-th variant="dark">Info</b-th>
            </b-tr>
            <b-tr>
              <b-th rowspan="3">Karê de Carne (picante)</b-th>
              <b-th variant="secondary" class="text-right">500g</b-th>
              <b-td variant="secondary">R$16,00</b-td>
              <b-td variant="secondary">
                <b-link to="catalog?id=7">veja</b-link>
              </b-td>
            </b-tr>
            <b-tr>
              <b-th class="text-right">800g</b-th>
              <b-td>R$25,00</b-td>
              <b-td>
                <b-link to="catalog?id=7">veja</b-link>
              </b-td>
            </b-tr>
            <b-tr></b-tr>
            <b-tr>
              <b-th rowspan="3">Karê de Carne (Extra Picante!)</b-th>
              <b-th variant="secondary" class="text-right">500g</b-th>
              <b-td variant="secondary">R$17,00</b-td>
              <b-td variant="secondary">
                <b-link to="catalog?id=8">veja</b-link>
              </b-td>
            </b-tr>
            <b-tr>
              <b-th class="text-right">800g</b-th>
              <b-td>R$26,00</b-td>
              <b-td>
                <b-link to="catalog?id=8">veja</b-link>
              </b-td>
            </b-tr>
            <b-tr></b-tr>
            <b-tr>
              <b-th rowspan="3">Arroz Branco</b-th>
              <b-th variant="secondary" class="text-right">500g</b-th>
              <b-td variant="secondary">R$6,00</b-td>
              <b-td variant="secondary"></b-td>
            </b-tr>
          </b-tbody>
          <b-tfoot>
            <b-tr>
              <b-td colspan="7" variant="secondary" class="text-right">
                Total de pratos pra hoje:
                <b>6</b>
              </b-td>
            </b-tr>
          </b-tfoot>
        </b-table-simple>
      </b-col>
    </b-row>
    <b-row>
      <b-col><b-badge>Refrigerantes</b-badge></b-col>
    </b-row>
    <b-row>
      <b-col><strong>Coca e Fanta (350ml) R$5,00</strong></b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: "news",
  components: {},
  data: () => {
    return {
      items: [
        {
          Prato: "Yakisoba Vegetariano",
          Peso: "500g",
          Valor: "R$ 16,00",
          link: '<router-link :to="catalog/1">'
        },
        { Prato: "Yakisoba Vegetariano", Peso: "800g", Valor: "R$ 25,00" },
        { Prato: "Yakisoba de Frango", Peso: "500g", Valor: "R$ 17,00" },
        { Prato: "Yakisoba de Frango", Peso: "500g", Valor: "R$ 26,00" },

        { Prato: "Yakisoba de Carne", Peso: "500g", Valor: "R$ 18,00" },
        { Prato: "Yakisoba de Carne", Peso: "500g", Valor: "R$ 28,50" },
        { Prato: "Yakisoba Completo", Peso: "500g", Valor: "R$ 20,00" },
        { Prato: "Yakisoba Completo", Peso: "500g", Valor: "R$ 32,00" }
      ]
    };
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