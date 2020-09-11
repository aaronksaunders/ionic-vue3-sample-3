<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Uploaded Files</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="doLogout">LOGOUT</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding" :fullscreen="true">
      <ion-refresher slot="fixed" @ionRefresh="doRefresh($event)">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>
      <ion-list>
        <ion-item-sliding v-for="(item) in files" :key="item.name">
          <ion-item style="--padding-start:0px">
            <ion-label class="ion-text-wrap">
              <div>{{item.name.split("\\")[1] }}</div>
              <!-- <a :href="item.url">view</a> -->
              <ion-button
                @click="router.push('/image-detail/' +encodeURIComponent(item.url))"
              >VIEW ITEM</ion-button>
            </ion-label>
          </ion-item>
          <ion-item-options side="end">
            <ion-item-option color="danger" @click="doDelete(item)">
              <ion-icon size="large" :icon="trashBinOutline"></ion-icon>
            </ion-item-option>
          </ion-item-options>
        </ion-item-sliding>
      </ion-list>
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
  IonLabel,
  IonItem,
  IonRefresher,
  IonRefresherContent,
  IonButton,
  IonButtons,
} from "@ionic/vue";
import { defineComponent } from "vue";
import useFirebaseFileUpload from "../hooks/firebase-file-upload";
import useFirebaseAuth from "../hooks/firebase-auth";
import { useRouter } from "vue-router";
import { trashBinOutline } from "ionicons/icons";

export default defineComponent({
  name: "AllUploads",
  components: {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonLabel,
    IonItem,
    IonRefresher,
    IonRefresherContent,
    IonButton,
    IonButtons,
  },
  setup() {
    const { files, listFiles, deleteFile } = useFirebaseFileUpload();
    const { userData, logout } = useFirebaseAuth();
    const router = useRouter();

    const doDelete = async (item: any) => {
      await deleteFile(item.name);
      await listFiles();
    };
    /**
     *
     */
    const doLogout = async () => {
      await logout();
      router.options.scrollBehavior;
      router.replace({ name: "login", replace: true });
    };

    /**
     *
     */
    const doRefresh = async (event: any) => {
      await listFiles();
      console.log("complete..");
      await event.target.complete();
    };
    return {
      files,
      doRefresh,
      router,
      userData,
      doLogout,
      doDelete,
      trashBinOutline,
    };
  },
});
</script>

<style scoped>
</style>