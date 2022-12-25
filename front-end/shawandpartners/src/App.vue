<template>
  <v-app>
    <v-toolbar>
      <v-toolbar-items>
        <v-btn to="/" class="font-weight-bold font-italic text-capitalize"> Test Shaw and Partners </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>
<script>
export default {
  name: "App",

  data: () => ({}),
};
</script>
