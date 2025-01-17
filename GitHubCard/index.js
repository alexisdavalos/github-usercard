/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/
axios.get('https://api.github.com/users/alexisdavalos')
.then(response=>{
  const newCard = gitCard(response.data);
  cardsParent.appendChild(newCard);
})
.then(function(){
  return axios.get('https://api.github.com/users/alexisdavalos/followers')
  .then(response =>{
    //loop through response
    response.data.forEach((item) =>{
  
      axios.get(`https://api.github.com/users/${item.login}`)
        .then(response=>{
          const newCard = gitCard(response.data);
          cardsParent.appendChild(newCard);
          console.log(response.data.login);
      })//end 
      .catch(error =>{
        console.log("The data was not returned", error)
      })

    })//end loop
   
  })
})
/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

   Skip to Step 3.
*/

/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/
const cardsParent = document.querySelector('.cards');

/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/

// const followersArray = ['FreedomWriter', 'thericktastic', 'agohorel', 'anamonteiro430', 'lucasgreenwell', 'nicbongo', 'PHONGdotTech', 'davebettswebdev', 'alexandercsierra', 'aalvinlin', 'lisabpink', 'Cireimu'];

// followersArray.forEach(item =>{
//   axios.get(`https://api.github.com/users/${item}`)
//     .then(response=>{

//       const newCard = gitCard(response);
//       cardsParent.appendChild(newCard);
//   })
//     .catch(error =>{
//       console.log("The Github Data Was Not Returned", error)
//     })
// })

/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element: 

<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:  
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>
*/

function gitCard(obj){
  //create component elements
  const card = document.createElement('div'),
        usrImg = document.createElement('img'),
        cardInfo = document.createElement('div'),
        name = document.createElement('h3'),
        userName = document.createElement('p'),
        location = document.createElement('p'),
        profile = document.createElement('p'),
        profileLink = document.createElement('a'), //populate href and content
        followers = document.createElement('p'),
        following = document.createElement('p'),
        bio = document.createElement('p'),
        repos = document.createElement('p'),
        cardExtraInfo = document.createElement('div'),
        buttons = document.createElement('div'),
        openButton = document.createElement('span'),
        closeButton = document.createElement('span');


  //add content to elements
  usrImg.src = obj.avatar_url;
  name.textContent = obj.name;
  userName.textContent = obj.login;
  location.textContent = obj.location;
  profileLink.textContent = "Visit Profile";
  profileLink.href = obj.html_url;
  profileLink.target = "_blank";
  followers.textContent = `Followers: ${obj.followers}`;
  following.textContent = `Following: ${obj.following}`;

  //Check null bio
  if(obj.bio === null){
    bio.textContent = 'This User Has No Bio :(';
    bio.classList.toggle('noBio');
  }else{
    bio.textContent = `Bio: ${obj.bio}`;
    bio.classList.toggle('bio');
  }

  repos.textContent = `Public Repos: ${obj.public_repos}`;
  openButton.textContent = `See More \u25bc`;
  closeButton.textContent = `See Less \u25b2`;

  //add element classes
  card.classList.add('card');
  cardInfo.classList.add('card-info');
  name.classList.add('name');
  userName.classList.add('username');
  cardExtraInfo.classList.add('extraInfo');
  openButton.classList.add('expandButton');
  closeButton.classList.add('expandButton', 'hide');
  buttons.classList.add('buttons');
  profile.classList.add('profileButton');
  
  //append elements
  card.appendChild(usrImg);
  card.appendChild(cardInfo);
  cardInfo.appendChild(name);
  cardInfo.appendChild(userName);
  cardInfo.appendChild(location);
  cardInfo.appendChild(profile);
  profile.appendChild(profileLink);
  cardExtraInfo.appendChild(followers);
  cardExtraInfo.appendChild(following);
  cardInfo.appendChild(buttons);
  buttons.appendChild(openButton);
  buttons.appendChild(closeButton);
  cardInfo.appendChild(cardExtraInfo);
  cardExtraInfo.appendChild(bio);

  //add event listener to toggle paragraph content
  buttons.addEventListener('click', () =>{
    openButton.classList.toggle('hide');
    closeButton.classList.toggle('hide');
    cardExtraInfo.classList.toggle('extraInfo-open');
    cardExtraInfo.style.transition = "0.3s";
  })

  return card;
}

/* List of LS Instructors Github username's: 
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/
