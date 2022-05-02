import './style.css'

const app = document.querySelector<HTMLDivElement>('#app')!

app.innerHTML = `
  <h1>Hello Trybers!</h1>
`

const button = document.createElement('button')
button.textContent = 'Report'

const record = document.createElement('button')
record.textContent = 'Gravar'

const video = document.createElement('video')
video.autoplay = true
video.width = 100

document.body.appendChild(button)
document.body.appendChild(video)
document.body.appendChild(record)

button.onclick = () => {
  const media = navigator.mediaDevices.getDisplayMedia();
  media.then(stream => {
    video.srcObject = stream
    
    const blobs: Blob[] = []
    
    record.onclick = () => {
      const recorder = new MediaRecorder(stream)
      
      recorder.ondataavailable = (e) => {
        console.log(e.data);
        
        blobs.push(e.data)
      }
      recorder.start(1000)
      
      setTimeout(() => {
        recorder.stop()
        console.log(blobs)

        const a = document.createElement('a')
        a.href = URL.createObjectURL(new Blob(blobs))
        a.download = 'MinhaTela.webm'
        a.textContent = 'Download'
        a.click()
        URL.revokeObjectURL(a.href)

      }, 10000)
    }
    
  })

}