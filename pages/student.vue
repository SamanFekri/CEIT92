<template>
  <div class="w-full h-full min-w-screen min-h-screen bg-cover bg-no-repeat bg-ceit-92 bg-fixed">
    <my-header/>
    <profile-card
      :name="profile.name"
      :student_id="profile.id"
      :profile_image="profile.image"
      :message="profile.message"
    />
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
import Header from '~/components/my-header';
import ProfileCard from '~/components/profile-card';
import Post from '~/components/post';
export default {
  name: "student",
  components: {
    Post,
    ProfileCard,
    Header
  }, async asyncData({$axios, route}) {
    let imageNotFound = "https://image.flaticon.com/icons/png/256/2659/2659360.png";
    let posts = []

    let profile = {
      name: "This Student Not Found",
      id: "404",
      image: "https://image.flaticon.com/icons/png/512/3829/3829769.png"
    }
    if(!route.query.id) {
      return {
        profile
      }
    }

    // find the student
    let res = await $axios.get(`/api/student/${route.query.id}`)
    console.log(res)

    profile.name = `${res.data.first_name} ${res.data.last_name}`;
    profile.id = res.data.username;
    if(res.data.photo) {
      profile.image = res.data.photo;
    } else {
      profile.image = 'https://image.flaticon.com/icons/png/512/3829/3829769.png';
    }
    if(!res.data.user_id) {
      profile.message = 'خاطرات شما در دیتابیس هست ولی متاسفانه هنوز پیداتون نکردیم'
      return {profile}
    }

    // find the posts
    res = await $axios.get(`/api/student/articles/${res.data.user_id}`)
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
      item.images = [];
      if(post.picture !== "-1") {
        item.images = [imageNotFound];
      }
      posts.push(item);
    }

    return {
      profile,
      posts
    }
  }
}
</script>

<style scoped>

</style>
