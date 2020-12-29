var user;
var names2;

var usertr = document.getElementById("nameTR");
document.getElementById("form").addEventListener("submit",(e)=> {
    e.preventDefault();
    let name = document.getElementById("name").value;
    let className = document.getElementById("className").value;
    let gender = ''
    if (document.getElementById('male').checked) {
        gender = document.getElementById('male').value;
    } else if (document.getElementById('female').checked) {
        gender = document.getElementById('female').value
    }
    Create(name,className,gender);
    Read();
    document.getElementById("form").reset();

});

var names = [];
let numberofNames = 10;
let first = 0;
let actualPage = 1;

const searchFun = () => {
    let filter = document.getElementById('myInput').value.toUpperCase();

    let tr = usertr.getElementsByTagName('tr')

    for(var i =0; i<tr.length; i++) {
        let td = tr[i].getElementsByTagName('td')[1];

        if(td) {
            let textvalue = td.textContent || td.innerHTML;

            if(textvalue.toUpperCase().indexOf(filter) > -1 ) {
                tr[i].style.display = "";

            } else {
                tr[i].style.display = "none";
            }
        }
    }
}


function nextPage() {
    if(first+numberofNames<=names.length){
        first+=numberofNames;
        actualPage++
    Read();
    }
}

function previous() {
    if(first - numberofNames>=0){
        first-=numberofNames;
        actualPage--
    Read();
    }
}

function Create(name,className,gender) {
    let storage = JSON.parse(localStorage.getItem("names"));
     user= {
        name: name,
        className: className,
        gender: gender,
    }

        if(storage==null) {
            names.push(user)
            localStorage.setItem("names",JSON.stringify(names));
        } else {
            names = JSON.parse(localStorage.getItem("names"));
            names.push(user);
            localStorage.setItem("names",JSON.stringify(names));
        }
    }


function Read() {
    usertr.innerHTML=''
    names2 = JSON.parse(localStorage.getItem("names"));
    if(names2==null) {
        usertr.innerHTML+=`
        <tr>
        <th class="space">#</th>
        <th class="space">TÊN SINH VIÊN</th>
        <th class="space">LỚP</th>
        <th class="space">GIỚI TÍNH</th>
        <th class="space">CÔNG CỤ</th>
        </tr>
        `
    } else {
        usertr.innerHTML+=`
        <tr>
        <th class="space">#</th>
        <th class="space">TÊN SINH VIÊN</th>
        <th class="space">LỚP</th>
        <th class="space">GIỚI TÍNH</th>
        <th class="space">CÔNG CỤ</th>
        <tr>
        `
        for(var i = first; i<  first + numberofNames; i++) {
            if(i<names2.length) {
                usertr.innerHTML+=`
            <tr>
            <td class="space">${i+1}</td>
            <td class="space">${names2[i].name}</td>
            <td class="space">${names2[i].className}</td>
            <td class="space">${names2[i].gender}</td>
            <td class="space">
            <button OnClick="Update(${i})">Sửa</button>
            <button OnClick="Delete(${i})">Xóa</button>
            </tr>
            `
            }
            
        }

    }
}

function Update(i3) {
    let names4= JSON.parse(localStorage.getItem("names"))
    usertr.innerHTML ='';
    usertr.innerHTML += `
    <tr>
    <th class="space">#</th>
    <th class="space">TÊN SINH VIÊN</th>
    <th class="space">LỚP</th>
    <th class="space">GIỚI TÍNH</th>
    <th class="space">CÔNG CỤ</th>
    </tr>
    `
    for (var i =0;i <names4.length; i++) {
        if (i==i3) {
            usertr.innerHTML+=`
            <tr>
            <td class="space">${i+1}</td>
            <td class="space"><input id ='newName' placeholder="${names4[i].name}"></input></td>
            <td class="space"><input id ='newClass' placeholder="${names4[i].className}"></input></td>
            <td class="space"><input id="newMale" type="radio" value="Nam">Nam<input id="newFemale" type="radio" value="Nữ">Nữ
            </td>
            <td class="space">
            <button Onclick="Update2('${i}')">Cập nhật</button>
            <button Onclick="Read()">Hủy</button>
            </td>
            </tr>   
            `
        } else {
            usertr.innerHTML+=`
            <tr>
            <td class="space">${i+1}</td>
            <td class="space">${names2[i].name}</td>
            <td class="space">${names2[i].className}</td>
            <td class="space">${names2[i].gender}</td>
            <td class="space">
            <button OnClick="Update(${i})">Sửa</button>
            <button OnClick="Delete(${i})">Xóa</button>
            </tr>
            `

        }
    }
}

function Update2(index) {
  var updatename = document.getElementById('newName').value;
  var updateclass = document.getElementById('newClass').value;
  var updategender = ''
  if(document.getElementById('newMale').checked) {
      updategender = document.getElementById('newMale').value;
  } else if (document.getElementById('newFemale').checked) {
      updategender = document.getElementById('newFemale').value;
  }
  if(updatename == '' || updateclass == '' || updategender == '') {
      alert("INCOMPLETE")
  } else {
      let names5 = JSON.parse(localStorage.getItem("names"));
      names5[index].name = updatename;
      names5[index].className = updateclass;
      names5[index].gender = updategender
      localStorage.setItem("names",JSON.stringify(names5));
      Read();
  }
}
function Delete(i2) {
    let names3 = JSON.parse(localStorage.getItem("names"));
    names3.splice(i2,1);
    localStorage.setItem("names",JSON.stringify(names3));
    Read();

}