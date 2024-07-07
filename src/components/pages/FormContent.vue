<script setup>
import { ref, onMounted } from 'vue'
import { reactive } from 'vue'
import Header from '../../components/Header.vue'
import api from '../../api/index.js'
import 'bootstrap/dist/css/bootstrap.css'
</script>

<template>
  <layout-div>
    <div class="row justify-content-md-center mt-5">
      <div class="col-12">
        <nav class="navbar navbar-expand-lg navbar-light bg-primary mb-4">
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
      </div>
      <div class="col-8">
        <div class="card">
          <div class="card-body">
            <h2 class="card-title text-3xl mb-4">Form Content</h2>
            <form>
              <div class="mb-3">
                <label htmlFor="title" class="form-label">Title </label>
                <input type="text" class="form-control" id="title" name="title" v-model="title" />
                <div v-if="validationErrors.title" class="flex flex-col">
                  <small class="text-danger">
                    {{ validationErrors?.title[0] }}
                  </small>
                </div>
              </div>
              <div class="mb-3">
                <label htmlFor="content" class="form-label">Content </label>
                <textarea class="form-control" id="content" name="content" v-model="content">
                </textarea>
                <div v-if="validationErrors.content" class="flex flex-col">
                  <small class="text-danger">
                    {{ validationErrors?.content[0] }}
                  </small>
                </div>
              </div>
              <div class="mb-3">
                <div>Status:</div>

                <input
                  type="radio"
                  name="status"
                  id="hidden"
                  class="form-check-input"
                  value="hidden"
                  v-model="picked"
                />
                <label for="hidden" class="ml-2 mr-4">Hidden</label>

                <input
                  type="radio"
                  name="status"
                  id="published"
                  class="form-check-input"
                  value="published"
                  v-model="picked"
                />
                <label for="published" class="ml-2 mr-4">Published</label>

                <div v-if="validationErrors.status" class="flex flex-col">
                  <small class="text-danger">
                    {{ validationErrors?.status[0] }}
                  </small>
                </div>
              </div>

              <div class="d-grid gap-2">
                <button
                  :disabled="isSubmitting"
                  @click="submitPost()"
                  type="button"
                  class="btn btn-primary btn-block"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </layout-div>
</template>

<script>
import axios from 'axios'
import LayoutDiv from '../LayoutDiv.vue'

const picked = ref('hidden')
export default {
  name: 'RegisterPage',
  components: {
    LayoutDiv
  },
  data() {
    return {
      title: '',
      content: '',
      status: '',
      validationErrors: {},
      isSubmitting: false
    }
  },
  created() {
    if (localStorage.getItem('token') != '' && localStorage.getItem('token') != null) {
      this.$router.push('/createContent')
    }
  },
  methods: {
    submitPost() {
      this.isSubmitting = true
      const headers = {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
      let payload = {
        title: this.title,
        content: this.content,
        status: picked.value
      }
      axios
        .post('http://localhost:8000/api/submitPost', payload, { headers })
        .then((response) => {
          if (response.data.status) {
            alert('success')
          }
          this.$router.push('/dashboard')
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
</script>
