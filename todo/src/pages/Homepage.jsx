import React, { useState, useEffect } from "react";
import axios from "axios";
import { BiFilter } from "react-icons/bi";

import Card from "../components/card/Card";

import "./Homepage.css";

const Homepage = () => {
    const [tasks, setTasks] = useState([]);
    const [todo, setTodo] = useState({});

    useEffect(() => {
        getTasks();
    }, [todo]);

    const getTasks = () => {
        fetch("http://127.0.0.1:8000/")
            .then((response) => response.json())
            .then((response) => {
                setTasks(response.task);
            });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await axios.post(
            "http://localhost:8000/create/",
            todo
        );
        console.log(response);
        setTodo(response.data.task);

        e.target.cl;
    };

    const hanldeChange = (e) => {
        let task = e.target.value;
        setTodo({ task: task, completed: false });
    };

    return (
        <div className="container">
            <p className="title">My Todo's</p>

            <div className="input_filed">
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Add new ..."
                        className="input-todo"
                        onChange={hanldeChange}
                    />
                    <button className="btn">Add</button>
                </form>
            </div>

            {/* <div>
                <p>Filter</p>
                <BiFilter />
            </div> */}

            <section className="task-container">
                {tasks.map((task) => {
                    return <Card task={task} key={task.id} />;
                })}
            </section>
        </div>
    );
};

export default Homepage;
