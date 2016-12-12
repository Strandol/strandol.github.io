(function() {
  if(!("FormData" in window)){
    return;
  }
  var box = document.querySelector(id="#amount");
  var inc = document.querySelector(".form-travelers__amount_button .increase");
  var dec = document.querySelector(".form-travelers__amount_button .decrease");
  var TravelerTemplate = document.querySelector("#travelers-template").innerHTML;
  var TravelerArea = document.querySelector(".travelers");

  var CountOfPeople = 0;
  var form = document.querySelector(".form-wrapper__form");

  var ImageArea = form.querySelector(".photos__download-image-list");
  var ImageTemplate = document.querySelector("#img-template").innerHTML;

  var mass = [];
  var count = 1;
  form.addEventListener("submit", function(event){
    event.preventDefault();

    data = new FormData(form);
    xhr = new XMLHttpRequest();
    time = (new Date()).getTime();

    xhr.open("post", "https://echo.htmlacademy.ru/adaptive?" + time);

    xhr.addEventListener("readystatechange", function(){
      if(xhr.readyState == 4){
        console.log(xhr.responseText);
      }
    });
    xhr.send(data);
  });

  form.querySelector("#UploadImage").addEventListener("change", function(){
    var files = this.files;
    for(var i = 0; i < files.length; i++){
      PreviewImage(files[i]);
    }
  });
  function PreviewImage(file){
    var reader = new FileReader();
    reader.addEventListener("load", function(event) {
      var html = Mustache.render(ImageTemplate, {
        "image": event.target.result,
        "name": file.name
      });

      if(count > 7){
        alert('Вы загрузили максимум картинок!');
        return;
      }
      else {
        count++;
      }
      var div = document.createElement("div");
      div.classList.add("photos__download-image-list--item");
      div.innerHTML = html;

      ImageArea.appendChild(div);

      div.querySelector(".photos__del-photo").addEventListener("click", function(event){
        event.preventDefault();
        RemoveImage(div);
      });
      mass.push({
        "file": file,
        "div": div
      });
    });

    reader.readAsDataURL(file);
  }
  function RemoveImage(div) {
    mass = mass.filter(function(Elem){
      return Elem.div != div;
    });
    count--;
    div.parentNode.removeChild(div);
  };


  inc.addEventListener("click", function(){
    if(CountOfPeople < 7)
    {
      CountOfPeople++;
      var html = Mustache.render(TravelerTemplate, {
        "name": event.target.result
      });

      box.value = CountOfPeople + " чел";

      var div = document.createElement("div");
      div.classList.add("traveler");
      div.innerHTML = html;
      TravelerArea.appendChild(div);

      div.querySelector(".travelers__number").textContent = CountOfPeople;
      
      var buttonRemove = div.querySelector(".travelers__remove");
      buttonRemove.addEventListener("click", function(event){
        event.preventDefault();
        if(CountOfPeople > 0)
        {
          CountOfPeople--;
          box.value = CountOfPeople + " чел";
          child = document.querySelector(".traveler");
          child.parentNode.removeChild(child);
          div.querySelector(".travelers__number").textContent = CountOfPeople;
          var newMass = document.querySelectorAll(".travelers .traveler");
          for(var i = 0; i < newMass.length; i++){
            newMass[i].querySelector(".travelers__number").textContent = i+1;
          }
        }
      });
    }
  });

  dec.addEventListener("click", function(){
    if(CountOfPeople > 0)
    {
      CountOfPeople--;
      box.value = CountOfPeople + " чел";
      child = document.querySelector(".traveler");
      child.parentNode.removeChild(child);
      var newMass = document.querySelectorAll(".travelers .traveler");
      for(var i = 0; i < newMass.length; i++){
        newMass[i].querySelector(".travelers__number").textContent = i+1;
      }
    }
  });

})();
