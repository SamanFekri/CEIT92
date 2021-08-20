<template>
  <div class="w-full h-full min-w-screen min-h-screen bg-cover bg-no-repeat bg-ceit-92 bg-fixed">
    <my-header/>
    <div class="flex flex-row-reverse flex-wrap justify-center mt-8 mb-0 w-10/12 mx-auto">
      <div v-for="student in students" class="md:w-1/5 w-full mb-8">
        <profile-item
          :name="student.name"
          :profile_image="student.image"
          :student_id="student.id"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ProfileItem from '~/components/profile-item';
import Header from '~/components/my-header';

export default {
  components: {
    ProfileItem,
    Header
  },
  async asyncData({$axios}) {
    let res = await $axios.get("/api/students");
    let students = [];
    console.log(res)
    if (res.status !== 200) {
      console.log(res)
      return
    }
    for (let i = 0; i < res.data.length; i++) {
      let student = {};
      student.name = `${res.data[i].first_name} ${res.data[i].last_name}`;
      student.id = res.data[i].username;
      if(res.data[i].photo) {
        student.image = res.data[i].photo;
      } else {
        student.image = 'https://image.flaticon.com/icons/png/512/3829/3829769.png';
      }

      students.push(student)
    }
    return { students }
  }
}
</script>
