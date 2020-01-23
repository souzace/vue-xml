<template>
  <div class="container-fluid">
    <div class="text-center">
      <h1>Usuários</h1>
      <p>Construído com Express.js, Vue.js e SQLite</p>
      <div v-if="users.length === 0">
        <h2>Nenhum usuário cadastrado.</h2>
      </div>
    </div>

    <div class>
      <table class="table table-bordered">
        <thead class="thead-dark">
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Nome</th>
            <th scope="col">Email</th>
            <th scope="col">Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user._id">
            <td>{{ user.id }}</td>
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
            <td>
              <div class="d-flex justify-content-between align-items-center">
                <div class="btn-group" style="margin-bottom: 20px;">
                  <router-link
                    :to="{name: 'Edit', params: {id: user.id}}"
                    class="btn btn-sm btn-outline-secondary"
                  >Editar</router-link>
                  <button
                    class="btn btn-sm btn-outline-secondary"
                    v-on:click="deleteUser(user.id)"
                  >Excluir</button>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import { server } from "../../helper";
import axios from "axios";
import * as Parser from "fast-xml-parser";

export default {
  data() {
    return {
      users: []
    };
  },
  created() {
    this.fetchUsers();
  },
  methods: {
    fetchUsers() {
      axios
        .get(`${server.baseURL}/users`, { responseType: 'document'})
        .then(data => {

          
          let usersXml =  new XMLSerializer().serializeToString(data.data);
          
          let usersObj = Parser.parse(usersXml);

          //console.log(usersObj);

          this.users = usersObj.users.user;
        });

    },
    deleteUser(id) {
      axios
        .delete(`${server.baseURL}/users/${id}`)
        .then(() => {
          //console.log(data);
          window.location.reload();
        });
    }
  },
  mounted() {
    this.$bus.$on("UpdateUserList", user => {
      this.users.push(user);
      //this.fetchUsers();

    });
  }
};
</script>