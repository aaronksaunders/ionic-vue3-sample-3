<template>
  <ion-page>
    <ion-content>
      <ion-tabs>
        <ion-tab-bar slot="bottom">
          <ion-tab-button tab="list" href="/tabs/list">
            <ion-icon :icon="imageOutline" />
            <ion-label>List All</ion-label>
          </ion-tab-button>

          <ion-tab-button tab="upload" href="/tabs/upload">
            <ion-icon :icon="cloudOutline" />
            <ion-label>Upload</ion-label>
          </ion-tab-button>

          <ion-tab-button tab="geolocation" href="/tabs/geolocation">
            <ion-icon :icon="locateOutline" />
            <ion-label>Location</ion-label>
          </ion-tab-button>
        </ion-tab-bar>
      </ion-tabs>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonContent,
  IonLabel,
  IonIcon,
  IonPage,
} from "@ionic/vue";
import { cloudOutline, imageOutline, locateOutline } from "ionicons/icons";

export default {
  name: "Tabs",
  components: {
    IonContent,
    IonLabel,
    IonTabs,
    IonTabBar,
    IonTabButton,
    IonIcon,
    IonPage,
  },
  setup() {
    return {
      cloudOutline,
      imageOutline,
      locateOutline,
    };
  },
};
</script>