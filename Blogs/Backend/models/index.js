import Blog from "./blog.model.js";
import Comments from "./comment.model.js";

Blog.hasMany(Comments,{
    foreignKey:"blogId"
})
Comments.belongsTo(Blog,{
    foreignKey:"blogId"
})

export {
    Blog,
    Comments
}