

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
