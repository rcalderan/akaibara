<template>
  <b-container fluid id="user">
    
    <Menu />
    <User />
  </b-container>
</template>

<script>
// @ is an alias to /src
import Menu from "../components/Menu";
import User from "../components/User";
export default {
  name: "user",
  components: {
    Menu,
    User
  }
};
</script>
<style>
#user {
  padding-left: 0px;
  padding-right: 0px;
}
</style>
