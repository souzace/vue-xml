<template>
  <div>
    <div class="col-md-12 form-wrapper">
      <h2>Criar Dispositivo</h2>
      <form id="create-post-form" v-on:submit.prevent="createDevice">
      <div class="row">
        <div class="form-group col-md-6">
          <label for="tippingNumber">Tombamento</label>
          <input
            type="text"
            id="tippingNumber"
            v-model="tippingNumber"
            name="tippingNumber"
            class="form-control"
            placeholder="Tombamento"
          />
        </div>
        <div class="form-group col-md-6">
          <label for="typeDevice">Tipo</label>
          <input
            type="text"
            id="typeDevice"
            v-model="typeDevice"
            name="typeDevice"
            class="form-control"
            placeholder="Tipo"
          />
        </div>
      </div>

      <div class="row">
        <div class="form-group col-md-6">
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
        <div class="form-group col-md-6">
          <label for="maker">Fabricante</label>
          <input
            type="text"
            id="maker"
            v-model="maker"
            name="maker"
            class="form-control"
            placeholder="maker"
          />
        </div>
      </div>

      <div class="row">
        <div class="form-group col-md-6">
          <label for="model">Modelo</label>
          <input
            type="text"
            id="model"
            v-model="model"
            name="model"
            class="form-control"
            placeholder="Modelo"
          />
        </div>
        <div class="form-group col-md-6">
          <label for="operatingSystem">Sistema Operacional</label>
          <input
            type="text"
            id="operatingSystem"
            v-model="operatingSystem"
            name="operatingSystem"
            class="form-control"
            placeholder="Sistema Operacional"
          />
        </div>
      </div>  

        <div class="form-group col-md-12 pull-right">
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
      tippingNumber: "",
      typeDevice: "",
      name: "",
      maker: "",
      model: "",
      operatingSystem: "",
    };
  },
  methods: {
    createDevice() {
      
      let customerData = {
        tippingNumber: this.tippingNumber,
        typeDevice: this.typeDevice,
        name: this.name,
        maker: this.maker,
        model: this.model,
        operatingSystem: this.operatingSystem
      };
      axios.post(`${server.baseURL}/devices`, customerData,  { withCredentials: false }).then((device) => {
        this.$bus.$emit('UpdateDeviceList', device);
        router.push({ name: "home" });
      });
    }
  }
};
</script>