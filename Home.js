let empPayrollList;

window.addEventListener('DOMContentLoaded', (event) =>{
    empPayrollList = getEmployeePayrollDataFromStorage();
    document.querySelector(".emp-count").textContent = empPayrollList.length;
    createInnerHtml();
});

const getEmployeePayrollDataFromStorage = () =>
{
    return localStorage.getItem('EmpPayrollList') ? JSON.parse(localStorage.getItem('EmpPayrollList')) : [];
}

const createInnerHtml = () => 
{
    const headerHtml = "<tr><th></th><th>Name</th><th>Gender</th><th>Department</th><th> Start Salary</th><th>Start Date</th><th>Actions</th></tr>";

    if(empPayrollList.length == 0)
    {
    let innerHtml = `${headerHtml}`;
    document.querySelector(`#display`).innerHTML=innerHtml;
    return;
    }

    let innerHtml = `${headerHtml}`;
    let empPayrollList = createEmpPayrollJson();
    for(const empPayrollData of empPayrollList)
    {
    innerHtml = `${innerHtml} 
    <tr>
        <td><img class="profile" src="${empPayrollData._profilePic}" alt="profile"></td>
        <td>${empPayrollData._name}</td>
        <td>${empPayrollData._gender}</td>
        <td>${getDeptHtml(empPayrollData._dept)}</td>
        <td>${empPayrollData._salary}</td>
        <td>${stringifyDate(empPayrollData._startDate)}</td>
        <td>
            <button name="${empPayrollData._name}" onclick="remove(this)"><i class="<i class="fa fa-trash-o" aria-hidden="true"></i></button> 
            <button name="${empPayrollData._name}" onclick="update(this)"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></button>
        </td>
    </tr>
    `
    };
    
document.querySelector('#tablediv').innerHTML = innerHtml;
}

const getDeptHtml = (deptList) =>
 {
    let deptHtml = '';
    for(const dept of deptList){
        deptHtml = `${deptHtml} <div class="dept-label">${dept}</div>`
    }
    return deptHtml;
}