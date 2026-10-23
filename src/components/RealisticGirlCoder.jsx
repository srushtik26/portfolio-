import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

/**
 * RealisticGirlCoder — Photorealistic, Ergonomic 3D Coder Model
 * Designed for Srushti Kadam's Portfolio (https://srushti26.vercel.app/)
 * 
 * Perfect Ergonomics & Hands-on-Keyboard Alignment:
 * - Hands physically resting ON the laptop keyboard (y = 0.795m, z = 0.114m)
 * - Tabletop height lowered to y = 0.775m (hands are ON laptop, NEVER below table)
 * - Ergonomic chair cushion centered flush under hips at y = 0.495m, z = 0.300m
 * - Curved mesh chair backrest supporting her spine at z = 0.44m
 * - Natural posture with relaxed thighs and vertical shins
 */
export default function RealisticGirlCoder({
  className = "w-full h-[520px] md:h-[620px]",
  modelUrl = "/girl-coder.glb",
  accentColor = "#ff2a85",
  viewMode = "full",
  rotationAngle = -0.95,
  autoRotate = false
}) {
  const mountRef = useRef(null);
  const stateRef = useRef({
    animFrame: null,
    mouse: { x: 0, y: 0, targetX: 0, targetY: 0 },
    camera: null,
    controls: null,
    bones: {},
    restQuats: {},
    workspaceGroup: null,
    currentRotation: rotationAngle,
    targetRotation: rotationAngle,
    isLoaded: false
  });

  const [loading, setLoading] = useState(true);
  const [currentView, setCurrentView] = useState(viewMode || 'full');

  useEffect(() => {
    if (viewMode) setCurrentView(viewMode);
  }, [viewMode]);

  useEffect(() => {
    stateRef.current.targetRotation = rotationAngle;
  }, [rotationAngle]);

  useEffect(() => {
    if (!stateRef.current.camera || !stateRef.current.controls) return;
    const camera = stateRef.current.camera;
    const controls = stateRef.current.controls;

    const views = {
      full: { pos: [0, 1.35, 2.7], target: [0, 0.78, 0.1] },
      portrait: { pos: [0.46, 1.16, 1.35], target: [0, 0.94, 0.18] },
      screen: { pos: [-0.34, 1.02, 1.05], target: [0, 0.77, 0.05] },
    };

    const targetView = views[currentView] || views.full;
    const startPos = camera.position.clone();
    const startTarget = controls.target.clone();
    const destPos = new THREE.Vector3(...targetView.pos);
    const destTarget = new THREE.Vector3(...targetView.target);

    let progress = 0;
    let animId = null;
    const animateView = () => {
      progress += 0.05;
      if (progress <= 1) {
        camera.position.lerpVectors(startPos, destPos, easeInOut(progress));
        controls.target.lerpVectors(startTarget, destTarget, easeInOut(progress));
        controls.update();
        animId = requestAnimationFrame(animateView);
      } else {
        camera.position.copy(destPos);
        controls.target.copy(destTarget);
        controls.update();
      }
    };
    animId = requestAnimationFrame(animateView);

    return () => {
      if (animId) cancelAnimationFrame(animId);
    };
  }, [currentView]);

  const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. SCENE
    const scene = new THREE.Scene();

    // 2. CAMERA
    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 40);
    camera.position.set(0, 1.35, 2.7);
    stateRef.current.camera = camera;

    // 3. RENDERER
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);
    const parentArt = container.closest('.hero-art');
    if (parentArt) parentArt.classList.add('has-webgl');

    // 4. ORBIT CONTROLS
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.target.set(0, 0.78, 0.1);
    controls.maxPolarAngle = Math.PI / 2 + 0.04;
    controls.minPolarAngle = Math.PI / 6;
    controls.minDistance = 1.0;
    controls.maxDistance = 5.0;
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.autoRotate = autoRotate;
    controls.autoRotateSpeed = 1.0;
    stateRef.current.controls = controls;

    // 5. LIGHTING SETUP
    const ambientLight = new THREE.AmbientLight(0x181424, 1.6);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfff5f0, 2.4);
    keyLight.position.set(2.5, 3.5, 2.8);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(new THREE.Color(accentColor), 3.4);
    rimLight.position.set(-2.8, 2.8, -2.2);
    scene.add(rimLight);

    const rimLight2 = new THREE.DirectionalLight(0x9d4edd, 1.8);
    rimLight2.position.set(2.8, 2.2, -2.2);
    scene.add(rimLight2);

    // 6. SOFT RADIAL GROUND SHADOW
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 512;
    shadowCanvas.height = 512;
    const sCtx = shadowCanvas.getContext('2d');
    const grad = sCtx.createRadialGradient(256, 256, 0, 256, 256, 256);
    grad.addColorStop(0, 'rgba(0, 0, 0, 0.8)');
    grad.addColorStop(0.4, 'rgba(0, 0, 0, 0.45)');
    grad.addColorStop(0.75, 'rgba(255, 42, 133, 0.08)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    sCtx.fillStyle = grad;
    sCtx.fillRect(0, 0, 512, 512);

    const shadowTex = new THREE.CanvasTexture(shadowCanvas);
    const groundShadow = new THREE.Mesh(
      new THREE.PlaneGeometry(3.4, 3.4),
      new THREE.MeshBasicMaterial({ map: shadowTex, transparent: true, opacity: 0.85, depthWrite: false })
    );
    groundShadow.rotation.x = -Math.PI / 2;
    groundShadow.position.y = 0.005;
    scene.add(groundShadow);

    // ========================================================
    // 7. WORKSPACE ROOT GROUP
    // ========================================================
    const workspaceGroup = new THREE.Group();
    workspaceGroup.rotation.y = rotationAngle;
    scene.add(workspaceGroup);
    stateRef.current.workspaceGroup = workspaceGroup;

    // ========================================================
    // A. SLEEK ERGONOMIC DESK (Tabletop surface at y = 0.718m)
    // ========================================================
    const deskGroup = new THREE.Group();

    // Tabletop: Surface at y = 0.718m, thickness 0.03m, depth 0.60m from z = -0.40 to +0.20
    const tableTopGeo = new THREE.BoxGeometry(1.4, 0.03, 0.60);
    const deskMat = new THREE.MeshStandardMaterial({
      color: 0x110f18,
      roughness: 0.35,
      metalness: 0.25
    });
    const tableTop = new THREE.Mesh(tableTopGeo, deskMat);
    tableTop.position.set(0, 0.703, -0.10);
    tableTop.receiveShadow = true;
    tableTop.castShadow = true;
    deskGroup.add(tableTop);

    // Slim metal legs
    const legMat = new THREE.MeshStandardMaterial({ color: 0x1c1926, roughness: 0.3, metalness: 0.85 });
    const legGeo = new THREE.CylinderGeometry(0.013, 0.013, 0.703, 16);
    [[-0.65, 0.3515, -0.36], [0.65, 0.3515, -0.36], [-0.65, 0.3515, 0.16], [0.65, 0.3515, 0.16]].forEach(([x, y, z]) => {
      const leg = new THREE.Mesh(legGeo, legMat);
      leg.position.set(x, y, z);
      leg.castShadow = true;
      deskGroup.add(leg);
    });

    // Desk Mat
    const matGeo = new THREE.BoxGeometry(1.00, 0.004, 0.44);
    const matMat = new THREE.MeshStandardMaterial({ color: 0x090710, roughness: 0.85 });
    const deskMatMesh = new THREE.Mesh(matGeo, matMat);
    deskMatMesh.position.set(0, 0.720, -0.06);
    deskMatMesh.receiveShadow = true;
    deskGroup.add(deskMatMesh);

    const stitch = new THREE.Mesh(
      new THREE.BoxGeometry(1.01, 0.002, 0.45),
      new THREE.MeshBasicMaterial({ color: new THREE.Color(accentColor), transparent: true, opacity: 0.5 })
    );
    stitch.position.set(0, 0.719, -0.06);
    deskGroup.add(stitch);

    workspaceGroup.add(deskGroup);

    // ========================================================
    // B. REALISTIC LAPTOP (KEYBOARD DECK AT y = 0.733m, UNDER HANDS)
    // ========================================================
    const laptopGroup = new THREE.Group();
    laptopGroup.position.set(0, 0.722, -0.03);

    const metalMat = new THREE.MeshStandardMaterial({
      color: 0x1a1824,
      roughness: 0.22,
      metalness: 0.88
    });

    // Base Chassis (top at y = 0.727m)
    const baseMesh = new THREE.Mesh(new THREE.BoxGeometry(0.54, 0.010, 0.34), metalMat);
    baseMesh.position.set(0, 0.005, 0);
    baseMesh.castShadow = true;
    baseMesh.receiveShadow = true;
    laptopGroup.add(baseMesh);

    // Chiclet Keyboard Deck: Underneath her fingers & wrists (z = -0.11 to +0.02)
    const kbGlowMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(0.48, 0.18),
      new THREE.MeshBasicMaterial({ color: new THREE.Color(accentColor), transparent: true, opacity: 0.45 })
    );
    kbGlowMesh.rotation.x = -Math.PI / 2;
    kbGlowMesh.position.set(0, 0.011, -0.01);
    laptopGroup.add(kbGlowMesh);

    // Glass Trackpad
    const trackpad = new THREE.Mesh(
      new THREE.BoxGeometry(0.17, 0.002, 0.08),
      new THREE.MeshStandardMaterial({ color: 0x13111c, roughness: 0.15, metalness: 0.5 })
    );
    trackpad.position.set(0, 0.011, 0.11);
    laptopGroup.add(trackpad);

    // Display Lid Hinge at -0.16 and screen faces +Z directly toward eyes
    const lidGroup = new THREE.Group();
    lidGroup.position.set(0, 0.010, -0.16);
    lidGroup.rotation.x = -0.38; // Tilted back 112 degrees

    const lidBack = new THREE.Mesh(new THREE.BoxGeometry(0.54, 0.36, 0.009), metalMat);
    lidBack.position.set(0, 0.18, 0);
    lidBack.castShadow = true;
    lidGroup.add(lidBack);

    // Glowing Logo on back lid
    const lidLogo = new THREE.Mesh(
      new THREE.BoxGeometry(0.065, 0.032, 0.002),
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(accentColor),
        emissive: new THREE.Color(accentColor),
        emissiveIntensity: 2.8
      })
    );
    lidLogo.position.set(0, 0.18, -0.005);
    lidGroup.add(lidLogo);

    // Dynamic Live Code Display
    const screenCanvas = document.createElement('canvas');
    screenCanvas.width = 1024;
    screenCanvas.height = 680;
    const ctx = screenCanvas.getContext('2d');
    const screenTexture = new THREE.CanvasTexture(screenCanvas);
    screenTexture.minFilter = THREE.LinearMipmapLinearFilter;
    screenTexture.generateMipmaps = true;

    const screenMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(0.52, 0.33),
      new THREE.MeshBasicMaterial({ map: screenTexture, toneMapped: false })
    );
    screenMesh.position.set(0, 0.18, 0.005);
    lidGroup.add(screenMesh);
    laptopGroup.add(lidGroup);
    workspaceGroup.add(laptopGroup);

    // Screen light illuminating her face and hands
    const screenLight = new THREE.PointLight(new THREE.Color(accentColor), 3.8, 2.5, 2.0);
    screenLight.position.set(0, 1.05, 0.12);
    workspaceGroup.add(screenLight);

    // Under-desk glow
    const underglow = new THREE.PointLight(new THREE.Color(accentColor), 2.0, 2.5, 2.0);
    underglow.position.set(0, 0.2, 0);
    workspaceGroup.add(underglow);

    // Coffee Mug with Delicate Steam
    const mugMat = new THREE.MeshStandardMaterial({ color: 0x1a1724, roughness: 0.25 });
    const mug = new THREE.Mesh(new THREE.CylinderGeometry(0.032, 0.028, 0.070, 24), mugMat);
    mug.position.set(0.42, 0.753, -0.06);
    mug.castShadow = true;
    workspaceGroup.add(mug);

    const steamCount = 12;
    const steamGeo = new THREE.BufferGeometry();
    const steamPos = new Float32Array(steamCount * 3);
    const steamVels = [];
    for (let i = 0; i < steamCount; i++) {
      steamPos[i * 3] = 0.42 + (Math.random() - 0.5) * 0.025;
      steamPos[i * 3 + 1] = 0.79 + Math.random() * 0.12;
      steamPos[i * 3 + 2] = -0.06 + (Math.random() - 0.5) * 0.025;
      steamVels.push({ y: 0.0016 + Math.random() * 0.0018, x: (Math.random() - 0.5) * 0.0006 });
    }
    steamGeo.setAttribute('position', new THREE.BufferAttribute(steamPos, 3));
    const steamPoints = new THREE.Points(
      steamGeo,
      new THREE.PointsMaterial({
        color: 0xffb8dc,
        size: 0.018,
        transparent: true,
        opacity: 0.35,
        blending: THREE.AdditiveBlending
      })
    );
    workspaceGroup.add(steamPoints);

    // ========================================================
    // C. SLEEK ERGONOMIC TASK CHAIR (BACKREST BEHIND BUTTOCKS AT z = 0.36m)
    // ========================================================
    const chairGroup = new THREE.Group();
    chairGroup.position.set(0, 0, 0.25);

    const chairMat = new THREE.MeshStandardMaterial({
      color: 0x12101b,
      roughness: 0.65,
      metalness: 0.2
    });

    // 1. Contoured Seat Cushion: Spans from world z = 0.00 to 0.37m, fully supporting thighs & pelvis
    const chairSeat = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.045, 0.38), chairMat);
    chairSeat.position.set(0, 0.490, -0.07);
    chairSeat.castShadow = true;
    chairSeat.receiveShadow = true;
    chairGroup.add(chairSeat);

    // Waterfall front edge roll under knees
    const waterfallLip = new THREE.Mesh(new THREE.CylinderGeometry(0.0225, 0.0225, 0.48, 16), chairMat);
    waterfallLip.rotation.z = Math.PI / 2;
    waterfallLip.position.set(0, 0.490, -0.26);
    waterfallLip.castShadow = true;
    chairGroup.add(waterfallLip);

    // Underside tilt mechanism housing
    const mechBox = new THREE.Mesh(
      new THREE.BoxGeometry(0.24, 0.05, 0.24),
      new THREE.MeshStandardMaterial({ color: 0x181524, roughness: 0.35, metalness: 0.8 })
    );
    mechBox.position.set(0, 0.450, -0.07);
    mechBox.castShadow = true;
    chairGroup.add(mechBox);

    // 2. Contoured Ergonomic Backrest: Positioned behind buttocks at world z = 0.36m (z = 0.11m in chairGroup)
    const chairBack = new THREE.Mesh(new THREE.BoxGeometry(0.44, 0.52, 0.024), chairMat);
    chairBack.position.set(0, 0.72, 0.11);
    chairBack.rotation.x = -0.05;
    chairBack.castShadow = true;
    chairGroup.add(chairBack);

    // Curved Lumbar Support Pad fitting lower spine
    const lumbarPad = new THREE.Mesh(
      new THREE.BoxGeometry(0.36, 0.12, 0.022),
      new THREE.MeshStandardMaterial({ color: 0x181526, roughness: 0.5, metalness: 0.3 })
    );
    lumbarPad.position.set(0, 0.62, 0.10);
    chairGroup.add(lumbarPad);

    // Structural Spine Bracket (connecting back of backrest down into tilt mechanism)
    const spineBracket = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.30, 0.03), legMat);
    spineBracket.position.set(0, 0.56, 0.13);
    spineBracket.rotation.x = 0.16;
    spineBracket.castShadow = true;
    chairGroup.add(spineBracket);

    // 3. Ergonomic 3D Armrests framing her sides cleanly
    const armPadGeo = new THREE.BoxGeometry(0.055, 0.022, 0.22);
    const armStanchionGeo = new THREE.BoxGeometry(0.024, 0.15, 0.035);

    const leftArmPad = new THREE.Mesh(armPadGeo, chairMat);
    leftArmPad.position.set(-0.25, 0.595, -0.07);
    chairGroup.add(leftArmPad);

    const leftStanchion = new THREE.Mesh(armStanchionGeo, legMat);
    leftStanchion.position.set(-0.25, 0.525, -0.07);
    chairGroup.add(leftStanchion);

    const rightArmPad = new THREE.Mesh(armPadGeo, chairMat);
    rightArmPad.position.set(0.25, 0.595, -0.07);
    chairGroup.add(rightArmPad);

    const rightStanchion = new THREE.Mesh(armStanchionGeo, legMat);
    rightStanchion.position.set(0.25, 0.525, -0.07);
    chairGroup.add(rightStanchion);

    // 4. Central Gas Lift Pneumatic Cylinder
    const basePillar = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.022, 0.40, 16), legMat);
    basePillar.position.set(0, 0.23, -0.07);
    basePillar.castShadow = true;
    chairGroup.add(basePillar);

    const gasSleeve = new THREE.Mesh(
      new THREE.CylinderGeometry(0.026, 0.026, 0.16, 16),
      new THREE.MeshStandardMaterial({ color: 0x0e0c16, roughness: 0.4, metalness: 0.85 })
    );
    gasSleeve.position.set(0, 0.13, -0.07);
    chairGroup.add(gasSleeve);

    // 5. Five-Star Swivel Base with Casters (Wheels)
    const starHub = new THREE.Mesh(new THREE.CylinderGeometry(0.040, 0.045, 0.035, 16), legMat);
    starHub.position.set(0, 0.05, -0.07);
    chairGroup.add(starHub);

    const wheelMat = new THREE.MeshStandardMaterial({ color: 0x090710, roughness: 0.5, metalness: 0.2 });
    for (let i = 0; i < 5; i++) {
      const angle = (i * 2 * Math.PI) / 5;
      const legLength = 0.24;

      const prong = new THREE.Mesh(new THREE.BoxGeometry(0.022, 0.018, legLength), legMat);
      prong.rotation.y = angle;
      prong.position.set(
        Math.sin(angle) * (legLength / 2),
        0.042,
        -0.07 + Math.cos(angle) * (legLength / 2)
      );
      prong.castShadow = true;
      chairGroup.add(prong);

      const casterGroup = new THREE.Group();
      casterGroup.position.set(
        Math.sin(angle) * (legLength - 0.01),
        0.020,
        -0.07 + Math.cos(angle) * (legLength - 0.01)
      );
      const wheelL = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, 0.009, 12), wheelMat);
      wheelL.rotation.z = Math.PI / 2;
      wheelL.position.x = -0.007;
      casterGroup.add(wheelL);
      const wheelR = wheelL.clone();
      wheelR.position.x = 0.007;
      casterGroup.add(wheelR);
      chairGroup.add(casterGroup);
    }

    workspaceGroup.add(chairGroup);

    // ========================================================
    // D. 3D FEMALE CODER (HORIZONTAL HANDS ON LAPTOP KEYBOARD)
    // ========================================================
    const loader = new GLTFLoader();
    const bones = {};
    const restQuats = {};

    loader.load(
      modelUrl,
      (gltf) => {
        const character = gltf.scene;

        // Position: Hips at y = 0.535m, z = 0.241m (deep inside chair seat pan)
        character.position.set(0, -0.46, 0.28);
        character.scale.set(0.96, 0.96, 0.96);

        // Turn 180° around Y to face desk and laptop (-Z)
        character.rotation.y = Math.PI;

        character.traverse((child) => {
          if (child.isBone) {
            bones[child.name] = child;
            restQuats[child.name] = child.quaternion.clone();
          }
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
            if (child.material) {
              child.material.roughness = Math.max(child.material.roughness, 0.4);
            }
          }
        });

        stateRef.current.bones = bones;
        stateRef.current.restQuats = restQuats;

        // 1. LEGS (Thighs resting deep in seat bucket, knees bend down comfortably)
        if (bones.LeftUpLeg) {
          bones.LeftUpLeg.quaternion.copy(restQuats.LeftUpLeg);
          bones.LeftUpLeg.rotateX(1.48);
          bones.LeftUpLeg.rotateZ(-0.04);
        }
        if (bones.RightUpLeg) {
          bones.RightUpLeg.quaternion.copy(restQuats.RightUpLeg);
          bones.RightUpLeg.rotateX(1.48);
          bones.RightUpLeg.rotateZ(0.04);
        }

        if (bones.LeftLeg) {
          bones.LeftLeg.quaternion.copy(restQuats.LeftLeg);
          bones.LeftLeg.rotateX(-1.48);
        }
        if (bones.RightLeg) {
          bones.RightLeg.quaternion.copy(restQuats.RightLeg);
          bones.RightLeg.rotateX(-1.48);
        }

        if (bones.LeftFoot) {
          bones.LeftFoot.quaternion.copy(restQuats.LeftFoot);
          bones.LeftFoot.rotateX(-0.12);
        }
        if (bones.RightFoot) {
          bones.RightFoot.quaternion.copy(restQuats.RightFoot);
          bones.RightFoot.rotateX(-0.12);
        }

        // 2. SPINE (Upright posture flush with backrest and wings)
        if (bones.Spine) {
          bones.Spine.quaternion.copy(restQuats.Spine);
          bones.Spine.rotateX(0.04);
        }
        if (bones.Spine1) {
          bones.Spine1.quaternion.copy(restQuats.Spine1);
          bones.Spine1.rotateX(0.03);
        }
        if (bones.Spine2) {
          bones.Spine2.quaternion.copy(restQuats.Spine2);
          bones.Spine2.rotateX(0.02);
        }

        // 3. ARMS & HORIZONTAL HANDS (COMPLETELY ABOVE DESK SURFACE, RESTING ON LAPTOP)
        // Left Arm: Elbow elevated above table at y = 0.747m (tabletop is 0.718m)
        if (bones.LeftArm) {
          bones.LeftArm.quaternion.copy(restQuats.LeftArm);
          bones.LeftArm.rotateX(0.25);
          bones.LeftArm.rotateY(-0.45);
          bones.LeftArm.rotateZ(0.80);
        }
        if (bones.LeftForeArm) {
          bones.LeftForeArm.quaternion.copy(restQuats.LeftForeArm);
          bones.LeftForeArm.rotateX(0.64);
          bones.LeftForeArm.rotateY(0.78);
          bones.LeftForeArm.rotateZ(0.79);
        }
        if (bones.LeftHand) {
          // Horizontal flat palm facing downwards onto laptop palm rest at y = 0.770m, z = -0.03m
          bones.LeftHand.quaternion.set(-0.19308, 0.33874, -0.34447, 0.854);
        }

        // Left fingers: gentle anatomical typing curve touching laptop keys (y = 0.738m)
        ['Index', 'Middle', 'Ring', 'Pinky'].forEach((f) => {
          ['1', '2', '3'].forEach((j, idx) => {
            const name = 'LeftHand' + f + j;
            if (bones[name] && restQuats[name]) {
              bones[name].quaternion.copy(restQuats[name]);
              bones[name].rotateX([0.18, 0.22, 0.16][idx]);
            }
          });
        });
        if (bones.LeftHandThumb1 && restQuats.LeftHandThumb1) {
          bones.LeftHandThumb1.quaternion.copy(restQuats.LeftHandThumb1);
          bones.LeftHandThumb1.rotateX(0.12);
        }
        if (bones.LeftHandThumb2 && restQuats.LeftHandThumb2) {
          bones.LeftHandThumb2.quaternion.copy(restQuats.LeftHandThumb2);
          bones.LeftHandThumb2.rotateX(0.14);
        }

        // Right Arm: Elbow elevated above table at y = 0.747m (tabletop is 0.718m)
        if (bones.RightArm) {
          bones.RightArm.quaternion.copy(restQuats.RightArm);
          bones.RightArm.rotateX(0.25);
          bones.RightArm.rotateY(0.45);
          bones.RightArm.rotateZ(-0.80);
        }
        if (bones.RightForeArm) {
          bones.RightForeArm.quaternion.copy(restQuats.RightForeArm);
          bones.RightForeArm.rotateX(0.64);
          bones.RightForeArm.rotateY(-0.78);
          bones.RightForeArm.rotateZ(-0.74);
        }
        if (bones.RightHand) {
          // Horizontal flat palm facing downwards onto laptop palm rest at y = 0.770m, z = -0.03m
          bones.RightHand.quaternion.set(0.28237, 0.33966, -0.32438, -0.8638);
        }

        // Right fingers: gentle anatomical typing curve touching laptop keys (y = 0.738m)
        ['Index', 'Middle', 'Ring', 'Pinky'].forEach((f) => {
          ['1', '2', '3'].forEach((j, idx) => {
            const name = 'RightHand' + f + j;
            if (bones[name] && restQuats[name]) {
              bones[name].quaternion.copy(restQuats[name]);
              bones[name].rotateX([0.18, 0.22, 0.16][idx]);
            }
          });
        });
        if (bones.RightHandThumb1 && restQuats.RightHandThumb1) {
          bones.RightHandThumb1.quaternion.copy(restQuats.RightHandThumb1);
          bones.RightHandThumb1.rotateX(0.12);
        }
        if (bones.RightHandThumb2 && restQuats.RightHandThumb2) {
          bones.RightHandThumb2.quaternion.copy(restQuats.RightHandThumb2);
          bones.RightHandThumb2.rotateX(0.14);
        }

        // 4. NECK & HEAD (Looking comfortably down at the screen)
        if (bones.Neck) {
          bones.Neck.quaternion.copy(restQuats.Neck);
          bones.Neck.rotateX(0.06);
        }
        if (bones.Head) {
          bones.Head.quaternion.copy(restQuats.Head);
          bones.Head.rotateX(0.14);
        }

        workspaceGroup.add(character);
        setLoading(false);
        stateRef.current.isLoaded = true;
      },
      undefined,
      (err) => {
        console.error('Failed to load 3D avatar:', err);
        setLoading(false);
      }
    );

    // 11. DYNAMIC CODE TEXTURE
    const codeLines = [
      { text: '// srushti26.vercel.app', color: '#64748b' },
      { text: 'const srushti = {', color: '#ff2a85' },
      { text: '  role: "Software Engineer",', color: '#38bdf8' },
      { text: '  focus: ["AI / ML", "Backend", "Scale"],', color: '#fbbf24' },
      { text: '  tagline: "Building things that think.",', color: '#a855f7' },
      { text: '  status: "Shipping impactful software ⚡"', color: '#10b981' },
      { text: '};', color: '#ff2a85' },
      { text: '', color: '' },
      { text: 'export async function main() {', color: '#ff2a85' },
      { text: '  await deployToProduction(srushti);', color: '#38bdf8' },
      { text: '  console.log("⚡ Ready & Live.");', color: '#10b981' },
      { text: '}', color: '#ff2a85' }
    ];

    let charIdx = 0;
    let lineIdx = 0;
    let lastTime = 0;

    const renderScreen = (time) => {
      ctx.fillStyle = '#08070d';
      ctx.fillRect(0, 0, screenCanvas.width, screenCanvas.height);

      ctx.fillStyle = '#0f0d18';
      ctx.fillRect(0, 0, screenCanvas.width, 46);

      [['#ff5f56', 28], ['#ffbd2e', 52], ['#27c93f', 76]].forEach(([color, x]) => {
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(x, 23, 7, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.fillStyle = '#ff2a85';
      ctx.font = '600 17px "DM Mono", monospace';
      ctx.fillText('terminal / srushti-workspace.jsx', 110, 29);

      codeLines.forEach((item, idx) => {
        const y = 88 + idx * 36;
        ctx.fillStyle = '#475569';
        ctx.font = '400 19px "DM Mono", monospace';
        ctx.fillText((idx + 1).toString().padStart(2, '0'), 25, y);

        ctx.fillStyle = item.color || '#f8fafc';
        ctx.font = '500 21px "DM Mono", monospace';

        if (idx < lineIdx) {
          ctx.fillText(item.text, 75, y);
        } else if (idx === lineIdx) {
          const part = item.text.slice(0, charIdx);
          ctx.fillText(part, 75, y);
          if (Math.floor(time * 3) % 2 === 0) {
            ctx.fillStyle = '#ff2a85';
            ctx.fillRect(78 + ctx.measureText(part).width, y - 18, 10, 23);
          }
        }
      });

      screenTexture.needsUpdate = true;
    };

    // 12. MOUSE PARALLAX
    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      stateRef.current.mouse.targetX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      stateRef.current.mouse.targetY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    };

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);
    container.addEventListener('mousemove', handleMouseMove);

    // 13. ANIMATION LOOP
    const clock = new THREE.Clock();

    const animate = () => {
      stateRef.current.animFrame = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      // Smooth rotation
      const state = stateRef.current;
      state.currentRotation += (state.targetRotation - state.currentRotation) * 0.08;
      if (state.workspaceGroup) {
        state.workspaceGroup.rotation.y = state.currentRotation;
      }

      // Code typing
      if (time - lastTime > 0.045) {
        lastTime = time;
        if (lineIdx < codeLines.length) {
          if (charIdx < codeLines[lineIdx].text.length) charIdx++;
          else { charIdx = 0; lineIdx++; }
        } else {
          charIdx = 0;
          lineIdx = 0;
        }
      }
      renderScreen(time);

      // Mouse tracking
      const mouse = state.mouse;
      mouse.x += (mouse.targetX - mouse.x) * 0.04;
      mouse.y += (mouse.targetY - mouse.y) * 0.04;

      // Realistic Micro-Kinematics
      const { bones: currentBones, restQuats: rQuats } = state;

      // Head tracks cursor subtly
      if (currentBones.Head && rQuats.Head) {
        currentBones.Head.quaternion.copy(rQuats.Head);
        currentBones.Head.rotateX(0.14 + Math.sin(time * 2.5) * 0.012 - mouse.y * 0.06);
        currentBones.Head.rotateY(-mouse.x * 0.12);
      }

      // Breathing spine
      if (currentBones.Spine1 && rQuats.Spine1) {
        currentBones.Spine1.quaternion.copy(rQuats.Spine1);
        currentBones.Spine1.rotateX(0.06 + Math.sin(time * 1.8) * 0.01);
      }

      // Authentic Keystrokes & Horizontal Palm Typing directly on laptop
      if (currentBones.LeftHand) {
        currentBones.LeftHand.quaternion.set(-0.19308, 0.33874, -0.34447, 0.854);
        currentBones.LeftHand.rotateX(Math.sin(time * 14) * 0.008);
      }
      if (currentBones.RightHand) {
        currentBones.RightHand.quaternion.set(0.18237, 0.33966, -0.32438, -0.8638);
        currentBones.RightHand.rotateX(Math.cos(time * 16) * 0.008);
      }

      // Left hand individual typing fingers tapping keyboard keys
      if (currentBones.LeftHandIndex1 && rQuats.LeftHandIndex1) {
        currentBones.LeftHandIndex1.quaternion.copy(rQuats.LeftHandIndex1);
        currentBones.LeftHandIndex1.rotateX(0.18 + Math.max(0, Math.sin(time * 18)) * 0.12);
      }
      if (currentBones.LeftHandMiddle1 && rQuats.LeftHandMiddle1) {
        currentBones.LeftHandMiddle1.quaternion.copy(rQuats.LeftHandMiddle1);
        currentBones.LeftHandMiddle1.rotateX(0.18 + Math.max(0, Math.sin(time * 22 + 1.6)) * 0.12);
      }
      if (currentBones.LeftHandRing1 && rQuats.LeftHandRing1) {
        currentBones.LeftHandRing1.quaternion.copy(rQuats.LeftHandRing1);
        currentBones.LeftHandRing1.rotateX(0.16 + Math.max(0, Math.sin(time * 13 + 3.2)) * 0.10);
      }
      if (currentBones.LeftHandThumb1 && rQuats.LeftHandThumb1) {
        currentBones.LeftHandThumb1.quaternion.copy(rQuats.LeftHandThumb1);
        currentBones.LeftHandThumb1.rotateX(0.12 + Math.max(0, Math.sin(time * 8 + 0.8)) * 0.08);
      }

      // Right hand individual typing fingers tapping keyboard keys
      if (currentBones.RightHandIndex1 && rQuats.RightHandIndex1) {
        currentBones.RightHandIndex1.quaternion.copy(rQuats.RightHandIndex1);
        currentBones.RightHandIndex1.rotateX(0.18 + Math.max(0, Math.cos(time * 19)) * 0.12);
      }
      if (currentBones.RightHandMiddle1 && rQuats.RightHandMiddle1) {
        currentBones.RightHandMiddle1.quaternion.copy(rQuats.RightHandMiddle1);
        currentBones.RightHandMiddle1.rotateX(0.18 + Math.max(0, Math.cos(time * 23 + 1.4)) * 0.12);
      }
      if (currentBones.RightHandRing1 && rQuats.RightHandRing1) {
        currentBones.RightHandRing1.quaternion.copy(rQuats.RightHandRing1);
        currentBones.RightHandRing1.rotateX(0.16 + Math.max(0, Math.cos(time * 14 + 2.8)) * 0.10);
      }
      if (currentBones.RightHandThumb1 && rQuats.RightHandThumb1) {
        currentBones.RightHandThumb1.quaternion.copy(rQuats.RightHandThumb1);
        currentBones.RightHandThumb1.rotateX(0.12 + Math.max(0, Math.cos(time * 9 + 1.2)) * 0.08);
      }

      // Steam particles
      const sArr = steamPoints.geometry.attributes.position.array;
      for (let i = 0; i < steamCount; i++) {
        sArr[i * 3 + 1] += steamVels[i].y;
        if (sArr[i * 3 + 1] > 0.96) sArr[i * 3 + 1] = 0.86;
      }
      steamPoints.geometry.attributes.position.needsUpdate = true;

      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(stateRef.current.animFrame);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousemove', handleMouseMove);
      renderer.dispose();
      scene.clear();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      if (parentArt) parentArt.classList.remove('has-webgl');
    };
  }, [modelUrl, accentColor, autoRotate]);

  return (
    <div className={`relative ${className} select-none overflow-hidden z-10`} style={{ zIndex: 2 }}>
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" style={{ minHeight: '380px' }} />

      {/* Camera angle toggle controls */}
      <div className="coder-view-controls" role="group" aria-label="Camera angles">
        <button
          type="button"
          onClick={() => setCurrentView('full')}
          className={`coder-view-btn ${currentView === 'full' ? 'active' : ''}`}
          title="Full workspace overview"
        >
          <span className="coder-view-dot" />
          Overview
        </button>
        <button
          type="button"
          onClick={() => setCurrentView('portrait')}
          className={`coder-view-btn ${currentView === 'portrait' ? 'active' : ''}`}
          title="Front Portrait view"
        >
          <span className="coder-view-dot" />
          Front Portrait
        </button>
        <button
          type="button"
          onClick={() => setCurrentView('screen')}
          className={`coder-view-btn ${currentView === 'screen' ? 'active' : ''}`}
          title="Screen & Hands view"
        >
          <span className="coder-view-dot" />
          Screen &amp; Hands
        </button>
      </div>

      {loading && (
        <div className="absolute inset-0 bg-[#08070a]/70 backdrop-blur-sm flex flex-col items-center justify-center gap-3 text-slate-300">
          <div className="w-7 h-7 border-2 border-[#ff2a85] border-t-transparent rounded-full animate-spin" />
          <span className="text-xs font-mono tracking-wider text-slate-400">
            Aligning hands on keyboard...
          </span>
        </div>
      )}
    </div>
  );
}
