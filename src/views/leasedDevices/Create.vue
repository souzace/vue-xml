<template>
  <div>
    <div class="col-md-12 form-wrapper">
      <h2>Adicionar Locação</h2>
      <form id="create-post-form" v-on:submit.prevent="createLeasedDevice">
        <div class="form-group col-md-12">
          <label for="leaseDate">Data de Locação</label>
          <input
            type="text"
            id="leaseDate"
            v-model="leaseDate"
            name="leaseDate"
            class="form-control"
            placeholder="Data de Locação"
          />
        </div>
        <div class="form-group col-md-12">
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
        <div class="form-group col-md-12">
          <label for="collaboratorName">Colaborador</label>
          <input
            type="text"
            id="collaboratorName"
            v-model="collaboratorName"
            name="collaboratorName"
            class="form-control"
            placeholder="Colaborador"
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
      leaseDate: "",
      tippingNumber: "",
      collaboratorName: ""
    };
  },
  methods: {
    createLeasedDevice() {
      
      let customerData = {
        leaseDate: this.leaseDate,
        tippingNumber: this.tippingNumber,
        collaboratorName: this.collaboratorName
      };
      axios.post(`${server.baseURL}/leasedDevices`, customerData,  { withCredentials: false }).then((leasedDevice) => {
        this.$bus.$emit('UpdateLeasedDeviceList', leasedDevice);
        router.push({ name: "home" });
      });
    }
  }
};
</script>