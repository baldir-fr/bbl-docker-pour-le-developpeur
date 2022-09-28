<script lang="ts" setup>
import api from "@/http/api"
import {ref} from "vue";

const data = ref("")
const error = ref("")
const fetchProtectedData = () => {
  api.get("/protected/data").then((response) => {
    data.value = response.data
  }).catch((httpError) => {
    error.value = httpError.toJSON()
  })
}


</script>

<template>
  <header>
    <nav>
      <ul>
        <li>
          <router-link to="/">Home</router-link>
        </li>
        <li>
          <router-link to="lh">Learning hour</router-link>
        </li>
      </ul>
    </nav>
  </header>
  <main>
    <div>
      <button @click="fetchProtectedData">Fetch protected Data</button>
      <hr/>
      <label>Data :</label>
      <p>{{ data }}</p>
      <hr/>
      <label>Error :</label>
      <p>
        {{ error }}
      </p>
    </div>
    <router-view/>
  </main>
</template>
