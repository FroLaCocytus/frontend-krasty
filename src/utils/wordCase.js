/**
 * Эта функция в зависимости от числа ставит правильный падеж для слова
 *
 * @param {number} value - количество объектов
 * @param {string[]} words - массив вариантов склонения слова
 * @returns {string} cлово с правильным падежом
 */

export const wordСase = (value, words) => {
    value = Math.abs(value) % 100; 
    var num = value % 10;
    if(value > 10 && value < 20) return words[2]; 
    if(num > 1 && num < 5) return words[1];
    if(num === 1) return words[0]; 
    return words[2];
}