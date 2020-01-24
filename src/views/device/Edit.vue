<template>
  <div>
    <h4 class="text-center mt-20">
      <small>
        <button class="btn btn-success" v-on:click="navigate()">Voltar para Listagem</button>
      </small>
    </h4>
    <div class="col-md-12 form-wrapper">
      <h2>Editar Dispositivo</h2>
      <form id="create-post-form" @submit.prevent="editDevice">
        <div class="row">
          <div class="form-group col-md-6">
            <label for="tippingNumber">Tombamento</label>
            <input
              type="text"
              id="tippingNumber"
              v-model="device.tippingNumber"
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
              v-model="device.typeDevice"
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
              v-model="device.name"
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
              v-model="device.maker"
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
              v-model="device.model"
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
              v-model="device.operatingSystem"
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
import * as Parser from "fast-xml-parser";

export default {
  data() {
    return {
      id: 0,
      device: {}
    };
  },
  created() {
    this.id = this.$route.params.id;
    this.getDevice();
  },
  methods: {
    editDevice() {
      let deviceData = {
        id: this.$route.params.id,
        tippingNumber: this.device.tippingNumber,
        typeDevice: this.device.typeDevice,
        name: this.device.name,
        maker: this.device.maker,
        model: this.device.model,
        operatingSystem: this.device.operatingSystem,

      };
      axios
        .put(`${server.baseURL}/devices/${this.id}`, deviceData)
        .then(() => {
          router.push({ name: "home" });
        });
    },
    getDevice() {
      axios
        .get(`${server.baseURL}/devices/${this.id}`, { responseType: 'document'})
        .then(data => {
          
          let devicesXml =  new XMLSerializer().serializeToString(data.data);
          
          let devicesObj = Parser.parse(devicesXml);

          //console.log(devicesObj);

          this.device = devicesObj.device.device;

        });
    },
    navigate() {
      router.go(-1);
    }
  }
};
</script>