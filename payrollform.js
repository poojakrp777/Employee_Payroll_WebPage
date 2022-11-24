window.addEventListener('DOMContentLoaded',()=>{
    const name=document.querySelector('#name');
    const textError = document.querySelector('.text-error');
    name.addEventListener('input',function()
    {
        if(name.Value.length==0)
        {
            textError.textContent="";
            return;
        }
        try{
            (new EmployeePayRoll()).name=name.Value;
            textError.textContent="";
        }
        catch(e)
        {
            textError.textContent=e;
        }
    });
    const salary = document.querySelector('#salary');
    const output = document.querySelector('.salary-output');
    salary.addEventListener('input',function()
    {
        output.textContent=salary.value;
    })
});
//check for update
function createAndUpdateStorage(employeePayRollData)
{
    let employeePayRollList=JSON.parse(localStorage.getItem("EmployeePayRollList"));
    if (employeePayRollList!=undefined)
    {
        employeePayRollList.push(employeePayRollData);
    }
    else{
        employeePayRollList=[employeePayRollData]
    }
    alert(employeePayRollList.toString());
    localStorage.setItem("EmployeePayRollList", JSON.stringify(employeePayRollList));
}
const save=()=>
{
    try{
        let employeePayRollData=createEmployeePayRoll();
        createAndUpdateStorage(employeePayRollData);
        window.location.replace("index.html");
    }catch(e)
    {
        console.log(e);
        return;
    }
}
const createEmployeePayRoll=()=>
{
    let employeePayRollData=new EmployeePayRoll();
    try{
        employeePayRollData.name=getInputValueById('#name');
    }catch(e)
    {
        setTextValue('.text-error',e);
        throw e;
    }
    employeePayRollData.profilePic=getSelectedValues('[name=profile]').pop();
    employeePayRollData.gender=getSelectedValues('[name=gender]').pop();
    employeePayRollData.department=getSelectedValues('[name=department]');
    employeePayRollData.note=getInputValueById('#notes');
    employeePayRollData.salary=getInputValueById('#salary');
    let date=getInputValueById('#day')+" "+getInputValueById('#month')+" "+getInputValueById('#year');
    employeePayRollData.startDate=date;
    alert(employeePayRollData.toString());
    return employeePayRollData;
}
const getInputValueById=(id)=>
{
    let value=document.querySelector(id).value;
    return value;
}
const getInputElementValue=(id)=>
{
    let value=document.getElementById(id).value;
    return value;
}
const getSelectedValues=(propertyValue)=>{
    let allItems=document.querySelectorAll(propertyValue);
    let setItems=[];
    allItems.forEach(item=>
        {
            if(item.checked)
            setItems.push(item.value);
        });
        return setItems;
}
const resetform=()=>
{
    setvalue('#name','');
    unsetSelectedValues('[name=profile]');
    unsetSelectedValues('[name=gender]');
    unsetSelectedValues('[name=department]');
    setValue('#salary','');
    setValue('#day','3');
    setValue('#month','January');
    setValue('#year','2020');
}
const unsetSelectedValues=(propertyValue)=>
{
    let allItems=document.querySelector(propertyValue);
    allItems.forEach(item=>
        {
            item.checked=false;
        });
}
const setTextValue=(id, value)=>{
    const element = document.querySelector(id);
    element.textContent=value;
}