<script setup lang="ts">
import Map from './Map.vue';
import { Loader } from "@googlemaps/js-api-loader"
import { onMounted, ref } from "vue";
import { Input } from '../ui/input';

const emits = defineEmits(['changeCenter', 'changePlace']);

const center = ref({ lat: 14.599512, lng: 120.984222 });

const defaultBounds = {
  north: center.value.lat + 0.1,
  south: center.value.lat - 0.1,
  east: center.value.lng + 0.1,
  west: center.value.lng - 0.1,
};

const options = {
  bounds: defaultBounds,
  types: ["establishment"],
  componentRestrictions: { country: "ph" },
  fields: ["address_components", "formatted_address", "geometry", "icon", "name"],
  strictBounds: false,
};

onMounted(async () => {
  const loader = new Loader({
    apiKey: import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY,
    version: "weekly",
  });
  const input = document.getElementById("place");
  const Places = await loader.importLibrary('places')

  const autocomplete = new Places.Autocomplete(input, options);

  autocomplete.addListener('place_changed', () => {
    const place = autocomplete.getPlace();
    const { location } = place.geometry;
    const latLng = {
      lat: location.lat(),
      lng: location.lng()
    }
    center.value = latLng;
    emits('changeCenter', latLng)
    emits('changePlace', place);
  });
});
</script>

<template>
  <div class="space-y-2">
    <Input id="place" type="text" placeholder="Find address" />
    <Map
      :center="center"
      @locationChange="(location) => emits('changeCenter', location)"
    />
  </div>
</template>