// apiCall();
let body = document.querySelector('body');

let askSection = document.querySelector('#ask');

let parentTitle = document.createElement('div');
let child = document.createElement('div');
let anchorTag = document.createElement('a');

let id = [];
let otherStories = []
let askStoriesGenLink = 'https://hacker-news.firebaseio.com/v0/askstories.json?print=pretty'
let topStoriesUrl = 'https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty'

let urlId = `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`

let alertBox = document.querySelector('#alertBox');


// This function gets us the top 100 stories
let top100list = async () => {
    let res = await fetch(topStoriesUrl);
    let data = await res.json();

    for (let i = 0; i < 100; i++) {
        id.push(data[i])
    }
    // calling second function (top100Id) at the end of the first one (top100list). This allows top100Id to begin right after top100List
    top100Id();
    // askLinks()
    // askingLinks();
}
top100list()
console.log(id);



//  This function gets us the top 100 lists ID's
let top100Id = async () => {

    for (let idNumber of id) {
        let request = await fetch(`https://hacker-news.firebaseio.com/v0/item/${idNumber}.json?print=pretty`)


        let response = await request.json();

        parentTitle = document.createElement('div');
        parentTitle.setAttribute('id', 'parent');
        child = document.createElement('div');
        anchorTag = document.createElement('a');
        body.appendChild(parentTitle);
        parentTitle.appendChild(anchorTag);
        body.appendChild(child);

        anchorTag.innerText = response.title;
        anchorTag.href = response.url;
        child.innerText = `${response.descendants} comments ${response.score} points submitted by ${response.by}`
        // console.log(response)
    }
}


let askLinks = async () => {
    let res = await fetch(askStoriesGenLink)
    let data = await res.json()

    otherStories = data;
    console.log(otherStories)
}



let askingLinks = async () => {
    console.log('this')
    for (let idNumber of otherStories) {
        let request = await fetch(`https://hacker-news.firebaseio.com/v0/item/${idNumber}.json?print=pretty`)

        let response = await request.json();
        console.log(response)

        parentTitle = document.createElement('div');
        parentTitle.setAttribute('id', 'parent');
        child = document.createElement('div');
        anchorTag = document.createElement('a');
        body.appendChild(parentTitle);
        parentTitle.appendChild(anchorTag);
        body.appendChild(child);

        anchorTag.innerText = response.title;
        anchorTag.href = response.url;
        child.innerText = `${response.descendants} comments ${response.score} points submitted by ${response.by}`

    }
}



askSection.addEventListener('click', async () => {

    await askLinks()
    await askingLinks();
    

      parentTitle.innerText = ''
      child.innerText = ''
      anchorTag = document.createElement('a');
      body.appendChild(parentTitle);
      parentTitle.appendChild(anchorTag);
      body.appendChild(child);

      anchorTag.innerText = response.title;
      anchorTag.href = response.url;
      child.innerText = `${response.descendants} comments ${response.score} points submitted by ${response.by}`


      await askLinks()
      await askingLinks();

})