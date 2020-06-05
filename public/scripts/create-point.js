function populateUFs() {
  const ufSelect = document.querySelector("select[name=uf]")

  fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( res => res.json() )
    .then( states => {
      for( state of states ) {
        ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>` // interpolação
        
        /* FORMA ALTERNATIVA E MAIS VERBOSA */
        /*
        let optionElement = document.createElement('option');
        optionElement.setAttribute('value', `${value+=1}`);
        let stateName = document.createTextNode(`${state.nome}`);
        optionElement.appendChild(stateName);

        ufSelect.appendChild(optionElement)
         */
      }
    })
}


populateUFs()

function getCities(event) {
  const citySelect = document.querySelector("select[name=city]")
  const stateInput = document.querySelector("[name=state]")

  const ufValue = event.target.value

  const indexOfSelectedState = event.target.selectedIndex
  stateInput.value = event.target.options[indexOfSelectedState].text


  const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`
  citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
  citySelect.disabled = true

  fetch(url)
    .then( res => res.json() )
    .then( cities => {
      
      for( const city of cities ) {
        citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
      }

      citySelect.disabled = false
    })
}

const collectedItems = document.querySelector("input[name=items]")

let selectedItems = [] // stores selected items ID

function handleSelectedItem(event) {
  const itemLi = event.target // HTML li ELEMENT
  const itemId = itemLi.dataset.id
  
  // add or remove a class from li element with JS
  itemLi.classList.toggle("selected")

  /* WORK WITH DATA THAT IS SEND FOR API */
  // verify if there is selected items (se está no array),
  // if true return the index of selected item
  const alreadySelected = selectedItems.findIndex( item => item == itemId )

  // if already selected, remove of selection
  if( alreadySelected != -1 ) {
    // remove from array with filter
    const filteredItems = selectedItems.filter( item => {
      const itemIsDifferent = item != itemId
      return itemIsDifferent
    })
    selectedItems = filteredItems
  } else {
    // if not already selected, add to selection
    selectedItems.push(itemId)
  }
  
  // update the hidden input with the selected items
  collectedItems.value = selectedItems
}

document
  .querySelector("select[name=uf]")
  .addEventListener("change", getCities )

const itemsToCollect = document.querySelectorAll(".items-grid li")

for (const item of itemsToCollect ) {
  item.addEventListener("click", handleSelectedItem)
}