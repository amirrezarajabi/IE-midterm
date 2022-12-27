const userName = document.getElementById('username');
const address = document.getElementById('address');
const site = document.getElementById('site');
const img = document.getElementById('imgSrc');
const bio = document.getElementById('bio');
const getid = document.getElementById('gid');
const button = document.getElementById('gbtn');
//const hyperLink = document.getElementById('hyperlink');

const iformationBox = document.getElementsByClassName('informationbox');
const dataLocation = document.getElementsByClassName('datalocation');
const dataBlog = document.getElementsByClassName('datasite');
const bioClass = document.getElementsByClassName('bioClass');
const notFound = document.getElementsByClassName('notfound');

async function get_user_data(e){
    var id = getid.value;
    fetch(`https://api.github.com/users/${id}`)
    .then((res) => res.json())
    .then((data) => {
        if (data.message == "Not Found"){
            notFound[0].style.display = "flex";
            iformationBox[0].style.display = "none";
        }
        else{
            notFound[0].style.display = "none";
            iformationBox[0].style.display = "flex";
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
                /* check if the blog link is a valid link */
                if (data.blog.includes("http://") || data.blog.includes("https://")){
                    site.href = data.blog;
                } else {
                    site.href = "http://" + data.blog;
                }
            }
            img.src = data.avatar_url;
            console.log(data.bio);
            if (data.bio == null){
                bioClass[0].style.display = "none";
            } else {
                bioClass[0].style.display = "flex";
                bio.innerHTML = data.bio;
            }
        }
    })
}

button.addEventListener('click', get_user_data);