function checkTaj(taj) {  // stringként kell megadni a paramétert, különben ha az első számjegy 0, el fog veszni
    let tajArray = Array.from(taj);
    const lastDigit = tajArray.pop();
    let checksum = 0;
    for (let i = 0; i < tajArray.length; i++) {
        let multiplier;
        if (i % 2 == 0) {  // páros indexe a páratlan (1., 3., 5., 7.) helyen álló elemeknek van
            multiplier = 3;
        }
        else {
            multiplier = 7;
        }
        checksum += tajArray[i] * multiplier;
    }
    const result = checksum % 10 == lastDigit;
    return result;
}

function checkTaxId(taxId, birthDate) {  // birth date format: "%Y-%m-%d"
    let taxIdArray = Array.from(taxId.toString());
    const checkA = taxIdArray[0] == 8;

    const baseDate = new Date("1867-01-01");
    const dayDifference = differenceInDays(baseDate, new Date(birthDate));
    const digitsForCheckB = mergeElements(taxIdArray, 1, 5);
    const checkB = dayDifference == digitsForCheckB;

    const lastDigit = taxIdArray.pop();
    let checksum = 0;
    for (let i = 0; i < taxIdArray.length; i++) {
        checksum += taxIdArray[i] * (i + 1);
    }
    const checkC = checksum % 11 == lastDigit;
    return checkA && checkB && checkC;

}

function differenceInDays(date1, date2) {
    const oneDay = 1000 * 60 * 60 * 24;  // mivel a Date objectek ezredmásodperceket tárolnak
    const diffInMsec = Math.abs(date1 - date2);
    const diffInDays = Math.floor(diffInMsec / oneDay);
    return diffInDays;
}

function mergeElements(array, firstIndex, lastIndex){  // inclusive
    let result = "";
    for (let index = firstIndex; index < lastIndex + 1; index++) {
        result += array[index];
    }
    return parseInt(result);
}
