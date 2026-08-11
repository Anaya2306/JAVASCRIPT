
document.addEventListener("DOMContentLoaded", () => {
    
    const calcButton = document.getElementById("calcBtn");
    
    
    calcButton.addEventListener("click", () => {
        const inputRaw = document.getElementById("numberStream");
        const alertBox = document.getElementById("errorAlert");
        const minDisplay = document.getElementById("minValueDisplay");
        const maxDisplay = document.getElementById("maxValueDisplay");

        
        minDisplay.textContent = "-";
        maxDisplay.textContent = "-";

        
        const rawSegments = inputRaw.value.split(",");
        const cleanArray = [];

        for (let i = 0; i < rawSegments.length; i++) {
            const stripped = rawSegments[i].trim();
            if (stripped !== "" && !isNaN(stripped)) {
                cleanArray.push(Number(stripped));
            }
        }

      
        if (cleanArray.length === 0) {
            alertBox.style.display = "block";
            return;
        } else {
            alertBox.style.display = "none";
        }

        
        let minimumResult = cleanArray[0];
        let maximumResult = cleanArray[0];

        for (let pointer = 1; pointer < cleanArray.length; pointer++) {
            let isolatedElement = cleanArray[pointer];

            if (isolatedElement < minimumResult) {
                minimumResult = isolatedElement;
            }
            if (isolatedElement > maximumResult) {
                maximumResult = isolatedElement;
            }
        }

        
        minDisplay.textContent = minimumResult;
        maxDisplay.textContent = maximumResult;
    });
});
