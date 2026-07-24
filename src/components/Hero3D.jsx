import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function Hero3D() {
  const mountRef = useRef(null)

  useEffect(() => {
    const mount = mountRef.current
    const width = mount.clientWidth
    const height = mount.clientHeight

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100)
    camera.position.z = 6

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    mount.appendChild(renderer.domElement)

    const geo = new THREE.IcosahedronGeometry(1.8, 1)
    const wireGeo = new THREE.WireframeGeometry(geo)
    const material = new THREE.LineBasicMaterial({ color: 0x2563eb, transparent: true, opacity: 0.8 })
    const mesh = new THREE.LineSegments(wireGeo, material)
    scene.add(mesh)

    const coreGeo = new THREE.IcosahedronGeometry(0.9, 0)
    const coreMat = new THREE.MeshBasicMaterial({ color: 0x7c3aed, transparent: true, opacity: 0.15, wireframe: true })
    const core = new THREE.Mesh(coreGeo, coreMat)
    scene.add(core)

    const pointsGeo = new THREE.BufferGeometry()
    const pointCount = 60
    const positions = new Float32Array(pointCount * 3)
    for (let i = 0; i < pointCount; i++) {
      const r = 2.4 + Math.random() * 1.2
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = r * Math.cos(phi)
    }
    pointsGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    const pointsMat = new THREE.PointsMaterial({ color: 0x4ade80, size: 0.035, transparent: true, opacity: 0.7 })
    const points = new THREE.Points(pointsGeo, pointsMat)
    scene.add(points)

    let mouseX = 0, mouseY = 0
    let targetRotX = 0, targetRotY = 0

    const onMouseMove = e => {
      const rect = mount.getBoundingClientRect()
      mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1
      mouseY = ((e.clientY - rect.top) / rect.height) * 2 - 1
      targetRotY = mouseX * 0.5
      targetRotX = mouseY * 0.3
    }
    window.addEventListener('mousemove', onMouseMove)

    let raf
    const clock = new THREE.Clock()
    const animate = () => {
      const t = clock.getElapsedTime()
      mesh.rotation.y += (targetRotY - mesh.rotation.y) * 0.04 + 0.0025
      mesh.rotation.x += (targetRotX - mesh.rotation.x) * 0.04
      core.rotation.y -= 0.004
      core.rotation.x += 0.002
      points.rotation.y += 0.0008
      const scale = 1 + Math.sin(t * 1.2) * 0.03
      mesh.scale.setScalar(scale)

      renderer.render(scene, camera)
      raf = requestAnimationFrame(animate)
    }
    animate()

    const onResize = () => {
      const w = mount.clientWidth, h = mount.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', onResize)

    const applyThemeColors = () => {
      const dark = document.documentElement.getAttribute('data-theme') === 'dark'
      material.color.set(dark ? 0x4f8ef7 : 0x2563eb)
    }
    applyThemeColors()
    const themeObserver = new MutationObserver(applyThemeColors)
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', onResize)
      themeObserver.disconnect()
      mount.removeChild(renderer.domElement)
      geo.dispose(); wireGeo.dispose(); material.dispose()
      coreGeo.dispose(); coreMat.dispose()
      pointsGeo.dispose(); pointsMat.dispose()
      renderer.dispose()
    }
  }, [])

  return <div ref={mountRef} style={{ width: '100%', height: '100%' }} />
}