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
      <div class="col-8">
        <div class="card">
          <div class="card-body">
            <h2 class="card-title mb-4">Register</h2>
            <form>
              <div class="mb-3">
                <label htmlFor="name" class="form-label">Name </label>
                <input type="text" class="form-control" id="name" name="name" v-model="name" />
                <div v-if="validationErrors.name" class="flex flex-col">
                  <small class="text-danger">
                    {{ validationErrors?.name[0] }}
                  </small>
                </div>
              </div>
              <div class="mb-3">
                <label htmlFor="email" class="form-label">Email address </label>
                <input type="email" class="form-control" id="email" name="email" v-model="email" />
                <div v-if="validationErrors.email" class="flex flex-col">
                  <small class="text-danger">
                    {{ validationErrors?.email[0] }}
                  </small>
                </div>
              </div>
              <div class="mb-3">
                <label htmlFor="password" class="form-label">Password </label>
                <input
                  type="password"
                  class="form-control"
                  id="password"
                  name="password"
                  v-model="password"
                />
                <div v-if="validationErrors.password" class="flex flex-col">
                  <small class="text-danger">
                    {{ validationErrors?.password[0] }}
                  </small>
                </div>
              </div>
              <div class="mb-3">
                <label htmlFor="confirm_password" class="form-label">Confirm Password </label>
                <input
                  type="password"
                  class="form-control"
                  id="confirm_password"
                  name="confirm_password"
                  v-model="confirmPassword"
                />
              </div>
              <div class="d-grid gap-2">
                <button
                  :disabled="isSubmitting"
                  @click="registerAction()"
                  type="button"
                  class="btn btn-primary btn-block"
                >
                  Register Now
                </button>
                <p class="text-center">
                  Have already an account
                  <span class="text-gray-900 cursor-pointer" @click="$router.push('/login')"
                    >Login here</span
                  >
                </p>
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

export default {
  name: 'RegisterPage',
  components: {
    LayoutDiv
  },
  data() {
    return {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      validationErrors: {},
      isSubmitting: false
    }
  },
  created() {
    if (localStorage.getItem('token') != '' && localStorage.getItem('token') != null) {
      this.$router.push('/dashboard')
    }
  },
  methods: {
    registerAction() {
      this.isSubmitting = true
      let payload = {
        name: this.name,
        email: this.email,
        password: this.password,
        password_confirmation: this.confirmPassword
      }
      axios
        .post('http://localhost:8000/api/auth/register', payload)
        .then((response) => {
          if (response.data.status) {
            alert('success, silahkan login kembali')
          }
          localStorage.setItem('token', response.data.token)
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
    // registerAction() {
    //   this.isSubmitting = true
    //   const requestOptions = {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({
    //       name: this.name,
    //       email: this.email,
    //       password: this.password,
    //       password_confirmation: this.confirmPassword
    //     })
    //   }
    //   fetch('http://localhost:8000/api/auth/register', requestOptions)
    //     .then(async (response) => {
    //       const data = await response.json()
    //       console.log(data)
    //       // check for error response
    //       if (!response.ok) {
    //         // get error message from body or default to response status
    //         const error = (data && data.message) || response.status
    //         return Promise.reject(error)
    //       }

    //       this.postId = data.id
    //     })
    //     .catch((error) => {
    //       this.errorMessage = error
    //       console.error('There was an error!', error)
    //     })
    // }
  }
}
</script>
