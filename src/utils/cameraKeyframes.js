import * as THREE from 'three'

export function buildKeyframes(projects, SCENE) {
  const {
    TUNNEL_WIDTH, CAMERA_Y,
    SEGMENT_LENGTH, BUFFER_START, BUFFER_END,
    PHASE_TRAVEL, PHASE_ROTATE_IN, PHASE_HOLD, PHASE_ROTATE_OUT,
  } = SCENE

  const totalZ = BUFFER_START + projects.length * SEGMENT_LENGTH + BUFFER_END
  const keyframes = []

  // Identity quaternion = camera looks in -Z direction (Three.js default / hallway forward)
  const forwardQuat = new THREE.Quaternion()

  let prevRotOutEnd = 0
  let prevCameraZ = 0

  projects.forEach((project, i) => {
    const segStartZ = BUFFER_START + i * SEGMENT_LENGTH
    const posterZ = -(segStartZ + SEGMENT_LENGTH * 0.5)
    // Camera stops slightly before the poster's Z so the poster is ahead-and-to-the-side
    const stopZ = posterZ + SEGMENT_LENGTH * 0.25

    const segStartNorm = segStartZ / totalZ
    const segEndNorm = (segStartZ + SEGMENT_LENGTH) / totalZ
    const segLen = segEndNorm - segStartNorm

    const travelEnd  = segStartNorm + segLen * PHASE_TRAVEL
    const rotInEnd   = travelEnd    + segLen * PHASE_ROTATE_IN
    const holdEnd    = rotInEnd     + segLen * PHASE_HOLD
    const rotOutEnd  = holdEnd      + segLen * PHASE_ROTATE_OUT

    // Wall-facing look-at target (inset from wall surface for a natural angle)
    const wallX = project.wall === 'left'
      ? -(TUNNEL_WIDTH / 2 - 0.8)
      : (TUNNEL_WIDTH / 2 - 0.8)
    const lookAtPoint = new THREE.Vector3(wallX, CAMERA_Y, posterZ)

    // Compute wall-facing quaternion via lookAt
    const eye = new THREE.Vector3(0, CAMERA_Y, stopZ)
    const m = new THREE.Matrix4().lookAt(eye, lookAtPoint, new THREE.Vector3(0, 1, 0))
    const wallQuat = new THREE.Quaternion().setFromRotationMatrix(m)

    keyframes.push({
      type: 'travel',
      scrollStart: prevRotOutEnd,
      scrollEnd: travelEnd,
      cameraZStart: prevCameraZ,
      cameraZEnd: stopZ,
      cameraY: CAMERA_Y,
      forwardQuat: forwardQuat.clone(),
      projectIndex: i,
    })

    keyframes.push({
      type: 'rotate_in',
      scrollStart: travelEnd,
      scrollEnd: rotInEnd,
      cameraZ: stopZ,
      cameraY: CAMERA_Y,
      fromQuat: forwardQuat.clone(),
      toQuat: wallQuat.clone(),
      projectIndex: i,
    })

    keyframes.push({
      type: 'hold',
      scrollStart: rotInEnd,
      scrollEnd: holdEnd,
      cameraZ: stopZ,
      cameraY: CAMERA_Y,
      wallQuat: wallQuat.clone(),
      projectIndex: i,
    })

    keyframes.push({
      type: 'rotate_out',
      scrollStart: holdEnd,
      scrollEnd: rotOutEnd,
      cameraZ: stopZ,
      cameraY: CAMERA_Y,
      fromQuat: wallQuat.clone(),
      toQuat: forwardQuat.clone(),
      projectIndex: i,
    })

    prevRotOutEnd = rotOutEnd
    prevCameraZ = stopZ
  })

  return keyframes
}

export function evaluateCamera(scrollOffset, keyframes) {
  if (!keyframes.length) return null

  const kf = keyframes.find(
    k => scrollOffset >= k.scrollStart && scrollOffset <= k.scrollEnd
  ) ?? keyframes[keyframes.length - 1]

  const raw = kf.scrollEnd === kf.scrollStart
    ? 1
    : (scrollOffset - kf.scrollStart) / (kf.scrollEnd - kf.scrollStart)
  const t = easeInOutCubic(Math.min(1, Math.max(0, raw)))

  const position = new THREE.Vector3()
  const quaternion = new THREE.Quaternion()
  let activeProjectIndex = null

  switch (kf.type) {
    case 'travel':
      position.set(0, kf.cameraY, lerp(kf.cameraZStart, kf.cameraZEnd, t))
      quaternion.copy(kf.forwardQuat)
      break

    case 'rotate_in':
      position.set(0, kf.cameraY, kf.cameraZ)
      quaternion.slerpQuaternions(kf.fromQuat, kf.toQuat, t)
      break

    case 'hold':
      position.set(0, kf.cameraY, kf.cameraZ)
      quaternion.copy(kf.wallQuat)
      activeProjectIndex = kf.projectIndex
      break

    case 'rotate_out':
      position.set(0, kf.cameraY, kf.cameraZ)
      quaternion.slerpQuaternions(kf.fromQuat, kf.toQuat, t)
      break
  }

  return { position, quaternion, activeProjectIndex }
}

function lerp(a, b, t) { return a + (b - a) * t }

function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}
