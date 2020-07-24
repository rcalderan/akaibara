<template>
  <div id="user" class="border">
    <b-container v-if="usr.type!='aaa'">
      <b-row align-h="end">
        <b-col v-if="user._id!==0" cols="1">
          <font-awesome-icon
            id="editUser"
            :icon="['fas', 'edit']"
            cursor="pointer"
            size="2x"
            :color="style.btnInfo.backgroundColor"
            @click="setEdit(false)"
          />
          <b-tooltip placement="bottomleft" target="editUser">Editar Cadastro</b-tooltip>
        </b-col>
        <b-col cols="1">
          <font-awesome-icon
            id="eraseUser"
            :icon="['fas', 'eraser']"
            cursor="pointer"
            size="2x"
            color="#c2995d"
            @click="cleanUser()"
          />
          <b-tooltip placement="bottomleft" target="eraseUser">Limpar</b-tooltip>
        </b-col>
      </b-row>
      <b-row>
        <b-col v-if="user.type==='admin'" cols="8">
          <b-input-group prepend="Pesquisa" class="mt-3">
            <b-form-input list="id_names" v-on:keydown.enter="search" v-model="searchValue"></b-form-input>
            <datalist id="id_names">
              <option v-for="name in names" :key="name">{{ name }}</option>
            </datalist>
            <b-input-group-append>
              <b-button @click="search" variant="info">go</b-button>
            </b-input-group-append>
          </b-input-group>
        </b-col>
      </b-row>
      <b-row v-if="usr.type==='admin'">
        <b-col cols="1">
          <font-awesome-icon
            :icon="['fas', 'angle-left']"
            cursor="pointer"
            size="3x"
            color="#c2995d"
            @click="search(usr._id-1)"
          />
        </b-col>
        <b-col cols="2">
          <h1>{{usr._id}}</h1>
        </b-col>
        <b-col cols="1">
          <font-awesome-icon
            :icon="['fas', 'angle-right']"
            cursor="pointer"
            size="3x"
            color="#c2995d"
            @click="search(usr._id+1)"
          />
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-form-group label="Nome" label-for="name">
            <b-form-input
              v-model="usr.name"
              id="name"
              type="text"
              required
              :disabled="edit"
              placeholder="Nome da pessoa"
              :state="validadeName"
            ></b-form-input>
            <b-form-invalid-feedback :state="validadeName">O nome tem que ter pelo menos 4 letras</b-form-invalid-feedback>
            <b-form-valid-feedback :state="validadeName">OK</b-form-valid-feedback>
          </b-form-group>
        </b-col>
        <b-col>
          <b-form-group label="Email" label-for="email">
            <b-form-input
              v-model="usr.email"
              id="email"
              type="text"
              :disabled="edit"
              placeholder="cliente@email.com"
              :state="validateEmail"
            ></b-form-input>
            <b-form-invalid-feedback
              :state="validateEmail"
            >Caso precise, insira o email corretamente</b-form-invalid-feedback>
            <b-form-valid-feedback :state="validateEmail">OK</b-form-valid-feedback>
          </b-form-group>
        </b-col>
      </b-row>

      <b-row align-h="between">
        <b-col cols="3">
          <b-form-group label="CPF" label-for="cpf">
            <b-form-input
              id="cpf"
              :disabled="edit"
              v-model="usr.cpf"
              v-on:keydown.enter="searchCpf"
              @blur="leaveCPF"
              required
              placeholder="000.000.000-00"
              :state="validateCPF"
            ></b-form-input>
            <b-form-invalid-feedback :state="validateCPF">Insira um numero de CPF válido</b-form-invalid-feedback>
            <b-form-valid-feedback :state="validateCPF">OK</b-form-valid-feedback>
          </b-form-group>
        </b-col>
        <b-col cols="3">
          <b-form-group label="nascimento" label-for="birth">
            <b-form-input id="birth" :disabled="edit" type="date"></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>

      <b-row>
        <b-col cols="2">
          <b-form-group label="CEP" label-for="cep">
            <b-form-input
              v-model="selectedAddress.cep"
              id="cep"
              :disabled="edit"
              v-on:keydown.enter="searchCep"
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col cols="8">
          <b-form-group label="Endereço" label-for="endereco">
            <b-form-input
              :disabled="edit"
              v-model="selectedAddress.logradouro"
              id="endereco"
              :state="validate(selectedAddress.logradouro)"
            ></b-form-input>
            <b-form-invalid-feedback
              :state="validate(selectedAddress.logradouro)"
            >Não pode estar vazio</b-form-invalid-feedback>
            <b-form-valid-feedback :state="validate(selectedAddress.logradouro)">OK</b-form-valid-feedback>
          </b-form-group>
        </b-col>
        <b-col cols="2">
          <b-form-group label="Numero" label-for="numero">
            <b-form-input
              :disabled="edit"
              v-model="selectedAddress.numero"
              type="text"
              id="numero"
              :state="validate(selectedAddress.numero)"
            ></b-form-input>
            <b-form-invalid-feedback :state="validate(selectedAddress.numero)">Não pode estar vazio</b-form-invalid-feedback>
            <b-form-valid-feedback :state="validate(selectedAddress.numero)">OK</b-form-valid-feedback>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="6">
          <b-row>
            <b-col>
              <b-form-group label="Bairro" label-for="bairro">
                <b-form-input
                  :disabled="edit"
                  v-model="selectedAddress.bairro"
                  id="bairro"
                  :state="validate(selectedAddress.bairro)"
                ></b-form-input>
                <b-form-invalid-feedback
                  :state="validate(selectedAddress.bairro)"
                >Não pode estar vazio</b-form-invalid-feedback>
                <b-form-valid-feedback :state="validate(selectedAddress.bairro)">OK</b-form-valid-feedback>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="9">
              <b-form-group label="Cidade" label-for="cidade">
                <b-form-input
                  :disabled="edit"
                  v-model="selectedAddress.cidade"
                  id="cidade"
                  :state="validate(selectedAddress.cidade)"
                ></b-form-input>
                <b-form-invalid-feedback
                  :state="validate(selectedAddress.cidade)"
                >Não pode estar vazio</b-form-invalid-feedback>
                <b-form-valid-feedback :state="validate(selectedAddress.cidade)">OK</b-form-valid-feedback>
              </b-form-group>
            </b-col>
            <b-col cosl="3">
              <b-form-group label="UF" label-for="uf">
                <b-form-input
                  :disabled="edit"
                  v-model="selectedAddress.uf"
                  id="uf"
                  :state="validate(selectedAddress.uf)"
                ></b-form-input>
                <b-form-invalid-feedback :state="validate(selectedAddress.uf)">Não pode estar vazio</b-form-invalid-feedback>
                <b-form-valid-feedback :state="validate(selectedAddress.uf)">OK</b-form-valid-feedback>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <b-form-group label="Celular" label-for="fone1">
                <b-form-input :disabled="edit" v-model="usr.phone[0]" id="fone1"></b-form-input>
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group label="Fixo" label-for="fone2">
                <b-form-input :disabled="edit" v-model="usr.phone[1]" id="fone2"></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
        </b-col>
        <b-col cols="6">
          <b-form-group label="Info" label-for="obs">
            <b-form-textarea :disabled="edit" v-model="usr.info" rows="8"></b-form-textarea>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row align-h="between">
        <b-col cols="1"></b-col>
        <b-col>
          <b-button block variant="success" @click="save">Salvar</b-button>
        </b-col>
        <b-col cols="1">
          <font-awesome-icon
            v-if="usr._id!==0 && !edit"
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
            <p>Tem certeza que quer de deletar? {{usr.cpf}} {{usr.nome}}</p>
            <b-row>
              <b-button ref="btnHide" @click="hideModal">Cancel</b-button>
              <b-col></b-col>
              <b-col>
                <font-awesome-icon
                  :icon="['fas', 'trash-alt']"
                  cursor="pointer"
                  size="2x"
                  color="red"
                  @click="deleteUser"
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
    <b-container v-else>
      Novo por aqui? realize seu cadastro ou connecte
    </b-container>
  </div>
