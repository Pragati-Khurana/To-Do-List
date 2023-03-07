import React from "react";
import { HiTrash } from "react-icons/hi2";
import { HiPencil } from "react-icons/hi2";

function Display({items, deleteItem, editItem}) {
    return (
        items.map((item) => {
            return (
                <tr key={item.id}>
                    <td>{item.title}</td>
                    <td>{item.description}</td>
                    <td><div onClick={() => {deleteItem(item.id)}}><HiTrash /></div></td>
                    <td><div onClick={() => {editItem(item.id)}}><HiPencil /></div></td>
                </tr>
            )
        })
    );
}

export default Display;