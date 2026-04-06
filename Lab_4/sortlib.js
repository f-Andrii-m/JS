const SortLib = (function () {
    function ensureArray(arr) {
        if (!Array.isArray(arr)) {
            throw new TypeError("Очікується масив.");
        }
    }

    function formatArray(arr) {
        return `[${arr.map(v => v === undefined ? "undefined" : v).join(", ")}]`;
    }

    function logToPage(text) {
        const output = document.getElementById("output");
        if (output) {
            output.textContent += text + "\n";
        }
    }

    function printLine(text) {
        console.log(text);
        logToPage(text);
    }

    function preprocessArray(arr) {
        const clean = [];
        let undefinedCount = 0;

        for (let i = 0; i < arr.length; i++) {
            if (arr[i] === undefined) {
                undefinedCount++;
            } else {
                clean.push(arr[i]);
            }
        }

        return { clean, undefinedCount };
    }

    function postprocessArray(originalArr, sortedClean, undefinedCount) {
        originalArr.length = sortedClean.length + undefinedCount;

        for (let i = 0; i < sortedClean.length; i++) {
            originalArr[i] = sortedClean[i];
        }

        for (let i = 0; i < undefinedCount; i++) {
            originalArr[sortedClean.length + i] = undefined;
        }

        return originalArr;
    }

    function printStats(methodName, comparisons, moves, hasUndefined, arr) {
        printLine(`--- ${methodName} ---`);
        printLine(`Порівнянь: ${comparisons}`);
        printLine(`Обмінів/переміщень: ${moves}`);
        if (hasUndefined) {
            printLine("Повідомлення: у масиві виявлено undefined-елементи. Їх переміщено в кінець.");
        }
        printLine(`Результат: ${formatArray(arr)}`);
        printLine("");
    }

    function bubbleSort(arr, ascending = true) {
        ensureArray(arr);
        const { clean, undefinedCount } = preprocessArray(arr);

        let comparisons = 0;
        let moves = 0;
        const n = clean.length;

        for (let i = 0; i < n - 1; i++) {
            for (let j = 0; j < n - i - 1; j++) {
                comparisons++;
                const needSwap = ascending ? clean[j] > clean[j + 1] : clean[j] < clean[j + 1];
                if (needSwap) {
                    [clean[j], clean[j + 1]] = [clean[j + 1], clean[j]];
                    moves++;
                }
            }
        }

        postprocessArray(arr, clean, undefinedCount);
        printStats("Сортування обміном", comparisons, moves, undefinedCount > 0, arr);
        return arr;
    }

    function selectionSort(arr, ascending = true) {
        ensureArray(arr);
        const { clean, undefinedCount } = preprocessArray(arr);

        let comparisons = 0;
        let moves = 0;
        const n = clean.length;

        for (let i = 0; i < n - 1; i++) {
            let targetIndex = i;

            for (let j = i + 1; j < n; j++) {
                comparisons++;
                const better = ascending ? clean[j] < clean[targetIndex] : clean[j] > clean[targetIndex];
                if (better) {
                    targetIndex = j;
                }
            }

            if (targetIndex !== i) {
                [clean[i], clean[targetIndex]] = [clean[targetIndex], clean[i]];
                moves++;
            }
        }

        postprocessArray(arr, clean, undefinedCount);
        printStats("Сортування мінімальних елементів", comparisons, moves, undefinedCount > 0, arr);
        return arr;
    }

    function insertionSort(arr, ascending = true) {
        ensureArray(arr);
        const { clean, undefinedCount } = preprocessArray(arr);

        let comparisons = 0;
        let moves = 0;

        for (let i = 1; i < clean.length; i++) {
            const key = clean[i];
            let j = i - 1;

            while (j >= 0) {
                comparisons++;
                const shouldShift = ascending ? clean[j] > key : clean[j] < key;
                if (!shouldShift) break;

                clean[j + 1] = clean[j];
                moves++;
                j--;
            }

            clean[j + 1] = key;
            moves++;
        }

        postprocessArray(arr, clean, undefinedCount);
        printStats("Сортування вставками", comparisons, moves, undefinedCount > 0, arr);
        return arr;
    }

    function shellSort(arr, ascending = true) {
        ensureArray(arr);
        const { clean, undefinedCount } = preprocessArray(arr);

        let comparisons = 0;
        let moves = 0;
        const n = clean.length;

        for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
            for (let i = gap; i < n; i++) {
                const temp = clean[i];
                let j = i;

                while (j >= gap) {
                    comparisons++;
                    const shouldShift = ascending ? clean[j - gap] > temp : clean[j - gap] < temp;
                    if (!shouldShift) break;

                    clean[j] = clean[j - gap];
                    moves++;
                    j -= gap;
                }

                clean[j] = temp;
                moves++;
            }
        }

        postprocessArray(arr, clean, undefinedCount);
        printStats("Сортування Шелла", comparisons, moves, undefinedCount > 0, arr);
        return arr;
    }

    function quickSort(arr, ascending = true) {
        ensureArray(arr);
        const { clean, undefinedCount } = preprocessArray(arr);

        let comparisons = 0;
        let moves = 0;

        function sort(data, left, right) {
            if (left >= right) return;

            const pivot = data[Math.floor((left + right) / 2)];
            let i = left;
            let j = right;

            while (i <= j) {
                while (true) {
                    comparisons++;
                    if (ascending ? data[i] < pivot : data[i] > pivot) {
                        i++;
                    } else {
                        break;
                    }
                }

                while (true) {
                    comparisons++;
                    if (ascending ? data[j] > pivot : data[j] < pivot) {
                        j--;
                    } else {
                        break;
                    }
                }

                if (i <= j) {
                    if (i !== j) {
                        [data[i], data[j]] = [data[j], data[i]];
                        moves++;
                    }
                    i++;
                    j--;
                }
            }

            if (left < j) sort(data, left, j);
            if (i < right) sort(data, i, right);
        }

        sort(clean, 0, clean.length - 1);

        postprocessArray(arr, clean, undefinedCount);
        printStats("Сортування Хоара (QuickSort)", comparisons, moves, undefinedCount > 0, arr);
        return arr;
    }

    return {
        bubbleSort,
        selectionSort,
        insertionSort,
        shellSort,
        quickSort
    };
})();

window.SortLib = SortLib;
