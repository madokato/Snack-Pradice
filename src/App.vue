<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <header>
    <div class="flex">
      <p class="text-5xl mr-12 ml-10 mt-6">Snack Paradice</p>
      <nav class="mt-10">
        <RouterLink to="/">Home|</RouterLink>
        <RouterLink to="/about">About|</RouterLink>
        <RouterLink to="/cart">Cart|</RouterLink>
        <RouterLink to="/login">Login|</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>
