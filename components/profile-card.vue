<template>
  <div class="flex flex-col flex-wrap justify-center item-center content-center md:w-1/2 w-10/12 mx-auto my-8 ">
    <div class="flex flex-row justify-center items-center mx-auto bg-white rounded-full w-36 h-36 z-10 shadow-2xl">
      <img :src="profile_image" class="w-36 h-36 p-2 rounded-full object-cover"/>
    </div>
    <div class="flex flex-col justify-center align-center w-10/12 md:w-1/2 -mt-16 pt-16 rounded-lg bg-blue-600 text-white z-0 shadow-2xl pb-4">
      <h2 class="w-full text-center font-bold text-lg">{{ name }}</h2>
      <h4 class="w-full text-center font-thin text-base">{{ student_id }}</h4>
      <p class="text-center font-thin text-base text-yellow-400 bg-white bg-opacity-10 rounded-lg mx-4" v-if="message">{{ message }}</p>
    </div>
  </div>
</template>

<script>
export default {
name: "profile-card",
  props: {
    profile_image: {
      type: String,
    },
    name: {
      type: String,
    },
    student_id: {
      type: String,
    },
    message: {
      type: String,
    }
  }
}
</script>

<style scoped>

</style>
