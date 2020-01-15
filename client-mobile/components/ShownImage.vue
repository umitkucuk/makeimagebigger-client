<template>
  <view class="main-image">
    <image
      :style="{
        width: null,
        height: height-300,
        resizeMode: 'stretch'
      }"
      :source="{ uri: image }"
    />
  </view>
</template>

<script>
import { Dimensions, Image } from 'react-native'

const HEIGHT = Dimensions.get('window').height

export default {
  props: {
    image: { type: String },
  },
  components: {},
  created() {},
  data() {
    return {
      height: HEIGHT,
    }
  },
  methods: {},
  watch: {},
}
</script>

<style>
.main-image {
  display: flex;
  margin-bottom: 10;
}
</style>
