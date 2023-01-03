<script setup lang="ts">
import { onMounted } from "vue";
import { trpc } from "@/api/trpc";
import type { HelloMessage } from "@server/index";

onMounted(async () => {
  const test: HelloMessage = await trpc.test.hello.query({
    message: "joe",
  });
  console.log(test);
});
</script>

<template>
  <main>Hello</main>
</template>
