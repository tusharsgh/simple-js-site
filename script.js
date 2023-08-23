'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

// const getCountry=function(country){
// const request= new XMLHttpRequest();
// request.open('GET',`https://restcountries.com/v2/name/${country}`);
// request.send();
// // console.log(request.responseText);
// request.addEventListener('load',function(){
//     const [data] = JSON.parse(this.responseText);
//     console.log(data);
//     const html=`
//     <article class="country">
//           <img class="country__img" src="${data.flag}"></img> 
//           <div class="country__data">
//             <h3 class="country__name">${data.name}</h3>
//             <h4 class="country__region">${data.region}</h4>
//             <p class="country__row"><span>👫</span>${(+data.population/1000000).toFixed()}</p>
//             <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
//             <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
//           </div>
//         </article>
//     `;
//     countriesContainer.insertAdjacentHTML('beforeend',html)
//     countriesContainer.style.opacity =1;
// });}
// getCountry('portugal')
// getCountry('usa')

const renderCountry = function(data,className='')
{
    const html=`
        <article class="country ${className}">
              <img class="country__img" src="${data.flag}"></img> 
              <div class="country__data">
                <h3 class="country__name">${data.name}</h3>
                <h4 class="country__region">${data.region}</h4>
                <p class="country__row"><span>👫</span>${(+data.population/1000000).toFixed()}M</p>
                <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
                <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
              </div>
            </article>
        `;
        countriesContainer.insertAdjacentHTML('beforeend',html)
        countriesContainer.style.opacity =1; 
}
// const getCountry=function(country){
//     const request= new XMLHttpRequest();
//     request.open('GET',`https://restcountries.com/v2/name/${country}`);
//     request.send();
//     // console.log(request.responseText);
//     request.addEventListener('load',function(){
//         const [data] = JSON.parse(this.responseText);
//         console.log(data);
//         renderCountry(data);

//         const [neighbours] =data.borders;
//         if(!neighbours)return ;

//         const request2= new XMLHttpRequest();
//         request2.open('GET',`https://restcountries.com/v2/alpha/${neighbours}`);
//         request2.send()
//         request2.addEventListener('load',function(){
//             const data2=JSON.parse(this.responseText);
//             console.log(data2);
//             renderCountry(data2);
//         })
        
        
//     });}

//     getCountry('portugal')

 const rendererror=function(msg){
  countriesContainer.insertAdjacentElement('beforeend',msg);
  countriesContainer.style.opacity=1;
}
const getCountry =function(country){
fetch(`https://restcountries.com/v2/name/${country}`).then(response=>{
if(!response.ok) throw new Error(`country not found: ${country}`);
return response.json()} //json also returns a promise
).then(data=>
   { renderCountry(data[0])
const neighbour=data[0].borders[0];
if(!neighbour)return;
 return fetch(`https://restcountries.com/v2/alpha/${neighbour}`)
}).then(response=>response.json()).then(data=>renderCountry(data,'neighbour'))
.catch(err =>{
  rendererror(`error ${err.message}`)});
// rendererror(`{error.message}`)});

}


// const luckypromis =new Promise((resolve,reject)=>{
//  console.log('lucky draw is happening');
// setTimeout(function(){
//   if(Math.random()>0.5){
//     resolve('you win')}
//   else{ reject(new Error('you loose'))}
  
// },2000)
// });

// luckypromis.then(res=>console.log(res)).catch(err=>console.error(err));
// const wait= function(seconds){
//   return new Promise(function(resolve){
//     settimeout(resolve,seconds*1000)
//   })
// }
// wait(2).then(()=>{console.log('waited for 2seconds')})

// navigator.geolocation.getCurrentPosition(position=>console.log(position),err=>console.error(err))
const getPromise= function(){
  return new Promise(function(resolve,reject){
   
navigator.geolocation.getCurrentPosition(position=>resolve(position),err=>reject(err)) 
  })
}


// const whereAmI = function () {
//   getPromise().then(res=>{
// const {latitude:lat,longitude:lng} = res.coords;
// return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
//   }) .then(res => {
//       if (!res.ok) throw new Error(`Problem with geocoding ${res.status}`);
//       return res.json();
//     })
//     .then(data => {
//       console.log(data);
//       console.log(`You are in ${data.city}, ${data.country}`);

//       return fetch(`https://restcountries.eu/rest/v2/name/${data.country}`);
//     })
//     .then(res => {
//       if (!res.ok) throw new Error(`Country not found (${res.status})`);

//       return res.json();
//     })
//     .then(data => renderCountry(data[0]))
//     .catch(err => console.error(`${err.message} 💥`));
// };
// btn.addEventListener('click',whereAmI
// )
const whereAmI=async function(country) {
  const res= await fetch(`https://restcountries.com/v2/name/${country}`)
  const data= await res.json();
  console.log(data);
renderCountry(data[0]);
}
whereAmI('portugal');
