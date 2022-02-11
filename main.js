
// Get elements for tabs start here
const tab_menu = document.querySelectorAll('.for-tabs .tab-menu ul a')
const tab_pane_all = document.querySelectorAll('.for-tabs .tab-pane')

tab_menu.forEach(item => {

    item.addEventListener('click', function (e) {
        e.preventDefault()
    
        tab_menu.forEach(item => {         
                item.classList.remove('active')
        })
        item.classList.add('active')
    
    const tab_pane = document.querySelector(this.getAttribute('href'))
    
    tab_pane_all.forEach(item => {
        item.classList.remove('active')
    })

    tab_pane.classList.add('active')
    })   
})


const tab_menu_el = document.querySelectorAll('.for-tabs-one .tab-menu-one ul li a')
const tab_pane_all_el = document.querySelectorAll('.for-tabs-one .tab-body-one .tab-pane-one')

tab_menu_el.forEach(items => {

    items.addEventListener('click', function (e) {
        e.preventDefault()
    
        tab_menu_el.forEach(item => {         
                item.classList.remove('active1')
        })
        items.classList.add('active1')
    
    const tab_pane_el = document.querySelector(this.getAttribute('href'))
    
    tab_pane_all_el.forEach(item => {
        item.classList.remove('active1')
    })
    tab_pane_el.classList.add('active1')

    })   
})



// Get elements for students result sheet start here
const student_form = document.getElementById('student_form')
const data_list = document.getElementById('data_list')

student_form.addEventListener('submit', function(e){
    e.preventDefault();

    let name = student_form.querySelector("input[placeholder='Student Name']")
    let roll = student_form.querySelector("input[placeholder='Roll Number']") 
    let student_class = student_form.querySelector("input[placeholder='Class']")
    let photo = student_form.querySelector("input[placeholder='Photo']")
    let gender = student_form.querySelector("input[type='radio']:checked")
    let ban = student_form.querySelector("input[placeholder='Bangla']")
    let eng = student_form.querySelector("input[placeholder='English']")  
    let math = student_form.querySelector("input[placeholder='Math']")
    let sci = student_form.querySelector("input[placeholder='Science']") 
    let ss = student_form.querySelector("input[placeholder='Social Science']")
    let reli = student_form.querySelector("input[placeholder='Religion']") 
    
    if(name.value == '' || roll.value == '' || student_class.value == '' ){
        alert('All fields are required ')
         
    }else {
       
        let storate_data = []

        if( dataGet('result_apps') ){
            storate_data = dataGet('result_apps')
        }

        storate_data.push({
            name : name.value, 
            roll : roll.value, 
            className : student_class.value,
            gender : gender.value,
            photo : photo.value,
            ban : ban.value, 
            eng : eng.value, 
            math : math.value, 
            sci : sci.value, 
            social : ss.value, 
            reli : reli.value 
        })

        dataSend('result_apps', storate_data)

        student_form.querySelector("input[placeholder='Student Name']").value = ''
        student_form.querySelector("input[placeholder='Roll Number']").value = ''
        student_form.querySelector("input[placeholder='Class']").value = ''
        student_form.querySelector("input[placeholder='Photo']").value = ''     
        student_form.querySelector("input[placeholder='Bangla']").value = '' 
        student_form.querySelector("input[placeholder='English']").value = ''  
        student_form.querySelector("input[placeholder='Math']").value = '' 
        student_form.querySelector("input[placeholder='Science']").value = '' 
        student_form.querySelector("input[placeholder='Social Science']").value = ''  
        student_form.querySelector("input[placeholder='Religion']").value = ''
        
       allStudentData()
    }
    
})

allStudentData()

function allStudentData(){

    let all_data = dataGet('result_apps')

    let data = ''

    all_data.map((student, index) => {
        data += `
            <tr class="text-center">
                <td>${ index + 1 }</td>
                <td>${ student.name }</td>
                <td>${ student.roll }</td>
                <td>${ student.className }</td>
                <td>${ student.gender }</td>
                <td> A </td>
                <td> 4 </td>
                <td><img style="width:50px; height:50px;object-fit:cover;" src="${ student.photo }"></td>
                <td class="d-flex">
                    <button class="btn btn-info btn-sm mr-1" data-toggle="modal" onclick="getSingleResult(${index})" data-target="#student_single_modal" >View</button>
                    <button onclick="deleteStudent(${ index })" class="btn btn-danger btn-sm">Delete</button>
                </td>
            </tr>
        `
    })

    data_list.innerHTML = data

}


// Delete Student Data 

function deleteStudent(id){

    let confirmation = confirm('Are you sure ?')

    if(confirmation){
        let storage_data = dataGet('result_apps')
        storage_data.splice(id, 1);
        dataSend('result_apps',storage_data)
        allStudentData();
    }else{
        return false
    }

}
// For result sheet
const student_result_data = document.querySelector('.student-result-data')

function getSingleResult(index){
    
    let result = new Result

    let storage_data = dataGet('result_apps')

    student_result_data.innerHTML = `
            <img <img style="width:250px; height:250px;object-fit:cover;" class="img-thumbnail shadow rounded" src="${ storage_data[index].photo }" alt="">
            <h2 class="mt-1">${ storage_data[index].name }</h2>
            <hr>
            <table class="table table-striped table-bordered">
                <thead class= "bg-dark text-white">
                    <tr>
                        <th>Subject</th>
                        <th>Marks</th>
                        <th>Gpa</th>
                        <th>Grade</th>
                        <th>Cgpa</th>
                        <th>Result</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Bangla</td>
                        <td>${ storage_data[index].ban }</td>
                        <td>${ result.result(storage_data[index].ban).gpacal }</td>
                        <td>${ result.result(storage_data[index].ban).greadcal }</td>
                        <td rowspan="6">                       
                        ${ result.finalCgpa(storage_data[index].ban, storage_data[index].eng, storage_data[index].math, storage_data[index].sci, storage_data[index].social, storage_data[index].reli).rescgpa }
                                              
                        </td> 
                        <td rowspan="6" >${ result.finalCgpa(  storage_data[index].ban, storage_data[index].eng, storage_data[index].math, storage_data[index].sci, storage_data[index].social, storage_data[index].reli  ).resgread }</td>
                    </tr>
                    <tr>
                        <td>English</td>
                        <td>${ storage_data[index].eng }</td>
                        <td>${ result.result(storage_data[index].eng).gpacal }</td>
                        <td>${ result.result(storage_data[index].eng).greadcal }</td>

                    </tr>
                    <tr>
                        <td>Math</td>
                        <td>${ storage_data[index].math }</td>
                        <td>${ result.result(storage_data[index].math).gpacal }</td>
                        <td>${ result.result(storage_data[index].math).greadcal }</td>

                    </tr>
                    <tr>
                        <td>Science</td>
                        <td>${ storage_data[index].sci }</td>
                        <td>${ result.result(storage_data[index].sci).gpacal }</td>
                        <td>${ result.result(storage_data[index].sci).greadcal }</td>

                    </tr>
                    <tr>
                        <td>Social Science</td>
                        <td>${ storage_data[index].social }</td>
                        <td>${ result.result(storage_data[index].social).gpacal }</td>
                        <td>${ result.result(storage_data[index].social).greadcal }</td>

                    </tr>
                    <tr>
                        <td>Religion</td>
                        <td>${ storage_data[index].reli }</td>
                        <td>${ result.result(storage_data[index].reli).gpacal }</td>
                        <td>${ result.result(storage_data[index].reli).greadcal }</td>

                    </tr>
                </tbody>
            </table>        
    `;
}

