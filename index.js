import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config'

const app = express();
app.use(express.json());
const port = process.env.PORT;
console.log(port);

const { Schema } = mongoose;

const blogSchema = new Schema({
    username: String,
    password: String,
    age: String,
    isMaried: Boolean,
});
const Blog = mongoose.model('Blog', blogSchema);


app.get('/blogs', async (req, res) => {
    const blogs = await Blog.find({});
    res.send(blogs);
});


app.post('/blogs', async (req, res) => {
    const { username, password, age, isMaried } = req.body;
    const blog = new Blog({ username, password, age, isMaried });
    await blog.save();
    res.send(blog);
});


app.delete('/blogs/:id', async (req, res) => {
    const { id } = req.params;
    await Blog.findByIdAndDelete(id);
    res.send(` ${id}  deleted.`);
});

app.listen(port, () => {
    console.log(`${port}`);
});

mongoose.connect("mongodb+srv://Saleh:Saleh@saleh.ntsjtdc.mongodb.net/")
    .then(() => console.log('Database connected!'))
    .catch(err => console.log(err));
