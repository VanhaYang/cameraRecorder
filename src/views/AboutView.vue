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
    <span v-if="mediaState == 'inactive'">● 闲置</span>
    <span v-if="mediaState == 'recording'">● 录制中</span>
    <span v-if="mediaState == 'paused'">● 已暂停</span>
    <!-- <el-button id="shootBtn">截图</el-button> -->
    <!-- <el-button @click="recorder" :disabled="mediaState !== 'inactive'">
      录制影像
    </el-button> -->
    <el-dropdown @command="recorder" :disabled="mediaState !== 'inactive'">
      <el-button type="primary" :disabled="mediaState !== 'inactive'">
        录制影像<el-icon class="el-icon--right"><arrow-down /></el-icon>
      </el-button>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="video/webm;codecs=vp9"
            >vp9</el-dropdown-item
          >
          <el-dropdown-item command="video/webm;codecs=h264"
            >h264</el-dropdown-item
          >
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <el-button @click="recorderCut" :disabled="mediaState != 'recording'">
      分片
    </el-button>
    <el-button :disabled="mediaState != 'recording'" @click="recorderStop">
      停止录制
    </el-button>
    <el-select v-model="deviceSelect" placeholder="Select" @change="shoot">
      <el-option
        v-for="item in devicesList"
        :key="item.id"
        :label="item.label"
        :value="item.id"
      />
    </el-select>
  </div>
  <div id="imageBox" v-for="(item, index) in imgList" :key="index">
    <img :src="item.src" alt="" />
  </div>
</template>

<script setup>
import Camera from './camera.js';
import { ArrowDown } from '@element-plus/icons-vue';
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
  getDevices().then((device) => {
    console.log(device);
    devicesList.value = device;
    if (device.length > 0) {
      deviceSelect.value = device[0].id;
    }
  });
});
//影像录制相关
let mediaRecorder = reactive(null);
let mediaState = ref('inactive');

const recorder = async (mimeType) => {
  mediaRecorder = await camera.value.play(mimeType);
  console.log(mimeType);
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
const deviceSelect = ref('');
const getDevices = async () => {
  let devices = await camera.value.enumDevices();
  return devices;
};
const shoot = (cameraDeviceId) => {
  camera.value.shoot({ deviceId: cameraDeviceId });
};

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
