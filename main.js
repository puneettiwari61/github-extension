// Your js goes here
//v2
let obj ={}

var arrayIssues =[]
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
.then(domElemArray => 
{
  // testing
  let doc = document.querySelector('.user-profile-link')
  console.log(doc.innerText,"testing")
  console.log(domElemArray,"issues");//arrayIssues of all the issues
  for(let i=0;i<domElemArray.length;i++){
    let extra = domElemArray[i].url.split('/')
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
        console.log("filred",filtered[1],domElemArray[i].id)
        obj[`${domElemArray[i].id}`]= String(filtered[1])
      }else{
        console.log("filred",filtered[0],domElemArray[i].id)
        obj[`${domElemArray[i].id}`]= String(filtered[0].trim().split("  ")[0])
      }
      
      return obj
    }) 
    console.log(obj) //just for checking 
  }
  arrayIssues.push(obj)
}).then(
  // logic to manipulate dom in the issue page
    response =>{
      console.log(response,"check") //just for checking
      console.log(arrayIssues,"project content and id to check")
      let keysArray = []
     
      let issuesDomArray = [...document.querySelectorAll('.Box-row--focus-gray')]
      
      console.log(issuesDomArray,"new Appraoch")
      setTimeout(() => {
        for(let i=0;i<issuesDomArray.length;i++){
        
          for(let j=0;j<arrayIssues.length;j++){
            if(arrayIssues[j][issuesDomArray[i].dataset.id]!="Noneyet"){
              const p =document.createElement("p")
              p.innerText = arrayIssues[j][issuesDomArray[i].dataset.id] 
              p.style.background="#2AB049"
              p.style.color = "#ffffff"
              p.style.border="1px solid grey"
              p.style.width = "100px"
              p.style.fontSize = "10px"
              p.style.borderRadius = "2px"
              p.style.textAlign =  "center";
              p.style.marginLeft = "5px";
              p.style.fontWeight="bold"
              p.innerText=='Noneyet' ? '' : issuesDomArray[i].append(p) 
              console.log("dom manipulate check")
            }
          }
        }
      }, 3500);
      
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
