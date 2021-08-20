<template>
  <div class="w-full h-full min-w-screen min-h-screen bg-cover bg-no-repeat bg-ceit-92 bg-fixed">
    <Header/>
    <div class="flex justify-between items-center p-4 w-8/12 mx-auto bg-white rounded-3xl my-8">
      <div>
        <h1>Student ID: <span class="text-blue-800">{{state.student_id}}</span></h1>
        <select v-model="state.student_id" class="rounded-lg border-2 border-blue-600">
          <option></option>
          <option v-for="s in students" :value="s._id">{{ s.first_name + ' ' + s.last_name + ' - ' + s.username }}</option>
        </select>
      </div>
      <div>
        <button class="mx-2 bg-green-600 text-white p-2" v-if="state.student_id" @click="savePerson">save</button>
        <button class="mx-2 bg-blue-800 text-white p-2" v-if="(state.prev !== -1)" @click="changePage(state.prev)">prev</button>
        <button class="mx-2 bg-blue-800 text-white p-2" v-if="(state.next !== -1)" @click="changePage(state.next)">next</button>
      </div>

    </div>
    <div v-for="item in posts">
      <post
        :title="item.title"
        :author="item.author"
        :content="item.content"
        :images="item.images"
      />
    </div>
  </div>
</template>

<script>
import Header from '~/components/Header';
import Post from '~/components/post';
export default {
  name: "student",
  components: {
    Post,
    Header
  }, async asyncData({$axios, route}) {
    let posts = []
    let res = await $axios.get(`/api/finder/articles/${route.query.i}`)
    console.log("group by texter")
    console.log(res)
    let state = {
      next: res.data.next,
      prev: res.data.prev,
      texter_id: res.data.texter_id,
      student_id: ""
    }
    // get all students
    let students = []
    res = await $axios.get(`/api/students/all`)
    console.log("all student")
    console.log(res)
    students = res.data;

    // find student by texter_id
    console.log("student by texter")
    res = await $axios.get(`/api/student/texter/${state.texter_id}`)
    console.log(res)
    if(res.data !== {}){
      state.student_id = res.data._id;
    }

    // find the posts
    res = await $axios.get(`/api/student/articles/${state.texter_id}`)
    console.log("posts")
    console.log(res)
    for (let i = 0; i < res.data.length; i++) {
      let post = res.data[i];
      let item = {}
      item.title = post.title;
      item.content = post.content;
      if(!post.user_id) {
        item.author = "ناشناس"
      } else {
        item.author = post.user_id.name;
      }
      item.images = []
      posts.push(item);
    }

    return{posts, state, students}
  }, methods: {
    async changePage(index) {
      await this.$router.push(`/assign?i=${index}`)
      setTimeout(function() {
        this.$nuxt.refresh()
      }, 1000)
    },
    async savePerson() {
      let res = await this.$axios.get(`/api/assign/${this.state.texter_id}/${this.state.student_id}`)
      console.log('save')
      console.log(res)
    }
  }
}
</script>

<style scoped>

</style>
