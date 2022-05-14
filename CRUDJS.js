const apiProducts="http://localhost:3000/products"
function start(){
    getProducts(renderProducts)
    handleCreateProduct()
}
start()

function getProducts(callback){
    fetch(apiProducts)
    .then((response)=>{
return response.json()
    })
    .then(callback)
}
function createProducts(data,callback){
    const option={
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(data)
    }
    fetch(apiProducts,option)
    .then((response)=>{
return response.json()
    })
    .then(callback)
}
function handleCreateProduct(){
    const btnCreate=document.querySelector("#create_product")
    btnCreate.onclick=()=>{
      const name =  document.querySelector('input[name="name"]').value;
      const infomation =  document.querySelector('input[name="infomation"]').value;
      const price =  document.querySelector('input[name="price"]').value;

      const data={
        name:name,
        infomation:infomation,
        price:price
      }
      createProducts(data,()=>{
        getProducts(renderProducts)
      })
    }
}
function handleDeleteProduct(id){
    const option={
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
          },
    }
    fetch(apiProducts+"/"+id,option)
    .then((response)=>{
return response.json()
    })
    .then(()=>{
const productItem=document.querySelector(".card-item-"+id)
if(productItem)
productItem.remove()
    })
}
function renderProducts(products){
    const card= document.querySelector(".item")
    const htmls=products.map((product)=>{
return `
        <div class="card card-item-${product.id}">
            <img class="card-img-top" src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22286%22%20height%3D%22180%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20286%20180%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_180bb5f8ed1%20text%20%7B%20fill%3Argba(255%2C255%2C255%2C.75)%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A14pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_180bb5f8ed1%22%3E%3Crect%20width%3D%22286%22%20height%3D%22180%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22107.203125%22%20y%3D%2296.3%22%3E286x180%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E" alt="Card image cap">
            <div class="card-body">
                <h5 class="card-title">${product.name}</h5>
                <p class="card-text">${product.infomation}</p>
                <p class="card-text">${product.price}</p>
                <a href="#" class="btn btn-primary">Edit SP</a>
                <a onClick="handleDeleteProduct(${product.id})" href="#" class="btn btn-danger">Xóa SP</a>
            </div>
        </div>`
    })

card.innerHTML=htmls.join('')
}



