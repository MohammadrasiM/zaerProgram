import { useState } from "react";
const createLine = (canvas) => {
  var ctx = canvas.getContext("2d");
  ctx.moveTo(canvas.width * Math.random() * 3, canvas.height * Math.random() * 3);
  ctx.lineTo(canvas.height * Math.random() * 3, canvas.width * Math.random() * 3);
  ctx.strokeStyle = "#999";
  ctx.stroke();
};
export const useCaptcha = () => {
  const [captcha, setcaptcha] = useState(null);

  function createCaptcha() {
    if (document.getElementById("captcha")) {
      var code = "";
      //clear the contents of captcha div first
      document.getElementById("captcha").innerHTML = "";
      var charsArray = "0123456789";
      var lengthOtp = 4;
      var captcha = [];
      for (var i = 0; i <= lengthOtp; i++) {
        //below code will not allow Repetition of Characters
        var index = Math.floor(Math.random() * charsArray.length + 1); //get the next character from the array
        if (captcha.indexOf(charsArray[index]) == -1) captcha.push(charsArray[index]);
        else i--;
      }
      var canv = document.createElement("canvas");

      canv.id = "captcha";
      canv.width = 70;
      canv.height = 50;
      createLine(canv);
      createLine(canv);
      createLine(canv);
      createLine(canv);
      createLine(canv);
      createLine(canv);
      createLine(canv);
      var ctx = canv.getContext("2d");

      ctx.font = "italic 25px IRANSans";
      const gradient = ctx.createLinearGradient(0, 0, canv.width, 0);
      gradient.addColorStop("0", "magenta");
      gradient.addColorStop("0.5", "blue");
      gradient.addColorStop("1.0", "red");
      ctx.strokeStyle = gradient;
      ctx.strokeText(captcha.join(""), 0, 30);
      //storing captcha so that can validate you can save it somewhere else according to your specific requirements
      code = captcha.join("");
      setcaptcha(code);
      document.getElementById("captcha").appendChild(canv);
    }
  }
  return { captcha, createCaptcha };

  // <div>
  // </div>
};
