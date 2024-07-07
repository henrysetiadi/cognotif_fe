<script setup>
import { ref, onMounted } from 'vue'
import { reactive } from 'vue'
import Header from '../components/Header.vue'
import api from '../api/index.js'
import 'bootstrap/dist/css/bootstrap.css'
import LayoutDiv from '../components/LayoutDiv.vue'

const isLoading = ref(true)
const posts = ref([])
const postsChanged = ref([])

const fetchDataPosts = async () => {
  await api.get('/api/welcomePage').then((response) => {
    posts.value = response.data.data.response
  })
}

onMounted(() => {
  fetchDataPosts()
  isLoading.value = false
})
</script>

<template>
  <layout-div>
    <div class="Home">
      <div class="row justify-content-md-center">
        <div class="col-12">
          <nav class="navbar navbar-expand-lg navbar-light bg-primary mt-4">
            <div class="container-fluid">
              <span
                class="flex items-center gap-x-1 text-lg font-semibold btn my-2 my-sm-0 mr-4 text-slate-100"
                >&nbsp;</span
              >
              <div class="d-flex">
                <ul class="navbar-nav">
                  <li class="nav-item">
                    <span
                      class="flex items-center gap-x-1 text-lg font-semibold cursor-pointer btn my-2 my-sm-0 mr-4 text-slate-100"
                      @click="$router.push('/login')"
                    >
                      Login
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </div>

      <div class="container mx-auto my-8">
        <div v-if="isLoading">Loading..</div>
        <div v-if="posts.length == 0" class="border border-slate-500 mb-3 text-blue-900">
          Data Not Available
        </div>
        <div
          v-else
          class="PostItem border border-slate-500 mb-3 cursor-pointer"
          v-for="(item, itemIndex) in posts"
          :key="itemIndex"
        >
          <h1 class="text-blue-900 text-3xl font-bold mt-2 ml-4">{{ item.title }}</h1>
          <div class="row">
            <div class="col-sm-6">
              <span class="text-sm text-slate-400 mb-2 ml-4">{{ item.publishedDate }}</span>
              <span class="text-sm text-rose-600 mb-2 ml-4"
                ><i>created by {{ item.author }}</i></span
              >
            </div>
          </div>
          <p class="text-lg text-slate-600 mb-2 ml-4">{{ item.content }}</p>
        </div>
      </div>
    </div>
  </layout-div>
</template>
