import * as THREE from 'three';

import { OrbitControls } from './three/addons/OrbitControls.js';
import { ConvexGeometry } from './three/addons/ConvexGeometry.js';
import * as BufferGeometryUtils from './three/addons/BufferGeometryUtils.js';

let group, camera, scene, renderer;

init();
// setTimeout(render,50) // SWAP NOTE OUT WITH ANIMATE TO show as still...
animate();

function init() {

  scene = new THREE.Scene();

  renderer = new THREE.WebGLRenderer( { antialias: true } );
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );

  // camera
  camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 1000 );
  camera.position.set( 15, -20, 30 );
  camera.up.set( 0, 0, 1 );

  scene.add( camera );

  // controls
  const controls = new OrbitControls( camera, renderer.domElement );
  controls.minDistance = 20;
  controls.maxDistance = 50;
  controls.maxPolarAngle = Math.PI / 2;

  // ambient light
  scene.add( new THREE.AmbientLight( 0x666666 ) );

  // point light
  const light = new THREE.PointLight( 0xffffff, 3, 0, 0 );
  camera.add( light );

  // helper
  scene.add( new THREE.AxesHelper( 20 ) );

  // textures
  const loader = new THREE.TextureLoader();
  const texture = loader.load( './three/disc.png' );
  texture.colorSpace = THREE.SRGBColorSpace;

  group = new THREE.Group();
  scene.add( group );

  // points
  let dodecahedronGeometry = new THREE.DodecahedronGeometry( 10 );

  // if normal and uv attributes are not removed, mergeVertices() can't consolidate indentical vertices with different normal/uv data
  dodecahedronGeometry.deleteAttribute( 'normal' );
  dodecahedronGeometry.deleteAttribute( 'uv' );

  dodecahedronGeometry = BufferGeometryUtils.mergeVertices( dodecahedronGeometry );

  const vertices = [];
  const positionAttribute = dodecahedronGeometry.getAttribute( 'position' );
  console.log('positionAttribute:',positionAttribute)

  for ( let i = 0; i < positionAttribute.count; i ++ ) {
    const vertex = new THREE.Vector3();
    console.log('positionAttribute:',positionAttribute)
    vertex.fromBufferAttribute( positionAttribute, i );
    vertices.push( vertex );
  }

  const pointsMaterial = new THREE.PointsMaterial( {
    color: 0x0080ff,
    map: texture,
    size: 1,
    alphaTest: 0.5
  } );


  //
  // 
  const boxPoints = [
    {x: 0, y: 0, z: 0},
    {x: 10, y: 0, z: 0},
    {x: 10, y: 10, z: 0},
    {x: 0, y: 10, z: 0},
    {x: 0, y: 0, z: 5},
    {x: 10, y: 0, z: 5},
    {x: 10, y: 10, z: 5},
    {x: 0, y: 10, z: 5},
  ]
  const BoxVertices = [];
  for ( let i = 0; i < boxPoints.length; i ++ ) {
    const vertex = new THREE.Vector3(boxPoints[i].x,boxPoints[i].y,boxPoints[i].z);
    BoxVertices.push( vertex );
  }
  //
  //

  const pointsGeometry = new THREE.BufferGeometry().setFromPoints( BoxVertices );
  // const pointsGeometry = new THREE.BufferGeometry().setFromPoints( vertices );

  const points = new THREE.Points( pointsGeometry, pointsMaterial );
  group.add( points );

  // convex hull
  const meshMaterial = new THREE.MeshLambertMaterial( {
    color: 0xffffff,
    opacity: 0.5,
    side: THREE.DoubleSide,
    transparent: true
  } );

  const meshGeometry = new ConvexGeometry( BoxVertices );
  // const meshGeometry = new ConvexGeometry( vertices );
  const mesh = new THREE.Mesh( meshGeometry, meshMaterial );
  group.add( mesh );

  window.addEventListener( 'resize', onWindowResize );

}


function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
}


function animate() {
  requestAnimationFrame( animate );
  if (!pause) {
    group.rotation.y += 0.005;
    render();
  }
}

function render() {
  renderer.render( scene, camera );
}
