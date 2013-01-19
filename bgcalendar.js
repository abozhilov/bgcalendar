/**
 * @author Asen Bozhilov
 * @license MIT, 2013 
 */
var bgcalendar = {};
(function () {
    var LEAP_DAY = 173,
        NEW_YEAR_DAY = 355,
        DIFF_YEARS = 4768,
        DAY = 86400000, //ms
        GREGORIAN_YEAR = 6350, //1582
        YEARS_COUNT = 12,
        
        LEAP_DAY_NAME = 'Високосен Ден',
        NEW_YEAR_DAY = 'Нова Година',    
        BG_MONTHS = [
            'Алем', 
            'Тутом', 
            'Читем', 
            'Твирем', 
            'Вечем', 
            'Шехтем', 
            'Сетем', 
            'Естем', 
            'Нунтем', 
            'Елем', 
            'Ениалем', 
            'Алтом'
        ],
        YEARS_TYPE = [
            'Дилом', //Змия
            'Имен',  //Кон
            'Теку',  //Овен 
            'Бечин', //Маймуна
            'Тох',   //Петел
            'Eтх',   //Куче     
            'Докс',  //Глиган
            'Сомор', //Мишка
            'Шегор', //Вол
            'Борс',  //Тигър
            'Дван',  //Заек
            'Вер'    //Дракон
        ];
    
    //Build lookup table
    var map = [],
        k = 10, 
        month, len;
    for (var i = 1, j = 0; j < 13; j++) {
        if (j == 12) {
            len = 9;
            map.push([0, 0]);
            month = 1;
        }
        else {
            len = (j % 3 ? 30 : 31);
            month = j + 1;
        }
        for (;k <= len; k++, i++) {
            map.push([k, month]);    
        }
        k = 1;          
    }
    
    function isLeapYear(year) {
        return new Date(year, 1, 29).getDate() === 29;
    }
    
    /**
     * Convert Gregorian to Bulgarian date
     * @param {Number} year
     * @param {Number} month
     * @param {Number} date
     * @returns {Object year, month, date} 
     */    
    bgcalendar.getDate = function (year, month, date) {
        var leap = isLeapYear(year),
            diff = new Date(year, month - 1, date) - new Date(year, 0, 1),
            day = Math.floor(diff / DAY),
            date;
            
        if (leap) {
            if (day > LEAP_DAY) {
                day--;
            }
            else if (day == LEAP_DAY) {
                return {year : year, month : 7, date : 0};
            }        
        }
        if (day > NEW_YEAR_DAY) year++;
        date = map[day];
        return {year : year + DIFF_YEARS, month : date[1], date : date[0]};
    };
    
    /**
     * Get the year type
     * @param {Number} year - Prabulgarian year
     * @returns {String}  
     */
    bgcalendar.getYearType = function (year) {
        return YEARS_TYPE[(year - 1) % YEARS_COUNT];
    };
    
    /**
     * Format prabulgarian date
     * @param {Object} date
     * @return {String}
     */
    bgcalendar.formatDate = function (date) {
        var year = date.year,
            month = date.month, 
            date = date.date;
        if (date == 0) {
            return (month == 0 ? NEW_YEAR_DAY : LEAP_DAY_NAME) + ', ' + year;
        }        
        return date + ' ' + BG_MONTHS[month - 1] + ', ' + year + ' ' + bgcalendar.getYearType(year);
    };
})();