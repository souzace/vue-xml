<template>
  <div>
    <div class="col-md-12 form-wrapper">
      <h2>Criar Livro</h2>
      <form id="create-post-form" v-on:submit.prevent="createBook">
        <div class="form-group col-md-12">
          <label for="title">Título</label>
          <input
            type="text"
            id="title"
            v-model="title"
            name="title"
            class="form-control"
            placeholder="Título"
          />
        </div>
        <div class="form-group col-md-12">
          <label for="title">Descrição</label>
          <input
            type="text"
            id="description"
            v-model="description"
            name="title"
            class="form-control"
            placeholder="Descrição"
          />
        </div>
        <div class="form-group col-md-12">
          <label for="title">Autor</label>
          <input
            type="text"
            id="author"
            v-model="author"
            name="author"
            class="form-control"
            placeholder="Autor"
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
import { server } from "../helper";
import router from "../router/index";
export default {
  data() {
    return {
      title: "",
      description: "",
      author: ""
    };
  },
  methods: {
    createBook() {
      
      let customerData = {
        title: this.title,
        description: this.description,
        author: this.author
      };
      axios.post(`${server.baseURL}/books`, customerData,  { withCredentials: false }).then(() => {
        router.push({ name: "home" });
      });
    }
  }
};
</script>