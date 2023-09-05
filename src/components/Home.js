
import React, { useState } from 'react';
import './Home.css';

function Home() {
    const [input, setInput] = useState({
        name: '',
        email: '',
    });
    const [tableData, setTableData] = useState([]);
    const [editClick, setEditClick] = useState(false);
    const [editIndex, setEditIndex] = useState(null);

    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        });
    };

    const handleClick = (e) => {
        e.preventDefault();

        if (editClick) {
            const tempTableData = [...tableData];
            tempTableData[editIndex] = input;
            setTableData(tempTableData);
            setEditClick(false);
            setEditIndex(null);
        } else {
            setTableData([...tableData, input]);
        }

        setInput({
            name: '',
            email: '',
        });
    };

    const handleDelete = (index) => {
        const filterData = tableData.filter((item, i) => i !== index);
        setTableData(filterData);
    };

    const handleEdit = (index) => {
        const tempData = tableData[index];
        setInput({
            name: tempData.name,
            email: tempData.email,
        });
        setEditClick(true);
        setEditIndex(index);
    };

    return (
        <>
            <div className='input-box'>
                <div>
                    <label>Name</label>
                    <input type='text' name='name' value={input.name} placeholder='Enter your name' onChange={handleChange} />
                </div>
                <div>
                    <label className='label'>Email</label>
                    <input type='text' name='email' value={input.email} placeholder='Enter your email' onChange={handleChange} />
                </div>
                <div>
                    <button type='button' className='btn' onClick={handleClick}>
                        {editClick ? 'Update' : 'Add'}
                    </button>
                </div>
            </div>

            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableData.map((item, i) => (
                            <tr key={i}>
                                <td>{item.name}</td>
                                <td>{item.email}</td>
                                <td>
                                    <button onClick={() => handleEdit(i)}>Edit</button>
                                    <button onClick={() => handleDelete(i)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default Home;
