

<template>
  <div class="common-layout">
    <el-container>
      <el-header>Header</el-header>
      <el-container>
        <el-aside width="300px">
          <aside-box></aside-box>
        </el-aside>
        <el-container>
          <el-main><cameraView /></el-main>
          <el-footer>Footer</el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>
<script setup>
import cameraView from './camera-view.vue';
import asideBox from './aside-box.vue';
import { onMounted } from 'vue';
import { useCameraStore } from '../stores/localCamera';
onMounted(() => {
  useCameraStore().getState();
});
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.common-layout {
  .el-header,
  .el-footer {
    background-color: var(--el-color-primary-light-7);
    color: var(--el-text-color-primary);
  }

  .el-aside {
    background-color: var(--el-color-primary-light-8);
    color: var(--el-text-color-primary);
    padding: 8px;
  }

  .el-main {
    background-color: var(--el-color-primary-light-9);
    color: var(--el-text-color-primary);
    padding: 8px;
  }
}
</style>