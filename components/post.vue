<template>
  <div class="container mx-auto flex flex-col md:w-1/2 w-10/12 pb-8">
    <div class="flex flex-col bg-gradient-to-r from-blue-400 to-blue-600 m-4 px-6 py-4 rounded-md text-white text-right shadow-lg z-10">
      <h4 class="text-lg font-bold my-4 txt-rtl">{{ title }}</h4>
      <p class="text-base font-light mb-4 txt-rtl">{{ author }}</p>
    </div>
    <div class="text-right bg-white rounded-lg shadow-lg z-0 pt-24 pb-8 pr-8 pl-8 -mt-20">
      <div class="flex flex-col flex-wrap justify-center items-center">
        <p class="txt-rtl text-justify text-sm font-light w-full px-4" v-html="content">
        </p>
        <div v-if="images" v-for="image in images" class="mt-4">
          <img :src="image" class="max-w-full" alt="image related to content" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "post",
  props: {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true
    },
    content: {
      type: String,
    },
    images: {
      type: Array,
      default: []
    }
  }
}
</script>

<style scoped>
  .txt-rtl {
    direction: rtl;
  }
</style>
