import React, { useEffect, useRef, useState } from 'react';
import Quill from 'quill';
import "quill/dist/quill.snow.css";
import './style.css';
import { io } from 'socket.io-client';
import { useParams } from 'react-router-dom';
const SAVE_INTERVAL_MS = 2000;

const Textedit = () => {
  const {id: documentId} = useParams();
  const [socket, setSocket] = useState(null);
  const [quill, setQuill] = useState(null);
  const q = useRef(null);

  // Initialize socket connection
  useEffect(() => {
    const s = io("http://localhost:3001");
    setSocket(s);
    return () => {
      s.disconnect();
    };
  }, []);

  // Initialize Quill editor
  useEffect(() => {
    if (q.current == null) {
      const editor = new Quill('#editor', {
        modules: {
          toolbar: [
            [{ header: [1, 2, false] }], // Header options
            [{ font: [] }], // Font
            [{ align: [] }], // Alignment
            [{ color: [] }, { background: [] }], // Colors for text
            ['bold', 'italic', 'underline'], // Text styles
            [{ list: 'ordered' }, { list: 'bullet' }], // Lists
            ['link', 'image', 'code-block'], // Extra features
          ],
        },
        theme: 'snow',
        placeholder: '.........Start typing',
      });
      q.current = editor;
      setQuill(editor);
    }
  }, []);

  // Handle real-time updates
  useEffect(() => {
    if (socket == null || quill == null) return;

    const handler = (delta, oldDelta, source) => {
      if (source !== 'user') return;
      socket.emit("send-changes", delta);
    };
    quill.on("text-change", handler);

    return () => {
      quill.off("text-change", handler);
    };
  }, [socket, quill]);

  useEffect(() => {
    if (socket == null || quill == null) return;
  
    const handler = (delta) => {
      quill.updateContents(delta);
    };
    socket.on("receive-changes", handler);
  
    return () => {
      socket.off("receive-changes", handler);
    };
  }, [socket, quill]);

  useEffect(() => {
    if (socket == null || quill == null) return;

    socket.once("load-document", document => {
      quill.setContents(document);
      quill.enable()
    })


    socket.emit('get-document', documentId)
  }, [socket, quill, documentId]);
  
  useEffect(() => {
    if (socket == null || quill == null) return;

    const interval = setInterval(() => {
      socket.emit('save-document', quill.getContents());
    }, SAVE_INTERVAL_MS);
    return () => {
      clearInterval(interval)
    }
  }, [socket, quill]);


  return (
    <div className="container">
      {/* Quill Editor's Mount Point */}
      <div id="editor" className="quill-editor"></div>
    </div>
  );
};

export default Textedit;
