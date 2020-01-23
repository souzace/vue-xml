<template>
  <div>
    <h4 class="text-center mt-20">
      <small>
        <button class="btn btn-success" v-on:click="navigate()">Voltar para Listagem</button>
      </small>
    </h4>
    <div class="col-md-12 form-wrapper">
      <h2>Editar Usuário</h2>
      <form id="create-post-form" @submit.prevent="editUser">
        <div class="form-group col-md-12">
          <label for="name">Nome</label>
          <input
            type="text"
            id="name"
            v-model="user.name"
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
            v-model="user.email"
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
import * as Parser from "fast-xml-parser";

export default {
  data() {
    return {
      id: 0,
      user: {}
    };
  },
  created() {
    this.id = this.$route.params.id;
    this.getUser();
  },
  methods: {
    editUser() {
      let userData = {
        id: this.$route.params.id,
        name: this.user.name,
        email: this.user.email
      };
      axios
        .put(`${server.baseURL}/users/${this.id}`, userData)
        .then(() => {
          router.push({ name: "home" });
        });
    },
    getUser() {
      axios
        .get(`${server.baseURL}/users/${this.id}`, { responseType: 'document'})
        .then(data => {
          
          let usersXml =  new XMLSerializer().serializeToString(data.data);
          
          let usersObj = Parser.parse(usersXml);

          //console.log(usersObj);

          this.user = usersObj.user.user;

        });
    },
    navigate() {
      router.go(-1);
    }
  }
};
</script>