<script setup>
import { productsStore } from "../stores/products";
import router from "@/router";
import { computed } from 'vue';

const store = productsStore();

const goToProduct = (id) => {
  router.push({ name: "product", params: { id: id } });
};
const filteredProducts = computed(() => {
  return store.products.filter(product => product.category === 'accessories');
});

</script>
<script>
    export default {
        data () {
        return {
        countDown: 60
            }
        },
        methods: {
        countDownTimer () {
        if (this.countDown > 0) {
        setTimeout(() => {
        this.countDown -= 1
        this.countDownTimer()
        }, 60000)
         }
          }
        },
        created () {
            this.countDownTimer()
        }
    }
</script>

<template>
<div>
    <v-card class="Thanks">
    <h1>Tack för att du handlar hos PRISMA</h1>
    <h3>Ditt ordernummer är: 000000001</h3>
    <h4>Vi är otroligt tacksamma för att du har valt att handla hos oss. </h4>
    <h4>Din beställning har nu behandlats och är på väg att bli packad med omsorg för att snart nå fram till dig.</h4>
  </v-card>
  <v-card class="info">
      <v-list>
      <v-list-item>
        <v-list-item-title id="infotitle">
      Leveransinformation:
      </v-list-item-title>
        Förväntad leveranstid är 2024-02-04. Du kommer att få ett bekräftelsemeddelande med spårningsinformation så snart din beställning har skickats.
      </v-list-item>
      <v-list-item>
      <v-list-item-title id="infotitle">
      Erbjudande till dig:
    </v-list-item-title>
        För att visa vår uppskattning, ge dig en 10% rabatt på din nästa beställning med koden "TACK10". 
        Använd den vid utcheckningen för att ta del av erbjudandet. Gäller fram till [2024-06-04].
      </v-list-item>
      <v-list-item>
      <v-list-item-title id="infotitle">
      Följ oss för uppdateringar:
    </v-list-item-title>
        Håll dig uppdaterad om våra senaste produkter, kampanjer och nyheter genom att följa oss på @prismastore eller prenumerera på vårt nyhetsbrev.
      </v-list-item>
      <v-list-item>
        <v-list-item-title id="infotitle">
        Ditt åsikter är värdefulla:
      </v-list-item-title>
        Vi uppmuntrar dig att lämna feedback eller recensioner. Dina åsikter hjälper oss att förbättra och ger andra kunder insikt i din upplevelse.
        Tack igen för att du har valt PRISMA. Vi ser fram emot att ha dig som kund och hoppas att du kommer att njuta av dina nya produkter!
      </v-list-item>
    </v-list>
  </v-card>
</div>
<div id="dontForget">
<h2>Har du glömt något?</h2>
<h4>Det är inte försent!</h4>
<h4>Gör en till beställning inom {{ countDown }} min för att lägga till det i samma order</h4>
<h5>(De flesta glömmer verktygen)</h5>
</div>
<div class="product-grid">
    <div
      class="card"
      v-for="item in filteredProducts"
      :key="item.id"
      :title="item.name"
      @click="goToProduct(item.id)"
    >
      <div class="image-container">
        <img class="product-image" :src="item.image" :alt="item.alt" />
      </div>
      <div class="name-container">
        <h2 class="name">{{ item.name }}</h2>
      </div>
    </div>
  </div>

      <v-card class="contactlist"
        text="Om du har frågor eller funderingar kring din beställning, tveka inte att höra av dig till oss på:">
      <v-list>
      <v-list-item class="contact"
        prepend-icon="mdi-phone"
        title="(+46) 555-6789"
        center
      ></v-list-item>

      <v-divider inset></v-divider>

      <v-list-item class="contact"
        prepend-icon="mdi-email"
        title="prisma@example.com"
      ></v-list-item>
      <v-divider inset></v-divider>
    </v-list>
</v-card>



</template>

  <style scoped>

  .Thanks{
    width:100%;
    padding-top:5vh;
    padding-bottom:3vh;
    padding-left:1vh;
    padding-right:1vh;
    margin: auto;
    text-align:center;
    border-bottom: solid 1px 
  }
  .info {
    padding-left:4vh;
    padding-top:4vh;
    padding-bottom:5vh;
  }
.contactlist{
  text-align:center;
  margin:auto;
  margin-top: 4vh;
  padding: 2vh;
  width: 90%;
}


#infotitle {
  font-weight: 800;
}
#dontForget{
  text-align:center;
  margin: 1vh;
  padding-bottom: 5vh;
}
.product-grid {
  display:flex;
  justify-content:center;
  align-items:center;
  gap: 8px;
  padding: 8px;
}
.card {
  width:30%;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  cursor: pointer;
}

.image-container {
  width: 100%;
  aspect-ratio: 1;
  padding: 16px;
  overflow: hidden;
}

.product-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.name {
  text-transform: uppercase;
  display: block;
  text-align: center;
  max-width: 85%;
  font-size: 1.125rem;
  margin-bottom: 16px;
}

.name-container {
  min-height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
