<template>
  <v-footer class="bg-grey-lighten-2">
    <v-row justify="center" class="text-center" no-gutters>
      <router-link :to="{ name: 'home' }" id="brand"
        ><div
          style="width: 120px; display: flex; align-items: center"
          id="logo-container"
        >
          <img
            style="width: 100%"
            src="../assets/images/Logo_NEW.png"
            alt=""
          /></div
      ></router-link>
      <v-spacer></v-spacer>
      <v-btn
        v-for="link in links"
        :key="link"
        color="black"
        variant="text"
        class="mx-2"
        rounded="s"
        style="text-transform: inherit"
      >
        {{ link }}
      </v-btn>
      <v-spacer></v-spacer>

      <v-col class="text-center mt-4" cols="12">
        <p>© 2024 Copyright: Prisma</p>
      </v-col>
    </v-row>
  </v-footer>
</template>
<script>
  // import { RouterLink } from 'vue-router'
  export default {
    data: () => ({
      links: ['Kontakt', 'Vanliga frågor', 'Samarbeten', 'Användarvillkor']
    })
  }
</script>

<style scoped>
  .v-btn {
    font-size: 1.1rem;
  }

  @media screen and (max-width: 850px) {
    .v-row {
      display: block;
      height: 38vh;
    }
    #logo-container {
      padding-top: 1rem;
      padding-bottom: 1rem;
      margin-left: 1rem;
    }

    .v-btn {
      display: flex;
      margin-left: 1rem;
    }

    p {
      display: flex;
      justify-content: left;
      text-align: left;
      margin-left: 1rem;
      padding-bottom: 1rem;
    }
  }
</style>
