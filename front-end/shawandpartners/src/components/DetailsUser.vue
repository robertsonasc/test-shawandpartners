<template>
  <v-row class="ma-10" v-if="loadingDetails" justify="center">
    <v-progress-circular
      class="mt-10"
      indeterminate
      color="primary"
      size="large"
    ></v-progress-circular>
  </v-row>
  <v-card v-else class="mx-auto mt-10" max-width="544" variant="outlined">
    <v-card-item>
      <div>
        <div class="text-overline mb-1">User details</div>
        <div class="text-h6 mb-1">Login: {{ username }}</div>
        <div class="text-body-1">
          Id: {{ id }} <br />
          URL Profile: <a target="_blank" v-bind:href="URLProfile"> {{ URLProfile }} </a> <br />
          Date of login creation: {{ dateLoginCreation }}
        </div>
      </div>
    </v-card-item>
  </v-card>
  <v-row class="ma-10" v-if="loadingRepos" justify="center">
    <v-progress-circular
      class="mt-10"
      indeterminate
      color="primary"
      size="large"
    ></v-progress-circular>
  </v-row>
  <v-table v-else class="ma-10 ms-10 me-10 text-center">
    <thead>
      <tr>
        <th class="text-center">Id</th>
        <th class="text-center">Name</th>
        <th class="text-center">URL</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in repos" :key="item.id">
        <td>{{ item.id }}</td>
        <td>{{ item.name }}</td>
        <td>
          <a target="_blank" v-bind:href="item.html_url"> {{ item.html_url }} </a>
        </td>
      </tr>
    </tbody>
  </v-table>
  <v-snackbar v-model="snackbarRequestError" multi-line color="red accent-2">
    Request error, please refresh the page.
    <template v-slot:actions>
      <v-btn color="white" variant="text" @click="snackbarRequestError = false">
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>
<script>
import userRepository from "../repositories/userRepository";

export default {
  props: ["username"],

  data: () => ({
    id: "",
    URLProfile: "",
    dateLoginCreation: "",
    repos: [],
    loadingDetails: false,
    loadingRepos: false,
    snackbarRequestError: false,
  }),

  async mounted() {
    try {
      this.loadingDetails = true;
      this.loadingRepos = true;
      
      const res = await userRepository.getUserDetails(this.username);
      this.loadingDetails = false;

      this.id = res.data.id;
      this.URLProfile = res.data.html_url;
      this.dateLoginCreation = res.data.created_at;

      const responseRepos = await userRepository.getUserRepos(this.username);
      this.loadingRepos = false;

      this.repos = responseRepos.data;
      
    } catch (error) {
      console.log(error);
      this.loadingDetails = false;
      this.loadingRepos = false;
      this.snackbarRequestError = true;
    }
  },
};
</script>