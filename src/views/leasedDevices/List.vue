<template>
  <div class="container-fluid">
    <div class="text-center">
      <h1>Dispositivos Locados</h1>
    </div>

    <div class>
      <table class="table table-bordered">
        <thead class="thead-dark">
          <tr>
            <th scope="col">Data de Locação</th>
            <th scope="col">Tombamento</th>
            <th scope="col">Nome do Colaborador</th>
            <th scope="col">Status da Locação</th>
            <th scope="col">Data da Devolução</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="leasedDevice in leasedDevices" :key="leasedDevice._id">
            <td>{{ leasedDevice.id }}</td>
            <td>{{ leasedDevice.leaseDate }}</td>
            <td>{{ leasedDevice.tippingNumber }}</td>
            <td>{{ leasedDevice.collaboratorName }}</td>
            <td>{{ leasedDevice.status }}</td>
            <td>{{ leasedDevice.devolutionDate }}</td>
            <td>
              <div class="d-flex justify-content-between align-items-center">
                <div class="btn-group" style="margin-bottom: 20px;">
                  <router-link
                    :to="{name: 'Edit', params: {id: leasedDevice.id}}"
                    class="btn btn-sm btn-outline-secondary"
                  >Editar</router-link>
                  <button
                    class="btn btn-sm btn-outline-secondary"
                    v-on:click="deleteLeasedDevice(leasedDevice.id)"
                  >Excluir</button>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-if="leasedDevices.length === 0">
        <h2>Nenhum dispositivo cadastrado.</h2>
    </div>
  </div>
</template>