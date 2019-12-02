<template>
  <div>
    <h4 class="text-center mt-20">
      <small>
        <button class="btn btn-success" v-on:click="navigate()">Voltar para Listagem</button>
      </small>
    </h4>
    <div class="col-md-12 form-wrapper">
      <h2>Editar Livro</h2>
      <form id="create-post-form" @submit.prevent="editBook">
        <div class="form-group col-md-12">
          <label for="title">Título</label>
          <input
            type="text"
            id="title"
            v-model="book.title"
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
            v-model="book.description"
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
            v-model="book.author"
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
      id: 0,
      book: {}
    };
  },
  created() {
    this.id = this.$route.params.id;
    this.getBook();
  },
  methods: {
    editBook() {
      let bookData = {
        id: this.$route.params.id,
        title: this.book.title,
        description: this.book.description,
        author: this.book.author
      };
      axios
        .put(`${server.baseURL}/books/${this.id}`, bookData)
        .then(() => {
          router.push({ name: "home" });
        });
    },
    getBook() {
      axios
        .get(`${server.baseURL}/books/${this.id}`)
        .then(data => (this.book = data.data));
    },
    navigate() {
      router.go(-1);
    }
  }
};
</script>