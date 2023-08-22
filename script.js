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
fetch(`https://restcountries.com/v2/name/${country}`).then(response=>
response.json() //json also returns a promise
).then(data=>
   { renderCountry(data[0])
const neighbour=data[0].borders[0];
if(!neighbour)return;
 return fetch(`https://restcountries.com/v2/alpha/${neighbour}`)
}).then(response=>response.json()).then(data=>renderCountry(data,'neighbour'))
.catch(err =>alert(err));
// rendererror(`{error.message}`)});

}
btn.addEventListener('click',function(){
  getCountry('portugal')
})
