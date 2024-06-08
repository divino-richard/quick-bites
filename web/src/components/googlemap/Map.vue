<script setup lang="ts">
import { GoogleMap, Marker } from 'vue3-google-map'

const emits = defineEmits(['locationChange']);

const { center } = defineProps({
  center: {
    type: Object,
    require: true
  }
})
const MAP_API_KEY = import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY;

const handleLocationChange = (data: any) => {
  const location = {
    lat: data.latLng.lat(),
    lng: data.latLng.lng()
  }
  emits('locationChange', location);
}
</script>

<template>
  <GoogleMap
    :api-key="MAP_API_KEY"
    style="width: 100%; height: 300px"
    :center="center"
    :zoom="15"
  >
    <Marker 
      :options="{ 
        position: center, 
        draggable: true, 
      }" 
      @dragend="handleLocationChange" 
    />
  </GoogleMap>
</template>