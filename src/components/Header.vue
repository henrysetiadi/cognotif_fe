<script setup>
import 'bootstrap/dist/css/bootstrap.css'
</script>
<template>
  <header class="text-center text-blue-900">
    <h1 class="text-6xl font-bold mb-8 cursor-pointer" @click="$router.push('/')">
      Simplicity Blog
    </h1>
    <p class="text-3xl text-slate-400">A blog with posts</p>
  </header>
</template>
