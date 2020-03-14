// Your js goes here
//v2
let obj ={}
let mean = []
var arrayIssues =[]
let username;
let url = document.location.href
let urlArray = url.split('/')
fetch(window.location.href.includes("?q=is%3Aissue+is%3Aclosed") ? `https://api.github.com/repos/${urlArray[3]}/${urlArray[4]}/issues?state=closed`:`https://api.github.com/repos/${urlArray[3]}/${urlArray[4]}/issues`,{
  "Accept":"application/vnd.github.squirrel-girl-preview"
})
.then(res=>res.json())
.then(domElemArray => 
{
  // testing
  let doc = document.querySelector('.user-profile-link')
  username = doc.innerText.split(" ").pop()
  console.log(username,"testing")
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
      var item = Array.from(doc.querySelectorAll('.sidebar-progress-bar'));
    
      //version 4
      let children = item[0].innerText
      regexElem  = children.replace(/ /g,'').trim().replace(/\r?\n|\r/g," ").split('    ').join("").split(' ')
      console.log("regex",regexElem)
      let multiProjects=[];
      multiProjects.push(regexElem[0])
      for(let i=0;i<regexElem.length;i++){
        if(regexElem[i]===""){
          console.log(regexElem[i+1],"hulop")
          multiProjects.push(regexElem[i+1])
        }
      }
      // console.log(multiProjects,"MEAN")

      // let regexElem  = children.replace(/ /g,'').trim().replace(/\r?\n|\r/g," ").split('    ')
      // let filtered = regexElem.filter(item => item.length>0)
      // filtered.shift()
      // filtered.shift()
      // let multiProjects=[] ;
      // multiProjects.push(filtered[0])
      // let x = filtered.map(s=>{
      // if(s[0]===" "&&s[1]===" "){
      //   multiProjects.push(s)
      //   return s
      // }
      // })
      // console.log(x,"x")
      // console.log(filtered,"filtered")
      // console.log(multiProjects,"multi")
      // if(urlArray[3]==username.toLowerCase()){
      //   console.log("filred",domElemArray[i].id,regexElem[0])
      //   obj[`${domElemArray[i].id}`]= regexElem[0]
      // }else{
      //   console.log("filred",domElemArray[i].id,regexElem[0])
      //   obj[`${domElemArray[i].id}`]= regexElem[0]
      // }
      obj[`${domElemArray[i].id}`]= multiProjects[0]
      
    }) 
    
  }
  arrayIssues.push(obj)
}).then(
  // logic to manipulate dom in the issue page
    response =>{
      console.log(arrayIssues,"project content and id to check")
      let issuesDomArray = [...document.querySelectorAll('.Box-row--focus-gray')]
      // console.log(issuesDomArray,"new Appraoch")
      setTimeout(() => {
        for(let i=0;i<issuesDomArray.length;i++){
        console.log("golmaloloi")
          for(let j=0;j<arrayIssues.length;j++){
            if((arrayIssues[j][issuesDomArray[i].dataset.id]) && (arrayIssues[j][issuesDomArray[i].dataset.id]!="Noneyet")){
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
      }, 5000);
    }
  )
