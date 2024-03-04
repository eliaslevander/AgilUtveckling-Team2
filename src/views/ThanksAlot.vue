<script>
</script>

<template>
  <div id="Message">
<div class="d-flex align-center flex-column">
    <v-card class="Thnks"
      title="Tack för att du handlar hos PRISMA"
      subtitle="Ditt ordernummer är: 000000001"
      text="Vi är otroligt tacksamma för att du har valt att handla hos oss. 
      Din beställning har nu behandlats och är på väg att bli packad med omsorg för att snart nå fram till dig.">
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
<v-divider inset></v-divider>


      <v-card class="Thnks"
text="Om du har frågor eller funderingar kring din beställning, tveka inte att höra av dig till oss på:">
      <v-list>
      <v-list-item
        prepend-icon="mdi-phone"
        title="(+46) 555-6789"
      ></v-list-item>

      <v-divider inset></v-divider>

      <v-list-item
        prepend-icon="mdi-email"
        title="prisma@example.com"
      ></v-list-item>

      <v-divider inset></v-divider>
    </v-list>
</v-card>



</div>
</div>
  </template>

  <style scoped>
  #Message{
    height:100vh;
    width:100%;
  }
.Thnks{
  margin:auto;
  margin-top: 4vh;
  padding: 2vh;
  width: 90%;
}
#infotitle {
  font-weight: 800;
}

</style>
