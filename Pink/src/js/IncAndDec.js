(function(){
  box = document.querySelector(id="#duration");
  inc = document.querySelector(".duration_button .increase");
  dec = document.querySelector(".duration_button .decrease");
  
  DFrom = document.querySelector(id="#date-of-departure");
  DTo = document.querySelector(id="#return-date");

  var count = box.value.substring(0,2);
  var options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  DFrom.addEventListener("change", function(event){
    GetAllValues();
    if(box.value.substring(1,2) == " "){
      count = count.substring(0,1);
    }
    mounth = GetMounth(temp, mounth, index);
    GetResultDate();
  });

  inc.addEventListener("click",function() {
    GetAllValues();
    if(box.value.substring(1,2) == " "){
      count = count.substring(0,1);
    }
    if(count < 60)
    {
      count++;
      box.value = count + " дней";
      mounth = GetMounth(temp, mounth, index);
      GetResultDate();
    }
  });

  dec.addEventListener("click", function() {
    GetAllValues();
    if(box.value.substring(1,2) == " "){
      count = count.substring(0,1);
    }
    if(count < 61 && count > 0)
    {
      count--;
      box.value = count + " дней";
      mounth = GetMounth(temp, mounth, index);
      GetResultDate();
    }
  });

  function GetResultDate(){
    var NewDayDate = 0;
    NewDayDate = Number(day) + Number(count);
    date = new Date();
    date = new Date(year, mounth, NewDayDate);
    DTo.value = date.toLocaleString("ru", options);
  }
  function GetAllValues(){
    index = 0;
    mounth = 0;
    temp = DFrom.value.substring(0, DFrom.value.length);
    day =  DFrom.value.substring(0, 2);
    year = DFrom.value.substring(temp.length - 4, temp.length);
    count = box.value.substring(0,2);
  };
  function GetMounth(temp, mounth, index){
    if(~temp.indexOf("января")){
      mounth = 0;
      index = temp.indexOf("января");
      return mounth;
    }
    if(~temp.indexOf("февраля")){
      mounth = 1;
      index = temp.indexOf("февраля");
      return mounth;
    }
    if(~temp.indexOf("марта")){
      mounth = 2;
      index = temp.indexOf("марта");
      return mounth;
    }
    if(~temp.indexOf("апреля")){
      mounth = 3;
      index = temp.indexOf("апреля");
      return mounth;
    }
    if(~temp.indexOf("мая")){
      mounth = 4;
      index = temp.indexOf("мая");
      return mounth;
    }
    if(~temp.indexOf("июня")){
      mounth = 5;
      index = temp.indexOf("июня");
      return mounth;
    }
    if(~temp.indexOf("июля")){
      mounth = 6;
      index = temp.indexOf("июля");
      return mounth;
    }
    if(~temp.indexOf("августа")){
      mounth = 7;
      index = temp.indexOf("августа");
      return mounth;
    }
    if(~temp.indexOf("сентября")){
      mounth = 8;
      index = temp.indexOf("сентября");
      return mounth;
    }
    if(~temp.indexOf("октября")){
      mounth = 9;
      index = temp.indexOf("октября");
      return mounth;
    }
    if(~temp.indexOf("ноября")){
      mounth = 10;
      index = temp.indexOf("ноября");
      return mounth;
    }
    if(~temp.indexOf("декабря")){
      mounth = 11;
      index = temp.indexOf("декабря");
      return mounth;
    }
  };
})();
