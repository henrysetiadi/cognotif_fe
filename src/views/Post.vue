<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()

const post = store.posts.find((x) => x.id === parseInt(route.params.id))
</script>
<template>
  <div class="container mx-auto my-8">
    <div class="Post border-slate-400 text-center mt-8">
      <h1 class="text-3xl font-bold mb-2">{{ post.title }}</h1>
      <p class="text-sm text-slate-400 mb-2">{{ post.date }}</p>
      <p class="text-xl text-slate-400">{{ post.description }}</p>
    </div>
  </div>
</template>
