<script setup>
import { ref, onMounted } from 'vue'
import { reactive } from 'vue'
import Header from '../../components/Header.vue'
import api from '../../api/index.js'
import 'bootstrap/dist/css/bootstrap.css'

const isLoading = ref(true)
const posts = ref([])

const headers = {
  'Content-Type': 'application/json',
  Authorization: 'Bearer ' + localStorage.getItem('token')
}
fetch('http://localhost:8000/api/content', { headers })
  .then((response) => response.json())
  .then((data) => (posts.value = data.data.response))

onMounted(() => {
  isLoading.value = false
})
</script>
<template>
  <layout-div>
    <div class="row justify-content-md-center">
      <div class="col-12">
        <nav class="navbar navbar-expand-lg navbar-light bg-primary mt-4">
          <div class="container-fluid">
            <span
              class="flex items-center gap-x-1 text-lg font-semibold cursor-pointer btn my-2 my-sm-0 mr-4 text-slate-100"
              @click="$router.push('/dashboard')"
              >Dashboard</span
            >
            <span
              class="flex items-center gap-x-1 text-lg font-semibold cursor-pointer btn my-2 my-sm-0 mr-4 text-slate-100"
              @click="$router.push('/content')"
              >Content</span
            >
            <div class="d-flex">
              <ul class="navbar-nav">
                <li class="nav-item">
                  <span
                    class="flex items-center gap-x-1 text-lg font-semibold cursor-pointer btn my-2 my-sm-0 mr-4 text-slate-100"
                    @click="logoutAction()"
                  >
                    Logout
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <h2 class="text-center text-xl mt-5">Welcome, {{ user?.name }}</h2>

        <div class="container mx-auto my-8">
          <div v-if="isLoading">Loading..</div>
          <button type="button" class="btn btn-dark mb-4" @click="$router.push('/createContent')">
            Add Content
          </button>
          <div v-if="posts.length == 0" class="border border-slate-500 mb-3 text-blue-900">
            Data Not Available
          </div>
          <div
            v-else
            class="PostItem border border-slate-500 mb-3"
            v-for="(item, itemIndex) in posts"
            :key="itemIndex"
          >
            <h1
              class="text-blue-900 text-3xl font-bold mt-2 ml-4 cursor-pointer"
              @click="showDetailContent(item.id)"
            >
              {{ item.title }}
            </h1>
            <div class="row">
              <div class="col-sm-6">
                <span class="text-sm text-slate-400 mb-2 ml-4">{{ item.publishedDate }}</span>
                <span class="text-sm text-rose-600 mb-2 ml-4"
                  ><i>created by {{ item.author }}</i></span
                >
              </div>
              <div class="col-sm-2">&nbsp;</div>
              <div class="col-sm-2">
                <span class="text-sm text-emerald-800 mb-2 ml-4"
                  ><i>{{ item.status }}</i></span
                >
              </div>
              <div class="col-sm-1">
                <span class="cursor-pointer" @click="getDataContent(item.id)">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-pencil"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325"
                    />
                  </svg>
                </span>
              </div>
              <div class="col-sm-1">
                <span class="cursor-pointer" @click="deletePost(item.id)">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-trash"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"
                    />
                    <path
                      d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"
                    />
                  </svg>
                </span>
              </div>
            </div>
            <p class="text-lg text-slate-600 mb-2 ml-4">{{ item.content }}</p>
          </div>
        </div>
      </div>
    </div>
  </layout-div>
</template>

<script>
import axios from 'axios'
import LayoutDiv from '../LayoutDiv.vue'

export default {
  name: 'DashboardPage',
  components: {
    LayoutDiv
  },
  data() {
    return {
      user: {}
    }
  },
  created() {
    //this.getUser()
    if (
      localStorage.getItem('token') == '' ||
      localStorage.getItem('token') == null ||
      localStorage.getItem('token') == 'undefined'
    ) {
      localStorage.setItem('token', '')
      this.$router.push('/')
    } else {
      this.getUser()
    }
  },
  methods: {
    getUser() {
      axios
        .get('http://localhost:8000/api/auth/me', {
          headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
        })
        .then((r) => {
          this.user = r.data
          return r
        })
        .catch((e) => {
          return e
        })
    },

    logoutAction() {
      axios
        .get('http://localhost:8000/api/auth/logout', {
          headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
        })
        .then((r) => {
          localStorage.setItem('token', '')
          this.$router.push('/')
          return r
        })
        .catch((e) => {
          localStorage.setItem('token', '')
          this.$router.push('/')
          return e
        })
    },
    showDetailContent(number) {
      this.$router.push('/detailContent/' + number)
    },

    getDataContent(number) {
      this.$router.push('/getContent/' + number)
    },

    deletePost(number) {
      if (confirm('Do you really want to delete?')) {
        const headers = {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
        console.log(number)
        let payload = {
          post_id: number
        }
        axios
          .post('http://localhost:8000/api/deleteContent', payload, { headers })
          .then((response) => {
            if (response.data.status) {
              alert('success')
            }
            this.$router.push('/dashboard')
            location.reload()
            return response
          })
          .catch((error) => {
            this.isSubmitting = false
            if (error.response.data.errors != undefined) {
              this.validationErrors = error.response.data.errors
            }
            return error
          })
      }
    }
  }
}
</script>
