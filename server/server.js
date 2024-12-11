const mongoose = require('mongoose');
const Document = require('./Document'); // Ensure the correct path to your Document schema

const io = require('socket.io')(3001, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST']
    }
});
//Q9HHsu2qp78rpNQp
const defaultValue = "";

require('dotenv').config();
const dbURI = process.env.MONGO_URI;

// Connect to MongoDB Atlas
mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("Connected to MongoDB Atlas"))
    .catch(err => console.error("MongoDB Connection Error:", err));

// Socket.io server logic
io.on("connection", (socket) => {
    console.log("New client connected");

    socket.on('get-document', async (documentId) => {
        const document = await findOrCreateDocument(documentId);
        socket.join(documentId);
        socket.emit('load-document', document.data);

        socket.on("send-changes", (delta) => {
            socket.broadcast.to(documentId).emit("receive-changes", delta);
        });

        socket.on("save-document", async (data) => {
            await Document.findByIdAndUpdate(documentId, { data });
        });
    });

    socket.on("disconnect", () => {
        console.log("Client disconnected");
    });
});

async function findOrCreateDocument(id) {
    if (id == null) return;

    const document = await Document.findById(id);
    if (document) return document;
    return await Document.create({ _id: id, data: defaultValue });
}
