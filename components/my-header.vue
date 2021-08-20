<template>
  <div class="flex flex-row-reverse flex-wrap item-center content-center w-full h-24 px-8  bg-gradient-to-r from-blue-600 to-blue-800">
    <button @click="changePage" class="flex flex-row justify-center items-center content-center h-20 w-20 rounded-full bg-white">
      <img src="~/static/logo.png" alt="CEIT 92 logo" class="w-16 h-16 object-cover"/>
    </button>
  </div>
</template>

<script>
export default {
  name: "my-header",
  methods: {
    async changePage() {
      await this.$router.push(`/`)
    }
  }
}
</script>

<style scoped>

</style>