</template>

<script>
export default {
  name: "user",
  data: function () {
    return {
      searchValue: "",
      birth: "",
      edit: false,
      resp: { message: "", variant: "sucess" },
      selectedAddress: {
        cep: "",
        logradouro: "",
        numero: "",
        bairro: "",
        cidade: "",
        uf: "",
      },
      usr: {
        _id: 0,
        type: "visitor",
        email: "",
        cpf: "",
        name: "",
        phone: [],
        info: "",
        defaultAdress: 0,
        addresses: [
          {
            cep: "",
            logradouro: "",
            numero: "",
            bairro: "",
            cidade: "",
            uf: "",
          },
        ],
      },
    };
  },
  computed: {
    defaults() {
      return this.$state.defaults;
    },
    user() {
      return this.$store.state.user;
    },
    names() {
      let names =
        this.$store.state.user.type === "admin"
          ? () => {
              let ret = [];
              this.$store.state.people.forEach((p) => {
                ret.push(p.name);
              });
              return ret;
            }
          : [];
      return names;
    },
    validadeName() {
      return this.usr.name.length > 4;
    },
    validateEmail() {
      let email = this.user.email;
      let usuario = email.substring(0, email.indexOf("@"));
      let dominio = email.substring(email.indexOf("@") + 1, email.length);
      if (
        usuario.length >= 1 &&
        dominio.length >= 3 &&
        usuario.search("@") == -1 &&
        dominio.search("@") == -1 &&
        usuario.search(" ") == -1 &&
        dominio.search(" ") == -1 &&
        dominio.search(".") != -1 &&
        dominio.indexOf(".") >= 1 &&
        dominio.lastIndexOf(".") < dominio.length - 1
      )
        return true;
      else return false;
    },
    validateCPF() {
      let cpf = this.user.cpf
        .replace(".", "")
        .replace(".", "")
        .replace("-", "");
      let Soma;
      let Resto;
      Soma = 0;
      if (cpf == "00000000000") return false;

      for (let i = 1; i <= 9; i++)
        Soma = Soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
      Resto = (Soma * 10) % 11;

      if (Resto == 10 || Resto == 11) Resto = 0;
      if (Resto != parseInt(cpf.substring(9, 10))) return false;

      Soma = 0;
      for (let i = 1; i <= 10; i++)
        Soma = Soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);
      Resto = (Soma * 10) % 11;

      if (Resto == 10 || Resto == 11) Resto = 0;
      if (Resto != parseInt(cpf.substring(10, 11))) return false;
      return true;
    },
    validation() {
      if (isNaN(this.user._id)) {
        return false;
      } else {
        return this.user._id > 0;
      }
    },
  },
  async mounted() {
    this.usr = this.user;
    if (this.$route.params.id !== undefined) {
      this.search(this.$route.params.id);
    }

    //select defauly adress
    this.selectedAddress = this.usr.defaultAddress < this.usr.addresses.length ? this.usr.addresses[this.usr.defaultAddress]: this.defaults.user.addresses[0]
    //alert(JSON.stringify(this.selectedAddress))
  },
  methods: {
    validate: function (val) {
      return val !== "";
    },
    leaveCPF: function () {
      if (this.user.cpf.indexOf(".") != 3)
        this.user.cpf = [
          this.user.cpf.slice(0, 3),
          ".",
          this.user.cpf.slice(3),
        ].join("");
      if (this.user.cpf.lastIndexOf(".") != 7)
        this.user.cpf = [
          this.user.cpf.slice(0, 7),
          ".",
          this.user.cpf.slice(7),
        ].join("");
      if (this.user.cpf.indexOf("-") != 11)
        this.user.cpf = [
          this.user.cpf.slice(0, 11),
          "-",
          this.user.cpf.slice(11),
        ].join("");
      if (this.validateCPF) {
        this.searchCpf();
      }
    },
    cleanUser: function () {
      this.searchValue = "";
      this.selectedAddress = 0;
      this.edit = false;
      this.resp.message = "";
      this.user = this.defaults.user;
    },
    setEdit: function (value) {
      this.edit = value;
    },
    hideModal() {
      this.$root.$emit("bv::hide::modal", "modal-delete", "#btnHide");
    },
    deleteUser: async function () {
      try {
        //firts of all, check if data is correct!
        if (this.usr._id === 0) {
          this.resp.message = "Nenhum usuário selecionado...";
          this.resp.variant = "warning";
          return;
        }
        const resp = await this.$axios.get("/api/user/" + this.user._id);
        if (resp.status === 200) {
          const del = await this.$axios.delete("/api/user/" + this.user._id);
          if (del.status === 200)
            //then update!
            this.cleanuser();
          this.hideModal();
          this.resp.message = "Cliente removido do sistema";
          this.resp.variant = "sucess";
        } else {
          this.resp.message =
            "Cliente não pôde ser removido. Statuscode: " + resp.status;
          this.resp.variant = "warning";
        }
      } catch (err) {
        this.resp.message = err;
        this.resp.variant = "danger";
      }
    },
    save: async function () {
      try {
        //firts of all, check if data is correct!
        if (
          !this.validadeName ||
          !this.validateCPF ||
          !this.validate(this.selectedAddress.logradouro) ||
          !this.validate(this.selectedAddress.bairro) ||
          !this.validate(this.selectedAddress.numero) ||
          !this.validate(this.selectedAddress.cidade) ||
          !this.validate(this.selectedAddress.uf)
        ) {
          this.resp.message = "Corrija os campos obrigatórios primeiro";
          this.resp.variant = "warning";
          return;
        }

        delete this.user.Por;
        this.user.nascimento = new Date(this.birth);
        let create = false;
        if (this.user._id === 0) create = true;
        else {
          const resp = await this.$axios.get("/api/user/" + this.user._id);
          if (resp.status === 200) {
            //then update!
            let old = resp.data;
            let payload = {}; //this.$helper.diference(old,this.user)
            if (old.nome !== this.user.nome)
              //fazer manualmente...
              payload.nome = this.user.nome;
            if (old.cpf !== this.user.cpf) payload.cpf = this.user.cpf;
            if (old.rg !== this.user.rg) payload.rg = this.user.rg;
            if (old.nascimento !== this.user.nascimento)
              payload.nascimento = this.user.nascimento;
            if (old.sexo !== this.user.sexo) payload.sexo = this.user.sexo;
            if (old.fones !== this.user.fones) payload.fones = this.user.fones;
            if (old.obs !== this.user.obs) payload.obs = this.user.obs;
            if (old.email !== this.user.email) payload.email = this.user.email;
            if (old.por !== this.user.por) payload.por = this.user.por;

            if (old.endereco !== this.user.endereco)
              payload.endereco = this.user.endereco;
            if (Object.keys(payload).length === 0) {
              this.resp.message = "Nenhuma alteração a ser feita";
              this.resp.variant = "primary";
              return;
            }

            const response = await this.$crud.update(
              "/api/user/" + old._id,
              payload
            );
            if (response.error === undefined) {
              this.resp.message = "Alterações salvas com sucesso";
              this.resp.variant = "sucess";
            } else {
              this.resp.message = "Alterações não puderam ser feitas...";
              this.resp.variant = "warning";
            }
          } else create = true;
        }

        if (create) {
          const postResp = await this.$crud.create("/api/user/", this.user);
          if (postResp.error === undefined) {
            this.user._id = postResp._id;
            this.resp.message = `${this.user.nome} adicionado com sucesso!`;
            this.resp.sucess = "success";
          } else {
            let msg = postResp.error.message;
            if (msg.indexOf("cpf") != -1) {
              this.resp.message = "concerte o cpf";
              this.resp.variant = "danger";
            } else if (msg.indexOf("email") != -1) {
              this.resp.message = "Corrija o Email";
              this.resp.variant = "danger";
            }
          }
        }
      } catch (err) {
        let msg = err.response.data.message;
        if (msg.indexOf("cpf") != -1) {
          this.resp.message = "concerte o cpf";
          this.resp.variant = "danger";
        } else if (msg.indexOf("email") != -1) {
          this.resp.message = "Corrija o Email";
          this.resp.variant = "danger";
        }
      }
    },
    search: async function (arg) {
      try {
        let value = this.searchValue;
        if (typeof arg !== "object" && arg !== null) {
          value = arg;
        }
        if (!isNaN(value)) {
          const resp = await this.$axios.get("/api/user/" + value);
          if (resp.status === 200) {
            let user = resp.data;
            this.user = user;
            let dt = new Date(user.nascimento);
            this.birth = dt.toISOString().substr(0, 10);
            this.edit = true;
            this.resp.message = "Cliente encontrado";
            this.resp.variant = "success";
          } else {
            this.resp.message = "Não encontrado!";
            this.resp.variant = "warning";
          }
        } else {
          const resp = await this.$axios.get(
            "/api/user?skip=0&limit=10&nome=" + encodeURI(value)
          );
          if (resp.data.length > 0) {
            let user = resp.data[0];
            this.user = user;
            let dt = new Date(user.nascimento);
            this.birth = dt.toISOString().substr(0, 10);
            this.edit = true;
            this.resp.message = "Cliente encontrado";
            this.resp.variant = "primary";
          } else {
            this.resp.message = "Não encontrado!";
            this.resp.variant = "warning";
          }
        }
      } catch (err) {
        this.resp.message = err;
        this.resp.variant = "danger";
      }
      this.searchValue = "";
    },
    searchCpf: async function () {
      try {
        const resp = await this.$axios.get(
          "/api/user?skip=0&limit=10&cpf=" + this.user.cpf
        );
        if (resp.data.length > 0) {
          let user = resp.data[0];
          this.user = user;
          let dt = new Date(user.nascimento);
          this.birth = dt.toISOString().substr(0, 10);
          this.edit = true;
          this.resp.message = "Cliente encontrado";
          this.resp.variant = "primary";
        } else {
          this.resp.message = "Não encontrado!";
          this.resp.variant = "warning";
        }
      } catch (error) {
        this.resp.message = error;
        this.resp.variant = "danger";
      }
      this.searchValue = "";
    },
    searchCep: async function () {
      try {
        const resp = await this.$axios.get(
          "https://webmaniabr.com/api/1/cep/" +
            this.selectedAddress.cep +
            "/?app_key=qEoqrmbUgij3QCyZ1J9ZMGrwM5zpxlSF&app_secret=em5wEnP6TGCRIR8QD2W6UdB7VV8LgMERFXP5ElD9O9px7bjl"
        );
        if (resp.status === 200) {
          let end = resp.data;
          this.selectedAddress.cep = end.cep;
          this.selectedAddress.logradouro = end.endereco;
          this.selectedAddress.bairro = end.bairro;
          this.selectedAddress.cidade = end.cidade;
          this.selectedAddress.uf = end.uf;
          this.selectedAddress.numero = "";
          this.usr.message = "CEP encontrado!";
          this.usr.variant = "success";
        } else {
          //alert(Object.keys(resp))
          this.resp.message = "Não encontrado!";
          this.resp.variant = "warning";
        }
      } catch (error) {
        this.resp.message = error;
        this.resp.variant = "danger";
      }
    },
  },
};
</script>

<style>
#user {
  text-align: left;
}
</style>