var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.y = 25;
camera.position.z = 25;

var renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setClearColor('#262626');
renderer.setSize(window.innerWidth, window.innerHeight);

document.getElementById('background').appendChild(renderer.domElement);

// Make sure the project is responsive based on window resizing
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth,window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;

    camera.updateProjectionMatrix();
})

var light = new THREE.PointLight(0xFFFFFF, 1.4, 1000)
light.position.set(0, 15, 15);
scene.add(light);

var ratObject;

// Create a material
var mtlLoader = new THREE.MTLLoader();
mtlLoader.load('https://s3-us-west-2.amazonaws.com/s.cdpn.io/2621168/center.mtl', function (materials) {

    materials.preload();

    // Load the object
    var objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.load('Rat.obj', function (object) {
        scene.add(object);
        ratObject = object;
        object.scale.x *= 30;
        object.scale.y *= 30;
        object.scale.z *= 30;
        object.rotation.y = -90;
        object.position.z -= 70;

        this.tl = new TimelineMax();
        this.tl.from(ratObject.scale, 2, {y: 0, x:0, z: 0, ease: Expo.easeOut})
        this.tl.from(ratObject.position, 2, {y: 0, z: -30,  ease: Expo.easeOut})
    });
});

var render = function() {
    requestAnimationFrame(render);

    renderer.render(scene, camera);
}

render()