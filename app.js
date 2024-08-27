const notification = new Notyf();

const caesarCipherEncrypt = (plainText, shiftAmount) => {
  return Array.from(plainText).map(character => {
    const charCode = character.charCodeAt(0);

    if (charCode >= 65 && charCode <= 90) {
      // Mayúsculas
      return String.fromCharCode((((charCode - 65 + shiftAmount) % 26) + 26) % 26 + 65);
    } else if (charCode >= 97 && charCode <= 122) {
      // Minúsculas
      return String.fromCharCode((((charCode - 97 + shiftAmount) % 26) + 26) % 26 + 97);
    } else {
      return character;
    }
  }).join('');
};

const caesarCipherDecrypt = (cipherText, shiftAmount) => 
  caesarCipherEncrypt(cipherText, -shiftAmount);

const handleEncryption = () => {
  const userInput = document.getElementById("input-text").value.trim(); 

  if (!userInput) {
    notification.error("Tienes que ingresar datos."); 
    return; 
  }

  const shiftAmount = Math.floor(Math.random() * 10) + 1;
  const cipherText = caesarCipherEncrypt(userInput, shiftAmount);

  document.querySelector(".text").textContent = cipherText;
  document.getElementById("input-text").value = "";
  document.querySelector(".text").setAttribute("data-shift", shiftAmount);
  document.querySelector(".no-found").style.display = "none";
  document.querySelector(".btn-copy").style.display = "inline-block";
};

const handleDecryption = () => {
  const textElement = document.querySelector(".text");
  const cipherText = textElement.textContent;
  const shiftAmount = parseInt(textElement.getAttribute("data-shift"), 10);

  if (cipherText && !isNaN(shiftAmount)) {
    const plainText = caesarCipherDecrypt(cipherText, shiftAmount);
    textElement.textContent = plainText;
    document.getElementById("input-text").value = "";
  } else {
    notification.error("No se encontró un texto encriptado válido.");
  }
};

const copyTextToClipboard = async () => {
  const textToCopy = document.querySelector(".text").textContent;

  if (textToCopy) {
    try {
      await navigator.clipboard.writeText(textToCopy);
      notification.success("Texto copiado!");
    } catch (error) {
      notification.error("Error al copiar el texto");
    }
  } else {
    notification.error("No hay texto para copiar.");
  }
};

const sanitizeInput = () => {
  const inputElement = document.getElementById("input-text");
  inputElement.value = inputElement.value.toLowerCase().replace(/[^a-z\s]/g, "");
};
