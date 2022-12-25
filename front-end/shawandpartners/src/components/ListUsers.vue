<template>
  <v-progress-circular
    class="absolute-center"
    v-if="loading"
    indeterminate
    color="primary"
    size="large"
  >
  </v-progress-circular>
  <div v-else>
    <v-table class="text-center ms-10 me-10">
      <thead>
        <tr>
          <th class="text-center">Login</th>
          <th class="text-center">Id</th>
          <th class="text-center"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in users" :key="item.id">
          <td>{{ item.login }}</td>
          <td>{{ item.id }}</td>
          <td>
            <v-btn
              class="text-capitalize"
              @click="$router.push(`/details/${item.login}`)"
            >
              Details
            </v-btn>
          </td>
        </tr>
      </tbody>
    </v-table>
    <div class="text-center mb-15">
      <v-btn
        v-if="page > 1"
        class="me-3"
        @click="loadPrev"
        icon="mdi-chevron-left"
      >
      </v-btn>
      {{ page }}
      <v-btn class="ms-3" @click="loadNext" icon="mdi-chevron-right"> </v-btn>
    </div>
  </div>
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
  name: "ListUsers",

  data: () => ({
    users: [],
    page: 1,
    prevIds: [],
    nextIdStart: 0,
    loading: false,
    snackbarRequestError: false,
  }),

  async mounted() {
    await this.loadUsers();
  },
  methods: {
    async loadUsers() {
      try {
        this.loading = true;
        const res = await userRepository.getUsersAndIdNextPage(
          this.nextIdStart
        );
        this.loading = false;

        this.users = res.data.data;

        this.prevIds.push(this.nextIdStart);
        this.nextIdStart = res.data.nextPage;
      } catch (error) {
        console.log(error);
        this.loading = false;
        this.snackbarRequestError = true;
      }
    },
    async loadPrev() {
      this.prevIds.pop();
      this.nextIdStart = this.prevIds.pop();

      this.page--;
      await this.loadUsers();
    },
    async loadNext() {
      this.page++;
      await this.loadUsers();
    },
  },
};
</script>
<style>
.absolute-center {
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>