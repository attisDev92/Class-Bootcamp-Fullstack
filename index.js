const express = require('express');
const cors = require('cors');
const PORT = process.env.PORT || 3001;

const app = express();

let notes = [
	{
		id: 1,
		content: "HTML is easy",
		date: "2019-05-30T17:30:31.098Z",
		important: true
	},
	{
		id: 2,
		content: "Browser can execute only Javascript",
		date: "2019-05-30T18:39:34.091Z",
		important: false
	},
	{
		id: 3,
		content: "GET and POST are the most important methods of HTTP protocol",
		date: "2019-05-30T19:20:14.298Z",
		important: true
	}
]

//forma antigua con http de node
// const app = http.createServer((req, res) => {
//     res.writeHead(200, {'content-type': 'application/json'})
//     res.end(JSON.stringify(notes));
// })

const reqLogger = (req, res, next) => {
	console.log('Method:', req.method)
	console.log('Path:', req.path)
	console.log('Body:', req.body)
	console.log('---')
	next()
};

const unknownEndpoint = (req, res) => {
	res.status(404).send({ error:'unknown endpoint' })
};

app.use(cors());
app.use(express.json());
app.use(reqLogger);

app.get('/api/notes', (req, res) => {
	res.json(notes)
});

app.get('/api/notes/:id', (req, res) => {
	const id = Number(req.params.id)
	const note = notes.find(note => note.id === id )

	if(note) {
		res.json(note)
	} else {
		res.status(204).end()
	}
});

const generateId = () => {
	const maxId = notes.length > 0
		? Math.max(...notes.map(n => n.id))
		: 0;
	return maxId + 1
}

app.post('/api/notes', (req, res) => {
	const body = request.body

	if (!body.content) {
		return res.status(400).json({
			error:'contect missing'
		})
	}

	const note = {
		content: body.content,
		impostant: body.importante || false,
		date: new Date(),
		id: generateId()
	}
	
	notes = notes.concat(note) 

	res.json(note)
});

app.delete('/api/notes/:id', (req, res) => {
	const id = Number(req.params.id)
	notes = notes.filter(note => note.id !== id)

	response.status(204).end()
});

app.use(unknownEndpoint);

app.listen(PORT, () => {
	console.log(`server running on port ${PORT}`)
});