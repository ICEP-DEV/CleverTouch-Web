import html2canvas from 'html2canvas';


export const takeScreenShot=(elememntid,fileName,fileType,backgroungColor="#000000")=>{

    const element = document.getElementById("divToTakeScreenShotOf");
    if(!element){
      return;
    }
    html2canvas(element,{backgroungColor}).then((canvas)=>{

    let image = canvas.toDataURL("image/jpeg");
    console.log("the image is",image)
    const a =document.createElement("a");
    a.href = image;
    a.download = "Capture.jpeg";
    a.click();
    }).catch(err=>{
      console.error["We cannot take the screenshot of your element at the moment."]
    })
}