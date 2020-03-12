// You js goes here
// import axios from "axios"

  // alert('hello I m extension of chrome ' + window.location.href)

 
  // issues =  Array.from(issues)
  // issues.shift()

  // issues.forEach(i => {
  //   i.innerText = i.innerText +  " Project" 
  // })
  // console.log(issues,"sadasdsa1231231")
  // console.log(result, "resyusds")
  // let project = document.querySelector('.f6 text-bold link-gray-dark no-underline')
 
  // let result = project.unshift()
  // console.log(result,"sdasdsas")

// fetch("https://github.com/repos/ayush-mann/trello-fullStack/issues/1",{
//   method:"GET",
//   headers:{
//     "Content-Type":"text",
//     "Accept":"application/vnd.github.machine-man-preview",
//     // mode: 'cors',
//     // credentials: 'omit'
    
//   }
// }).then(res => res.text)
// .then(res => console.log(res))


// fetch(`${document.location.href}/1`).then(function (response) {
// 	// The API call was successful!
// 	return response.text()
// }).then(function (html) {
// 	// This is the HTML from our response as a text string
//   var parser = new DOMParser();
//   var doc = parser.parseFromString(html, 'text/html');
  
  // var item = doc.querySelectorAll('.js-issue-sidebar-form');
  // let children = item[1].innerText
  // let regexElem  = children.replace(/ /g,'').trim().replace(/\r?\n|\r/g," ").split('    ')
  // let filtered = regexElem.filter(item => item.length>0)
  // filtered.shift()
  // console.log(filtered.join(" "))  
//   var issue = document.getElementById(`issue_7_link`)
// console.log(issue,"isuue gol,mal")
// issue.innerText = issue.innerText + " " + `Project ${filtered[1]}`
 
// }).catch(err => console.log(err))













//v2
let obj ={}

var array =[]
let username;
let url = document.location.href
let urlArray = url.split('/')
fetch(window.location.href.includes("?q=is%3Aissue+is%3Aclosed") ? `https://api.github.com/repos/${urlArray[3]}/${urlArray[4]}/issues?state=closed`:`https://api.github.com/repos/${urlArray[3]}/${urlArray[4]}/issues`,{
  "Accept":"application/vnd.github.squirrel-girl-preview"
})
.then(res=>res.json())
.then(fetch("https://api.github.com/users/ayush-mann")
.then(resp => resp.json())
.then(resp => 
  {username = resp.login;}
  ))
.then(d => 
{
  // testing
  let doc = document.querySelector('.user-profile-link')
  console.log(doc.innerText,"testing")
  // 
  console.log(d,"issues");//array of all the issues
  for(let i=0;i<d.length;i++){
    let extra = d[i].url.split('/')
    let issueNum = extra.pop()
    
    var presentUrl = window.location.href
    var modifiedUrl = window.location.href.includes("?q=is%3Aissue+is%3Aclosed")? presentUrl.split("?")[0] : presentUrl
    fetch(`${modifiedUrl}/${issueNum}`).then(function (response) {
      console.log(`${document.location.href}/${issueNum}`)
      return response.text()
    }).then(function(html){
      var parser = new DOMParser();
      var doc = parser.parseFromString(html, 'text/html');
      var item = doc.querySelectorAll('.js-issue-sidebar-form');
      let children = item[1].innerText
      let regexElem  = children.replace(/ /g,'').trim().replace(/\r?\n|\r/g," ").split('    ')
      let filtered = regexElem.filter(item => item.length>0)
      filtered.shift()
      if(urlArray[3]==username.toLowerCase()){
        console.log("filred",filtered[1],d[i].id)
        obj[`${d[i].id}`]= String(filtered[1])
      }else{
        console.log("filred",filtered[0],d[i].id)
        obj[`${d[i].id}`]= String(filtered[0])
      }
      
      return obj
    }) 
    console.log(obj) //unnecessary
  }
  array.push(obj)
}).then(
  // logic to manipulate dom in the issue page
    e =>{
      console.log(e,"check") //unnecessary
      console.log(array,"project content and id to check")
      let keysArray = []
     
      let issuesDomArray = [...document.querySelectorAll('.Box-row--focus-gray')]
      
      console.log(issuesDomArray,"new Appraoch")
      setTimeout(() => {
        for(let i=0;i<issuesDomArray.length;i++){
        
          for(let j=0;j<array.length;j++){
            if(array[j][issuesDomArray[i].dataset.id]!="Noneyet"){
              const span =document.createElement("span")
              span.innerText = array[j][issuesDomArray[i].dataset.id] 
              issuesDomArray[i].append(span) 
              console.log("dom manipulate check")
            }
          }
        }
      }, 3000);


    //   Object.keys(obj).forEach(num =>{
    //     console.log(num)
    //   //   if(ids === num){ 
    //   //  var element =  document.querySelector(`#issue_${issueNum}_link`)
    //   //  element.innerText = element.innerText + obj[num]
    //   //  console.log(element)
    // //  }
    // })
    }
  )


