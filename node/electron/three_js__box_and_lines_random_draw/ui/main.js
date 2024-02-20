window.onload = function() {

// Setting up three.js
  const marginAdjust = 15
  const sW = window.innerWidth - marginAdjust
  const sH = sW * 0.6

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(75, sW / sH, 0.1, 1000)

  const renderer = new THREE.WebGLRenderer()
  renderer.setSize(sW, sH)
  threeContainer.appendChild( renderer.domElement )

// BOX with transperency
  const geometry = new THREE.BoxGeometry(2, 1, 1) // what you set ration at (75? = 75px;)
  const material = new THREE.MeshBasicMaterial( {
    color: "rgb(0,255,0)",
    transparent: true,
    opacity: 0.5
  })
  const cube = new THREE.Mesh(geometry, material)
  scene.add(cube)

// LINE straight
  const lines = new THREE.Group()
  const line_material = new THREE.LineBasicMaterial({ color:0xffffff })

  const line_geometry = new THREE.Geometry()
  line_geometry.vertices.push(
    new THREE.Vector3(0,0,0),
    new THREE.Vector3(1,0,0)
  )
  const newline = new THREE.Line(line_geometry, line_material )
  lines.add(newline)
  scene.add(lines);

  camera.position.z = 5
  renderer.render(scene, camera)


  const line_material2 = new THREE.LineBasicMaterial({ color: "red" })
  let oldX = 0
  let oldY = 0

  // setTimeout(()=>{
  const randomLinesPath = setInterval(()=>{

    const newX = oldX + Math.random() - 0.5
    const newY = oldY + Math.random() - 0.5
    const line_geometry = new THREE.Geometry()
    line_geometry.vertices.push(
      new THREE.Vector3(oldX,oldY,1),
      new THREE.Vector3(newX,newY,1)
    )
    oldX = newX
    oldY = newY

    const newline = new THREE.Line(line_geometry, line_material2 )
    lines.add(newline)
    scene.add(lines);

    // rotate()

    renderer.render(scene, camera)
    console.log('ok')
  },1000)

  // function rotate() {
  //     cube.rotation.x += 0.01;
  //     cube.rotation.y += 0.01;
  // }

}
