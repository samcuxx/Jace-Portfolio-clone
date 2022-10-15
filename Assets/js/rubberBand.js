

const homie = (elementClass) => {
  let blast = document.querySelectorAll(elementClass)[0];
  let x = blast.innerHTML;
  blast.innerHTML = "";
  for (let i = 0; i < x.length; i++) {
    let tag = document.createElement("span");
    if (x[i] != " ") tag.innerHTML = x[i];
    else tag.innerHTML = "&nbsp;";
    tag.classList.add("homieeach");
    blast.appendChild(tag);
  }

  var all = document.querySelectorAll(".homieeach");
  console.log(all.innerHTML);
  for (let i = 0; i < all.length; i++) {
    all[i].addEventListener("mouseenter", (e) => {
      all[i].classList.add("rubberBand");
    });
    all[i].addEventListener("animationend", (e) => {
      all[i].classList.remove("rubberBand");
    });
  }
};


homie('.homie')
homie('.homie2')
homie('.homie3')
homie('.homie4')
homie('.homie-portfolio')
homie('.homie-about')
homie('.homie-contact')
