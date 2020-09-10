<template>
  <ion-app>
    <div v-if="initialized">
      <ion-router-outlet />
    </div>
    <div v-else>
      <ion-page>
      <ion-loading animated=true></ion-loading>
      </ion-page>
    </div>
  </ion-app>
</template>

<script lang="ts">
import { IonApp, IonRouterOutlet, IonLoading } from "@ionic/vue";
import { defineComponent } from "vue";
import useFirebaseAuth from "./hooks/firebase-auth";

export default defineComponent({
  name: "App",
  components: {
    IonApp,
    IonRouterOutlet,
    IonLoading,
  },
  setup() {
    const { initialized } = useFirebaseAuth();
    return {
      initialized,
    };
  },
});
</script>