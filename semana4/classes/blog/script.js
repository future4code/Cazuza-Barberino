
let postForm = document.getElementById("post-form");
let postArea = document.getElementById("post-area");

let postList = [];

class Post{
    constructor(title, author, content){
        this.title = title;
        this.author = author;
        this.content = content;
    }
}


const NewPost = () =>{
    let title = document.getElementById("title").value;
    let author = document.getElementById("author").value;
    let content = document.getElementById("content").value;

    postList.push(new Post(title, author, content));

    console.log(postList);
}

const GoToPosts = () =>{
    postForm.style.display = "none";
    postArea.style.display = "flex";
}

const GoToCreatePosts = () =>{
    postForm.style.display = "flex";
    postArea.style.display = "none";
}
