<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Blank</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" class="ion-padding">
      <div v-if="loading">
        <!-- <span>{{progress}}</span> -->
        <div :style="progressBarStyleCalc"></div>
      </div>
      <div v-else-if="error">{{error}}</div>

      <ion-card>
        <ion-card-header>
          <h2>This is the Camera Page</h2>
        </ion-card-header>
        <ion-card-content>
          <div>Showing the use of the Capacitor Camera plugin and the vue-router for changing pages in the application</div>
          <div v-if="imageUrl" class="image-wrapper">
            <img :src="imageUrl ? imageUrl.dataUrl : null" />
          </div>

          <ion-toolbar>
            <ion-button slot="start" @click="takePicture()">Take Picture Now</ion-button>
            <ion-button slot="end" @click="uploadImage()">UPLOAD</ion-button>
          </ion-toolbar>
        </ion-card-content>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  toastController,
} from "@ionic/vue";

import {
  Plugins,
  CameraSource,
  CameraResultType,
  CameraPhoto,
} from "@capacitor/core";
const { Camera } = Plugins;

import { defineComponent, ref, computed } from "vue";

import useFirebaseFileUpload from "../hooks/firebase-file-upload";

export default defineComponent({
  name: "Home",
  components: {
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonButton,
  },
  setup() {
    const {
      uploadData,
      loading,
      progress,
      error,
      resultData,
    } = useFirebaseFileUpload();

    const imageUrl = ref<CameraPhoto | null>();

    /**
     *
     */
    const handleToast = (message: string, isError = false) => {
      toastController
        .create({
          message: message,
          position: "top",
          color: isError ? "danger" : "primary",
          duration: 2000,
        })
        .then((t) => t.present());
    };

    /**
     * used to calculate the progress bar when
     * uploading the file
     */
    const progressBarStyleCalc = computed(() => {
      return {
        width: progress.value * 100 + "%",
        "background-color": "red",
        height: "4px",
      };
    });

    /**
     * tries to upload the image to firebase using
     * the composition api function uploadData
     */
    const uploadImage = async () => {
      if (!imageUrl?.value) return;

      try {
        const name = new Date().getTime() + "." + imageUrl.value.format;
        const { dataUrl = "", path = name } = imageUrl?.value;

        const r = await uploadData(dataUrl, path);
        console.log(r);

        handleToast("File Uploaded!!", false);
        imageUrl.value = null;
        
        return r;
      } catch (error) {
        console.log(error);
        handleToast(error.message, true);
      }
    };

    /**
     * takes the picture, return CameraPhoto | Error
     */
    const takePicture = async (): Promise<CameraPhoto | Error> => {
      // Otherwise, make the call:
      try {
        const image = await Camera.getPhoto({
          quality: 100,
          allowEditing: true,
          resultType: CameraResultType.DataUrl,
          source: CameraSource.Prompt,
        });

        // image.base64_data will contain the base64 encoded result as
        // a JPEG, with the data-uri prefix added
        imageUrl.value = image;
        return image;
      } catch (e) {
        handleToast("User Cancelled!", true);
        return e;
      }
    };

    return {
      // functions
      takePicture,
      uploadImage,
      uploadData,

      // properties
      imageUrl,
      loading,
      progress,
      error,
      resultData,
      progressBarStyleCalc,
    };
  },
});
</script>

<style scoped>
.image-wrapper {
  text-align: center;
  height: 210px;
  padding: 6px;
  background: whitesmoke;
}
img {
  object-fit: contain;
  height: 200px !important;
}
</style>