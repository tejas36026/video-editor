    
    const Awords = addtextword.split('|');


    if (inputElement) {
          const sentence = inputElement.value;
          const words = sentence.split(" ");
          const areWordsPresent = words.some(word => Awords.includes(word));

    if (areWordsPresent) {
        console.log(`Some words from the input are present in the string.`);    
    
  } else {
    console.log('No words from the input are present in the string.');
  }
  }
    else {
      console.log('Input element not found.');
    }

    textarea.addEventListener('input', () => {
       const textareaValue = textarea.value.toLowerCase();
       
       if (addtextword.split('|').some(word => textareaValue.includes(word))) {
        console.log("india");
        alert(`Word found: ${word}`); 
      }
    });