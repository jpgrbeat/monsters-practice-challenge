
document.addEventListener('DOMContentLoaded',function(){
  let num = 1;
  const monsterPen = document.getElementById('monster-container')
  const forwardButton = document.getElementById('forward')
  const backButton = document.getElementById('back')
  const createButton = document.getElementById('monst-button')
  const monsterForm = document.getElementById('monster-create')

  const nameBox = document.getElementById('name')
  const ageBox = document.getElementById('age')
  const descriptionBox = document.getElementById('description')

  document.addEventListener('load',postMonsters(monsterPen,num))
  forwardButton.addEventListener('click', function () {
    num++;
    postMonsters(monsterPen,num)
  })


  backButton.addEventListener('click', function () {
    num--;
    postMonsters(monsterPen, num)
  })



  createButton.addEventListener('click', function () {
     let name = nameBox.value
     let age = ageBox.value
     let description = descriptionBox.value
     createMonster(name,age,description)

     monsterForm.reset();

  })

})


function postMonsters(tag,num){
  console.log(`inside ${num}`)
  if(num < 1){
    num = 1
    alert("Ain't no Monsters here!")
  }
  tag.innerHTML = ""
  console.log(num)
  // fetch(`http://localhost:3000/monsters/?_limit=50_&page=${num}`)
  fetch(`http://localhost:3000/monsters/?_limit=50&_page=${num}`)
  .then(res => res.json())
  .then(function (json) {

    for(let i = 0; i < json.length; i++){
      let monsterDiv = document.createElement('div')
      let monsterP = document.createElement('p');
      let monsterH2 = document.createElement('h2')
      let monsterH4 = document.createElement('h4')

      monsterH2.innerHTML = `Name: ${json[i].name}`
      monsterH4.innerHTML = `Age: ${json[i].age}`
      monsterP.innerHTML = `Description: ${json[i].description}`

      tag.appendChild(monsterDiv)
      monsterDiv.appendChild(monsterH2)
      monsterDiv.appendChild(monsterH4)
      monsterDiv.appendChild(monsterP)

    }


  })
}

function createMonster(name,age,description) {
  fetch(`http://localhost:3000/monsters/`, {
    "method": "POST",
    headers: {
      "Accept": "application/json",
      "Content-type": "application/json"
    },
    "body": JSON.stringify({
      "name": name,
      "age": age,
      'description': description
    })

  })
}
