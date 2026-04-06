function generateArray(size, maxValue = 999) {
    const arr = [];
    for (let i = 0; i < size; i++) {
        arr.push(Math.floor(Math.random() * maxValue));
    }
    return arr;
}

function generateSparseArray(size, definedCount, maxValue = 999) {
    const arr = [];
    for (let i = 0; i < definedCount; i++) {
        arr.push(Math.floor(Math.random() * maxValue));
    }
    arr.length = size; // решта елементів стають undefined / holes
    return arr;
}

function section(title) {
    console.log("\n" + title);
    const output = document.getElementById("output");
    if (output) {
        output.textContent += "\n" + title + "\n";
    }
}

const baseArr = generateArray(100);
const sparseArr = generateSparseArray(100, 50);

section("ПОЧАТКОВИЙ НЕРOЗРІДЖЕНИЙ МАСИВ (100 елементів)");
console.log(baseArr);

SortLib.bubbleSort(baseArr.slice(), true);
SortLib.selectionSort(baseArr.slice(), true);
SortLib.insertionSort(baseArr.slice(), true);
SortLib.shellSort(baseArr.slice(), true);
SortLib.quickSort(baseArr.slice(), true);

section("ПОЧАТКОВИЙ РОЗРІДЖЕНИЙ МАСИВ (100 елементів)");
console.log(sparseArr);

SortLib.bubbleSort(sparseArr.slice(), true);
SortLib.selectionSort(sparseArr.slice(), true);
SortLib.insertionSort(sparseArr.slice(), true);
SortLib.shellSort(sparseArr.slice(), true);
SortLib.quickSort(sparseArr.slice(), true);

section("ДЕМОНСТРАЦІЯ СОРТУВАННЯ ЗА СПАДАННЯМ");
SortLib.quickSort(baseArr.slice(), false);
