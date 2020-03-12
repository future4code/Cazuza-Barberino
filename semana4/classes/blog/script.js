let postForm = document.getElementById("post-form");
let postArea = document.getElementById("post-area");

let postList = [];

class Post {
  constructor(title, author, image, content) {
    this.title = title;
    this.author = author;
    this.image = image;
    this.content = content;
  }
}

const NewPost = () => {
  let title = document.getElementById("title");
  let author = document.getElementById("author");
  let content = document.getElementById("content");
  let image = document.getElementById("image");

  if (!ValidImage(image.value)) image.value = "";

  let post = new Post(title.value, author.value, image.value, content.value);

  CreatePost(post);

  postList.push(post);
  console.log(postList);

  title.value = author.value = content.value = image.value = "";
  GoToPosts();
};

const CreatePost = post => {
  postArea.innerHTML +=
    "<div class='post'>" +
    "<h2>" +
    post.title +
    "</h2>" +
    "<h3>" +
    post.author +
    "</h3>" +
    (post.image != "" ? "<img src=" + post.image + ">" : "") +
    "<p>" +
    post.content +
    "</p>";
};

const ValidImage = image => {
  return (
    image.includes(".png") || image.includes(".jpeg") || image.includes(".jpg")
  );
};

const GoToPosts = () => {
  postForm.style.display = "none";
  postArea.style.display = "flex";
};

const GoToCreatePosts = () => {
  postForm.style.display = "flex";
  postArea.style.display = "none";
};
