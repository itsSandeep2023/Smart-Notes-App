import { BiNotepad } from "react-icons/bi";
import { AiFillRead } from "react-icons/ai";
import { BiDownload } from "react-icons/bi";
import { FiDelete } from "react-icons/fi";
import { FaEdit } from "react-icons/fa";
import { motion } from "framer-motion";

function Card({ data, onDelete, onRead, onEdit, ref }) {
  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([`Title: ${data.title}\n\n${data.description}`], {
      type: "text/plain",
    });
    element.href = URL.createObjectURL(file);
    element.download = `${data.title || "note"}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <motion.div
      drag
      dragConstraints={ref}
      whileDrag={{ scale: 1.1 }}
      dragElastic={0.1}
      dragTransition={{ bounceStiffness: 200, bounceDamping: 10 }}
      className={`shrink-0 card w-50 h-60 relative rounded-3xl ${data.color} opacity-[80%] text-white p-4 overflow-hidden`}
    >
      <div className="header w-full flex items-center gap-2">
        <BiNotepad size="1.2em" color="#ff0" />
        <h1 className="title w-[14ch] overflow-hidden text-nowrap text-orange-500">
          {data.title}
        </h1>
        <button
          onClick={onEdit}
          className="hover:scale-[110%] duration-100 cursor-pointer ml-auto"
        >
          <FaEdit size="1.2em" color="#ff0" />
        </button>
      </div>

      <p className="w-full text-sm leading-tight py-2 overflow-hidden">
        {data.description}
      </p>

      <div className="footer absolute w-full bottom-0 left-0 flex justify-between items-center px-5 py-3 pb-4 mt-5 bg-gray-800">
        <button
          onClick={onRead}
          className="hover:scale-[110%] duration-100 cursor-pointer"
        >
          <AiFillRead size="1.2em" color="#b8f" />
        </button>
        <button
          onClick={handleDownload}
          className="hover:scale-[110%] duration-100 cursor-pointer"
        >
          <BiDownload size="1.2em" color="#0f0" />
        </button>
        <button
          onClick={onDelete}
          className="hover:scale-[110%] duration-100 cursor-pointer"
        >
          <FiDelete size="1.2em" color="#f00" />
        </button>
      </div>
    </motion.div>
  );
}

export default Card;
