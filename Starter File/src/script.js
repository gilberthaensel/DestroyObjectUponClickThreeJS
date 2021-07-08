import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Objects
 */
const material1 = new THREE.MeshBasicMaterial({ color: '#ff0000' })
// const geometry1 = new THREE.SphereGeometry(0.5,16,16)
const object1 = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 16, 16),
    new THREE.MeshBasicMaterial({ color: '#ff0000' })
)
object1.position.x = - 2
object1.name = 'object1'

const object2 = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 16, 16),
    new THREE.MeshBasicMaterial({ color: '#ff0000' })
)
object2.name = 'object2'


const object3 = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 16, 16),
    new THREE.MeshBasicMaterial({ color: '#ff0000' })
)
object3.position.x = 2
object3.name = 'object3'

scene.add(object1, object2, object3)

// if(object1!== null){
//     console.log('ada object1')
// }

//raycaster
const raycaster = new THREE.Raycaster()
// const rayOrigin = new THREE.Vector3(-3,0,0)
// const rayDirection = new THREE.Vector3(10,0,0)
// rayDirection.normalize()
// raycaster.set(rayOrigin, rayDirection)

// const intersect = raycaster.intersectObject(object2)
// console.log(intersect)

// const intersects = raycaster.intersectObjects([object1, object2, object3])
// console.log(intersects)

//score
let score = 0;

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

const mouse = new THREE.Vector2()

window.addEventListener('mousemove', (event)=>{
    mouse.x = event.clientX / sizes.width * 2 - 1
    mouse.y = -(event.clientY / sizes.height * 2 - 1)
})

window.addEventListener('click', ()=>{
    if(currentIntersect){
        if(currentIntersect.object == object1){
            object1.geometry.dispose()
            object1.material.dispose()
            scene.remove(object1)
            score += 1
            // console.log('click object1');
        }else if(currentIntersect.object == object2){
            object2.geometry.dispose()
            object2.material.dispose()
            scene.remove(object2)
            score += 1
            // console.log('click object2');
        }else if(currentIntersect.object == object3){
            object3.geometry.dispose()
            object3.material.dispose()
            scene.remove(object3)
            score += 1
            // console.log('click object3');
        }
        console.log("Score : "+ score)
    }
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 3
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

let currentIntersect = null

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()+1
    let timeInt = Math.floor(elapsedTime)
    let randomInt = Math.floor(Math.random()*5)
    const randomLala = 3
    // console.log(elapsedTime)
    // console.log(scene.getObjectByName('object1'))
    if(elapsedTime%randomLala> 0 && elapsedTime%randomLala<0.01){
        if(scene.getObjectByName('object1') === undefined){
            // console.log('object1 tidak ada')
            scene.add(object1)
        }else if(scene.getObjectByName('object1') !== undefined){
            score-=1
            console.log("Score : "+ score)
            // console.log('object1 ada')
            // scene.add(object1)
        }
    }
    // console.log(scene.getObjectByName('object1'));
    if(elapsedTime%randomLala> 0 && elapsedTime%randomLala<0.01){
        if(scene.getObjectByName('object2') === undefined){
            // console.log('object2 tidak ada')
            scene.add(object2)
        }else if(scene.getObjectByName('object2') !== undefined){
            score-=1
            console.log("Score : "+ score)
            // console.log('object2 ada')
            // scene.add(object1)
        }
    }
    if(elapsedTime%randomLala> 0 && elapsedTime%randomLala<0.01){
        if(scene.getObjectByName('object3') === undefined){
            // console.log('object3 tidak ada')
            scene.add(object3)
        }else if(scene.getObjectByName('object3') !== undefined){
            score-=1
            console.log("Score : "+ score)
            // console.log('object3 ada')
            // scene.add(object1)
        }
    }

    



    // object1.position.x = Math.sin(elapsedTime) * Math.PI * 2
    // object1.position.y = Math.cos(elapsedTime) * Math.PI * 2

    // object2.position.x = Math.sin(elapsedTime*4)* Math.PI * 2
    // object2.position.y = Math.cos(elapsedTime*4)* Math.PI * 2

    // object3.position.x = Math.sin(elapsedTime*8)* Math.PI * 2
    // object3.position.y = Math.cos(elapsedTime*8)* Math.PI * 2
    //animate object
    object1.position.x = Math.cos(elapsedTime) * 1.5
    object1.position.y = Math.sin(elapsedTime) * 1.5

    object2.position.x = Math.sin(elapsedTime * 0.8) * 1.5
    object2.position.y = Math.sin(elapsedTime * 0.8) * 1.5

    object3.position.x = Math.sin(elapsedTime * 1.4) * 1.5
    object3.position.y = Math.tan(elapsedTime * 1.4) * 1.5



    raycaster.setFromCamera(mouse, camera)
    
    // const rayOrigin = new THREE.Vector3(-3,0,0)
    // const rayDirection = new THREE.Vector3(10,0,0)
    // rayDirection.normalize()

    // raycaster.set(rayOrigin, rayDirection)

    const objectsToTest = [object1, object2, object3]
    const intersects = raycaster.intersectObjects(objectsToTest)

    for(const object of objectsToTest){
        object.material.color.set('#ff0000')
    }

    for(const intersect of intersects){
        intersect.object.material.color.set('#0000ff')
    }

    if(intersects.length){
        if(currentIntersect == null){
            // console.log('mouse enter');
        }
        currentIntersect = intersects[0]
    }else{
        if(currentIntersect){
            // console.log('mouse leave');
        }
        currentIntersect = null
    }

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()