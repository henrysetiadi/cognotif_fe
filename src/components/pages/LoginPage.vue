<script setup>
import { ref, onMounted } from 'vue'
import { reactive } from 'vue'
import Header from '../../components/Header.vue'
import api from '../../api/index.js'
import 'bootstrap/dist/css/bootstrap.css'
</script>

<template>
  <div class="container2 mx-auto my-8">
    <div class="card">
      <div class="card-body">
        <h2 class="text-3xl mb-4">Sign In</h2>
        <form>
          <p v-if="Object.keys(validationErrors).length != 0" class="text-center">
            <small class="text-danger">Incorrect Email or Password</small>
          </p>
          <div class="mb-3">
            <label htmlFor="email" class="form-label"> Email address </label>
            <br />
            <input v-model="email" type="email" class="form-control" id="email" name="email" />
          </div>
          <div class="mb-3">
            <label htmlFor="password" class="form-label">Password </label>
            <br />
            <input
              v-model="password"
              type="password"
              class="form-control"
              id="password"
              name="password"
            />
          </div>
          <div class="d-grid gap-2">
            <button
              :disabled="isSubmitting"
              @click="loginAction()"
              type="button"
              class="btn btn-primary btn-block"
            >
              Login
            </button>
            <p class="text-center">
              Don't have account?
              <span class="text-gray-900 cursor-pointer" @click="$router.push('/register')"
                >Register here
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import LayoutDiv from '../LayoutDiv.vue'
export default {
  name: 'LoginPage',
  components: {
    LayoutDiv
  },
  data() {
    return {
      email: '',
      password: '',
      validationErrors: {},
      isSubmitting: false
    }
  },
  created() {
    if (
      localStorage.getItem('token') != '' &&
      localStorage.getItem('token') != null &&
      localStorage.getItem('token') != 'undefined'
    ) {
      this.$router.push('/dashboard')
    } else {
      localStorage.setItem('token', '')
    }
  },
  methods: {
    loginAction() {
      this.isSubmitting = true
      let payload = {
        email: this.email,
        password: this.password
      }
      axios
        .post('http://localhost:8000/api/auth/login', payload)
        .then((response) => {
          localStorage.setItem('token', response.data.data.token.original.access_token)
          this.$router.push('/dashboard')
          return response
        })
        .catch((error) => {
          console.log(error)
          this.isSubmitting = false
          if (error.response.data.errors != 'undefined') {
            this.validationErrors = error.response.data.errors
          }
          if (error.response.data.error != 'undefined') {
            this.validationErrors = error.response.data.error
          }
          return error
        })
    }
  }
}
</script>
