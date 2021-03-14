// 預設套票資料
let originData = [
  {
    "id": 0,
    "name": "肥宅心碎賞櫻3日",
    "imgUrl": "https://images.unsplash.com/photo-1522383225653-ed111181a951?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1655&q=80",
    "area": "高雄",
    "description": "賞櫻花最佳去處。肥宅不得不去的超讚景點！",
    "group": 87,
    "price": 1400,
    "rate": 10
  },
  {
    "id": 1,
    "name": "貓空纜車雙程票",
    "imgUrl": "https://images.unsplash.com/photo-1501393152198-34b240415948?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
    "area": "台北",
    "description": "乘坐以透明強化玻璃為地板的「貓纜之眼」水晶車廂，享受騰雲駕霧遨遊天際之感",
    "group": 99,
    "price": 240,
    "rate": 2
  },
  {
    "id": 2,
    "name": "台中谷關溫泉會1日",
    "imgUrl": "https://images.unsplash.com/photo-1535530992830-e25d07cfa780?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
    "area": "台中",
    "description": "全館客房均提供谷關無色無味之優質碳酸原湯，並取用八仙山之山冷泉供蒞臨貴賓沐浴及飲水使用。",
    "group": 20,
    "price": 1765,
    "rate": 7
  }
];

/*** DOM 與預設變數 ***/
let ticketList = document.querySelector('.js-ticketList');
let searchResult = document.querySelector('.js-searchResult');
let ticketArea = document.querySelector('.js-ticketArea');
let formData = document.querySelector('.js-addNewData');

/*** 函式處理 ***/
// 套票資料顯示
function printTicketList(data){
  let ticketItemStr = ''
  data.forEach(item => {
    let str = `
    <li class="col">
        <div class="card border-0 h-100">
          <div class="position-relative mb-3">
            <a href="">
              <img src="${item.imgUrl}" class="card-img-top" alt="...">
            </a>
            <p class="position-absolute top-0 start-0 translate-middle-y bg-secondary rounded-end p-3 text-white">${item.area}</p>
            <p class="position-absolute top-100 start-0 translate-middle-y bg-primary rounded-end py-2 px-3 mb-0 text-white">${item.rate}</p>
          </div>
          <div class="card-body d-flex flex-column justify-content-between">
            <div>
            <a href="" class="text-decoration-none text-primary">
              <h5 class="card-title border-bottom border-primary border-2 pb-2">${item.name}</h5>
            </a>
            <p class="card-text text-info">${item.description}</p>
            </div>
            <div class="d-flex justify-content-between align-items-center text-primary">
              <p class="mb-0 fw-bolder">剩下最後 ${item.group} 組</p>
              <p class="mb-0 d-flex align-items-center">TWD<span class="h2 ms-3 mb-0"> $ ${item.price}</span></p>
            </div>
          </div>
      </div>
    </li>
    `
    ticketItemStr += str
  })
  searchResult.textContent = `本次搜尋共 ${data.length} 筆資料`
  ticketList.innerHTML = ticketItemStr
}
// 列出地區選擇
function printAreaList() {
  let ticketAreaStr = ''
  originData.forEach(item => {
    let areaStr = `
      <option value="${item.area}">${item.area}</option>
    `
    ticketAreaStr += areaStr
  })
  ticketArea.innerHTML = `<option value="" disabled selected hidden>地區搜尋</option><option value="All">所有地區</option>` + ticketAreaStr 
}
// 搜尋結果
function search(areaName){
  let searchData = []
  if (areaName.target.value === "All"){
    searchData = originData
  } else {
    originData.forEach(item => {
      if (item.area === areaName.target.value){
        searchData.push(item)
      }
    })
  }
  printTicketList(searchData)
}
// 新增套票
function addNewData(addData) {
  let newData = Object.assign({}, originData[0])
  newData.id = originData.length
  newData.name = addData.target[0].value 
  newData.imgUrl = addData.target[1].value || "https://images.unsplash.com/photo-1522383225653-ed111181a951?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1655&q=80"
  newData.area = addData.target[2].value
  newData.price = addData.target[3].value
  newData.group = addData.target[4].value
  newData.rate = addData.target[5].value
  newData.description = addData.target[6].value
  originData.push(newData)
  printTicketList(originData)
  console.log(addData.target[7]);
  Array.from(addData.target).forEach(item => {
    if (item.value === '新增套票'){
      item.value = '新增套票'
    } else {
      item.value = ''
    }
  })
}
// 預設執行
printAreaList()
printTicketList(originData)
// 監聽事件
ticketArea.addEventListener('change', (Event) => {
  search(Event)
})
formData.addEventListener('submit', (Event) => {
  Event.preventDefault()
  addNewData(Event)
})