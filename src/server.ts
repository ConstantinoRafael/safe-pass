import app from "./app";

const port = process.env.PORT || 5000;

app.listen(port, () => {
   (`Server is up and running on port ${port} 🚀`);
});