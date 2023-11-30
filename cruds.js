let title = document.getElementById("title")
let price = document.getElementById("price")
let taxes = document.getElementById("taxes")
let ads = document.getElementById("ads")
let discount = document.getElementById("discount")
let total = document.getElementById("total")
let count = document.getElementById("count")
let category = document.getElementById("category")
let create = document.getElementById("create")
let search = document.getElementById("search")
let table = document.getElementById("tbody")
let deleteAllDiv = document.getElementById('deleteAll')
let mode = "create"
let products;
let temp;
let searchMode = "Title"

if(localStorage.products != null){
    products=JSON.parse(localStorage.products)
}
else{products=[]}

// get total function

function getTotal() {
    if(price.value!==""){
        total.innerText = +price.value + +taxes.value + +ads.value - +discount.value;
        total.style.backgroundColor= "darkgreen"
    }
    else{
        total.innerText =""
        total.style.backgroundColor= "rgb(128, 25, 18)"
    }
}

// create & update product function

function newProduct(){
    if(title.value!= '' && price.value!='' && category.value!='' && count.value<=100){
        let newProduct = {
            title:title.value.toLowerCase(),
            price:price.value,
            taxes:taxes.value,
            ads:ads.value,
            discount:discount.value,
            total:total.innerHTML,
            count:count.value,
            category:category.value.toLowerCase()
        }
        if(mode=="create"){
            if(count.value > 1){
                for(i=0;i<count.value;i++){
                    products.push(newProduct)
                }
            }
            else{products.push(newProduct)}
            localStorage.setItem("products", JSON.stringify(products))
        }
        else{
            products[temp] = newProduct
            mode = "create"
            create.innerText="Create"
            count.style.display="block"
        }
        clearData()
    }
    getTotal()
    showData()
}

// show data function

function showData(){
    let data =[]
    products.forEach((product,i) => {
        data += `<tr>
        <td>${i+1}</td>
        <td>${product.title}</td>
        <td>${product.price}</td>
        <td>${product.taxes}</td>
        <td>${product.ads}</td>
        <td>${product.discount}</td>
        <td>${product.total}</td>
        <td>${product.category}</td>
        <td><button class="update" onclick="updateProduct(${i})">Update</button></td>
        <td><button class="delete" onclick="deleteProduct(${i})">Delete</button></td>
        </tr>`
    });
    table.innerHTML = data
    // delete all btn
    if(table.innerHTML!==''){
        deleteAllDiv.innerHTML=''
       let deleteAll= document.createElement('button')
        deleteAll.innerText= `Delete All (${products.length})`
        deleteAll.onclick=function(){
            products=[]
            localStorage.clear()
            showData()
            deleteAllDiv.innerHTML=''
        }
        deleteAllDiv.append(deleteAll)
    }
}

// function to clear data

function clearData(){
    title.value = ''
    price.value = ''
    taxes.value = ''
    ads.value = ''
    discount.value = ''
    count.value = ''
    category.value = ''
}

// delete btn function

function deleteProduct(index){
    products.splice(index,1)
    localStorage.setItem("products", JSON.stringify(products))
    showData()
}

// update btn function 

function updateProduct(index){
    temp = index
    title.value=products[index].title
    price.value=products[index].price
    taxes.value=products[index].taxes
    ads.value=products[index].ads
    discount.value=products[index].discount
    category.value=products[index].category
    mode ="update"
    create.innerText="Update"
    count.style.display="none"
    scroll({
        top:0,
        behavior:'smooth'
    })
    getTotal()
}

// search function

function searchProduct(value){
    let data = []
    products.forEach((product,i) =>{
        if(searchMode == "Title"){
            if(product.title.includes(value.toLowerCase())){
                data += `<tr>
                <td>${i+1}</td>
                <td>${product.title}</td>
                <td>${product.price}</td>
                <td>${product.taxes}</td>
                <td>${product.ads}</td>
                <td>${product.discount}</td>
                <td>${product.total}</td>
                <td>${product.category}</td>
                <td><button class="update" onclick="updateProduct(${i})">Update</button></td>
                <td><button class="delete" onclick="deleteProduct(${i})">Delete</button></td>
                </tr>`
            }
        }
        else{
            if(product.category.includes(value.toLowerCase())){
                data += `<tr>
                <td>${i+1}</td>
                <td>${product.title}</td>
                <td>${product.price}</td>
                <td>${product.taxes}</td>
                <td>${product.ads}</td>
                <td>${product.discount}</td>
                <td>${product.total}</td>
                <td>${product.category}</td>
                <td><button class="update" onclick="updateProduct(${i})">Update</button></td>
                <td><button class="delete" onclick="deleteProduct(${i})">Delete</button></td>
                </tr>`
            }
        }
    })
    
    table.innerHTML=data
}

// search mode function

function changeSearchMode(id){
    showData()
    if(id=="searchbytitle"){
        searchMode="Title"
    }
    else{
        searchMode="Category"
    }
    search.value=''
    search.placeholder=`Search By ${searchMode}`
    search.focus()
}

showData()