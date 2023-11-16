<script setup lang="ts">
import Scence from "../components/Scence.vue";
</script>

<template>
  <div class="inline-flex w-full">
    <div class="flex-initial w-9/12 h-screen">
      <Suspense>
        <Scence />
      </Suspense>
    </div>
    <div class="flex-initial w-3/12 h-screen"></div>
  </div>
</template>
