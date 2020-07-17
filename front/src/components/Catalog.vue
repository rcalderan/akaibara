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
      <div v-if="item._id !=0" class="selected">
        <b-row>
          <b-col cols="6">hi!</b-col>
        </b-row>
      </div>
      <div class="menu-group" v-for="p in produtos" v-bind:key="p">
        <div class="shop-item">
          <div v-if="p.type==type">
            <b-row>
              <b-col>
                <div class="item-tittle">{{p.name}}</div>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <img :src="p.src" @click="selectItem(p._id)" />
              </b-col>
              <b-col>
                <div class="item-description">
                  <p>{{p.description}}</p>
                </div>
                <div class="item-control"></div>
              </b-col>
            </b-row>
          </div>
        </div>
      </div>
    </b-container>
  </b-container>
</template>

<script>
const defaults = {
  item: {
    _id: 0,
    type: "",
    name: "",
    description: "",
    option: [{ price: 0, weigth: 0, active: false }],
    src: ""
  }
};
export default {
  name: " catalog",
  props: {
    type: { type: String }
  },
  data: function() {
    return {
      item: defaults.item
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    produtos() {
      return [
        {
          _id: 1,
          type: "yakisoba",
          name: "Yakisoba Vegetariano",
          description:
            "Yakisoba com legumes. Macarrão especial grelhado com cenoura, brócolis, repolho e cocumelos champignon e shitake!",
          option: [{ price: 25.9, weigth: 800, active: true }],
          src: "img/Yakisoba-1.jpg"
        },
        {
          _id: 2,
          type: "yakisoba",
          name: "Yakisoba Carne",
          description:
            "Yakisoba com carne bovina. Macarrão especial grelhado com carne bovina (contra filé) e legumes: cenoura, brócolis, repolho e champignon!",
          option: [{ price: 28.5, weigth: 800, active: true }],
          src: "img/Yakisoba-11.jpg"
        },
        {
          _id: 3,
          type: "yakisoba",
          name: "Yakisoba Frango",
          description:
            "Yakisoba de frango. Macarrão especial grelhado com carne de frango (super macia) com legumes: cenoura, brócolis, repolho e champignon!",
          option: [{ price: 26.0, weigth: 800, active: true }],
          src: "img/Yakisoba-4.jpg"
        },
        {
          _id: 4,
          type: "yakisoba",
          name: "Yakisoba completo",
          description:
            "Yakisoba completo. Macarrão especial grelhado com contra filé, frango legumes e cogumelos. Com Cenoura, brócolis, repolho, champignon e shitake!",
          option: [{ price: 32.0, weigth: 800, active: true }],
          src: "img/Yakisoba-14.jpg"
        },
        {
          _id: 5,
          type: "kare",
          name: "Karê De carne Nivel 1",
          description: "Karê de carne levemente picante",
          option: [{ price: 16.5, weigth: 800, active: true }],
          src: "img/11.jpg"
        },
        {
          _id: 6,
          type: "kare",
          name: "Karê de carne Nivel 2",
          description: "Karê de carne picância na medida",
          option: [{ price: 16.5, weigth: 800, active: true }],
          src: "img/12.jpg"
        },
        {
          _id: 7,
          type: "kare",
          name: "Karê de carne Nivel 3",
          description: "Karê de carne picante!",
          option: [{ price: 17.5, weigth: 500, active: true }],
          src: "img/13.jpg"
        },
        {
          _id: 8,
          type: "kare",
          name: "Karê de carne Nivel 4",
          description: "Karê de carne Desafio de Picância",
          option: [{ price: 19.5, weigth: 500, active: true }],
          src: "img/14.jpg"
        },
        {
          _id: 9,
          type: "outros",
          name: "Frango Xadrez",
          description: "O Frango Xadrez mais gostoso que você vai experimentar",
          option: [{ price: 22.5, weigth: 500, active: true }],
          src: "img/10.jpg"
        },
        {
          _id: 10,
          type: "outros",
          name: "Yakimeshi Tradicional",
          description: "Yakimeshi (chahan) tradicional ",
          option: [{ price: 12.9, weigth: 500, active: true }],
          src: "img/3.jpg"
        },
        {
          _id: 11,
          type: "outros",
          name: "Yakimeshi com bacon",
          description: "Yakimeshi (chahan) com bacon ",
          option: [{ price: 15.9, weigth: 500, active: true }],
          src: "img/6.jpg"
        }
      ];
    }
  },

  mounted() {
    if (this.$route.params.id !== undefined) {
      //this.search(this.$route.params.id);
    }
  },
  methods: {
    selectItem: id => {
      this.produtos.forEach(p => {
        if (p._id == id) this.item = p;
        alert("2");
        return;
      });
      alert("3");
      this.item = defaults.item;
    },
    find: async id => {
      this.produtos.forEach(p => {
        if (p._id == id) return p;
      });
      return defaults.item;
    }
  }
};
</script>

<style>
.selected {
  position: fixed;
  width: 100vw;
  height: 100vw;
  left: 0px;
  top: 0px;
  background-color: rgba(0, 0, 0, 0.945);
  z-index: 1000;
}
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
.card {
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
  border: 1px solid #ffe1e1;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.05);
  border-radius: 4px;
  margin: 10px 0 0 30px;
}
.shop-item:hover {
  background-color: #ffe1e1;
  cursor: pointer;
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
  border-color: rgb(255, 188, 188);
}
</style>