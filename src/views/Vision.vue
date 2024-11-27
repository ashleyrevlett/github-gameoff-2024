<template>
  <div class="flex flex-col items-center h-screen w-screen">
    <div class="p-4 py-24 m-4 border border-black mb-4 w-100">
      <h1 class="text-xl font-bold mb-8 text-center">You have a vision!</h1>
      <p>The goddess Ka reveals herself to you. </p>
      <p>Her words ring out –</p>
      <p>"A great comet races toward Earth. Gather as many worthy followers as you can, then ascend with me before the mortal realm is destroyed..."</p>
      <div class="flex w-100 justify-center my-4 mt-8">
        <router-link to="game" class="btn mx-auto">Begin your righteous journey</router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
p {
  @apply my-5 leading-5 text-center;
}
</style>