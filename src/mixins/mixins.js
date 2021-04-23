import numeral from "numeral";

const mixinFilters = {
    filters : {
        formatMoneyDollar(value) {
            return numeral(value).format('$0.00a')
        },
        formatPercentegeChange(value) {
            return numeral(value).format('0.00').concat('%')
        }
    }
}

export default mixinFilters