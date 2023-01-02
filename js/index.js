const userName = document.getElementById('username');
const address = document.getElementById('address');
const site = document.getElementById('site');
const img = document.getElementById('imgSrc');
const bio = document.getElementById('bio');
const getid = document.getElementById('gid');
const button = document.getElementById('gbtn');
const userState = document.getElementById('userState');
const languageP = document.getElementById('programming');

const iformationBox = document.getElementsByClassName('informationbox');
const dataLocation = document.getElementsByClassName('datalocation');
const dataBlog = document.getElementsByClassName('datasite');
const bioClass = document.getElementsByClassName('bioClass');
const notFound = document.getElementsByClassName('notfound');
const programmingClass = document.getElementsByClassName('dataprogramming');


// this function is use for get user data from api or local storage
async function get_user_data(e) {
    // get id from input
    var id = getid.value;
    // check if id is not in local storage
    if (window.localStorage.getItem(id) == null) {
        // get data from api
        let data = await fetch(`https://api.github.com/users/${id}`).then((res) => res.json())
        if (data.message == "Not Found") {
            // if user not found
            notFound[0].style.display = "flex";
            iformationBox[0].style.display = "none";
            userState.style.display = "none";
        } // if user found
        else {
            // find languages
            let lng = await find_languages();
            // add languages to data
            data.languages = lng;
            // add data to local storage
            window.localStorage.setItem(id, JSON.stringify(data));
            // show data
            userState.style.display = "flex";
            userState.style.color = "red"
            userState.innerHTML = "This data is from API";
            notFound[0].style.display = "none";
            iformationBox[0].style.display = "flex";
            userName.innerHTML = data.name;
            // check if user has location
            if (data.location == null) {
                dataLocation[0].style.display = "none";
            }
            else {
                dataLocation[0].style.display = "flex";
                address.innerHTML = data.location;
            } // check if user has blog
            if (data.blog == "") {
                dataBlog[0].style.display = "none";
            }
            else {
                site.innerHTML = data.blog;
                dataBlog[0].style.display = "flex";
                /* check if the blog link is a valid link */
                if (data.blog.includes("http://") || data.blog.includes("https://")) {
                    site.href = data.blog;
                } else {
                    site.href = "http://" + data.blog;
                }
            }
            img.src = data.avatar_url;
            // check if user has bio
            if (data.bio == null) {
                bioClass[0].style.display = "none";
            } else {
                bioClass[0].style.display = "flex";
                bio.innerHTML = data.bio;
            }
            // check if user has programming languages
            if (data.languages == null) {
                programmingClass[0].style.display = "none";
            } else {
                programmingClass[0].style.display = "flex";
                languageP.innerHTML = data.languages;
            }
        }
    }
    else {
        // if user is in local storage
        // show data
        userState.style.display = "flex";
        userState.style.color = "green";
        userState.innerHTML = "This data is from Local Storage";
        notFound[0].style.display = "none";
        iformationBox[0].style.display = "flex";
        var data = JSON.parse(window.localStorage.getItem(id));
        userName.innerHTML = data.name;
        // check if user has location
        if (data.location == null) {
            dataLocation[0].style.display = "none";
        }
        else {
            dataLocation[0].style.display = "flex";
            address.innerHTML = data.location;
        } // check if user has blog
        if (data.blog == "") {
            dataBlog[0].style.display = "none";
        }
        else {
            site.innerHTML = data.blog;
            dataBlog[0].style.display = "flex";
            /* check if the blog link is a valid link */
            if (data.blog.includes("http://") || data.blog.includes("https://")) {
                site.href = data.blog;
            } else {
                site.href = "http://" + data.blog;
            }
        }
        img.src = data.avatar_url;
        // check if user has bio
        if (data.bio == null) {
            bioClass[0].style.display = "none";
        } else {
            bioClass[0].style.display = "flex";
            bio.innerHTML = data.bio;
        } // check if user has programming languages
        if (data.languages == null) {
            programmingClass[0].style.display = "none";
        } else {
            programmingClass[0].style.display = "flex";
            languageP.innerHTML = data.languages;
        }
    }
}

/* 
using https://api.github.com/users/amirrezarajabi/repos 
find 5 last push repos
find their languages
*/
async function find_languages(){
    var id = getid.value;
    let data = await fetch(`https://api.github.com/users/${id}/repos`)
    .then((res) => res.json())
    let lengh = data.length;
    // minimum of lengh and 5
    let min_ = Math.min(lengh, 5);
    // sort data by pushed_at
    data.sort((a, b) => (a.pushed_at > b.pushed_at) ? 1 : -1);
    // get last 5 pushed_at
    let pushed_at = data.slice(lengh - min_, lengh);
    // get languages of last 5 pushed_at
    let languages = pushed_at.map((item) => item.language);
    // remove all null values
    languages = languages.filter((item) => item != null);
    let most_used_language = mode(languages);
    // return as string
    return most_used_language;
}

/**
 * this function return most frequenced elem in array
 * @param {*} array 
 * @returns string
 */
function mode(array)
{
    if(array.length == 0)
        return null;
    var modeMap = {};
    var maxEl = array[0], maxCount = 1;
    for(var i = 0; i < array.length; i++)
    {
        var el = array[i];
        if(modeMap[el] == null)
            modeMap[el] = 1;
        else
            modeMap[el]++;  
        if(modeMap[el] > maxCount)
        {
            maxEl = el;
            maxCount = modeMap[el];
        }
    }
    return maxEl;
}

button.addEventListener('click', get_user_data);
button.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        get_user_data();
    }
});