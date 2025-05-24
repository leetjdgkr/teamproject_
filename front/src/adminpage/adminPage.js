import React from "react";
import "../adminpage/adminPage.css";

const AdminPage = () => {
    const people = {
        header:["이름","생년월일","전화번호"],
        data: [
            { people: "김재선", birthday: "2000.10.02", phoneNumber: "010-4134-9069" },
            { people: "남진우", birthday: "2000.08.29", phoneNumber: "010-3954-7589" },
        ]
    };
    
    return (
        <div>
            <table>
                <thead>
                    {people.header.map ((item) =>{
                        return(
                            <th>{item}</th>
                        )
                    })}
                </thead>
                <tbody>
                    {people.data.map((item, index) => (
                        <tr key={index}>
                            <td>{item.people}</td>
                            <td>{item.birthday}</td>
                            <td>{item.phoneNumber}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminPage;
