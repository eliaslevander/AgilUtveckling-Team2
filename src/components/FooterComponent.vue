<template>
  <v-footer class="bg-grey-lighten-2">
    <v-row justify="center" no-gutters>
      <v-btn
        v-for="link in links"
        :key="link"
        color="black"
        variant="text"
        class="mx-2"
        rounded="xl"
        style="text-transform: capitalize"
      >
        {{ link }}
      </v-btn>
      <v-col class="text-center mt-4" cols="12">
        <p>© 2024 Copyright: Prisma</p>
      </v-col>
    </v-row>
  </v-footer>
</template>
<script>
  import { RouterLink } from 'vue-router'
  export default {
    data: () => ({
      links: [
        'Prisma',
        'Kontakt',
        'Vanliga frågor',
        'Samarbeten',
        'Användarvillkor'
      ]
    })
  }
</script>

<style></style>
