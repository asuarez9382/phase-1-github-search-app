
//Renders repos and add to the dom
function renderRepos(data) {
    console.log(data)
    const reposList = document.querySelector("#repos-list")
    const title = document.createElement("h4")
    title.textContent = "Repository List"
    reposList.appendChild(title)
    data.forEach((repo) => {
        let li = document.createElement("li")
        li.textContent = repo['url']
        reposList.appendChild(li)
    })
}

//Renders User information
function renderUser(data) {
    const userList = document.querySelector("#user-list")
    for(user of data['items']) {
        let liUserName = document.createElement('li')
        let liUrl = document.createElement('li')
        let imgAvatar = document.createElement('img')
        
        imgAvatar.src = user.avatar_url
        liUserName.textContent = `
            Username: ${user.login}
        `
        liUrl.textContent = `
            URL: ${user.url}
        `

        userList.appendChild(imgAvatar)
        userList.appendChild(liUserName)
        userList.appendChild(liUrl)

        //let userName = user.login
        //Add event listener to Avatar
        imgAvatar.addEventListener("click", (e) => {
            fetch(`https://api.github.com/users/${user.login}/repos`, {
            method: "GET",
            headers:{
                "Content-Type": "application/json",
                Accept: "application/vnd.github.v3+json"
                }
            })
            .then( res=> res.json())
            .then(data => renderRepos(data))
        })
    }
}



//Handles form submit
function handleSubmit(e) {
    e.preventDefault()
    const inputValue = document.querySelector("#search")
    const inputText = inputValue.value
    fetch(`https://api.github.com/search/users?q=${inputText}`, {
        method: "GET",
        headers:{
            "Content-Type": "application/json",
            Accept: "application/vnd.github.v3+json"
        }
    })
    .then( res=> res.json())
    .then(data => renderUser(data))
}


const form = document.querySelector("#github-form")

form.addEventListener("submit", handleSubmit)