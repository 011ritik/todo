import { useState } from "react";
import "./Card.css";

import { ImCheckboxUnchecked, ImCheckboxChecked } from "react-icons/im";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import axios from "axios";

const Card = (props) => {
    const [todo, setTodo] = useState(props.task);
    const [pop, setPop] = useState(false);

    const handleClick = async () => {
        todo.completed = !todo.completed;
        setTodo({ ...todo });

        const response = await axios.patch(
            `http://localhost:8000/update/${todo.id}/`,
            todo
        );
        // console.log("res", response);
    };

    const handleDelete = async () => {
        const response = await axios.delete(
            `http://localhost:8000/delete/${todo.id}/`
        );
        console.log(response);
        setPop(!pop);
    };

    const handlePopup = () => {
        setPop(!pop);
        setTimeout(() => {
            setPop(false);
        }, 5000);
    };

    const handleEdit = () => {};

    return (
        <>
            {pop ? (
                <div className="popup">
                    <p className="popup-text">
                        Do you want to delete ( {todo.task} )?
                    </p>
                    <div className="btn-group">
                        <button
                            className="btn btn-delete"
                            onClick={handleDelete}
                        >
                            Delete
                        </button>
                        <button className="btn btn-no" onClick={handlePopup}>
                            No, thanks
                        </button>
                    </div>
                </div>
            ) : (
                <div></div>
            )}

            <div className="card-container">
                <div className="card-container__task">
                    <p onClick={handleClick}>
                        {todo.completed ? (
                            <ImCheckboxChecked style={{ color: "blue" }} />
                        ) : (
                            <ImCheckboxUnchecked />
                        )}
                    </p>
                    <p>{todo.task}</p>
                </div>
                <div className="card-container__task-update">
                    <AiFillDelete
                        onClick={handlePopup}
                        className="icon delete"
                    />
                    <AiFillEdit onClick={handleEdit} className="icon edit" />
                </div>
            </div>
        </>
    );
};

export default Card;
