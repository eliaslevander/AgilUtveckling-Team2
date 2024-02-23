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
        style="text-transform: none"
        :style="{ 'pointer-events': 'none' }"
      >
        {{ link }}
      </v-btn>
      <v-col class="text-center mt-4" cols="12">
        {{ new Date().getFullYear() }} — <strong>PRISMA</strong>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script>
  export default {
    data: () => ({
      links: ['Om oss', 'Kontakt', 'Frågor', 'Samarbeten', 'Användarvillkor']
    })
  }
</script>
