const userName = document.getElementById('username');
const address = document.getElementById('address');
const site = document.getElementById('site');
const img = document.getElementById('imgSrc');
const bio = document.getElementById('bio');
const getid = document.getElementById('gid');
const button = document.getElementById('gbtn');

const iformationBox = document.getElementsByClassName('informationbox');
const dataLocation = document.getElementsByClassName('datalocation');
const dataBlog = document.getElementsByClassName('datasite');


async function get_user_data(e){
    var id = getid.value;
    iformationBox[0].style.display = "flex";
    fetch(`https://api.github.com/users/${id}`)
    .then((res) => res.json())
    .then((data) => {
        userName.innerHTML = data.name;
        if (data.location == null){
            dataLocation[0].style.display = "none";
        }
        else{
            dataLocation[0].style.display = "flex";
            address.innerHTML = data.location;
        }
        if (data.blog == ""){
            dataBlog[0].style.display = "none";
        }
        else{
            site.innerHTML = data.blog;
            dataBlog[0].style.display = "flex";
        }
        img.src = data.avatar_url;
        bio.innerHTML = data.bio;
    })
}

button.addEventListener('click', get_user_data);