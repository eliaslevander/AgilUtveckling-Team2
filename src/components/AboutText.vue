<script></script>

<template>
  <div id="About">
    <v-card class="about-container" variant="tonal">
      <h1>Det här är PRISMA</h1>
      <v-card-text
        class="text"
        style="
          display: flex;
          flex-direction: column;
          justify-content: left;
          align-items: left;
        "
        >Oavsett om du är en inredningsentusiast eller bara vill fräscha upp
        ditt hem, har vi allt du behöver för att ge liv åt dina visioner.
        Upptäck vårt stora utbud av färger och nyanser och hitta den perfekta
        looken för ditt hem. Våra experter hjälper och inspirerar dig med tips,
        trender och workshops.
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

  .about-container h1 {
    margin-left: 1rem;
    padding-top: 0.2rem;
  }

  .v-card .text {
    padding-top: 0.2rem;
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

  @media screen and (max-width: 1200px) {
    .v-card {
      margin-top: 1.2rem;
    }

    .v-card .text {
      width: 60%;
    }

    .about-container h1 {
      font-size: 1.5rem;
    }
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
