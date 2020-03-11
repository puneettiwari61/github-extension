// You js goes here
// import axios from "axios"

  alert('hello I m extension of chrome ' + window.location.href)

 
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
  console.log(d);//array of all the issues
  for(let i=0;i<d.length;i++){
    let obj ={}
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
      array.push(obj) 
    }) 


  }}).then(
    e =>{
      console.log(array)
    }
  )

  // content.js
// background.js

// // Called when the user clicks on the browser action.
// chrome.browserAction.onClicked.addListener(function(tab) {
//   // Send a message to the active tab
//   chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//     var activeTab = tabs[0];
//     chrome.tabs.sendMessage(activeTab.id, {"message": "clicked_browser_action"});
//   });
// });

// // This block is new!
// chrome.runtime.onMessage.addListener(
//   function(request, sender, sendResponse) {
//     if( request.message === "open_new_tab" ) {
//       chrome.tabs.create({"url": request.url});
//     }
//   }
// );

