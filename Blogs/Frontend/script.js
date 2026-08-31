const form = document.querySelector(".form");

const title = document.getElementById("title");
const author = document.getElementById("author");
const content = document.getElementById("content");

const handleSubmit = async (event) => {
  event.preventDefault();

  try {
    const res = await axios.post(`${API1}/post`, {
      title: title.value,
      author: author.value,
      content: content.value,
    });

    await getAllBlogs();
    title.value="",
    author.value="",
    content.value=""

    console.log(res.data);
  } catch (error) {
    console.error(error.message);
  }
};

form.addEventListener("submit", handleSubmit);

const API1 = "http://localhost:3000/blogs";
const API2 = "http://localhost:3000/comments";

const getAllBlogs = async () => {
  try {
    const res = await axios.get(`${API1}/get`);
    DisplayBlogs(res.data);
  } catch (error) {
    console.log(error.message);
  }
};

const getAllComments = async (blogId) => {
  try {
    const result = await axios.get(`${API2}/comments?blogId=${blogId}`);

    return result.data;
  } catch (error) {
    console.log(error.message);
    return [];
  }
};

const DisplayBlogs = (blog) => {
  try {
    const blogArea = document.querySelector(".blogs");

    blogArea.innerHTML = "";

    blog.forEach(async (element) => {
      const newDiv = document.createElement("div");
      newDiv.classList.add("blog-card");

      newDiv.innerHTML = `
                <h1>${element.title}</h1>

                <h2>By ${element.author}</h2>

                <button class="remove-blog">Remove Blog</button> 

                <button class="read-more-btn">
                    Read More >
                </button>

                <div class="blog-details">

                    <p class="blog-content">
                        ${element.content}
                    </p>

                    <div class="comment-section">

                        <h3>Comments</h3>

                        <div class="comments">
                        Loading comments...
                        </div>


                        <textarea 
                            class="comment-input"
                            placeholder="Write a comment..."
                        ></textarea>

                        <button class="comment-btn">
                            Add Comment
                        </button>

                    </div>

                </div>
            `;

      blogArea.appendChild(newDiv);

      // Dropdown / Read More
      const readMoreBtn = newDiv.querySelector(".read-more-btn");

      const blogDetails = newDiv.querySelector(".blog-details");

      readMoreBtn.addEventListener("click", async () => {
        blogDetails.classList.toggle("show");

        const commentsArea = newDiv.querySelector(".comments");
        if (blogDetails.classList.contains("show")) {
          readMoreBtn.innerHTML = "Hide Content <";

          const comments = await getAllComments(element.id);

          commentsArea.innerHTML = "";

          if (comments.length === 0) {
            commentsArea.innerHTML = `
          <p>No comments yet.</p>
        `;
          } else {
            comments.forEach((comment) => {
              const commentDiv = document.createElement("div");

              commentDiv.classList.add("comment");

              commentDiv.innerHTML = `
            <p>${comment.comment}</p>
            <button class="remove-comment">undo</button>
          `;

              commentsArea.appendChild(commentDiv);
              const deleteCommentBtn =
                commentDiv.querySelector(".remove-comment");

              deleteCommentBtn.addEventListener("click", async () => {
                try {
                  // console.log("Comment ID:", comment.id);

                  await axios.delete(`${API2}/delete/${comment.id}`);

                  commentDiv.remove();
                } catch (error) {
                  console.log(error.message);
                }
              });
            });
          }
        } else {
          readMoreBtn.innerHTML = "Read More >";
        }
      });

      //post comment area
      const commentBtn = newDiv.querySelector(".comment-btn");

      const commentInput = newDiv.querySelector(".comment-input");

      commentBtn.addEventListener("click", async () => {
        try {
          const comment = commentInput.value;

          const result = await axios.post(`${API2}/post/${element.id}`, {
            comment,
          });

          commentInput.value = ""
        } catch (error) {
          console.log(error.message);
        }
      });


      const removeBlogBtn = newDiv.querySelector(".remove-blog")

      removeBlogBtn.addEventListener("click" , async ()=>{
        try {
            await axios.delete(`${API1}/delete/${element.id}`)
            newDiv.remove()
        } catch (error) {
            console.log(error.message)
        }
      })
    });
  } catch (error) {
    console.log(error);
  }
};

getAllBlogs();
