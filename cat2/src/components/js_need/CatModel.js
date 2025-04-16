import * as THREE from 'three';

export default {
    create() {
        const group = new THREE.Group();

        // 猫身体（椭圆体）
        const bodyGeometry = new THREE.SphereGeometry(0.5, 32, 32);
        bodyGeometry.scale(1.5, 0.8, 1);
        const bodyMaterial = new THREE.MeshPhongMaterial({
            color: Math.random() * 0xffffff,
            shininess: 30
        });
        const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
        group.add(body);

        // 猫头（球体）
        const headGeometry = new THREE.SphereGeometry(0.3, 32, 32);
        const headMaterial = new THREE.MeshPhongMaterial({
            color: bodyMaterial.color,
            shininess: 50
        });
        const head = new THREE.Mesh(headGeometry, headMaterial);
        head.position.set(0, 0.7, 0.5);
        group.add(head);

        // 耳朵（圆锥体）
        const earGeometry = new THREE.ConeGeometry(0.15, 0.3, 32);
        const earMaterial = new THREE.MeshPhongMaterial({ color: bodyMaterial.color });

        const leftEar = new THREE.Mesh(earGeometry, earMaterial);
        leftEar.position.set(-0.3, 0.9, 0.4);
        leftEar.rotation.x = -0.5;
        group.add(leftEar);

        const rightEar = new THREE.Mesh(earGeometry, earMaterial);
        rightEar.position.set(0.3, 0.9, 0.4);
        rightEar.rotation.x = -0.5;
        group.add(rightEar);

        // 眼睛（球体）
        const eyeGeometry = new THREE.SphereGeometry(0.05, 16, 16);
        const eyeMaterial = new THREE.MeshPhongMaterial({ color: 0x000000 });

        const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
        leftEye.position.set(-0.1, 0.7, 0.7);
        group.add(leftEye);

        const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
        rightEye.position.set(0.1, 0.7, 0.7);
        group.add(rightEye);

        // 鼻子（圆锥体）
        const noseGeometry = new THREE.ConeGeometry(0.05, 0.1, 3);
        const noseMaterial = new THREE.MeshPhongMaterial({ color: 0xff9999 });
        const nose = new THREE.Mesh(noseGeometry, noseMaterial);
        nose.position.set(0, 0.65, 0.8);
        nose.rotation.x = Math.PI / 2;
        group.add(nose);

        // 随机位置和旋转
        group.position.x = (Math.random() - 0.5) * 5;
        group.position.y = (Math.random() - 0.5) * 3;
        group.position.z = (Math.random() - 0.5) * 5;
        group.rotation.y = Math.random() * Math.PI * 2;

        // 添加动画数据
        group.userData = {
            speed: Math.random() * 0.02 + 0.01,
            direction: new THREE.Vector3(
                Math.random() - 0.5,
                Math.random() - 0.5,
                Math.random() - 0.5
            ).normalize()
        };

        return group;
    }
};