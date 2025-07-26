import { useEffect, useRef, useState } from "react";
import Card from "./Card";

function Forground() {
  const ref = useRef(null);

  const defaultNote = [
    {
      title: "Readme",
      description:
        "Smart Notes App is a minimal and interactive note-taking application built with React, Tailwind CSS, and Framer Motion. It lets users quickly create, drag, view, download, and delete simple notes.",
      color: "bg-blue-600",
    },
  ];

  const [data, setData] = useState(() => {
    const localData = localStorage.getItem("notes");
    return localData ? JSON.parse(localData) : defaultNote;
  });

  const [showForm, setShowForm] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [readNote, setReadNote] = useState(null);

  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(data));
  }, [data]);

  function handleAddNote() {
    if (!newTitle.trim() || !newDesc.trim()) return;

    const note = {
      title: newTitle,
      description: newDesc,
      color: getColor(),
    };

    if (editIndex !== null) {
      const updated = [...data];
      updated[editIndex] = { ...note };
      setData(updated);
      setEditIndex(null);
    } else {
      setData([...data, note]);
    }

    setNewTitle("");
    setNewDesc("");
    setShowForm(false);
  }

  function handleDelete(index) {
    const updated = [...data];
    updated.splice(index, 1);
    setData(updated);
  }

  function getColor() {
    const colors = [
      "bg-blue-600",
      "bg-green-600",
      "bg-sky-600",
      "bg-purple-600",
      "bg-teal-600",
      "bg-indigo-600",
      "bg-emerald-600",
      "bg-cyan-600",
      "bg-pink-600",
      "bg-rose-600",
      "bg-red-600",
      "bg-orange-600",
      "bg-yellow-600",
      "bg-lime-600",
      "bg-amber-600",
      "bg-fuchsia-600",
      "bg-violet-600",
      "bg-neutral-600",
      "bg-stone-600",
      "bg-zinc-600",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  function handleEdit(index) {
    setEditIndex(index);
    setNewTitle(data[index].title);
    setNewDesc(data[index].description);
    setShowForm(true);
  }

  return (
    <div
      ref={ref}
      className="forground z-10 w-full h-screen fixed flex items-start gap-5 p-5 flex-wrap"
    >
      {data.map((item, index) => (
        <Card
          key={index}
          data={item}
          onDelete={() => handleDelete(index)}
          onRead={() => setReadNote(item)}
          onEdit={() => handleEdit(index)}
          ref={ref}
        />
      ))}

      {/* Create Button */}
      <div className="fixed bottom-10 left-1/2 -translate-x-1/2 py-3 px-5 text-3xl font-extrabold tracking-wide bg-orange-600 rounded-full uppercase hover:bg-orange-500 cursor-pointer">
        <button onClick={() => setShowForm(true)}>Create</button>
      </div>

      {/* Create/Edit Note Modal */}
      {showForm && (
        <div className="absolute top-1/2 left-1/2 w-[90%] max-w-md -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-2xl shadow-xl z-20 text-black">
          <h2 className="text-xl font-bold mb-4 text-center">
            {editIndex !== null ? "Edit Note" : "Create a Note"}
          </h2>
          <input
            type="text"
            placeholder="Title"
            className="w-full p-2 mb-3 border rounded"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <textarea
            placeholder="Description"
            className="w-full p-2 mb-3 border rounded"
            value={newDesc}
            onChange={(e) => setNewDesc(e.target.value)}
          />
          <div className="flex justify-end gap-3">
            <button
              onClick={() => {
                setShowForm(false);
                setEditIndex(null);
                setNewTitle("");
                setNewDesc("");
              }}
              className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
            >
              Cancel
            </button>
            <button
              onClick={handleAddNote}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              {editIndex !== null ? "Update Note" : "Add Note"}
            </button>
          </div>
        </div>
      )}

      {/* Read Modal */}
      {readNote && (
        <div className="absolute top-1/2 left-1/2 w-[90%] max-w-md -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-2xl shadow-xl z-30 text-black">
          <h2 className="text-xl font-bold mb-4 text-orange-600">
            {readNote.title}
          </h2>
          <p className="text-gray-800 whitespace-pre-wrap">
            {readNote.description}
          </p>
          <div className="flex justify-end mt-4">
            <button
              onClick={() => setReadNote(null)}
              className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Forground;
