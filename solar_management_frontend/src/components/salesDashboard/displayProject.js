import React, { useState, useEffect } from "react";

const EmployeelistFun = () => {
    const [employeeslist, setemployees] = useState(null);
    useEffect(() => {
        getemployees();
    }, []);
    const getemployees = () => {
        fetch(`${process.env.REACT_APP_API_URL}projects`)
            .then((res) => res.json())
            .then(
                (result) => {
                    setemployees(result);
                },
                (error) => {
                    setemployees(null);
                }
            );
    };
    if (!employeeslist) return <div>No Record Found</div>;
    return (
        <div>
            <h2>Employees List Funcational Component </h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Employee Id</th>
                        <th>Name</th>
                        <th>Address</th>
                        <th>City</th>
                        <th>ZipCode</th>
                    </tr>
                </thead>
                <tbody>
                    {employeeslist.map((emp) => (
                        <tr key={emp._id}>
                            <td>{emp.customerId}</td>
                            <td>{emp.projectAddress}</td>
                            <td>{emp.projectStatus}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
export default EmployeelistFun;
