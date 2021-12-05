import http from 'http'
import express from 'express';

import { join, dirname } from 'path'
import { Low, JSONFile } from 'lowdb'
import { fileURLToPath } from 'url'
import { v4 as uuidv4 } from 'uuid';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Use JSON file for storage
const file = join(__dirname, 'db.json')
const adapter = new JSONFile(file)
const db = new Low(adapter)
await db.read()

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/css", express.static(__dirname + '/css'));
app.use("/js", express.static(__dirname + '/js'));


/// HTTP Verbs , POST , GET , PUT , DELETE, PATCH

// sending index.html
app.get('/', function (req, res) {
  // res.sendFile(path.join(path.dirname('index.html')));
  res.sendFile(join(__dirname, 'index2.html'));
});


app.post('/api/v1/save', async (req, res) => {


  const { api_key, secret_key, username } = req.body;
  const dataObj = {
    id: uuidv4(), api_key, secret_key, username
  }

  db.data.users.push(dataObj)
  await db.write()


  await db.read()

  res.send(JSON.stringify({ users: JSON.stringify(db.data.users) }));
})

app.post('/api/v1/delete', async (req, res) => {

})


// create server
const server = http.createServer(app, (req, res) => {
  res.setHeader('Content-Type', 'application/json');
})
const PORT = 5000
server.listen(PORT, () => console.log(`Server is running on ${PORT}`))