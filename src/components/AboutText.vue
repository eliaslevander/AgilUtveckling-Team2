<script></script>

<template>
  <div id="About">
    <v-card title="Det här är PRISMA" variant="tonal">
      <v-card-text
        class="text"
        style="
          display: flex;
          flex-direction: column;
          justify-content: left;
          align-items: left;
        "
        >Oavsett om du är en inredningsentusiast eller bara vill fräscha upp,
        har vi allt du behöver för att ge liv åt dina visioner. Upptäck vårt
        stora utbud av färger och nyanser och hitta den perfekta looken för ditt
        hem. Våra experter hjälper och inspirerar dig med tips, trender och
        workshops.
        <v-spacer></v-spacer>
        Snabba leveranser, utmärkt kundservice och en trygg köpupplevelse gör
        PRISMA till din perfekta partner.
        <v-spacer></v-spacer>
        Besök PRISMA idag och förvandla hemmet till en färgstark oas!
      </v-card-text>
      <v-image style="width: 300px" id="img-aside">
        <img style="width: 100%" src="../assets/images/aside-img4.jpg" alt="" />
      </v-image>
    </v-card>
  </div>
</template>

<style scoped>
  #About {
    margin: 2vh;
    padding: 2vh;
  }

  .v-card .text {
    font-size: 1.1rem;
    width: 75%;
  }

  #img-aside {
    position: absolute;
    top: 0;
    right: 0;
    aspect-ratio: 1;
    overflow: hidden;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media screen and (max-width: 850px) {
    #img-aside {
      display: none;
    }

    .v-card .text {
      width: 100%;
    }
  }
</style>
