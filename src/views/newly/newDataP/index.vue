<template>
  <div
    id="scene-container"
    ref="sceneContainer"
    style="width: 100%; height: calc(100vh - 84px)"
  ></div>
</template>

<!-- <script>
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"; // 引入GLTFLoader
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export default {
  name: "ThreeModelViewer",
  mounted() {
    this.initThree();
  },
  methods: {
    initThree() {
      const width = this.$refs.sceneContainer.clientWidth;
      const height = this.$refs.sceneContainer.clientHeight;

      // 初始化场景
      this.scene = new THREE.Scene();
      this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
      this.camera.position.z = 20; // 设置相机位置

      // 渲染器
      this.renderer = new THREE.WebGLRenderer({ antialias: true });
      this.renderer.setSize(width, height);
      this.renderer.setClearColor(0xeeeeee, 1); // 设置淡灰色背景
      this.$refs.sceneContainer.appendChild(this.renderer.domElement);

      // 添加光源
      const directionalLight = new THREE.DirectionalLight(0xffffff, 1); // 添加方向光
      directionalLight.position.set(1, 1, 1).normalize();
      this.scene.add(directionalLight);

      // 初始化轨道控制器
      this.controls = new OrbitControls(this.camera, this.renderer.domElement);
      this.controls.enableDamping = true;
      this.controls.dampingFactor = 0.25;

      // 加载 .glb 模型
      const gltfLoader = new GLTFLoader(); // 使用GLTFLoader
      gltfLoader.load(
        "/threeD/ac.glb", // 确保文件路径和文件名正确
        (gltf) => {
          console.log("Model loaded", gltf);
          gltf.scene.position.set(10, 10, 10); // 模型放置位置
          gltf.scene.scale.set(1, 1, 1); // 调整模型缩放（根据需要调整缩放比例）
          this.scene.add(gltf.scene);
          this.animate();
        },
        undefined,
        (error) => {
          console.error("模型加载失败:", error);
        }
      );

      // 窗口大小变化监听
      window.addEventListener("resize", () => {
        const width = this.$refs.sceneContainer.clientWidth;
        const height = this.$refs.sceneContainer.clientHeight;
        this.renderer.setSize(width, height);
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
      });

      this.animate();
    },
    animate() {
      requestAnimationFrame(() => this.animate());
      this.controls.update();
      this.renderer.render(this.scene, this.camera);
    },
  },
};
</script> -->

<!--<script>
import * as THREE from "three";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader"; // 引入FBXLoader
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export default {
  name: "ThreeModelViewer",
  mounted() {
    this.initThree();
  },
  methods: {
    initThree() {
      const width = this.$refs.sceneContainer.clientWidth;
      const height = this.$refs.sceneContainer.clientHeight;

      // 初始化场景
      this.scene = new THREE.Scene();
      this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
      this.camera.position.z = 20; // 设置相机位置

      // 渲染器
      this.renderer = new THREE.WebGLRenderer({ antialias: true });
      this.renderer.setSize(width, height);
      this.renderer.setClearColor(0xeeeeee, 1); // 设置淡灰色背景
      this.$refs.sceneContainer.appendChild(this.renderer.domElement);

      // 添加光源
      const directionalLight = new THREE.DirectionalLight(0xffffff, 1); // 添加方向光
      directionalLight.position.set(1, 1, 1).normalize();
      this.scene.add(directionalLight);

      // 初始化轨道控制器
      this.controls = new OrbitControls(this.camera, this.renderer.domElement);
      this.controls.enableDamping = true;
      this.controls.dampingFactor = 0.25;

      // 加载 .fbx 模型
      const fbxLoader = new FBXLoader(); // 使用FBXLoader
      fbxLoader.load(
        "/threeD/11.fbx", // 确保文件路径和文件名正确
        (obj) => {
          console.log("Model loaded", obj);
          obj.position.set(0, 0, 0); // 模型放置位置
          obj.scale.set(0.001, 0.001, 0.001); // 调整模型缩放（根据需要调整缩放比例）
          this.scene.add(obj);
          this.animate();
        },
        undefined,
        (error) => {
          console.error("模型加载失败:", error);
        }
      );

      // 窗口大小变化监听
      window.addEventListener("resize", () => {
        const width = this.$refs.sceneContainer.clientWidth;
        const height = this.$refs.sceneContainer.clientHeight;
        this.renderer.setSize(width, height);
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
      });

      this.animate();
    },
    animate() {
      requestAnimationFrame(() => this.animate());
      this.controls.update();
      this.renderer.render(this.scene, this.camera);
    },
  },
};-->

<script>
import * as THREE from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader"; // 引入OBJLoader
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export default {
  name: "ThreeModelViewer",
  mounted() {
    this.initThree();
  },
  methods: {
    initThree() {
      const width = this.$refs.sceneContainer.clientWidth;
      const height = this.$refs.sceneContainer.clientHeight;

      // 初始化场景
      this.scene = new THREE.Scene();
      this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
      this.camera.position.z = 20; // 设置相机位置

      // 渲染器
      this.renderer = new THREE.WebGLRenderer({ antialias: true });
      this.renderer.setSize(width, height); // 设置渲染器大小
      this.renderer.setClearColor(0xeeeeee, 1); // 设置淡灰色背景
      this.$refs.sceneContainer.appendChild(this.renderer.domElement); // 添加渲染器到页面

      // 添加光源
      const directionalLight = new THREE.DirectionalLight(0xffffff, 2); // 添加方向光
      directionalLight.position.set(1, 1, 1).normalize(); // 设置光源位置
      this.scene.add(directionalLight);

      // 初始化轨道控制器
      this.controls = new OrbitControls(this.camera, this.renderer.domElement);
      this.controls.enableDamping = true;
      this.controls.dampingFactor = 0.25;

      // 加载 .obj 模型
      const objLoader = new OBJLoader(); // 使用OBJLoader
      objLoader.load(
        "/threeD/CASTILLO.obj", // 确保文件路径和文件名正确
        (obj) => {
          console.log("Model loaded", obj);
          obj.position.set(0, 0, 0); // 模型放置位置
          obj.scale.set(1, 1, 1); // 调整模型缩放（根据需要调整缩放比例）
          this.scene.add(obj);
          this.animate();
        },
        undefined,
        (error) => {
          console.error("模型加载失败:", error);
        }
      );

      // 窗口大小变化监听
      window.addEventListener("resize", () => {
        const width = this.$refs.sceneContainer.clientWidth;
        const height = this.$refs.sceneContainer.clientHeight;
        this.renderer.setSize(width, height);
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
      });
      this.animate();
    },
    animate() {
      requestAnimationFrame(() => this.animate());
      this.controls.update();
      this.renderer.render(this.scene, this.camera);
    },
  },
};
</script>

<style scoped>
#scene-container {
  width: 100%;
  height: 100vh;
}
</style>
