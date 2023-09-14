<template>
  <video id="video" ref="video1" autoplay></video>
  <div
    class="title"
    :style="{
      color: { inactive: 'green', recording: 'red', paused: 'yellow' }[
        mediaState
      ]
    }"
  >
    {{ mediaState }}
    <span v-if="mediaState == 'inactive'">● 闲置中</span>
    <span v-if="mediaState == 'recording'">● 录制中</span>
    <span v-if="mediaState == 'paused'">● 已暂停</span>
    <el-button id="shootBtn">截图</el-button>
    <el-button @click="recorder" :disabled="mediaState !== 'inactive'">
      录制影像
    </el-button>
    <el-button @click="recorderCut" :disabled="mediaState != 'recording'">
      分片录制
    </el-button>
    <el-button :disabled="mediaState != 'recording'" @click="recorderStop">
      停止录制
    </el-button>
    <el-select
      v-model="deviceSelect"
      placeholder="Select"
    >
      <el-option
        v-for="item in devicesList"
        :key="item.deviceId"
        :label="item.label"
        :value="item.deviceId"
      />
    </el-select>
  </div>
  <div id="imageBox" v-for="(item, index) in imgList" :key="index">
    <img :src="item.src" alt="" />
  </div>
</template>

<script setup>
import Camera from './camera.js';
import { onMounted, ref, reactive } from 'vue';
const camera = ref(null);
onMounted(() => {
  console.log(video);
  camera.value = new Camera({
    video: video,
    width: 640,
    height: 480,
    onError: function (error) {
      alert(error);
    }
  });
  console.log(camera);
  getDevices().then((device) => (devicesList.value = device));
});
//影像录制相关
let mediaRecorder = reactive(null);
let mediaState = ref('inactive');

const recorder = async () => {
  mediaRecorder = await camera.value.play();
  console.log(mediaRecorder);
  if (mediaRecorder.state === 'inactive') {
    mediaRecorder.start();
  }
  mediaState.value = mediaRecorder.state;
};
//分段
const recorderCut = () => {
  mediaRecorder.requestData();
  mediaState.value = mediaRecorder.state;
};
//停止
const recorderStop = () => {
  mediaRecorder.stop();
  mediaState.value = mediaRecorder.state;
};
//下拉框影像列表
let devicesList = ref('');
const getDevices = async () => {
  let devices = await camera.value.enumDevices();
  return devices.filter((item) => item.kind == 'videoinput');
};
const deviceSelect = ref('');

const imgList = ref(null);
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
  .title {
    position: fixed;
    font-size: 18px;
  }
}
</style>
