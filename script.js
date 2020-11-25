var out=document.getElementsByClassName('rownr')[0];
var inp=document.getElementsByClassName('txt')[0];
var compile=document.getElementById('comp');
var ans=document.getElementById('ans');
console.log(ans);
inp.addEventListener('keydown',myfun);
var lang=document.getElementById("option");
compile.addEventListener("click",compilation);
function fetchUser(){
    compile.disabled=true;
    compile.innerHTML="Loading...";
    var request=new XMLHttpRequest();
    request.open("POST","https://codequotient.com/api/executeCode");
    var obj={};
     obj.code=inp.value;
     console.log(obj);
     obj.langId=lang.value;
    request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    var st=JSON.stringify(obj);
    console.log(st);
    request.send(st);
    request.addEventListener("load",(event)=>{
        var resp=JSON.parse(request.responseText);
        console.log(resp);
        var vals=2000;
        if(obj.langId==8){
            vals=5000;
        }
           setTimeout(function(){
    var req = new XMLHttpRequest();
    const url = "https://codequotient.com/api/codeResult/"+resp.codeId;

    req.open("GET",url);
    req.send();
        req.addEventListener("load",function(event){
            console.log(req);
        var output = JSON.parse(JSON.parse(event.currentTarget.responseText).data);
            if(output.output != "")
            {
                console.log(output);
                console.log(output.output);
                ans.innerHTML=output.output;
            }
            else{
                console.log("error: "+output.errors);
                ans.innerHTML="error: "+output.errors;
            }
            compile.innerHTML = "Compile";
            compile.disabled = false;

    });
    },vals);
    });
}   
function compilation(event){
    if(inp.value!=""){
        fetchUser();
    }else{
        alert("Please Write Something TO Compile");
    }
}
function myfun(event){
    var leng=event.target.value.split('\n').length;
    var st='';
    for(var i=0;i<=leng;i++){
        st=st+(i+1)+'\n';
    }
    out.innerHTML=st;
}
