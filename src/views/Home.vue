<template>
  <div class="container-fluid">
    <div class="text-center">
      <h1>Biblioteca</h1>
      <p>Construído com Nest.js, Vue.js e InMemoryDB</p>
      <div v-if="books.length === 0">
        <h2>Nenhum livro cadastrado.</h2>
      </div>
    </div>

    <div class>
      <table class="table table-bordered">
        <thead class="thead-dark">
          <tr>
            <th scope="col">Título</th>
            <th scope="col">Descrição</th>
            <th scope="col">Autor</th>
            <th scope="col">Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="book in books" :key="book._id">
            <td>{{ book.title }}</td>
            <td>{{ book.description }}</td>
            <td>{{ book.author }}</td>
            <td>
              <div class="d-flex justify-content-between align-items-center">
                <div class="btn-group" style="margin-bottom: 20px;">
                  <router-link
                    :to="{name: 'Edit', params: {id: book.id}}"
                    class="btn btn-sm btn-outline-secondary"
                  >Editar</router-link>
                  <button
                    class="btn btn-sm btn-outline-secondary"
                    v-on:click="deleteBook(book.id)"
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
import { server } from "../helper";
import axios from "axios";


export default {
  data() {
    return {
      books: []
    };
  },
  created() {
    this.fetchBooks();
  },
  methods: {
    fetchBooks() {
      axios
        .get(`${server.baseURL}/users`, { responseType: 'document'})
        .then(data => {
          const reader = new FileReader();
          let xml;
          var bla =  new XMLSerializer().serializeToString(data.data);
          var b = new Blob([bla]);

          reader.readAsText(b);
          
          reader.onload = function(e) {
            xml = e.target.result;
            const beginXML = xml.search("<users");
            //console.log(beginXML);
            xml = xml.substring(beginXML, xml.length);
            console.log(xml);
          };

          //this.books = data.data;
        });

    },
    deleteBook(id) {
      axios
        .delete(`${server.baseURL}/books/${id}`)
        .then(data => {
          console.log(data);
          window.location.reload();
        });
    }
  }
};
</script>