<script setup>
import { RouterLink, RouterView } from "vue-router";
import { supabase } from "./supabase";
import { useAuthStore } from "./stores/auth";
import { watchEffect } from "vue";
const auth = useAuthStore();

supabase.auth.onAuthStateChange((event, session) => {
  if (event == "SIGNED_IN") auth.setUser(session.user);
  if (event == "SIGNED_OUT") auth.clearUser();
});

watchEffect(async () => {
  console.log("getsesstion")
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { user } = session;

  // console.log(user);
});

async function logout() {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  } catch (error) {
    console.log(error);
  }
}
</script>

<template>
  <header>
    <div class="flex">
      <p class="text-5xl mr-12 ml-10 mt-6">Snack Paradice</p>
      <nav class="mt-10">
        <ul class="flex">
          <li>
            <RouterLink to="/">Home|</RouterLink>
          </li>
          <li>
            <RouterLink to="/about">About|</RouterLink>
          </li>
          <li>
            <RouterLink to="/cart">Cart|</RouterLink>
          </li>
          <li v-if="!auth.isLoggedIn">
            <RouterLink to="/login">Login|</RouterLink>
          </li>
          <li v-if="auth.isLoggedIn">
            <RouterLink to="/login" @click="logout">Logout|</RouterLink>
          </li>
        </ul>
      </nav>
      <!-- <pre>{{ supabase.auth.user() }}</pre> -->

      <p class="mt-10 ml-40 text-2xl" v-if="auth.isLoggedIn">
        Hello {{ auth.user.user_metadata.name }}!!
      </p>
    </div>
    <!-- <pre>{{ supabase.auth.user() }}</pre> -->
  </header>

  <RouterView />
</template>
