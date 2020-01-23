<template>
  <div>
    <div class="col-md-12 form-wrapper">
      <h2>Criar Usuário</h2>
      <form id="create-post-form" v-on:submit.prevent="createUser">
        <div class="form-group col-md-12">
          <label for="name">Nome</label>
          <input
            type="text"
            id="name"
            v-model="name"
            name="name"
            class="form-control"
            placeholder="Nome"
          />
        </div>
        <div class="form-group col-md-12">
          <label for="email">Email</label>
          <input
            type="text"
            id="email"
            v-model="email"
            name="email"
            class="form-control"
            placeholder="Email"
          />
        </div>
        <div class="form-group col-md-4 pull-right">
          <button class="btn btn-success" type="submit">Salvar</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { server } from "../../helper";
import router from "../../router/index";
export default {
  data() {
    return {
      name: "",
      email: ""
    };
  },
  methods: {
    createUser() {
      
      let customerData = {
        name: this.name,
        email: this.email
      };
      axios.post(`${server.baseURL}/users`, customerData,  { withCredentials: false }).then((user) => {
        this.$bus.$emit('UpdateUserList', user);
        router.push({ name: "home" });
      });
    }
  }
};
</script>