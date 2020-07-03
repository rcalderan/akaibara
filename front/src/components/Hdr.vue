<template>
  <b-container id="hdr">
    <b-col cols="12">
      <b-row>
        <b-col cols="2">
          
          
        </b-col>
        <b-col cols="8">
          <b-img fluid src="logo.png" alt="akaibara"></b-img>
          <h3>Cozinha Oriental</h3>
          <h6>Receitas de um família tradicional de São Carlos</h6>
        </b-col>
        <b-col cols="2">
          <!--
          <b-row align-h="end">
            <b-col cols="2" class="p-1">
              <b-dropdown id="dropdown-form" variant="link" toggle-class="text-decoration-none" no-caret>
                <template v-slot:button-content>
                  <font-awesome-icon :icon="['fas', 'user']" color="#c2995d" />
                </template>
                <b-dropdown-form>
                  <b-form-group label="Email" label-for="dropdown-form-email" @submit.stop.prevent>
                    <b-form-input
                      id="dropdown-form-email"
                      size="sm"
                      placeholder="email@example.com"
                    ></b-form-input>
                  </b-form-group>

                  <b-form-group label="Password" label-for="dropdown-form-password">
                    <b-form-input
                      id="dropdown-form-password"
                      type="password"
                      size="sm"
                      placeholder="Password"
                    ></b-form-input>
                  </b-form-group>

                  <b-form-checkbox class="mb-3">Remember me</b-form-checkbox>
                  <b-button variant="primary" size="sm">Sign In</b-button>
                </b-dropdown-form>
                <b-dropdown-divider></b-dropdown-divider>
                <b-dropdown-item-button>New around here? Sign up</b-dropdown-item-button>
                <b-dropdown-item-button>Forgot Password?</b-dropdown-item-button>
              </b-dropdown>
            </b-col>
            <b-col cols="2" class="p-1">
              <font-awesome-icon :icon="['fas', 'shopping-cart']" color="#c2995d" />
            </b-col>
            <b-col cols="2" class="p-1">
              <font-awesome-icon :icon="['fas', 'cog']" color="#c2995d" />
            </b-col>
          </b-row>
          --->
        </b-col>
      </b-row>
      <b-row>
        <b-col></b-col>
      </b-row>
    </b-col>

    <!-- Teste login face -->
    <div v-if="false">
      <button @click="fbClick">click</button>
      <button @click="onLogout">logout</button>
      <facebook-login
        class="button"
        appId="950740348348788"
        @login="onLogin"
        @logout="onLogout"
        @get-initial-status="getUserData"
        @sdk-loaded="sdkLoaded"
      ></facebook-login>
      <div v-if="isConnected" class="information">
        <h1>My Facebook Information</h1>
        <div class="well">
          <div class="list-item">
            <img v-click="fbClick" :src="picture" />
          </div>
          <div class="list-item">
            <i>{{name}}</i>
          </div>
          <div class="list-item">
            <i>{{email}}</i>
          </div>
          <div class="list-item">
            <i>{{personalID}}</i>
          </div>
        </div>
      </div>
    </div>
  </b-container>
</template>

<script>
export default {
  name: "hdr",
  data: function() {
    return {
      isConnected: false,
      name: "",
      email: "",
      personalID: "",
      picture: "",
      FB: undefined,
      token: undefined
    };
  },
  components: {
    
  },

  methods: {
    
  }
};
</script>

<style>
.information {
  margin-top: 100px;
  margin: auto;
  display: flex;
  flex-direction: column;
}
.well {
  background-color: rgb(191, 238, 229);
  margin: auto;
  padding: 50px 50px;
  border-radius: 20px;
  /* display:inline-block; */
}
.login {
  width: 200px;
  margin: auto;
}
.list-item:first-child {
  margin: 0;
}
.list-item {
  display: flex;
  align-items: center;
  margin-top: 20px;
}
.button {
  margin: auto;
}
</style>