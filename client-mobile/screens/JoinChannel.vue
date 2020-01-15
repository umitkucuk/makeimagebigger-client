<template>
  <view class="container">
    <bar-code-scanner
      :onBarCodeScanned="handleBarCodeScanned"
      :barCodeTypes="[BarCodeScanner.Constants.BarCodeType.qr]"
      :style="StyleSheet.absoluteFillObject"
    />
  </view>
</template>

<script>
import * as React from 'react'
import { Text, View, StyleSheet, Button } from 'react-native'
import * as Permissions from 'expo-permissions'
import { BarCodeScanner } from 'expo-barcode-scanner'

export default {
  props: {
    navigation: { type: Object },
  },
  components: {
    BarCodeScanner,
  },
  mounted() {
    Permissions.askAsync(Permissions.CAMERA)
  },
  data() {
    return {
      StyleSheet: StyleSheet,
      BarCodeScanner: BarCodeScanner,
    }
  },
  methods: {
    handleBarCodeScanned(e) {
      this.joinChannel(e.data)
    },
    joinChannel(channelId) {
      this.navigation.navigate('Channel', { channelId })
    },
  },
}
</script>

<style>
.container {
  align-items: center;
  justify-content: center;
  flex: 1;
}
</style>
