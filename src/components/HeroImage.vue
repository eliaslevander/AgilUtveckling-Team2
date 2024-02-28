<script>
</script>

<template>
    <div id="HeroImage">
        <svg id="shape" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
  <path fill="#ffffff" fill-opacity="1" d="M0,320L720,64L1440,96L1440,320L720,320L0,320Z"></path>
</svg>
<h1>Mer färg i ditt hem</h1>
</div>

</template>

<style scoped>

#shape{
    bottom: 0;
    position:absolute;
    height:60%;
}
h1{
    color: navy;
    right: 2%;
    bottom: 0;
    font-size: 12vh;
    position: absolute;
}

#HeroImage {
    background-image: url(../assets/images/Prisma_HeroImage.jpg);
    background-size:cover;
    position: relative;
    height: 100vh;
    margin-left: 0;
    margin-right: 0;
    margin-bottom: 5vh;
    width: 100%;
    padding: 0;
}

@media(max-width: 375px) {
    h1 {
        bottom: 0;
        right: 4%;
        font-size: 4vh;
    }
}
</style>
