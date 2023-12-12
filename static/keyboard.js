function arrows(e) {
if (e.key === 'ArrowRight') {
    state += 1
    if(state > 4){
      state = 4
    }
    tabs(state)
}
if (e.key === 'ArrowLeft') {
  state -= 1
  if(state < 1){
    state = 1
  }
  tabs(state)
}

if (e.key === 'ArrowUp') {
  update_date(true)
}

if (e.key === 'ArrowDown') {
  update_date(false)
}

}

  
function checkDirection() {
if (touchendX > touchstartX && (touchendX-touchstartX) > 125){ 
  state -= 1
  if(state < 1){
    state = 1
  }
  tabs(state)    
}
if (touchendX < touchstartX && (touchendX-touchstartX) < -125){
  state += 1
  if(state > 3){
    state = 3
  }
  tabs(state) 
}
}

document.addEventListener('keyup', arrows, false);


let touchstartX = 0
let touchendX = 0

document.addEventListener('touchstart', e => {
    touchstartX = e.changedTouches[0].screenX
    })
    
    document.addEventListener('touchend', e => {
    touchendX = e.changedTouches[0].screenX
    checkDirection()
})