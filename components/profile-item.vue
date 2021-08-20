<template>
  <div class="flex flex-col flex-wrap content-center items-center transform hover:scale-110 transition ease-in duration-300">
      <button class="flex flex-row justify-center items-center mx-auto bg-white rounded-full w-36 h-36 z-10 shadow-2xl" @click="goToStudent">
        <img :src="profile_image" class="w-36 h-36 p-2 rounded-full object-cover" alt="profile image"/>
      </button>
      <button class="flex flex-col justify-center align-center w-10/12 -mt-8 pt-8 pb-4 rounded-lg bg-blue-600 text-white z-0 shadow-2xl" @click="goToStudent">
        <h2 class="w-full text-center text-lg">{{ name }}</h2>
      </button>
  </div>
</template>

<script>
export default {
  name: "profile-item",
  props: {
    profile_image: {
      type: String
    },
    name: {
      type: String,
    },
    student_id: {
      type: String,
    }
  }, methods: {
    goToStudent(){
      this.$router.push(`/student?id=${this.student_id}`)
    }
  }
}
</script>

<style scoped>

</style>
