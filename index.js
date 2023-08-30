const loadPhone = async (searchPhone, isShowAll) => {
   const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchPhone}`)
   const data = await res.json()
   const phones = data.data
//    console.log(phones);
   displayPhones(phones, isShowAll)
}

// display phones dinamically

const displayPhones = (phones, isShowAll) => {
    console.log(phones);
    const phonesContainer = document.getElementById('phones-container')

   //  clear previous search
   phonesContainer.textContent = ''

   // if(data.length == 0){
   //    spinner(true)
   // }

   // display show all button by conditions
   const showButton = document.getElementById('show-all-button')

   if(phones.length > 12 && !isShowAll){
      showButton.classList.remove('hidden')
   }
   else{
      showButton.classList.add('hidden')
   };
   // display 1st 12 selected phones if not show all
   if(!isShowAll){
      phones = phones.slice(0,12)
   }

    phones.forEach(phone =>{
        // console.log(phone);
        const phoneCard = document.createElement('div')
        phoneCard.classList = 'card p-4 bg-gray-100 shadow-xl'
        phoneCard.innerHTML = `

        <figure><img src="${phone.image}"></figure>
     <div class="card-body">
     <h2 class="card-title">${phone.phone_name}</h2>
     <p>There are many variations of passages of available, but the majority have suffered</p>
     <div class="card-actions justify-end">
     <P>$999</p>
     <button onclick="showDetails('${phone.slug}')" class="btn btn-primary capitalize">Show Details</button>
     </div>
        </div>

        `
     phonesContainer.appendChild(phoneCard)
    })
    spinner(false)
}

// input search button for display phones
const handleSearch = (isShowAll) => {
   spinner(true)
   const inputText = document.getElementById('input-text')
   const searchPhone = inputText.value
   // console.log(searchPhone)
   loadPhone(searchPhone, isShowAll) 
}

// spinner setting
const spinner = (isLoading) =>{
   const loadingSpinner = document.getElementById('loading-spinner')
   if(isLoading){
      loadingSpinner.classList.remove('hidden')
   }
   else{
      loadingSpinner.classList.add('hidden')
   }
}

// show all button
const handleShowAll = () => {
   handleSearch(true)

}

// show details with modal
const showDetails = async(id) => {
const res = await fetch(` https://openapi.programming-hero.com/api/phone/${id}`)
const data = await res.json()
const phone = data.data;
showModals(phone)
}

const showModals = (phone) => {
   console.log(phone);
   const nameDetail = document.getElementById('name-detail')
   nameDetail.innerText = phone.name

   const allDetails = document.getElementById('all-details')
   allDetails.innerHTML = `
   <img src="${phone.image}" alt="" />
   <p><span>GPS: </span>${phone?.others?.GPS ? phone?.others?.GPS  : 'no gps'}</p>
   `

   // show modal function call from daisyui
   show_modal_5.showModal()
}


// loadPhone()