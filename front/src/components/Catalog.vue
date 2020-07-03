<template>
  <b-container id="catalog">
    <b-container id="product-admin" v-if="user.type==='admin'">
      <b-row align-h="end">
        <b-col v-if="product._id!==0" cols="1">
          <font-awesome-icon
            id="editProduct"
            :icon="['fas', 'edit']"
            cursor="pointer"
            size="2x"
            color="#c2995d"
            @click="setEdit(false)"
          />
          <b-tooltip placement="bottomleft" target="editProduct">Editar Cadastro</b-tooltip>
        </b-col>
        <b-col cols="1">
          <font-awesome-icon
            id="clearProduct"
            :icon="['fas', 'eraser']"
            cursor="pointer"
            size="2x"
            color="#c2995d"
            @click="cleanProduct()"
          />
          <b-tooltip placement="bottomleft" target="clearProduct">Limpar</b-tooltip>
        </b-col>
      </b-row>

      <b-row>
        <b-col cols="9">
          <b-input-group prepend="Pesquisa" class="mt-3">
            <b-form-input v-on:keydown.enter="search" v-model="searchValue" v-uppercase></b-form-input>
            <b-input-group-append>
              <b-button backcolor="#c2995d" variant="info">
                <font-awesome-icon icon="search" color="#fff" />
              </b-button>
            </b-input-group-append>
          </b-input-group>
        </b-col>
      </b-row>
      <b-row align-h="between">
        <b-col cols="3">
          <b-row>
            <b-col cols="1">
              <font-awesome-icon
                :icon="['fas', 'angle-left']"
                cursor="pointer"
                size="3x"
                color="#c2995d"
                @click="search(product._id-1)"
              />
            </b-col>
            <b-col>
              <h1>{{product._id}}</h1>
            </b-col>
            <b-col cols="1">
              <font-awesome-icon
                :icon="['fas', 'angle-right']"
                cursor="pointer"
                size="3x"
                color="#c2995d"
                @click="search(product._id+1)"
              />
            </b-col>
          </b-row>
        </b-col>
      </b-row>

      <b-row>
        <b-col>
          <b-input-group prepend="Nome" label-for="productName" class="mt-3">
            <b-form-input
              id="productName"
              v-model="product.nome"
              type="text"
              :disabled="edit"
              :state="validateName"
              required
              placeholder="Breve descrição do produto"
            ></b-form-input>
            <b-form-invalid-feedback :state="validateName">O nome tem que ter pelo menos 4 letras</b-form-invalid-feedback>
            <b-form-valid-feedback :state="validateName">OK</b-form-valid-feedback>
          </b-input-group>
        </b-col>
        <b-col cols="5">
          <b-input-group prepend="Marca" label-for="marca" class="mt-3">
            <b-form-input
              id="marca"
              v-model="product.marca"
              type="text"
              :disabled="edit"
              :state="validate(product.marca)"
              required
              list="marcasList"
              placeholder="Noiva Modas, Mary's Bridal, Eklácia, etc..."
            ></b-form-input>
            <b-form-invalid-feedback :state="validate(product.marca)">Informe a marca</b-form-invalid-feedback>
            <b-form-valid-feedback :state="validate(product.marca)">OK</b-form-valid-feedback>
          </b-input-group>
          <datalist id="marcasList">
            <option v-for="marca in marcas" v-bind:key="marca">{{ marca }}</option>
          </datalist>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-input-group prepend="Tipo" class="mt-3">
            <b-form-select
              id="tipo"
              v-model="product.tipo"
              :options="tipos"
              :disabled="edit"
              :state="validateTipo"
            ></b-form-select>

            <b-form-invalid-feedback :state="validateTipo">Escolha um tipo</b-form-invalid-feedback>
            <b-form-valid-feedback :state="validateTipo">OK</b-form-valid-feedback>
          </b-input-group>
        </b-col>

        <b-col>
          <b-input-group prepend="Tamanho" label-for="size" class="mt-3">
            <b-form-input
              id="size"
              v-model="product.tamanho"
              type="text"
              :disabled="edit"
              required
              placeholder="42, 44, P, M, G..."
            ></b-form-input>
            <b-form-invalid-feedback>Informe o tamanho da peça</b-form-invalid-feedback>
            <b-form-valid-feedback>OK</b-form-valid-feedback>
          </b-input-group>
        </b-col>
        <b-col>
          <b-input-group prepend="Cor" class="mt-3">
            <b-form-input id="cor" type="color" v-model="product.cor" :disabled="edit"></b-form-input>
          </b-input-group>
        </b-col>
      </b-row>
      <b-row class="mt-3">
        <h3>Estoque</h3>
      </b-row>
      <b-row>
        <b-col>
          <b-form-group label="Atual" label-for="estoque">
            <b-input-group prepend="Atual">
              <b-form-input id="estoque" type="text" v-model="stock" disabled value="1"></b-form-input>
            </b-input-group>
          </b-form-group>
        </b-col>
        <b-col>
          <b-row>
            <font-awesome-icon
              id="prodSaida"
              :icon="['fas', 'minus']"
              cursor="pointer"
              size="3x"
              color="#c2995d"
            />
            <b-tooltip placement="right" target="prodSaida">Saida</b-tooltip>
          </b-row>
          <b-row>
            <font-awesome-icon
              id="prodEntrada"
              :icon="['fas', 'plus']"
              cursor="pointer"
              size="3x"
              color="#c2995d"
            />
            <b-tooltip placement="right" target="prodEntrada">Entrada</b-tooltip>
          </b-row>
        </b-col>

        <b-col cols="6">
          <b-input-group prepend="Observação" class="mt-3">
            <b-form-textarea id="obs" v-model="product.obs" :disabled="edit" rows="5"></b-form-textarea>
          </b-input-group>
        </b-col>
      </b-row>

      <b-card title="Precificação" sub-title="difina os preços deste produto" class="mt-3">
        <b-row align-h="between">
          <b-col cols="5">
            <b-form-group label="Locação" label-for="price_loc">
              <b-input-group prepend="R$">
                <b-form-input
                  id="price_loc"
                  v-model="product.valor"
                  :disabled="edit"
                  :state="validatePrice(product.valor)"
                ></b-form-input>

                <b-form-invalid-feedback :state="validatePrice(product.valor)">Coleque o preço</b-form-invalid-feedback>
                <b-form-valid-feedback :state="validatePrice(product.valor)">OK</b-form-valid-feedback>
              </b-input-group>
            </b-form-group>
          </b-col>
          <b-col cols="5">
            <b-form-group label="Venda" label-for="price_sel">
              <b-input-group prepend="R$">
                <b-form-input
                  id="price_sel"
                  v-model="product.venda"
                  :disabled="edit"
                  :state="validatePrice(product.venda)"
                ></b-form-input>

                <b-form-invalid-feedback :state="validatePrice(product.venda)">Coleque o preço</b-form-invalid-feedback>
                <b-form-valid-feedback :state="validatePrice(product.venda)">OK</b-form-valid-feedback>
              </b-input-group>
            </b-form-group>
          </b-col>
        </b-row>
      </b-card>

      <b-row>
        <b-col>
          <b-input-group prepend="Ncm" label-for="productncm" class="mt-3">
            <b-form-input
              id="productncm"
              v-model="product.ncm"
              type="text"
              :disabled="edit"
              :state="product.ncm.length===8"
              required
              placeholder="00000000"
            ></b-form-input>
            <b-form-invalid-feedback :state="product.ncm.length===8">O NCM tem que ter 8 digitos</b-form-invalid-feedback>
            <b-form-valid-feedback :state="product.ncm.length===8">OK</b-form-valid-feedback>
          </b-input-group>
        </b-col>
        <b-col cols="5">
          <b-input-group prepend="Cest" label-for="cest" class="mt-3">
            <b-form-input id="cest" v-model="product.cest" type="text" :disabled="edit" required></b-form-input>
          </b-input-group>
        </b-col>
      </b-row>
      <b-row class="mt-3">
        <h3>Impostos</h3>
      </b-row>
      <b-card no-body class="mt-3">
        <b-tabs card>
          <b-tab title="ICMS" active>
            <b-row>
              <b-col>
                <b-form-group label="cfop" label-for="price_sel">
                  <b-input-group>
                    <b-form-input
                      id="icmc_cfop"
                      v-model="product.impostos.icms.codigo_cfop"
                      :disabled="edit"
                    ></b-form-input>
                  </b-input-group>
                </b-form-group>
              </b-col>

              <b-col>
                <b-form-group label="situação tributária" label-for="icmc_st">
                  <b-input-group>
                    <b-form-input
                      id="icmc_st"
                      v-model="product.impostos.icms.situacao_tributaria"
                      :disabled="edit"
                    ></b-form-input>
                  </b-input-group>
                </b-form-group>
              </b-col>
            </b-row>
          </b-tab>
          <b-tab title="IPI">
            <b-row>
              <b-col>
                <b-form-group label="situação tributária" label-for="icmc_st">
                  <b-input-group>
                    <b-form-input
                      id="ipi"
                      v-model="product.impostos.ipi.situacao_tributaria"
                      :disabled="edit"
                    ></b-form-input>
                  </b-input-group>
                </b-form-group>
              </b-col>

              <b-col>
                <b-form-group label="Enquadramento" label-for="ipi_enq">
                  <b-input-group>
                    <b-form-input
                      id="ipi_enq"
                      v-model="product.impostos.ipi.codigo_enquadramento"
                      :disabled="edit"
                    ></b-form-input>
                  </b-input-group>
                </b-form-group>
              </b-col>

              <b-col>
                <b-form-group label="Aliquota" label-for="ipi_aliq">
                  <b-form-input
                    id="ipi_aliq"
                    v-model="product.impostos.ipi.aliquota"
                    :disabled="edit"
                  ></b-form-input>
                </b-form-group>
              </b-col>
            </b-row>
          </b-tab>
          <b-tab title="PIS">
            <b-row>
              <b-col>
                <b-form-group label="situação tributária" label-for="pis_st">
                  <b-input-group>
                    <b-form-input
                      id="pis_st"
                      v-model="product.impostos.pis.situacao_tributaria"
                      :disabled="edit"
                    ></b-form-input>
                  </b-input-group>
                </b-form-group>
              </b-col>
              <b-col>
                <b-form-group label="Aliquota" label-for="pis_aliq">
                  <b-form-input
                    id="pis_aliq"
                    v-model="product.impostos.pis.aliquota"
                    :disabled="edit"
                  ></b-form-input>
                </b-form-group>
              </b-col>
            </b-row>
          </b-tab>
          <b-tab title="COFINS">
            <b-row>
              <b-col>
                <b-form-group label="situação tributária" label-for="pis_st">
                  <b-input-group>
                    <b-form-input
                      id="cofins_st"
                      v-model="product.impostos.cofins.situacao_tributaria"
                      :disabled="edit"
                    ></b-form-input>
                  </b-input-group>
                </b-form-group>
              </b-col>
              <b-col>
                <b-form-group label="Aliquota" label-for="cofins_aliq">
                  <b-form-input
                    id="cofins_aliq"
                    v-model="product.impostos.cofins.aliquota"
                    :disabled="edit"
                  ></b-form-input>
                </b-form-group>
              </b-col>
            </b-row>
          </b-tab>
          <b-tab title="Estimativa de tributos" disabled>
            <b-card-text>Estimativa calculada segundo...</b-card-text>
          </b-tab>
        </b-tabs>
      </b-card>

      <b-row>
        <b-col cols="6">
          <b-card title="Info" class="mb-2">
            <b-card-text>
              criado em 11/11/2018
              <br />Numero de locações: 9
              <br />Numero de Vendas: 12
              <br />Diponível a N dias
            </b-card-text>
          </b-card>
          <b-form-group label="Imagens" label-for="imagens">
            <b-form-file
              id="images_input"
              v-model="file"
              multiple
              plain
              accept="image/jpeg"
              placeholder="Choose a file or drop it here..."
              drop-placeholder="Drop file here..."
            ></b-form-file>
          </b-form-group>
        </b-col>
        <b-col>
          <b-img fluid :src="product.img" alt="product"></b-img>
        </b-col>
      </b-row>
      <b-row class="mt-3">
        <h3>Historico</h3>
      </b-row>

      <b-row>
        <b-col>
          <b-table striped :items="product.historico" @row-clicked="selectedHistory"></b-table>
        </b-col>
      </b-row>
      <b-row align-h="between">
        <b-col cols="1">
          <b-button v-if="product._id!=0" block @click="copy">Copiar</b-button>
        </b-col>
        <b-col>
          <b-button block variant="success" @click="save">Salvar</b-button>
        </b-col>
        <b-col cols="1">
          <font-awesome-icon
            v-if="product._id!==0 && !edit"
            id="delete"
            :icon="['fas', 'trash-alt']"
            cursor="pointer"
            size="2x"
            color="red"
            v-b-modal.modal-delete
          />
          <b-tooltip target="delete">Deletar Cadastro</b-tooltip>

          <b-modal
            ok-variant="danger"
            hide-footer
            id="modal-delete"
            centered
            title="Deletar cadastro"
          >
            <p>Tem certeza que quer de deletar? {{this.product._id}} {{this.product.nome}}</p>
            <b-row>
              <b-button ref="btnHide">Cancel</b-button>
              <b-col></b-col>
              <b-col>
                <font-awesome-icon
                  :icon="['fas', 'trash-alt']"
                  cursor="pointer"
                  size="2x"
                  color="red"
                />
              </b-col>
            </b-row>
          </b-modal>
        </b-col>
      </b-row>
      <b-row class="center" v-if="resp.message!=''">
        <b-col>
          <b-alert :variant="resp.variant" show>{{resp.message}}</b-alert>
        </b-col>
      </b-row>
    </b-container>

    <b-container v-else-if="user.type==='client'">
      <div class="row">
        <div class="col">
          <b-breadcrumb :itens="item"></b-breadcrumb>
        </div>
      </div>
      <div class="row border">
        <div class="col">Alguma outra coisa aqui</div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <b-img fluid src="~../assets/noivo.png" alt="product"></b-img>
        </div>
        <div class="col-md-5 border">
          <h1>Nome do produto</h1>
          <span>R$ 1990,00</span>
          <h6>ou em 6x sem juros</h6>
          <p>Short description of the product</p>

          <b-form-group label="Escolha o tamanho">
            <b-form-radio-group
              id="radio-group-1"
              v-model="selected"
              :options="options"
              name="radio-options"
            ></b-form-radio-group>
          </b-form-group>

          <b-form-group label="Tamanhos disponíveis">
            <b-form-radio-group id="radio-group-2" v-model="selected" name="radio-sub-component">
              <b-form-radio value="s38">38</b-form-radio>
              <b-form-radio value="s40">40</b-form-radio>
              <b-form-radio value="s42" disabled>42</b-form-radio>
              <b-form-radio value="s44">44</b-form-radio>
              <b-form-radio value="s46">46</b-form-radio>
              <b-form-radio value="s48">48</b-form-radio>
              <b-form-radio value="s50">50</b-form-radio>
              <b-form-radio value="s52">52</b-form-radio>
              <b-form-radio value="s54">54</b-form-radio>
              <b-form-radio value="s56" disabled>56</b-form-radio>
              <b-form-radio value="s58">58</b-form-radio>
            </b-form-radio-group>
          </b-form-group>
          <b-form-group label="Faixa e Gravata">
            <b-dropdown split text="Cores Faixa e gravata" class="m-2">
              <b-dropdown-item href="#">Preto (padrão)</b-dropdown-item>
              <b-dropdown-item href="#">Verde</b-dropdown-item>
              <b-dropdown-item href="#">Azul Royal</b-dropdown-item>
              <b-dropdown-item href="#">Amarelo</b-dropdown-item>
              <b-dropdown-item href="#">Específica (informe)</b-dropdown-item>
            </b-dropdown>
          </b-form-group>
        </div>
      </div>

      <div class="row border">
        <div class="col">
          <p>Clientes também gostaram deste</p>
          <p>Paginar alguns modelos</p>
        </div>
      </div>

      <div class="row border">
        <div class="col">
          <p>Descrição delatalhada como no casas bahia e mercado livre</p>
          <p>Descrição delatalhada como no casas bahia e mercado livre Descrição delatalhada como no casas bahia e mercado livre Descrição delatalhada como no casas bahia e mercado livre Descrição delatalhada como no casas bahia e mercado livre Descrição delatalhada como no casas bahia e mercado livre Descrição delatalhada como no casas bahia e mercado livre Descrição delatalhada como no casas bahia e mercado livre</p>
        </div>
      </div>
    </b-container>
    <b-container v-else>
      <div class="menu-group">
        <div class="shop-item" v-for="n in [1,2,3,4,5,6,7]" v-bind:key="n">
          <b-row>
            <b-col>
          <div class="item-tittle">Tit {{n}}</div></b-col>
          </b-row>
          <b-row>
            <b-col>
            <img src="logo.png" alt />
          </b-col>
          <b-col>
            
          <div class="item-value">${{n*3.4}}0</div>
          <div class="item-description">
            <p>lalala</p>
          </div>
          <div class="item-control">
            <span>1 in stock</span>
            <button>add to cart</button>
          </div>
          </b-col>
          </b-row>
          
        </div>
        <div class="item-shop" v-for="n in [1,2,3]" v-bind:key="n">
          <b-card no-body class="overflow-hidden" style="max-width: 400px;">
            <b-row no-gutters>
              <b-col md="6">
                <b-card-img
                  src="https://picsum.photos/400/400/?image=20"
                  alt="Image"
                  class="rounded-0 shop-item"
                ></b-card-img>
              </b-col>
              <b-col md="6">
                <b-card-body title="Horizontal Card">
                  <b-card-text>
                    This is a wider card with supporting text as a natural lead-in to additional content.
                    This content is a little bit longer.
                  </b-card-text>
                </b-card-body>
              </b-col>
            </b-row>
          </b-card>
        </div>
      </div>
    </b-container>
  </b-container>
</template>

<script>
export default {
  name: " catalog",
  data: function() {
    return {};
  },
  computed: {
    user() {
      return this.$store.state.user;
    }
  },

  mounted() {
    if (this.$route.params.id !== undefined) {
      //this.search(this.$route.params.id);
    }
  },
  methods: {}
};
</script>

<style>
#product-admin {
  text-align: left;
}
* {
  box-sizing: border-box;
}
.shop-content {
  position: relative;
  width: 100%;
}
.card{
  display: inline-block;
}
.shop-content h1 {
  color: #4caf50;
}
.item-tittle {
  font-size: 18px;
}
.shop-item {
  position: relative;
  display: inline-block;
  width: 450px;
  height: 100%;
  border: 1px solid rgb(255, 188, 188);
  margin: 10px 0 0 30px;
}
.shop-item:hover {
  border: 1px solid red;
}
.item-control {
  margin-bottom: 0;
}
.item-value {
  font-size: 30px;
}
.shop-item img {
  width: 200px;
  height: 200px;
}
.shop-item button {
  width: 100%;
  background-color: #ff7474;
  margin-bottom: 1px;
  border-color: rgb(255, 188, 188) ;
}
</style>