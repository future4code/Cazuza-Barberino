let postForm = document.getElementById("post-form");
let postArea = document.getElementById("post-area");

let postList = [];

class Post {
  constructor(title, author, content) {
    this.title = title;
    this.author = author;
    this.content = content;
  }
}

const NewPost = () => {
  let title = document.getElementById("title");
  let author = document.getElementById("author");
  let content = document.getElementById("content");

  let post = new Post(title.value, author.value, content.value);

  CreatePost(post);

  postList.push(post);
  console.log(postList);

  title.value = author.value = content.value = "";
};

const CreatePost = post =>{
    postArea.innerHTML +=
    "<div class='post'>" +
    "<h2>" +
    post.title +
    "</h2>" +
    "<h3>" +
    post.author +
    "</h3>" +
    "<p>" +
    post.content +
    "</p>";
}

const GoToPosts = () => {
  postForm.style.display = "none";
  postArea.style.display = "flex";
};

const GoToCreatePosts = () => {
  postForm.style.display = "flex";
  postArea.style.display = "none";
};
