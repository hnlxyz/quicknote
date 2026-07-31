import React from 'react'
import { MdDelete } from "react-icons/md";
import { MdEditSquare } from "react-icons/md";

const Card = ({ id, title, desc, deleteNote, onEdit }) => {
  return (
    <div className='card'>
      <div className="edit" title="Edit Note" onClick={() => { onEdit(id) }}>
        <MdEditSquare />
      </div>
      <div className="del" title="Delete Note" aria-label="Delete note" onClick={() => { deleteNote(id) }}>
        <MdDelete />
      </div>
      <div className='title'>{title}</div>
      <div className='desc'>{desc}</div>
    </div>
  )
}

export default Card