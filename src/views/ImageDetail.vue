<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button />
        </ion-buttons>
        <ion-title>Image Detail</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" class="ion-padding">
      <ion-img :src="url"></ion-img>
      </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonImg
} from "@ionic/vue";
import { defineComponent } from "vue";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "ImageDetail",
  components: {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonImg
  },
  setup() {
    debugger;
    const r = useRoute();
    const url = r.params["url"];
    return { url };
  },
});
</script>

<style scoped>
</style>